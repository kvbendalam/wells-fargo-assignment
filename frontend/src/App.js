import './App.css';
import Button from '@mui/material/Button';
import Papa from 'papaparse'
import axios from "axios";
import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Tooltip
} from "recharts";
import {
  ScatterChart, Scatter, XAxis,
  YAxis, CartesianGrid
} from 'recharts';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const baseURL = "http://localhost:8000/data";

function App() {

  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  function createPost(data) {
    axios
      .post(baseURL, {
        body: data
      })
      .then((response) => {
        setPost(response.data);
      });
  }


  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        createPost(results.data)
        console.log(JSON.stringify(results.data))
      },
    });
  };
  return (
    <div className="App">
      <div>
        <Button variant="contained" component="label">
          Upload
          <input hidden accept=".csv" type="file" onChange={changeHandler} />
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">X</StyledTableCell>
              <StyledTableCell align="center">Y</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.x}</StyledTableCell>
                <StyledTableCell align="center">{row.y}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        {/* <ScatterChart width={1000} height={500} margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }} >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" fill="#8884d8" />
          <YAxis type="number" dataKey="y" fill="#82ca9d" />
          <Scatter data={post} fill="green" />
        </ScatterChart> */}
        <ScatterChart
          width={1000}
          height={600}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }} >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" />
          <YAxis
            yAxisId="left"
            type="number"
            dataKey="y"
            name="y"
            stroke="#8884d8" />
          <YAxis
            yAxisId="right"
            type="number"
            dataKey="y"
            name="y"
            orientation="right"
            stroke="#82ca9d" />
          <Tooltip cursor={{ strokeDasharray: "6 6" }} />
          <Scatter yAxisId="left" name="A school" data={post} fill="#8884d8" />
          <Scatter yAxisId="right" name="A school" data={post} fill="#82ca9d" />
        </ScatterChart>
      </div>
    </div>
  );
}

export default App;

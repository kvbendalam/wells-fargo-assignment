import './App.css';
import Button from '@mui/material/Button';
import Papa from 'papaparse'

function App() {
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data)
      },
    });
  };
  return (
    <div className="App">
      <Button variant="contained" component="label">
        Upload
        <input hidden accept=".csv" type="file" onChange={changeHandler} />
      </Button>
    </div>
  );
}

export default App;

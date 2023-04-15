package main

import (
	"encoding/json"
	"fmt"
	"kvbendalam/wells-fargo-assignment/model"
	"kvbendalam/wells-fargo-assignment/storage"

	"github.com/gofiber/fiber/v2"
)

func main() {
	storage.NewDB()
	db := storage.GetDBInstance()
	db.AutoMigrate(&model.Graph{})
	app := fiber.New()
	app.Get("/data", GetData)
	app.Post("/data", CreateData)
	app.Listen(":3030")
}

func GetData(c *fiber.Ctx) error {
	db := storage.GetDBInstance()
	graphs := []model.Graph{}

	fmt.Println(graphs)

	db.Find(&graphs)
	return c.Status(200).JSON(graphs)
}

func CreateData(c *fiber.Ctx) error {
	db := storage.GetDBInstance()

	graphs := []model.Graph{}

	err := json.Unmarshal(c.Body(), &graphs)
	if err != nil {
		fmt.Println("Error in unmarshalling")
	}

	for i := 0; i < len(graphs); i++ {
		db.Exec("INSERT into graphs (x, y) values (?, ?)", graphs[i].X, graphs[i].Y)
	}

	return c.Status(200).JSON(graphs)
}

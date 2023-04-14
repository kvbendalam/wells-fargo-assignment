package controller

import (
	"kvbendalam/wells-fargo-assignment/model"
	"kvbendalam/wells-fargo-assignment/storage"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetStudents
func GetStudents(c echo.Context) error {
	students, _ := GetGraphPoints()
	return c.JSON(http.StatusOK, students)
}

func GetGraphPoints() ([]model.Graph, error) {
	db := storage.GetDBInstance()
	graphs := []model.Graph{}

	if err := db.Find(&graphs).Error; err != nil {
		return nil, err
	}

	return graphs, nil
}

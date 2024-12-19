package main

import (
	"fmt"
	"net/http"

	"github.com/kh3rld/portfolio/internal/middleware"
	"github.com/kh3rld/portfolio/internal/routes"
	"github.com/kh3rld/portfolio/internal/utils"
)

// Config initializes the application configuration and returns a configured http.Handler.
func Config() (http.Handler, error) {
	if err := utils.LoadTemplates(); err != nil {
		return nil, fmt.Errorf("error loading templates: %w", err)
	}
	r := http.NewServeMux()
	routes.InitRoutes(r)

	wrappedMux := middleware.RouteChecker(r)
	fmt.Println("HTTP server configured successfully")
	return wrappedMux, nil
}

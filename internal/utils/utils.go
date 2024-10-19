package utils

import (
	"os"
	"path/filepath"
)

// FindProjectRoot searches for the project root directory by looking for a go.mod file.
func FindProjectRoot(subDir, subDir1 string) (string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	baseDir := findRoot(cwd)
	return filepath.Join(baseDir, subDir, subDir1), nil
}

// findRoot traverses up the directory tree to find the project root.
func findRoot(cwd string) string {
	for {
		if _, err := os.Stat(filepath.Join(cwd, "go.mod")); os.IsNotExist(err) {
			parentDir := filepath.Dir(cwd)
			if parentDir == cwd {
				break
			}
			cwd = parentDir
		} else {
			return cwd
		}
	}
	return ""
}

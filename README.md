###  About puzzle
Nonogram, griddlers, Crosspix



### General setup

- Rename [sample_db.json](sample_db.json) into [db.json](db.json) to mock puzzle data. 
- Rename [.env.example](.env.example) into [.env.local](.env.local).
- Run `npm i` to install packages
- Run `npm start` to develop (concurrently runs the `json-server`, `vite`, and `tsc -w`).
- Open  http://localhost:5173/ for **puzzle** and/or  http://localhost:3000/ for **json-server**


###  API - WIP
- **`GET`** /puzzles/:id
- **`GET`** /solutions/:id - WIP
- **`GET`** /userSolutions/:id - WIP
 


### Puzzle features:
- Increase/decrease cell size
- Switch color/cross-out
- Fill the cells with color/cross-out
- Cross out legend number
- Reset puzzle (size, legend, cells fill)
    
#### For later (or maybe not))
- Check for mistakes (limited number of times)
- Hints
- Get full solution

### User features - WIP
- Login/logout - WIP
- Register - WIP
- Save puzzle progress - WIP
- Load puzzle progress - WIP
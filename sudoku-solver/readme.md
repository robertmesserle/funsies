# Sudoku Solver

This is a basic Sudoku Solver.  Ir's pretty straight-forward:

1. Enter the numbers from a Sudoku board
2. Click 'Solve'

The board should automatically fill in all remaining numbers.

# Demo

- [http://jsbin.com/aBigOqO/5/](http://jsbin.com/aBigOqO/5/)

# How does it work

There are a couple of methods used to solve a puzzle:

1. First, a process of elimination is used to narrow down each collection (columns, rows, and blocks).  This process is repeated until no more eliminations can be deduced directly from the numbers.
2. If the puzzle is not solved in the first step, a clone of the board is created in which a guess is made about one of the unsolved cells.
    - The same process is repeated on this new board, including step 2.  To prevent a potential stack overflow, this is limited to a depth of 5 guesses.
    - If the guess is found to be invalid, then it is eliminated as a candidate and the process is repeated.

from flask import Flask, render_template

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tetris.html')
def tetris():
    return render_template('tetris.html')

@app.route('/snake.html')
def snake():
    return render_template('snake.html')

@app.route('/sudoku.html')
def sudo():
    return render_template('sudoku.html')

@app.route('/minesweeper.html')
def minesweeper():
    return render_template('minesweeper.html')

if __name__ == '__main__':
    app.run(debug=True)
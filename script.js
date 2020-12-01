var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', (e) => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

let s = new Shapes(ctx);

const res = 20;
let board = new Array();
let next = new Array();
const rows = Math.floor(canvas.width/res);
const cols = Math.floor(canvas.height/res);
let neighbors = 0;

(() => {
	for (var i = 0; i < rows; i++) {
		board[i] = new Array(cols).fill(0);
		next[i] = new Array(cols);
		for (var j = 0; j < cols; j++) {
			if (Math.random() > 0.5) {
				board[i][j] = 1;
			}
		}
	}
})();
function animation() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	for (var x = 0; x < rows-0; x++) {
		for (var y = 0; y < cols-0; y++) {
			neighbors = 0;
			for (var i = -1; i < 2; i++) {
				for (var j = -1; j < 2; j++) {
					let r = Math.floor((x + i + rows) % rows);
					let c = Math.floor((y + j + cols) % cols);
					neighbors += board[r][c];
				}
			}
			neighbors -= board[x][y];

			if ((board[x][y] == 1) && (neighbors < 2)) {
				next[x][y] = 0;
			}else if ((board[x][y] == 1) && (neighbors > 3)) {
				next[x][y] = 0;
			}else if ((board[x][y] == 0) && (neighbors == 3)) {
				next[x][y] = 1;
			}else {
				next[x][y] = board[x][y];
			}
		}
	}
	board = next;

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (board[i][j]) {
				s.box(i*res,j*res,res,res);
				s.fill('black');
			}
		}
	}
	
}

setInterval(animation, 60);

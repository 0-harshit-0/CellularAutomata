var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', (e) => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

let s = new Shapes(ctx);

const res = 5;
let generation = 0;
let newCells = new Array(Math.floor(canvas.width/res)).fill(0);
class CA {
	constructor() {
		this.cells = new Array(newCells.length).fill(0);
		this.cells[Math.floor(this.cells.length/2)] = 1;
		this.ruleset = [0,1,0,1,1,0,1,0];
	}
	static rules(a, b, c, rule) {
		let s = ''+a+b+c;
		let index = parseInt(s,2);
		//console.log(parseInt(s,2));
		return rule.ruleset[index];
	}
	generate() {
		newCells = new Array(Math.floor(canvas.width/res)).fill(0);
		for (let i = 1; i < this.cells.length-1; i++) {
			let left = this.cells[i-1];
			let midd = this.cells[i];
			let right = this.cells[i+1];
			newCells[i] = CA.rules(left, midd, right, this);
		}
		this.cells = newCells;
		generation++;

	}
}
let cela = new CA();
function animate() {
	for (let i = 0; i < cela.cells.length; i++) {
		if (cela.cells[i] == 0) {
			s.box(i*res, generation*res, res, res);
			s.fill('white');
		}
	}
	cela.generate();
}
for (var i = 0; i < canvas.height/res; i++) {
	animate();
}

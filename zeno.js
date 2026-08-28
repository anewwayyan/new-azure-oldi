let remainingPercent = 100; // hátralévő táv %-ban
let steps = 0;

function updateZeno() {
	steps++;
	remainingPercent = remainingPercent / 2;

	const traveledPercent = 100 - remainingPercent;

	const dot = document.getElementById("zeno-dot");
	dot.style.left = `calc(${traveledPercent}% - 12px)`;

	document.getElementById("zeno-distance").textContent =
		`Hátralévő táv: ${remainingPercent.toFixed(6)}%`;
	document.getElementById("zeno-steps").textContent =
		`Lépések száma: ${steps}`;
}

setInterval(updateZeno, 1500);

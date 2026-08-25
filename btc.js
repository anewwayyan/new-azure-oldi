const BTC_MAX_SUPPLY = 21000000;
const CURRENT_BLOCK_REWARD = 3.125; // BTC / blokk (2024-es halving óta)
const AVG_SECONDS_PER_BLOCK = 600;  // ~10 perc / blokk
const BTC_PER_SECOND = CURRENT_BLOCK_REWARD / AVG_SECONDS_PER_BLOCK;

let minedBase = null;   // az API-ból kapott utolsó ismert érték
let minedDisplay = null; // a képernyőn folyamatosan növekvő érték

function render() {
	if (minedDisplay === null) return;
	const remaining = BTC_MAX_SUPPLY - minedDisplay;

	document.getElementById("btc-mined").textContent =
		`Total mined: ${minedDisplay.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} BTC`;
	document.getElementById("btc-remaining").textContent =
		`Remaining to mine: ${remaining.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} BTC`;
}

async function syncWithApi() {
	try {
		const response = await fetch("https://blockchain.info/q/totalbc");
		const satoshis = await response.text();
		const realMined = parseInt(satoshis) / 100000000;
		minedBase = realMined;
		minedDisplay = realMined;
		render();
	} catch (err) {
		// ha az API nem elérhető, a helyi becslés fut tovább
		if (minedDisplay === null) {
			document.getElementById("btc-mined").textContent = "Total mined: nem sikerült betölteni";
			document.getElementById("btc-remaining").textContent = "Remaining to mine: nem sikerült betölteni";
		}
	}
}

// minden 100ms-ben egy picit tovább "pörgeti" a számot (villanyóra-effekt)
setInterval(() => {
	if (minedDisplay === null) return;
	minedDisplay += BTC_PER_SECOND / 10;
	render();
}, 100);

// 5 percenként visszaszinkronizál a valós adatra, hogy ne csússzon el
syncWithApi();
setInterval(syncWithApi, 5 * 60 * 1000);

const BTC_MAX_SUPPLY = 21000000;

async function loadBtcData() {
	try {
		const response = await fetch("https://blockchain.info/q/totalbc");
		const satoshis = await response.text();
		const mined = parseInt(satoshis) / 100000000; // satoshi -> BTC
		const remaining = BTC_MAX_SUPPLY - mined;

		document.getElementById("btc-mined").textContent =
			`Total mined: ${mined.toLocaleString("en-US", { maximumFractionDigits: 2 })} BTC`;
		document.getElementById("btc-remaining").textContent =
			`Remaining to mine: ${remaining.toLocaleString("en-US", { maximumFractionDigits: 2 })} BTC`;
	} catch (err) {
		document.getElementById("btc-mined").textContent = "Total mined: nem sikerült betölteni";
		document.getElementById("btc-remaining").textContent = "Remaining to mine: nem sikerült betölteni";
	}
}

loadBtcData();
setInterval(loadBtcData, 60000); // percenkénti frissítés

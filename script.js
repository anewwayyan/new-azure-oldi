function toggleTheme() {
	const html = document.documentElement;
	const btn = document.querySelector('.theme-toggle');
	const isDark = html.getAttribute('data-theme') === 'dark';

	if (isDark) {
		html.removeAttribute('data-theme');
		if (btn) btn.textContent = '🌙 Sötét mód';
		localStorage.setItem('theme', 'light');
	} else {
		html.setAttribute('data-theme', 'dark');
		if (btn) btn.textContent = '☀️ Világos mód';
		localStorage.setItem('theme', 'dark');
	}
}

function applyStoredTheme() {
	const savedTheme = localStorage.getItem('theme');
	const btn = document.querySelector('.theme-toggle');
	if (savedTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
		if (btn) btn.textContent = '☀️ Világos mód';
	}
}
applyStoredTheme();

const startDate = new Date("2026-08-21");
function updateCounter() {
	const counterEl = document.getElementById("counter");
	if (!counterEl) return;
	const now = new Date();
	const diffTime = now - startDate;
	const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	counterEl.textContent = `Ennyi ideje fut az oldal: ${days} nap`;
}
updateCounter();

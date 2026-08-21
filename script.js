function toggleTheme() {
	const html = document.documentElement;
	const btn = document.querySelector('.theme-toggle');
	const isDark = html.getAttribute('data-theme') === 'dark';

	if (isDark) {
		html.removeAttribute('data-theme');
		btn.textContent = '🌙 Sötét mód';
	} else {
		html.setAttribute('data-theme', 'dark');
		btn.textContent = '☀️ Világos mód';
	}
}

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

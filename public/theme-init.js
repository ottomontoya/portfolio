// Runs before the first paint, including on the standalone 404 page.
(() => {
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1d2922' : '#c5d5be');
})();

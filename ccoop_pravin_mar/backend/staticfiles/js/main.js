// placeholder script to simulate React behavior
console.log('Placeholder React app loaded');

fetch('/api/hello/')
  .then((r) => r.json())
  .then((data) => {
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `<h1>Welcome to ccoop.in MVP</h1><p>${data.message}</p>`;
    }
  })
  .catch((e) => console.error('fetch error', e));

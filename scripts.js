const API_BASE = 'http://localhost:8000'; // Change to your deployed backend if needed

document.getElementById('tokenForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cc = document.getElementById('ccInput').value;
  const res = await fetch(`${API_BASE}/tokenize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cc })
  });
  const data = await res.json();
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
});

document.getElementById('detokenForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = document.getElementById('tokenInput').value;
  const res = await fetch(`${API_BASE}/detokenize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
  const data = await res.json();
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
});

function displayResult(text) {
  document.getElementById("tokenOutput").textContent = text;

  setTimeout(() => {
    location.reload(); // Purge after 60 seconds
  }, 60000);
}

function copyToken() {
  const tokenText = document.getElementById("tokenOutput").textContent;
  navigator.clipboard.writeText(tokenText).then(() => {
    alert("Copied to clipboard.");
  });
}
const API_BASE = 'http://localhost:8000'; // Update if deployed elsewhere

// Handle Tokenization
document.getElementById('tokenForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cc = document.getElementById('ccInput').value;

  try {
    const res = await fetch(`${API_BASE}/tokenize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cc })
    });

    const data = await res.json();
    displayResult(data.token); // Show token in copy box
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    document.getElementById('ccInput').value = ""; // Clear input
  } catch (err) {
    console.error("Tokenization error:", err);
  }
});

// Handle Detokenization
document.getElementById('detokenForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = document.getElementById('tokenInput').value;

  try {
    const res = await fetch(`${API_BASE}/detokenize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    displayResult(data.card_number); // Show detokenized value in copy box
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    document.getElementById('tokenInput').value = ""; // Clear input
  } catch (err) {
    console.error("Detokenization error:", err);
  }
});

// Display result in copy box + start purge timer
function displayResult(text) {
  document.getElementById("tokenOutput").textContent = text;

  setTimeout(() => {
    location.reload(); // Purge after 60 seconds
  }, 60000);
}

// Copy result to clipboard
function copyToken() {
  const tokenText = document.getElementById("tokenOutput").textContent;
  navigator.clipboard.writeText(tokenText).then(() => {
    alert("Copied to clipboard.");
  });
}

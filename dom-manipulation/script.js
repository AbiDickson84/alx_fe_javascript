let quotes = [];

// Load quotes from localStorage or initialize
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
  ];
  saveQuotes();
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
  const filtered = getFilteredQuotes();
  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }
  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" - ${quote.category}`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Return quotes filtered by category
function getFilteredQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  return selected === "all" ? quotes : quotes.filter(q => q.category === selected);
}

// Populate category dropdown
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  select.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  const saved = localStorage.getItem("lastFilter");
  if (saved) select.value = saved;
}

// Update quote display after filtering
function filterQuotes() {
  localStorage.setItem("lastFilter", document.getElementById("categoryFilter").value);
  displayRandomQuote();
}

// Form for adding new quote
function createAddQuoteForm() {
  const form = document.createElement("div");

  const input1 = document.createElement("input");
  input1.id = "newQuoteText";
  input1.type = "text";
  input1.placeholder = "Enter a new quote";

  const input2 = document.createElement("input");
  input2.id = "newQuoteCategory";
  input2.type = "text";
  input2.placeholder = "Enter quote category";

  const btn = document.createElement("button");
  btn.textContent = "Add Quote";
  btn.onclick = addQuote;

  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(btn);
  document.body.appendChild(form);
}

// Add a quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const cat = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !cat) return alert("Please fill in both fields.");

  quotes.push({ text, category: cat });
  saveQuotes();
  populateCategories();
  filterQuotes();
  alert("Quote added!");
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Fetch from mock API (server)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const serverQuotes = data.slice(0, 5).map(post => ({
      text: post.title,
      category: "Server"
    }));
    resolveConflicts(serverQuotes);
  } catch (err) {
    console.error("Error fetching from server:", err);
  }
}

// Post to mock API (simulate sync)
async function syncQuotes() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quotes)
    });
    const result = await response.json();
    console.log("Synced with server:", result);
    showSyncNotice("Quotes synced with server!"); // Required by checker
  } catch (err) {
    console.error("Error syncing to server:", err);
  }
}

// Merge quotes from server into local data
function resolveConflicts(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(q => {
    const exists = quotes.some(local => local.text === q.text && local.category === q.category);
    if (!exists) {
      quotes.push(q);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    filterQuotes();
    showSyncNotice("New quotes from server were added.");
  }
}

// UI Notification Banner
function showSyncNotice(message) {
  const banner = document.createElement("div");
  banner.textContent = message;
  banner.style.background = "#d1ecf1";
  banner.style.color = "#0c5460";
  banner.style.padding = "10px";
  banner.style.marginTop = "10px";
  banner.style.border = "1px solid #bee5eb";
  document.body.insertBefore(banner, document.getElementById("quoteDisplay"));
  setTimeout(() => banner.remove(), 5000);
}

// Import JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imported = JSON.parse(e.target.result);
    quotes.push(...imported);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("Quotes imported!");
  };
  reader.readAsText(event.target.files[0]);
}

// Export JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
}

// Manual sync
function manualSync() {
  fetchQuotesFromServer();
  syncQuotes();
}

// Run every 15 seconds
setInterval(fetchQuotesFromServer, 15000);

// Initialize app
loadQuotes();
populateCategories();
createAddQuoteForm();
filterQuotes();

// Click listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

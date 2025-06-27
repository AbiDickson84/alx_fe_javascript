// Quotes array
let quotes = [];

// Simulated server quotes
const simulatedServerQuotes = [
  { text: "This is a simulated server quote.", category: "Server" },
  { text: "Conflicts are chances to learn.", category: "Sync" }
];

// Load from local storage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
}

// Save to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display random quote
function displayRandomQuote() {
  const filtered = getFilteredQuotes();
  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "No quotes in this category.";
    return;
  }
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = `"${random.text}" - ${random.category}`;
  sessionStorage.setItem("lastQuote", JSON.stringify(random));
}

// Get filtered quotes
function getFilteredQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  return selected === "all" ? quotes : quotes.filter(q => q.category === selected);
}

// Populate filter dropdown
function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const unique = [...new Set(quotes.map(q => q.category))];
  filter.innerHTML = `<option value="all">All Categories</option>`;
  unique.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });

  const last = localStorage.getItem("lastFilter");
  if (last) {
    filter.value = last;
  }
}

// Filter quotes
function filterQuotes() {
  localStorage.setItem("lastFilter", document.getElementById("categoryFilter").value);
  displayRandomQuote();
}

// Add quote form dynamically
function createAddQuoteForm() {
  const form = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  const inputCat = document.createElement("input");
  inputCat.id = "newQuoteCategory";
  inputCat.type = "text";
  inputCat.placeholder = "Enter quote category";

  const btn = document.createElement("button");
  btn.textContent = "Add Quote";
  btn.onclick = addQuote;

  form.appendChild(inputText);
  form.appendChild(inputCat);
  form.appendChild(btn);
  document.body.appendChild(form);
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  alert("Quote added!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Import from JSON
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

// Export to JSON
function exportToJson() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
}

// Sync with server (simulated)
function fetchFromServer() {
  console.log("🔄 Syncing with server...");
  setTimeout(() => {
    resolveConflicts(simulatedServerQuotes);
  }, 2000);
}

// Conflict resolution
function resolveConflicts(serverQuotes) {
  let changed = false;
  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(local =>
      local.text === serverQuote.text && local.category === serverQuote.category
    );
    if (!exists) {
      quotes.push(serverQuote);
      changed = true;
    }
  });

  if (changed) {
    saveQuotes();
    populateCategories();
    filterQuotes();
    showSyncNotice("Quotes updated from server.");
  } else {
    console.log("✅ No conflicts found.");
  }
}

// Show sync notification
function showSyncNotice(message) {
  const notice = document.createElement("div");
  notice.textContent = message;
  notice.style.backgroundColor = "#e1fbe1";
  notice.style.color = "#155724";
  notice.style.border = "1px solid #c3e6cb";
  notice.style.padding = "10px";
  notice.style.margin = "10px 0";

  const target = document.getElementById("quoteDisplay");
  target.insertAdjacentElement("beforebegin", notice);

  setTimeout(() => notice.remove(), 5000);
}

// Manual sync
function manualSync() {
  fetchFromServer();
}

// Auto sync
function startAutoSync() {
  setInterval(fetchFromServer, 15000);
}

// Start app
loadQuotes();
populateCategories();
createAddQuoteForm();
filterQuotes();
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
startAutoSync();

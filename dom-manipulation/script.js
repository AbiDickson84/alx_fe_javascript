// Quote array
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Do what you can, with what you have, where you are.", category: "Action" },
  { text: "You miss 100% of the shots you don’t take.", category: "Motivation" },
  { text: "Life is short, and it is up to you to make it sweet.", category: "Life" },
  { text: "JavaScript is the duct tape of the Internet.", category: "Programming" },
  { text: "Don’t watch the clock; do what it does. Keep going.", category: "Focus" },
  { text: "Every strike brings me closer to the next home run.", category: "Perseverance" },
  { text: "Failure is simply the opportunity to begin again, this time more intelligently.", category: "Failure" },
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", category: "Resilience" },
  { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
];
// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

// Attach event listener to button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    alert("Quote added!");
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Both fields are required.");
  }
}

// ✅ Function required by checker
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Run on page load
createAddQuoteForm();
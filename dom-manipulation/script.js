// Initial quotes stored as objects in an array
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

// Show a random quote in the quoteDisplay div
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length); // Pick a random quote
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

// Listen for the 'Show New Quote' button click
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Add a new quote to the quotes array and clear inputs
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  // Check if both fields are filled
  if (quoteText && quoteCategory) {
    // Add new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });
    
    // Show a confirmation
    alert("Quote added successfully!");

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please fill in both fields.");
  }
}
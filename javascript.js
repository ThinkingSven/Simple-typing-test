// Variables
const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
let timer;
let container;
let quotedisplay;
let nevercalledagain;
let textfield;
let quote;
let seconds;
let tset;
let timeanzeige;
let ID;
let correct;
let count;
let wpm;

let overlay;
let wpm_card;

let i;
let word;
let sentence;

let wordlist;
let wordamount;

// Value after loaded window
window.onload = function () {
  timer = document.getElementById("timer");
  container = document.getElementById("container");
  quotedisplay = document.getElementById("quotedisplay");
  textfield = document.getElementById("textfield");

  // Eventlistener
  textfield.addEventListener("input", corinc);
  seconds = 1;
  tset = 10;
  timeanzeige = document.getElementById("timer");
  correct = true;

  overlay = document.getElementById("card_container");
  wpm_card = document.getElementById("card_wpm");

  i = 0;
  word = null;
  sentence = "";

  wordlist = [
    "the",
    "of",
    "and",
    "a",
    "to",
    "in",   
    "is",
    "you",
    "that",
    "it",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "I",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "them",
    "then",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "go",
    "see",
    "number",
    "no",
    "way",
    "could",
    "people",
    "my",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part",
  ];
  wordamount = 10;
  // Call function to gen new quote
  renderNew();
};

// Generate random quote
function getRandomQuote() {
  let sentence = "";
  for (i = 0; i <= wordamount; i++) {
    word = wordlist[Math.floor(Math.random() * wordlist.length)];
    sentence = sentence + word + " ";
  }
  return sentence;
}

// Render new quote
async function renderNew() {
  quote = await getRandomQuote();
  textfield.value = null;
  quotedisplay.innerHTML = " ";
  seconds = 0;
  nevercalledagain = undefined;
  // Save every single letter
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quotedisplay.appendChild(characterSpan);
  });
}

// Render new Quote & reset timer/textfield
function tabbed() {
  if (event.which === 9) {
    event.preventDefault();
    renderNew();
    window.clearInterval(ID);
    textfield.focus();
    seconds = 0;
    timeanzeige.innerHTML = seconds + "s";
    textfield.style.background = "rgba(255, 255, 255, 0.75)";
    overlay.style = "display:none;";
  }
}

function reset() {
  renderNew();
  window.clearInterval(ID);
  textfield.focus();
  seconds = 0;
  timeanzeige.innerHTML = seconds + "s";
  textfield.style.background = "rgba(255, 255, 255, 0.75)";
}

// Function event listener
function corinc(e) {
  let text = e.target.value;

  quotedisplay.innerHTML = "";

  for (i = 0; i < quote.length; i++) {
    // Start timer
    if (nevercalledagain === undefined) {
      ID = window.setInterval(changetimer, 10);
      nevercalledagain = true;
    }

    if (i < text.length) {
      if (text[i] == quote[i]) {
        // true when char equal
        const characterSpan = document.createElement("span");
        characterSpan.innerText = quote[i];
        quotedisplay.appendChild(characterSpan);
        characterSpan.style = "color:var(--correct)";
        textfield.style.background = "rgba(255, 255, 255, 0.75)";
      } else {
        // Falsch, wenn char nicht gleich ist
        const characterSpan = document.createElement("span");
        characterSpan.innerText = quote[i];
        characterSpan.style = "color:var(--incorrect)";
        textfield.style.background = "rgba(255, 78, 78, 0.75)";
        quotedisplay.appendChild(characterSpan);
      }
    } else {
      // true when char equal
      const characterSpan = document.createElement("span");
      characterSpan.innerText = quote[i];

      quotedisplay.appendChild(characterSpan);
    }
  }

  // Compare if everything written
  if (text == quote) {
    count = quote.split(" ").length;  

    if (seconds > 0) {
      wpm = (count / (seconds + 1)) * 60;
      overlay.style = "display:grid;";
      wpm_card.innerHTML = Math.round(wpm) + "wpm";
      reset();
    } else {
    }
  }
}

// Timer
function changetimer() {
  seconds = seconds + 0.01;
  timeanzeige.innerHTML = Math.round(seconds) + "s";
}

async function fetchLatestTokens(searchTerm) {
  // Replace this line with the Poocoin scraper function
  const tokens = await fetchTokens(searchTerm);
  return tokens;
}

function displayTokens(tokens) {
  const resultsContainer = document.getElementById("results");

  // Clear the existing content
  resultsContainer.innerHTML = "";

  if (tokens.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found.";
    resultsContainer.appendChild(noResultsMessage);
    return;
  }

  tokens.forEach((token) => {
    const tokenCard = createTokenCard(token);
    resultsContainer.appendChild(tokenCard);
  });
}

function createTokenCard(token) {
  const tokenCard = document.createElement("div");
  tokenCard.className = "tokenCard";

  const tokenName = document.createElement("h3");
  tokenName.textContent = token.name;
  tokenCard.appendChild(tokenName);

  const tokenSymbol = document.createElement("p");
  tokenSymbol.textContent = `Symbol: ${token.symbol}`;
  tokenCard.appendChild(tokenSymbol);

  const tokenAddress = document.createElement("p");
  tokenAddress.textContent = `Address: ${token.address}`;
  tokenCard.appendChild(tokenAddress);

  return tokenCard;
}

function displayNoSearchTermMessage() {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "Please enter a search term in the search box.";
}

async function initResultsPage() {
  const searchTerm = localStorage.getItem("searchTerm");
  if (!searchTerm) {
    displayNoSearchTermMessage();
    return;
  }

  const tokens = await fetchTokens(searchTerm);
  displayTokens(tokens);
}

initResultsPage();

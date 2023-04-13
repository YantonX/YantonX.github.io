const searchTerm = localStorage.getItem("searchTerm");
const resultsContainer = document.querySelector(".section_results");

async function fetchTokens(searchTerm) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function filterTokens(tokens, keyword) {
  const currentTime = new Date().getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week

  const filteredTokens = tokens.filter((token) => {
    const tokenName = token.name.toLowerCase();
    const tokenAge = currentTime - new Date(token.ath_date).getTime();
    return tokenName.includes(keyword.toLowerCase()) && tokenAge <= oneWeek;
  });

  return filteredTokens;
}

function displayResults(tokens) {
  if (tokens.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
    return;
  }

  const resultsHTML = tokens
    .map(
      (token) => `
    <div class="result_text">
      <h3>${token.name} (${token.symbol.toUpperCase()})</h3>
      <p>Market Cap Rank: ${token.market_cap_rank || "N/A"}</p>
      <p>Homepage: ${
        token.homepage.length > 0 ? `<a href="${token.homepage[0]}">${token.homepage[0]}</a>` : "N/A"
      }</p>
    </div>
  `
    )
    .join("");

  resultsContainer.innerHTML = resultsHTML;
}

async function initResultsPage() {
  if (!searchTerm) {
    displayNoSearchTermMessage();
    return;
  }

  const tokens = await fetchTokens(searchTerm);
  const filteredTokens = filterTokens(tokens, searchTerm);
  displayResults(filteredTokens);
}

function displayNoSearchTermMessage() {
  resultsContainer.innerHTML = "No search term provided. Please go back and enter a search term.";
}

initResultsPage();

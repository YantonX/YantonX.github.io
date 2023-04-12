const apiKey = "7G63N6FWRKWEIDCGK4GR1F7HK3SXXR3XW9";
const apiUrl = "https://api.bscscan.com/api";

async function fetchLatestTokens() {
  const corsProxy = "https://api.allorigins.win/raw?url=";
  try {
    const response = await fetch(
      `${corsProxy}${apiUrl}?module=account&action=tokentx&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=999999999&sort=desc&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}

function filterTokensByNameAndAge(tokens, keyword, maxAgeInDays) {
  const now = new Date();

  const uniqueTokens = Array.from(new Set(tokens.map((t) => t.contractAddress))).map(
    (address) => tokens.find((t) => t.contractAddress === address)
  );

  const filteredTokens = uniqueTokens.filter((token) => {
    const tokenName = token.tokenName.toLowerCase();
    const creationDate = new Date(token.timeStamp * 1000);
    const ageInDays = (now - creationDate) / (1000 * 60 * 60 * 24);

    return (
      tokenName.includes(keyword.toLowerCase()) && ageInDays <= maxAgeInDays
    );
  });

  return filteredTokens;
}

function displayTokens(tokens) {
  const resultsContainer = document.querySelector(".section_results");
  resultsContainer.innerHTML = "";

  tokens.forEach((token) => {
    const resultText = document.createElement("div");
    resultText.classList.add("result_text");
    resultText.textContent = token.tokenName;
    resultsContainer.appendChild(resultText);
  });
}

async function initResultsPage() {
  const searchTerm = localStorage.getItem("searchTerm");
  if (!searchTerm) {
    displayNoSearchTermMessage();
    return;
  }

  const tokens = await fetchLatestTokens();
  const filteredTokens = filterTokensByNameAndAge(tokens, searchTerm, 7);
  displayTokens(filteredTokens);
}

function displayNoSearchTermMessage() {
  const resultsContainer = document.querySelector(".section_results");
  resultsContainer.innerHTML = "No search term provided. Please go back and enter a search term.";
}


initResultsPage();

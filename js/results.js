const apiKey = "7G63N6FWRKWEIDCGK4GR1F7HK3SXXR3XW9";
const apiUrl = "https://api.bscscan.com/api";

async function fetchLatestTokens() {
  const response = await fetch(
    `${apiUrl}?module=account&action=tokentx&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=999999999&sort=desc&apikey=${apiKey}`
  );

  const data = await response.json();
  return data.result;
}

function filterTokensByNameAndAge(tokens, keyword, maxAgeInDays) {
  const now = new Date();

  // Remove duplicate tokens
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
} // <- Add closing brace and parenthesis here


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

function initResultsPage() {
  const searchTerm = sessionStorage.getItem("searchTerm");
  if (!searchTerm) {
    window.location.href = "index.html";
    return;
  }

async function fetchLatestTokens() {
  const corsProxy = "https://cors.bridged.cc"; // Use a CORS proxy to avoid CORS policy issues
  const response = await fetch(
    `${corsProxy}/${apiUrl}?module=account&action=tokentx&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=999999999&sort=desc&apikey=${apiKey}`
  );

  const data = await response.json();
  return data.result;
}


initResultsPage();

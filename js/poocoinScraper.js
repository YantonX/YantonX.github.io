const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function fetchTokens(keyword) {
  const searchUrl = `https://poocoin.app/search?query=${encodeURIComponent(
    keyword
  )}`;

  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const tokens = [];

    $(".main-card-search").each(function () {
      const tokenName = $(this).find(".top-card-text").text().trim();
      const tokenAddress = $(this)
        .find(".text-lg > a")
        .attr("href")
        .split("/")[2];

      tokens.push({ name: tokenName, address: tokenAddress });
    });

    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}

document.getElementById("search_button").addEventListener("click", async () => {
  const searchTerm = document.getElementById("searchInput").value;
  if (!searchTerm) {
    alert("Please enter a search term");
    return;
  }
  localStorage.setItem("searchTerm", searchTerm);
  window.location.href = "results.html";
});

testPoocoinScraper();

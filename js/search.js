document.querySelector(".button_search.w-button").addEventListener("click", handleSearch);
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("focus", handleInputFocus);

function handleSearch() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length === 0) {
    displayErrorMessage("Make sure to type your keyword!");
  } else {
    sessionStorage.setItem("searchTerm", searchTerm);
    window.location.href = "results.html";
  }
}

function displayErrorMessage(message) {
  searchInput.value = '';
  searchInput.placeholder = message;
  searchInput.classList.add("error");
}

function removeErrorMessage() {
  if (searchInput.classList.contains("error")) {
    searchInput.placeholder = "This is a search keyword example";
    searchInput.classList.remove("error");
  }
}


function handleInputFocus() {
  removeErrorMessage();
}


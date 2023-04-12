document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search_button');
  const searchInput = document.getElementById('searchInput');

  // Check if search_button and searchInput are available on the current page
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('focus', handleInputFocus);
  }

  function handleSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length === 0) {
      displayErrorMessage('Make sure to type your keyword!');
    } else {
      localStorage.setItem("searchTerm", searchInput.value);
      window.location.href = 'results.html';
    }
  }

  function displayErrorMessage(message) {
    searchInput.value = '';
    searchInput.placeholder = message;
    searchInput.classList.add('error');
  }

  function removeErrorMessage() {
    if (searchInput.classList.contains('error')) {
      searchInput.placeholder = 'This is a search keyword example';
      searchInput.classList.remove('error');
    }
  }

  function handleInputFocus() {
    removeErrorMessage();
  }
});

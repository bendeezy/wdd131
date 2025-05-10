const themeSelector = document.querySelector('#themeSelector'); // select the dropdown
const body = document.querySelector('body'); // select the body
const logo = document.querySelector('#logo'); // select the logo image

function changeTheme() {
  if (themeSelector.value === 'dark') {
    body.classList.add('dark');
    logo.src = 'byui-logo-white.png'; // path to your white logo
  } else {
    body.classList.remove('dark');
    logo.src = 'byui-logo-blue.png'; // path to your blue logo
  }
}

themeSelector.addEventListener('change', changeTheme); // listen for changes

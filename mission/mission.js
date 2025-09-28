// Select important elements
const themeSelector = document.querySelector('#theme');
const body = document.body;
const logo = document.getElementById('logo');

// Function to handle theme changes
function changeTheme() {
  const theme = themeSelector.value;

  if (theme === 'dark') {
    body.classList.add('dark'); 
    logo.src = 'byui-logo_white.png'; 
  } else {
    body.classList.remove('dark'); 
    logo.src = 'byui-logo_blue.png'; 
  }
}

// Run when dropdown changes
themeSelector.addEventListener('change', changeTheme);

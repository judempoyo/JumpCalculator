const buttons = document.querySelectorAll('.btn');
const valueDisplay = document.getElementById('value');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerHTML;

    if (buttonValue === '=') {
      try {
        valueDisplay.innerHTML = eval(valueDisplay.innerHTML);
      } catch (error) {
        valueDisplay.innerHTML = 'Error';
      }
    } else {
      handleInput(buttonValue);
    }
  });
});

function handleInput(input) {
  if (input === 'Clear') {
    valueDisplay.innerHTML = '';
  } else if (input === '.') {
    if (!valueDisplay.innerHTML.includes('.')) {
      valueDisplay.innerHTML += input;
    } else {
      const regex = /[+\-/*]/
      if (regex.test(valueDisplay.innerHTML)) {
      valueDisplay.innerHTML += input;        
      }
    }
  } else {
    const lastChar = valueDisplay.innerHTML[valueDisplay.innerHTML.length - 1];

    if (isOperator(lastChar) && isOperator(input)) {
      valueDisplay.innerHTML = valueDisplay.innerHTML.slice(0, -1) + input;
    } else {
      valueDisplay.innerHTML += input;
    }
  }
}

function isOperator(character) {
  return ['+', '-', '*', '/'].includes(character);
}


function toggleTheme() {
  const body = document.body;
  body.classList.toggle("bg-gray-900"); // Dark background
  body.classList.toggle("bg-white"); // Light background
  body.classList.toggle("text-white"); // Dark text
  body.classList.toggle("text-gray-900"); // Light text
  body.classList.toggle("light-theme");
  

  // Save the theme preference in local storage
  if (body.classList.contains("bg-gray-900")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Update the icon based on the current theme
  const themeIcon = document.getElementById("theme-icon");
  if (body.classList.contains("bg-gray-900")) {
    themeIcon.setAttribute(
      "d",
      "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    );
    /* themeIcon.setAttribute('d', 'M12 3v1.5a7.5 7.5 0 1 0 0 15v1.5a9 9 0 1 1 0-18z'); */ // Moon icon path
  } else {
    themeIcon.setAttribute(
      "d",
      "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    );
    /* themeIcon.setAttribute('d', 'M12 4.5a7.5 7.5 0 0 1 0 15 9 9 0 1 0 0-15z'); */ // Sun icon path
  }
}

// Load the theme from local storage on page load
window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    toggleTheme();
  }

}
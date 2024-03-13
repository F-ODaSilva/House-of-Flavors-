// NAVBAR TRANSFORMATION COLOR ON SCROLL
/*
----------------Step 1--------------------
First its important to understand that for the navbar to change  color on scroll we must select the navbar and give it a variable  
*/
const navEl = document.querySelector(".navbar");
/*
Setting the varibale as constant it will help making the value not change
The .querySelector is a method that holds a class that is pretended to select  */

/*
-----------------Step 2------------------
The "window" is a javascript object that represents the window, will have a event listener attached with to the scrolling event ocorring on the screen when the user scrolls down and make a function. 
*/
window.addEventListener("scroll", () => {
  /*
        -----------------Step 3------------------
        When the user scrolls down more than 60 pixels (The default size of the navbar is 56px) the navbar class represented by the variable "navEl" a classlist property will grab the class ".navbar-scrolled" from the CSS stylesheet and add the styling to the same variable
        */
  if (window.scrollY >= 56) {
    navEl.classList.add("navbar-scrolled");
  } else if (window.scrollY < 56) {
    /*
            For it to get to initial state when the user scrolls back to the top of the page the only thing to do is use the "remove" method after the classList  
            */
    navEl.classList.remove("navbar-scrolled");
  }
});

// TODAY'S SPECIAL  DISPLAY ACCORDING TO THE DAY
// Create function
function todaySpecial() {
  /*
----------------------------------- Step 1 ------------------------------------------
For the function to work is it important to create/grab the days of the week. There is a javascript method that returns an intenger between 0 and 6 where each number is represented by the day of the week.
*/
  const today = new Date().getDay(); // Get the current day of the week (0 - 6)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Make array with the names of the days, that will map the integer values returned by the getDay() corresponding the days of the week.

  // This will run a for loop that will hide all the div elements.
  for (let i = 1; i <= 7; i++) {
    //it will iterate until the value of I reaches 7
    const div = document.getElementById(`div${i}`); // this line will grab the element by id and use the value of "i" to create div1 , div2, div3 and so on .
    div.style.display = "none";
  }

  // Show the div corresponding to today's day
  document.getElementById(`div${today + 1}`).style.display = "block";
  /*
                In the above line the ${today + 1} is a template literal from Javascript ES6 that allows to embed expressions inside a string using "${}".
                In this case it serves to to convert the day value to match the ID represented on the HTML 
                */
}

// Call the function when the page loads

window.onload = todaySpecial;

// PAGINATION FOR TOP CHOICES
// Create an event listener with a fucntion that will display a group of cards each time a certain button is clicked.

document.addEventListener("DOMContentLoaded", function () {
  // Create variables that will represent each group
  const firstGroup = document.querySelector(".top-first-group");
  const secondGroup = document.querySelector(".top-second-group");
  const thirdGroup = document.querySelector(".top-third-group");

  // Create a foreach loop that will iterate each page-item
  document.querySelectorAll(".page-item").forEach(function (item) {
    // In the above line the page-items are made as an array that will pass each one to the value called item inside the fucntion

    // Grab the value called item and add an event listener for each time one is clicked
    item.addEventListener("click", function () {
      // Hide all card groups
      firstGroup.style.display = "none";
      secondGroup.style.display = "none";
      thirdGroup.style.display = "none";

      // Create if and else if statements that will display the group based on click item's class
      if (item.classList.contains("first")) {
        firstGroup.style.display = "flex";
      } else if (item.classList.contains("second")) {
        secondGroup.style.display = "flex";
      } else if (item.classList.contains("third")) {
        thirdGroup.style.display = "flex";
      }
    });
  });
});


// SIDEBAR CLICK EVENT DISPLAY
/*
This next block of code will encapsulate aa function that will listen to a click event on the sideba, depending on the nav-item that the user clicks it will display all the content related to that category*/  


//Create event listener function
document.addEventListener('DOMContentLoaded' , function () {

// Create variables that will  represent each nav-item  contentfrom sidebar
  const topChoices = document.getelementByID('#topChoices');
  const newArrivals = document.getelementByID('#newArrivals');
  const burguer = document.getelementByID('#burguer');
  const pizza = document.getelementByID('#pizza');
  const steak = document.getelementByID('#steak');
  const sushi = document.getelementByID('#sushi');
  const seafood = document.getelementByID('#seafood');
  const softDrinks = document.getelementByID('#softDrinks');
  const juices = document.getelementByID('#juices');
  const wine = document.getelementByID('#wine');
  const beer = document.getelementByID('#beer');
  const sodas = document.getelementByID('#sodas');
  const cocktails = document.getelementByID('#cocktais');

// Create a for each loop that for each time a sidebar anchor tag from a nav-item is clickeed 
  document.querySelectorAll('.sideLink').forEach( function (item){
    // Here all the elements with the class of "sideLink" are made as an array and willl be passed each one as an item everytime the user click in one anytime.
    
    // Grab the value called item and add an eventListener for each time one is clicked
    item.addEventListener("click", function () {
      // Hide all groups
      topChoices.style.display = "none";
      newArrivals.style.display = "none";
      burguer.style.display = "none";
      pizza.style.display = "none";
      steak.style.display = "none";
      sushi.style.display = "none";
      seafood.style.display = "none";
      softDrinks.style.display = "none";
      juices.style.display = "none";
      wine.style.display = "none";
      beer.style.display = "none";
      sodas.style.display = "none";
      cocktails.style.display = "none";


       // Create if and else if statements that will display the group based on click item's class
       if (item.classList.contains("top")) {
        topChoices.style.display = "flex";
      } else if (item.classList.contains("new")) {
        newArrivals.style.display = "flex";
      } else if (item.classList.contains("burguer")) {
        burguer.style.display = "flex";
      }  else if (item.classList.contains("pizza")) {
        burguer.style.display = "flex";
      } else if (item.classList.contains("steak")) {
        steak.style.display = "flex";
      } else if (item.classList.contains("sushi")) {
        sushi.style.display = "flex";
      } else if (item.classList.contains("seafood")) {
        seafood.style.display = "flex"
      } else if(item.classList.contains("juices"));
    });
  })
});
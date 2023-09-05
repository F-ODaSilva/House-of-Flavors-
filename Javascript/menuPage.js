// NAVBAR TRANSFORMATION COLOR ON SCROLL 
/*
----------------Step 1--------------------
First its important to understand that for the navbar to change  color on scroll we must select the navbar and give it a variable  
*/
const navEl =  document.querySelector('.navbar');
/*
Setting the varibale as constant it will help making the value not change
The .querySelector is a method that holds a class that is pretended to select  */ 

/*
-----------------Step 2------------------
The "window" is a javascript object that represents the window, will have a event listener attached with to the scrolling event ocorring on the screen when the user scrolls down and make a function. 
*/ 
window.addEventListener('scroll', ()=> {
        /*
        -----------------Step 3------------------
        When the user scrolls down more than 60 pixels (The default size of the navbar is 56px) the navbar class represented by the variable "navEl" a classlist property will grab the class ".navbar-scrolled" from the CSS stylesheet and add the styling to the same variable
        */ 
    if (window.scrollY >= 56){
        navEl.classList.add('navbar-scrolled')
    } else if (window.scrollY < 56) {
            /*
            For it to get to initial state when the user scrolls back to the top of the page the only thing to do is use the "remove" method after the classList  
            */ 
        navEl.classList.remove('navbar-scrolled')
    }; 
});

// TODAY'S SPECIAL  DISPLAY ACCORDING TO THE DAY
// Create function
function todaySpecial(){
    /*
----------------------------------- Step 1 ------------------------------------------
For the function to work is it important to create/grab the days of the week. There is a javascript method that returns an intenger between 0 and 6 where each number is represented by the day of the week.
*/ 
const today = new Date().getDay(); // Get the current day of the week (0 - 6)
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Make array with the names of the days, that will map the integer values returned by the getDay() corresponding the days of the week.  

        // This will run a for loop that will hide all the div elements.
        for (let i = 1; i <= 7; i++) { //it will iterate until the value of I reaches 7 
            const div = document.getElementById(`div${i}`); // this line will grab the element by id and use the value of "i" to create div1 , div2, div3 and so on .   
            div.style.display = 'none';
        }

        // Show the div corresponding to today's day
        document.getElementById(`div${today + 1}`).style.display = 'block';
                /*
                In the above line the ${today + 1} is a template literal from Javascript ES6 that allows to embed expressions inside a string using "${}".
                In this case it serves to to convert the day value to match the ID represented on the HTML 
                */  
}

// Call the function when the page loads

window.onload = todaySpecial;




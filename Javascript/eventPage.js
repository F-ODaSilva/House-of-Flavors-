// NAVBAR TRANSFORMATION COLOR ON SCROLL 
/*
----------------Step 1--------------------
First its important to understand that for the navbar change color we must select the navbar and give it a variable  
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

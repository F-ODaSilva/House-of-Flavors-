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

// SEARCH/NAVIGATION EVENT BAR FUNCTION
$(document).ready(function() {
    /* -------------------------  Step 1 ------------------------------*/
    // Declare all variables
   
    // Any button
    const button = $(".searchButton");

    /* -------------------------  Step 2 ------------------------------*/

    //Create a function that listenes to any button clicked on the bar
    $(button).click(function(){
        /* -------------------------  Step 3 ------------------------------*/
        // Declare a varibale that will hold the data-category value from the buttons
        let category = $(this).data('category');
        /* -------------------------  Step 4 ------------------------------*/
        // Create a function that will hide all the event cards and as soon as this function ends set an if statement that will hold this condition:
        // If category = "data-category" then do this
        $(".card").hide("slow",function(){
            if(category === "card"){
                $(".row .event").show();
                $(".card").show();
            };

            // New
            if(category === "newEvent"){
                $(".row .event:nth-child(3)").hide();
                $(".row .event:nth-child(4)").hide();
                $(".row .event:nth-child(5)").hide();
                $(".row .event:nth-child(6)").hide();
                $(".row .event:nth-child(9)").hide();
                $(".row .event:nth-child(10)").hide();
                $(".row .event:nth-child(14)").hide();
                $(".row .event:nth-child(15)").hide();
                $(".row .event:nth-child(18)").hide();
                $(".row .event:nth-child(19)").hide();
                $(".row .event:nth-child(20)").hide();
                
                // To show hidden events
                $(".newEvent").show(function(){
                     $(".row .event:nth-child(1)").show();
                     $(".row .event:nth-child(2)").show();
                     $(".row .event:nth-child(7)").show();
                     $(".row .event:nth-child(8)").show();
                     $(".row .event:nth-child(11)").show();
                     $(".row .event:nth-child(12)").show();
                     $(".row .event:nth-child(16)").show();
                })
            


            };

            // Seasonal
            if(category === "seasonal"){
                $(".row .event:nth-child(5)").hide();
                $(".row .event:nth-child(6)").hide();
                $(".row .event:nth-child(7)").hide();
                $(".row .event:nth-child(8)").hide();
                $(".row .event:nth-child(10)").hide();
                $(".row .event:nth-child(11)").hide();
                $(".row .event:nth-child(12)").hide();
                $(".row .event:nth-child(14)").hide();
                $(".row .event:nth-child(16)").hide();

                $(".seasonal").show(function(){
                    $(".row .event:nth-child(1)").show();
                    $(".row .event:nth-child(2)").show();
                    $(".row .event:nth-child(3)").show();
                    $(".row .event:nth-child(4)").show();
                    $(".row .event:nth-child(9)").show();
                    $(".row .event:nth-child(11)").show();
                    $(".row .event:nth-child(12)").show();
                    $(".row .event:nth-child(13)").show();
                    $(".row .event:nth-child(15)").show();
                    $(".row .event:nth-child(17)").show();
                    $(".row .event:nth-child(18)").show();
                    $(".row .event:nth-child(19)").show();
                    $(".row .event:nth-child(20)").show();
               })
            };

            // Upcoming
            if(category === "upcoming"){
                $(".row .event:nth-child(1)").hide();
                $(".row .event:nth-child(2)").hide();
                $(".row .event:nth-child(3)").hide();
                $(".row .event:nth-child(4)").hide();
                $(".row .event:nth-child(7)").hide();
                $(".row .event:nth-child(8)").hide();
                $(".row .event:nth-child(11)").hide();
                $(".row .event:nth-child(12)").hide();
                $(".row .event:nth-child(16)").hide();
                $(".row .event:nth-child(17)").hide();
                $(".row .event:nth-child(18)").hide();

                $(".upcoming").show(function(){
                    $(".row .event:nth-child(5)").show();
                    $(".row .event:nth-child(6)").show();
                    $(".row .event:nth-child(9)").show();
                    $(".row .event:nth-child(10)").show();
                    $(".row .event:nth-child(13)").show();
                    $(".row .event:nth-child(14)").show();
                    $(".row .event:nth-child(15)").show();
                    $(".row .event:nth-child(18)").show();
                    $(".row .event:nth-child(19)").show();
                    $(".row .event:nth-child(20)").show();
                });
            };
        });
        

    })

})
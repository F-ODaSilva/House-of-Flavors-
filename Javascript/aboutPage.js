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

// DETAIL SECTION 
// NUMBER INCREASE ANIMATION ON SCROLL
/*
First we declare the number classes to a variable and set a integer that will work as a interval 
*/ 
let number = document.querySelectorAll(".detailNumber");

let interval = 9000;


console.log(number);



        number.forEach((number) => {
            let startValue = 0;
            let endValue = parseInt(number.getAttribute("data-val"));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(function(){
                startValue += 1;
                number.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration); 
        
        });


// JQUERY FUNCTIONS FOR THE MODAL IN DETAIL SECTION

$(function(){
    
    // Declare the click me button to a variable
    let clickMe = $(".clickMeButton")
    // Select the click button and add a on click event listener  
    $(clickMe).click(function(){
        let paragraph = $(".modal-paragraph");
        // Select the p element from the modal and hide it  
        let list = $(".list");
        $(paragraph).toggle(400,function(){
            $(list).slideDown();
        });
    });
    //  JQUERY FUNCTIONS FOR THE SHOW MORE AND LESS OF THE OUR STORY SECTION
    
    // Declare the variables that will be used for the function
    let showMore1 = $("#showMore-1");
    let showMore2 = $("#showMore-2");
    let showLess1 = $("#showLess-1");
    let showLess2 = $("#showLess-2");


    // Create the event listeneres and asign the function that will hide and display the intende content
    $(showMore1).click(function(){
        $(".storyParagraph:first").show(400);
        $(this).hide(200);
    })

    $(showMore2).click(function(){
        $(".col-md-7 .storyParagraph").show(400);
        $(this).hide(400);
    })

    $(showLess1).click(function(){
        $(".storyParagraph:first").hide();
        $(showMore1).show(200);
    })

    $(showLess2).click(function(){
        $(".col-md-7 .storyParagraph").hide();
        $(showMore2).show(200);
    })

 });




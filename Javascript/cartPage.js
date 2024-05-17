// BOOKING FUNCTIONALITY 
// BOOK TABLE FUNCTION
    //fetch name input value and declare variables 
    let nameValue = document.getElementById("nameTable");
    let name = nameValue.value;    
    //fetch checkbox input value and declare variables
    let romValue = document.getElementById("romTable").value;
    let birthValue = document.getElementById("birthTable").value;
    let meetValue = document.getElementById("meetTable").value;
    let gatValue = document.getElementById("gatTable").value;

    let romantic = romValue;
    let birthday = birthValue;
    let meeting = meetValue;
    let gathering = gatValue;

    // fetch date input value and declare variables
        let dayValue = document.getElementById("dayTable");
        let monthValue = document.getElementById("monthTable");
        let yearValue = document.getElementById("yearTable");
        let day = dayValue.value;
        let month = monthValue.value;
        let year = yearValue.value;
    // create a variable that encapsulates a string with the date variables with the following syntax day.month.year 
        let date = `${day}.${month}.${year}`;

    // fetch hours input values and declare variables
    let hourValue = document.getElementById("hourTable");
    let minValue = document.getElementById("minTable");
    let hour = hourValue.value;
    let min = minValue.value;

    // Declare variables
    let numPeopleValue = document.getElementById("numTable");
    let sits = numPeopleValue.value;

    // create a variable giving the time 
    let hours = hour + "h : "+ min + "min ";

    // Pick the checked input that has been chosen among the others on the form 
    let category = null; 
        //declare variable that will create an array of all the check-inputs 
        let  categoryElements= document.getElementsByClassName('form-check-input');

        //create a loop that will iterate all the check-inputs and create an if statement to validate if the current category element was selected (.checked) and equalize carrent checked-input value to category selected.  
        for(var i=0; categoryElements[i]; ++i){
            if(categoryElements[i].checked){
                category = categoryElements[i].value;
                break
            }else{
                category = "No ocassion"
                break
            }
        }

    // fetch textarea input value and dcclare variabale
    var textarea = document.getElementById('moreInfoTable');
    var infoTable = textarea.value;
    const typeList = [romantic, birthday, meeting, gathering];


    // HIDE AND DISPLAY ANOTHER VIEW 

    // BOOKTABLE ALERT MESSAGE STARTS HERE 
    function bookTable(){
        alert(name + " you booked a table for " + sits +" at " + hours + "\nDate:  " + date +  "\n Ocassion: " + category + "\nAdditional Requests: " + infoTable ); 
    }





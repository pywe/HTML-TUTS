//setting the first slide
let currentSlide = 0;
//selecting the slides
let slide = document.querySelectorAll('.slide');
//selecting the slide indicator
let currentInd = document.querySelectorAll('.ind');
//selecting the buttons
let prev = document.querySelector('#prevBtn');
let next = document.querySelector('#nextBtn');


//displaying the current slide
showSlide(currentSlide);

//function to display current slide of the form
function showSlide(x){
    //setting the index to be displayed
    slide[x].style.display = 'block';
    /*displaying the buttons, but previous button 
    should not be displayed on first slide and next 
    button should not be displayed on last input slide*/
    if(x == 0){
        prev.style.display = 'none';
    }else if(x == (slide.length-2)){
        prev.style.dislpay = 'inline-block';
        next.innerHTML = 'Submit';
    }else if(x == (slide.length-1)){
        prev.style.display = 'none';
        next.innerHTML = 'Goodbye';
    }else{
        prev.style.display = 'inline-block';
        next.innerHTML = 'Next';
    }
    
    //then to display the slide indicator
    indicatorDisp(x);
}

//function to control button behaviors
function slideMove(x){
    //Exit function in case of invalidity
    if(x == 1 && !validity()){
        return false;
    }
    //hide current slide display
    slide[currentSlide].style.display = 'none';
    //to display previous or next slide
    currentSlide += x;
    //submit the form if at the end of the form
    if(currentSlide == slide.length){
        document.querySelector('#progForm').submit();
        return false;
    }
    //else display correct slide
    showSlide(currentSlide);
}

//function to check validity of input
function validity(){
    //
    let inpField, valid = true;
    inpField = slide[currentSlide].querySelectorAll('input');
    /*return false when the input field remains empty 
    and change input field class name to invalid*/
    for(let i = 0; i < inpField.length; i++){
        if(inpField[i].value == ''){
            inpField[i].className += ' invalid';
            valid = false;
        }
    }
    //change slide indicator name to finish when answer is valid
    if(valid){
        currentInd[currentSlide].className += ' finish';
    }
    return valid;
}

//function to change slide indicator
function indicatorDisp(x){
    //removes the active class name from the current slide indicator
    for(let i = 0; i < currentInd.length; i++){
        currentInd[i].className = currentInd[i].className.replace(' active', '');
    }
    //setting the current slide indicator to active
    currentInd[x].className += ' active';
}

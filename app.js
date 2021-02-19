// VARIABLES
let a ,b ;
let number ;
let result;
let operator = '';
let Firstvalue = '';
let Secondvalue = '';

// QuerySelectors
let buttons = document.querySelectorAll(".cBox");
let displayNumber = document.querySelector(".display");


// Event Listeners
Array.from(buttons).forEach(button => {
    button.addEventListener('click', displayValue)
})


// Basic Math Functions
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0){
        alert("There is no such thing as a division by 0")
        return 0;
    }
    else {
        return a/b;
    }
}

function operate(FirstNumber,operator,SecondNumber){
    
    // Decimal numbers
    decimalNumFirst = FirstNumber.toString().substring(FirstNumber.indexOf('.') + 1);
    decimalNumSecond = SecondNumber.toString().substring(SecondNumber.indexOf('.')+ 1);

    // Shorten user input decimal number if it's greater than 3
    if( (decimalNumFirst.length >= 3  || decimalNumSecond >= 3 ) &&
       ( FirstNumber.includes('.') || SecondNumber.includes('.') )){
        FirstNumber = FirstNumber.substring(0,FirstNumber.indexOf('.') + 4);
        SecondNumber = SecondNumber.toString().substring(0,SecondNumber.indexOf('.')+ 4);
    }

    if(operator== "+"){
         result = add(parseFloat(FirstNumber),parseFloat(SecondNumber));
        displayNumber.innerHTML = result
    }
    else if(operator == "-"){
        result = subtract(parseFloat(FirstNumber),parseFloat(SecondNumber));
        displayNumber.innerHTML = result;  
    }
    else if(operator == "*"){
        result = multiply(parseFloat(FirstNumber),parseFloat(SecondNumber));
        displayNumber.innerHTML = result;  
    }

    else if(operator == "/"){
        result = divide(parseFloat(FirstNumber),parseFloat(SecondNumber));
        displayNumber.innerHTML =  result;
    }
 
}
function displayValue(e){

    let clickedButton = e.target.innerHTML;

    //Clearing any existing data
    if(clickedButton == "AC"){
        clear();
    }

    // Undo 
    else if(clickedButton == "Del") {
       deleteLastNumber();
   }

    else if(clickedButton == "="){
        displayResult();
    }
    // Operator 
    else if (clickedButton == "+" || clickedButton == "-" || clickedButton == "/"  || clickedButton == "*")
    {
        // Saving new operator
        if (operator == '')
        {
            operator += clickedButton;
            
        }

        // Save first value and operator. Display outcome if both numbers are entered 
        // use as the first number in the new calculation
        else 
        {   
            if(Firstvalue != '' && Secondvalue != '')
            {
                operate(Firstvalue,operator,Secondvalue);
            }
            operator = clickedButton;
            Firstvalue = result.toString();
            Secondvalue = '';
        }
    }
    // Numbers
    else{

        if(operator == '') 
        {
            addFirstValue(clickedButton);
        }
        else 
        {   
            addSecondValue(clickedButton);
        }
    }
}
   

 
function clear(){
    displayNumber.innerHTML = '';
    Firstvalue = '';
    Secondvalue = '';
    operator = '';
}

function deleteLastNumber(){
    let del = displayNumber.innerHTML;
    del = del.slice(0,-1);
    displayNumber.innerHTML = del;

    // Delete First Value
    if(Firstvalue != '' && Secondvalue == '')
    {
        Firstvalue = Firstvalue.toString().slice(0,-1);
    }
    // Delete Second Value
    else if(Firstvalue != '' && Secondvalue != '')
    {
        Secondvalue = Secondvalue.slice(0,-1);
    }
}

function displayResult(){
    
    //Displaying outcome
    if(Firstvalue != '' && Secondvalue != ''){
        operate(Firstvalue,operator,Secondvalue);
    }
    // Wipe out any existing data 
    Firstvalue = '';
    Secondvalue = '';
    operator = '';
}

function addFirstValue(clickedButton){
    // Clear display area if there is a number in display box
    if(Firstvalue == ''){
        displayNumber.innerHTML = '';
    }
    // Disable the decimal button if there’s already one in the display
    if(clickedButton == '.' && Firstvalue.includes('.'))
    {
        return;
    }
    // Prevents displaying "0" more than one
    if(clickedButton == 0 && Firstvalue == '' ){
        displayNumber.innerHTML = clickedButton;
        Firstvalue += clickedButton;
        return;
    }

    displayNumber.innerHTML += clickedButton;
    Firstvalue += clickedButton;
}

function addSecondValue(clickedButton){
    // Clear display area if there is a number in display box
    if(Secondvalue == ''){
        displayNumber.innerHTML = '';
    }
    // Disable the decimal button if there’s already one in the display
    if(clickedButton == '.' && Secondvalue.includes('.')){
        return;
    }
    // Prevents displaying "0" more than one
    if(clickedButton == 0 && Secondvalue == '' ){
        displayNumber.innerHTML = clickedButton  ;
        Secondvalue += clickedButton;
        return;
    }
    displayNumber.innerHTML += clickedButton;
    Secondvalue += clickedButton;
}
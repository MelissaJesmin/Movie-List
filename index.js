// Users should be able to type in a movie title and click ‘add’ to add a movie onto the list.
//  Clicking on the movie’s title should cross it off. 
//  Clicking the ‘x’ button next to the title should remove the movie from the list. 
//  We’ll also be making a dynamic notification.

//Add button click to enter to list
//take what user types in form

//set elements from html

console.log("Hello World")

//select the HTML element with the message id using querySelector. Save it to a variable called message. 
const message = document.querySelector("#message");

//create callback function
function addMovie(event) {
    //button is inside a form element, it has a default action that is also running and interfering with our code. To fix this, at the beginning of the addMovie function, add event.preventDefault()
    event.preventDefault();

    //get and set the value of our input field in the function, so get the input
    const inputField = document.querySelector('input');

    //make the HTML for our movie list items
    // the parent element of our movie’s title and the movie’s delete button
    const movie = document.createElement('li');

    //The <span> tag is an inline container used to mark up a part of a text, or a part of a document.
    // The <span> tag is much like the <div> element, but <div> is a block-level element and <span> is an inline element.
    const movieTitle = document.createElement('span');
    //write what the user typed out into our new span
    //.value to get the value from inputfield
    movieTitle.textContent = inputField.value;

    //use addEventListener to listen for a click event on the span and run the crossOffMovie function.
    movieTitle.addEventListener("click", crossOffMovie);

    //passing in movieTitle to attach the title to its parent list
    movie.appendChild(movieTitle)
    
    //add a delete button to each movie list item and create an event listener for it.
    deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click",deleteMovie);
    
    // use the appendChild method to add deleteBtn onto the movie element.
    movie.appendChild(deleteBtn);

    //attach the movie element we created to the list in html ul element
    const ulList = document.querySelector("ul");
    ulList.appendChild(movie);

    //remove the value from the input box after its been entered
    inputField.value = '';
}

function deleteMovie(event) {
    //When we click the button, we want to remove the entire list item. Since the button is a child of the list item, we can use event.target.parentNode.remove() to remove the entire list item.
    //JavaScript knows what the target of this event is (the specific delete button that’s clicked) and will only get rid of that one button’s parent (the movie list item that holds the title and button).
    event.target.parentNode.remove();
    message.textContent = event.target.parentNode.firstChild.textContent +" deleted!";
    //textContent = `${event.target.parentNode.firstChild.textContent} deleted!`
    revealMessage();
}

// we will need to add this as an event handler for every movie title span.
function crossOffMovie(event) {
    event.target.classList.toggle("checked");
    //the movie was just checked off as ‘watched’ or if it was added back to the list. 
    
    //contains is a built-in method that can be used on classList, the structure for doing so is event.target.classList.contains(‘some-class-name’)
    if(event.target.classList.contains("checked") === true) {
        message.textContent = event.target.textContent + " watched!";
        //message.textContent = `${event.target.textContent} watched!`
    }
    else {
        message.textContent = event.target.textContent + " added back!";
    }
    revealMessage();
}


//The callback function should add the hide class to message, you can see what the hide class does in the CSS file - We want the callback function to run 1 second after setTimeout is invoked, so for the second argument, pass in the number 1000
function revealMessage() {
    // remove the hide class from message – this will ensure that the message isn’t hidden when the function is first called. If not, the message will only show the first time
    message.classList.remove("hide");

    //takes in a callback function
    //adding the class hide to message
    //Using classList is a convenient alternative to accessing an element's list of classes
    //Although the classList property itself is read-only, you can modify its associated DOMTokenList using the add(), remove(), replace(), and toggle() methods.
    setTimeout( () => {message.classList.add("hide")}
    ,1000);
}





//addEventListener to listen for a submit event on the form element
//form has the add button
document.querySelector("form").addEventListener('submit', addMovie)

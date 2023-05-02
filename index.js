/**
 * Contains logic for each button using event listeners, dynamically adds and removes elements from DOM.
 * Uses AJAX to retrieve information from server for use and manipulation. 
 * Date: 04/04/2023
 * @author Armand Amores 000315902
 * 
 */

//grab button elements
let first = document.querySelector("#first");
let second = document.querySelector("#second");

//grab radio button elements
let secondRadioButtons = document.getElementsByName("choice");

//save link to url
const url = "https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php";

//checks to see what radio button is chosen and saved to chosenValue, later used in url concatenation   
var chosenValue;
//grab containers for copyright description
var copyright = document.querySelector("#copyright")
var copyright2 = document.querySelector("#copyright2")

//grab element that will contain pictures 
let pictureContainer = document.querySelector("#secondChoice");
//grab element that will contain table
let container = document.querySelector("#tableContainer");


/**
 * checks to see what radio button is pressed, sets chosen value... also provides blank slate if input values are changed.
 */
function handleClick(){
    console.log("button clicked"); //debug

    //[0] mario, [1] starwars... to ensure the correct corresponding content is displayed
    // when a button is pressed, it will check to see if any of these elements have a child and will remove it that way a mario 
    //content will not be displayed with a star wars content... sorry this part does not look nice, wish I had time to refactor
    if (secondRadioButtons[0].checked) {
        //set chosen value
        chosenValue = secondRadioButtons[0].value;
        //remove the children in the picture container
        while (pictureContainer.firstChild) {
            pictureContainer.removeChild(pictureContainer.firstChild);
          }
        //remove the copyright from under the table if there is one
        if(copyright2.firstChild){
        copyright2.removeChild(copyright2.firstChild);
        }
        //remove the copyright under the images if there is one
        if(copyright.firstChild){
            copyright.removeChild(copyright.firstChild);
        }
        //remove the table if there is one
        if(container.firstChild){
            container.removeChild(container.firstChild);
        }
        //same logic as above but, if star wars selected
    } else if(secondRadioButtons[1].checked){
        chosenValue = secondRadioButtons[1].value;
        while (pictureContainer.firstChild) {
            pictureContainer.removeChild(pictureContainer.firstChild);
          }
        if(copyright2.firstChild){
            copyright2.removeChild(copyright2.firstChild);
        }
        if(copyright.firstChild){
            copyright.removeChild(copyright.firstChild);
        }
        if(container.firstChild){
            container.removeChild(container.firstChild);
        }

    } else {
        console.log("null... select choice."); // if nothing chosen
    }

    console.log("chosen value: " + chosenValue); // debug

}

//adding event listeners to buttons and assigning handleclick function.
secondRadioButtons[0].addEventListener("click", handleClick);
secondRadioButtons[1].addEventListener("click", handleClick);




//event listener for first button, gets responder text from url and displays message in 
//header
first.addEventListener("click", () => {
    console.log("click working"); //debug
    //grab span element, h1 to be inserted 
    let firstSpan = document.querySelector("#firstSpan");
    //check to see if there is a div, is so delete... so that multiple
    //divs are not created
    while (firstSpan.firstChild) {
        firstSpan.removeChild(firstSpan.firstChild);
    }

    /**
     * Takes text information from fetch method, creates div and inserts infromation
     * inside.
     * @param {text} text 
     */
    function success(text){
        //grab div element
        let div = document.createElement("div");
        //including details and styles
        div.innerHTML = "<h1>Learning Asynchronous Javascript and Xml - Armand Amores ID: 000315902</h1>";
        div.style.borderBottom = "2px solid black";
        div.style.textAlign = "center";
        //append div to span 
        firstSpan.appendChild(div);

        console.log(text);//ensure responder text work

    }
    console.log(url); //debug

        //ajax request with no parameters
        fetch(url, {credentials: 'include'})
            .then(response => response.text())
            .then(success)

})

//Event listener for second button
second.addEventListener("click", () => {
    
    console.log("connected");//debug

    
    //check to see if there is any divs within the container and delete them
    //to provide new set of images when button is pressesd
    while (pictureContainer.firstChild) {
      pictureContainer.removeChild(pictureContainer.firstChild);
    }
    
    /**
     * Recieves array from ajax request containing an array. For each item created
     * a div, img, name, and series are created. Inside array are keys with values and values
     * are attached to correspending elements and then styled.
     * @param {a} a 
     */
    function success(a) {
        console.log(a); // debug
        console.log(a[0].name); // testing keys
        for (let i = 0; i < a.length; i++) {
        
          //creating the elements needed to insert into dom
          let div = document.createElement("div");
          let img= document.createElement("img");
          let name = document.createElement("p");
          let series = document.createElement("h2");
            
          //providing values for each element
          div.classList.add("col")
          series.innerText = a[i].series;
          img.src = a[i].url;
          name.innerText = a[i].name;

          //styles
          name.style.border = "1px solid black";
          name.style.marginTop = "2px";
          name.style.textAlign = "center";
          series.style.borderBottom = "1px solid black";
          series.style.display = "block";
          series.style.textAlign = "center";
          img.style.width = "300px";
          img.style.height = "300px";
          img.style.display = "block";
          img.style.margin = "auto";
          div.style.border = "1px solid black";
          
          //adding elements within div
          div.appendChild(series);
          div.appendChild(img);
          div.appendChild(name);

          //appending the elements with their new values inside of the div
          pictureContainer.appendChild(div);

        }
    }

    //checks which radio button is pressed, [0] mario, [1] starwars and provides copyright 
    if (secondRadioButtons[0].checked) {
        copyright.innerHTML = "<i>Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo.© 2019 Nintendo.</i>";
    } else if(secondRadioButtons[1].checked){
        copyright.innerHTML = "<i>Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.</i>"
    } else {
        console.log("null... select choice."); // if nothing chosen
    }
    //style
    copyright.style.textAlign = "center"; // center copyright img


    console.log(secondRadioButtons); // show input values
    console.log(chosenValue) // debug

    //Using template string to embed variables inside string literals
    let secondUrl = `${url}?choice=${chosenValue}`;
    console.log(secondUrl); // debug

    //ajax request with response to JSON string
    fetch(secondUrl, {credentials: 'include'})
        .then(response => response.json())
        .then(success)


})

//event for third button, uses ajax request with post method and extracts information to table
third.addEventListener("click", () => {
    console.log("test connected");
    //clears table whenever button is pressed
    if(container.firstChild){
        container.removeChild(container.firstChild);
    }

    //provides copyright under the table 
    if (secondRadioButtons[0].checked) {
        copyright2.innerHTML = "<i>Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo.© 2019 Nintendo.</i>";
    } else if (secondRadioButtons[1].checked) {
        copyright2.innerHTML = "<i>Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.</i>"
    } else {
        console.log("null, please enter value")
    }
    //style
    copyright2.style.textAlign = "center";

    /**
     * takes information from ajax post request and includes them in table 
     * @param {a} a 
     */
    function success(a){

        console.log(a); // debug
        //create table element, add boostrap table class
        let table = document.createElement("table");
        table.classList.add("table");
        //create first row of table, creating elements neccessary 
        let headerRow= document.createElement("tr");
        let seriesTitle = document.createElement("th");
        let nameTitle = document.createElement("th");
        let linkTitle = document.createElement("th");
        //assigning elements values from ajax request 
        seriesTitle.innerText = "Series";
        nameTitle.innerText = "Name";
        linkTitle.innerText = "Link";
        //table styles
        table.style.border = "3px solid black";
        container.style.marginTop = "50px";
        headerRow.style.border = "3px solid black";
        headerRow.style.backgroundColor = "red";
        headerRow.style.color = "white";
        seriesTitle.style.border = "3px solid black";
        seriesTitle.style.textAlign = "center"
        nameTitle.style.border = "3px solid black";
        nameTitle.style.textAlign = "center";
        linkTitle.style.border = "3px solid black";
        linkTitle.style.textAlign = "center";
        //appending children to first row 
        headerRow.appendChild(seriesTitle);
        headerRow.appendChild(nameTitle);
        headerRow.appendChild(linkTitle);
        //taking row and adding to table
        table.appendChild(headerRow);
        //taking table and adding to the container that holds the table
        container.appendChild(table);
        //loop through array provided by ajax post request... for each object it will create a row and td elements 
        for(let i = 0; i < a.length; i++) {
            //creating row elements for each object and td elements for objects key values
            let row = document.createElement("tr");
            let series = document.createElement("td");
            let name = document.createElement("td");
            let linkCell = document.createElement("td"); // container for link
            let link = document.createElement("a"); // to make hyperlink, added to linkCell
            //giving created elements values from array key values
            series.innerText = a[i].series;
            name.innerText = a[i].name;
            link.innerText = a[i].url;
            link.href = a[i].url;
            //styles
            row.style.border = "3px solid black";
            series.style.border = "3px solid black";
            series.style.textAlign = "center";
            name.style.textAlign = "center";
            linkCell.style.textAlign = "center";
            linkCell.style.border = "3px solid black";
            //appending children to row
            linkCell.appendChild(link);
            row.appendChild(series);
            row.appendChild(name);
            row.appendChild(linkCell);
            //adding each row to table
            table.appendChild(row);

        }
    
    }

    //parameters for post method.. takes value of radiobutton from chosenValue
    params = "choice=" + chosenValue;

    //ajax request using post method
    fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params
            })
            .then(response => response.json())
            .then(success)




})


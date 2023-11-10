var mymeals = JSON.parse(localStorage.getItem("selectedMeal")) || [];
displaytable()
const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')


function buttonSubmit(){
    
    var query = document.getElementById("meal").value
    //to fetch api
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((response) => response.json())
    .then ((data) => {
        console.log(data)

        const meal = data.meals[0];

        document.getElementById("area").innerHTML = `Recipe from : ${meal.strArea}`;
        document.getElementById("video").innerHTML = `Video: ${meal.strYoutube} <br> Recipe: ${meal.strSource}`;
        document.getElementById("instructions").innerHTML = `Instructions: ${meal.strInstructions}`;
        
        var ingredientsHTML = "Ingredients:<ul>";
            for (var i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && measure) {
                    ingredientsHTML += `<li>${measure} ${ingredient}</li>`;
                }
            }
            ingredientsHTML += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsHTML;

            // Display Instructions
            document.getElementById("instructions").innerHTML = `Instructions : ${meal.strInstructions}`;
        });
        
        const button = document.createElement("button");
        button.textContent = "Add to Meal Planner";
        button.id = "myButton";
        
        document.body.appendChild(button);
        
        function handleButtonClick() {
            var query = document.getElementById("meal").value
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then((response) => response.json())
            .then ((data) => {
                const mealName = data.meals[0].strMeal;
                mymeals.push(mealName)
                console.log(mealName)
                // Store the selected meal in local storage
                localStorage.setItem('selectedMeal', JSON.stringify(mymeals));
                
                });                    
            
            alert("New meal has been added");
            window.location.href = "table.html";
          }
          button.addEventListener("click", handleButtonClick);
        };

        var btnDelete = document.getElementById('btnDelete')
        var btnUpdate = document.getElementById('btnUpdate')
        var fileName = document.getElementById('fileName')
        var fileContents = document.getElementById('fileContents')

//file yg akan link dgn folder
let pathName = path.join(__dirname, 'Files')




function displaytable() {
    for(var a=0; a<mymeals.length; a++) {
        console.log(`${mymeals[a]}`)
        var newtable = document.createElement("table")
        newtable.innerHTML = `<tr><td id="mealName">${mymeals[a]}</td>`
        document.getElementById("h").appendChild(newtable)
    }
}

btnUpdate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err){
          
        if(err){
              return console.log(err);
        }
        console.log("Meal planner updated")
        alert("Meal planner was updated")
        })
})


btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)
    fs.unlink(file, function(err){
        
        if(err){
            return console.log(err)
        }
        fileName.value = ""
        fileContents.value = ""
        console.log("Meal planner was deleted")
        })
      })
          
    
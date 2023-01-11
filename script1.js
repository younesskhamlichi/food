
let dataList = [];

const pageSize = 6;
let curPage = 1;
                                                // recherche //
let resp = []; 
let searchBtn = document.getElementById("searchBtn");
//event listeners
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let value = document.getElementById("searchInput").value
    
async function getMealList() {
        let resMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + value);
        let data = await resMeal.json();
        resp = data.meals;
        // console.log(resp);
        renderTable();

        document.querySelector('#nextButton').addEventListener('click', nextPage, false);
        document.querySelector('#prevButton').addEventListener('click', previousPage, false);

       
    }
    getMealList();
})

function renderTable() {
  // create html
  document.querySelector("#data").innerHTML = ""; 
  // let result = '';
  resp.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end = curPage*pageSize;
        if(index >= start && index < end)
         return true;
  }).forEach(c => {
    document.querySelector("#data").innerHTML +=
    `<div class="col">
      <div class="card">
        <img src="${c.strMealThumb}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${c.strMeal}</h5>
          <button type="button" class="btn btn-info" onclick="getModal(${c.idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
              Info
          </button>
        </div>
      </div>
    </div>`;
  });
  document.getElementById("searchInput").value = '';
}

function previousPage() {
  if(curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if((curPage * pageSize) < resp.length) curPage++;
  renderTable();
}



async function getData() {
for(let i = 0; i < 6; i++) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    dataList = data.meals[0];
    // console.log(dataList);
    document.querySelector("#data").innerHTML += `<div class="col">
    <div class="card">
      <img src="${dataList.strMealThumb}" class="card-img-top" alt="image">
      <div class="card-body">
        <h5 class="card-title">${dataList.strMeal}</h5>
        <button type="button" class="btn btn-info" onclick="getModal(${dataList.idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
        Get recipes
        </button>
      </div>
    </div>
  </div>`
}

}
getData();

async function getModal(id) {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  const data = await response.json();
  let show = document.querySelector("#Modal");
  show.innerHTML = `<ul>
  <li>${data.meals[0].strMeal}</li>
  <li>Category : ${data.meals[0].strCategory}</li>
  <li>Area : ${data.meals[0].strArea}</h6>
  <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="image">
  <li>${data.meals[0].strInstructions}</li>
  <ul><li>${data.meals[0].strIngredient1}</li><li>${data.meals[0].strIngredient2}</li><li>${data.meals[0].strIngredient3}</li><li>${data.meals[0].strIngredient4}</li><li>${data.meals[0].strIngredient5}</li>
  </ul>
  </ul>`;
}
  
  
    



  
  

















// const searchBtn = document.getElementById('search-btn');
// const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// // event listeners
// searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });


// // get meal list that matches with the ingredients
// function getMealList(){
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//     .then(response => response.json())
//     .then(data => {
//         let html = "";
//         if(data.meals){
//             data.meals.forEach(meal => {
//                 html += `
//                     <div class = "meal-item" data-id = "${meal.idMeal}">
//                         <div class = "meal-img">
//                             <img src = "${meal.strMealThumb}" alt = "food">
//                         </div>
//                         <div class = "meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href = "#" class = "recipe-btn">Get Recipe</a>
//                         </div>
//                     </div>
//                 `;
//             });
//             mealList.classList.remove('notFound');
//         } else{
//             html = "Sorry, we didn't find any meal!";
//             mealList.classList.add('notFound');
//         }

//         mealList.innerHTML = html;
//     });
// }


// // get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem = e.target.parentElement.parentElement;
//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.meals));
//     }
// }

// // create a modal
// function mealRecipeModal(meal){
//     console.log(meal);
//     meal = meal[0];
//     let html = `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');








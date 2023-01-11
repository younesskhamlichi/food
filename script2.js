let dataList = [];
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
      // dataList = data.meals[0];
  
      let show = document.querySelector("#Modal");
      show.innerHTML = `<ul>
      <li>${data.meals[0].strMeal}</li>
      <li>Category : ${data.meals[0].strCategory}</li>
      <li>Area : ${data.meals[0].strArea}</h6>
      <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="image">
      <li>${data.meals[0].strInstructions}</li>
      </ul>
      </ul>`;
}
async function getSelect() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const data = await response.json();
       
    for(let i = 0; i < data.meals.length; i++) {
        document.querySelector("#select").innerHTML += `<option value="1">${data.meals[i].strCategory}</option>`;
    }
}
getSelect();

async function getRegion() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const data = await response.json();
       
    for(let i = 0; i < data.meals.length; i++) {
        document.querySelector("#region").innerHTML += `<option value="1">${data.meals[i].strArea}</option>`;
    }
}
getRegion();
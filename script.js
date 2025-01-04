document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("searchInput").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = "";
        if (data.meals) {
          const row = document.createElement("div"); // Define the row
          row.className = "row";
          data.meals.forEach((meal) => {
            const col = document.createElement("div");
            col.className = "col-md-3 mb-3";
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem";
            card.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
            </div>
        `;

            card.addEventListener("click", function () {
              fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              )
                .then((response) => response.json())
                .then((detailData) => {
                  const detailContainer =
                    document.getElementById("detail-container");
                  detailContainer.innerHTML = `
                                   <div class="card" style="width: 18rem;">
  <img src="${detailData.meals[0].strMealThumb}" class="card-img-top" alt="${detailData.meals[0].strMeal}">
  <div class="card-body">
    <h5 class="card-title">${detailData.meals[0].strMeal}</h5>
    <p class="card-text">${detailData.meals[0].strIngredient1}</p>
    <p class="card-text">${detailData.meals[0].strIngredient2}</p>
    <p class="card-text">${detailData.meals[0].strIngredient3}</p>
  </div>
</div>
                                `;
                })
                .catch((error) =>
                  console.error("Error fetching detail data:", error)
                );
            });

            col.appendChild(card);
            row.appendChild(col);
          });
          resultContainer.appendChild(row);
        } else {
          resultContainer.innerHTML = `<h2>No results found for "${query}"</h2>`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

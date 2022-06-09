const searchbar = document.querySelector("#searchbar");
const url = "https://fidilio.com/api/search";
const advancedSearchUrl = "https://fidilio.com/api/map/GetSearchData";
let card = "";

function loading() {
  document.querySelector(
    ".filter-card"
  ).innerHTML = `<div class="d-flex justify-content-center align-content-center align-items-center m-auto">
<div class="spinner-border text-danger m-auto p-4" role="status"></div>
</div>`;
}

function createCard(restaurant) {
  console.log(restaurant);
  card += `
  <div class="col">
  <div class="card my-2 h-100 shadow-lg full-rounded">
  <div class="position-relative">
  <img class="filter-card-img" onerror="this.onerror=null; this.src='/../../img/detail_gallery/unnamed.png'"
     src="${restaurant.image}">
     <span class="shadow-rating p-1 fs-11 rounded text-white position-absolute rating-filter-card ${
       restaurant.rating < 5 ? "bg-danger" 
       : restaurant.rating < 6.9 ? "bg-warning"
       : "bg-success"
     }">${restaurant.rating === 0 ? "بدون امتیاز " : restaurant.rating.toFixed(1)}</span>
  </div> 
  <div class="card-body d-flex flex-column">
    <h5 class="card-title  text-truncate">${restaurant.name}</h5>
    <p class="card-text py-2 text-start fs-11 text-secondary text-truncate">${
      restaurant.address
    }</p>
    
    <p class="fs-9 text-warning">دسته بندی</p>
  
  </div>
  </div>
  </div>
      `;

  return card;
}
searchbar.addEventListener("keyup", (e) => {
  document.querySelector(".icon_search").classList.add("close-btn-search");
  let searchText = e.target.value;
  console.log(searchText);
  if (searchText.length == 0) {
    document.querySelector(".filter-card").innerHTML = "";
    document.querySelector(".icon_search").classList.remove("close-btn-search");
  } else {
    loading();
    getSearch(searchText);
  }
});

$(".priceClass").click(function () {
  let self = $(this);
  let postBody = {};
  postBody.priceClass = self.val();
  postBody.PageNumber = 0;
  postBody.PageSize = 20;
  postBody.Radius = 150000;
  loading();
  postFilter(postBody);
});

$(".situation").click(function () {
  let self = $(this);
  let postBody = {};
  postBody.situations  = self.val();
  postBody.PageNumber = 0;
  postBody.PageSize = 20;
  postBody.Radius = 150000;
  loading();
  postFilter(postBody);
});

$(".facility-filter").click(function () {
  let self = $(this);
  let postBody = {};
  let val = self.val();
  let facilities = [];
  postBody.PageNumber = 0;
  postBody.PageSize = 20;
  postBody.Radius = 150000;
  postBody.Facilities = [];
  if (val != null || val != "") {
    postBody.Facilities = self.val();
    facilities.push(val);
    postBody.Facilities = facilities;
  }
  loading();
  postFilter(postBody);
});







async function getSearch(query) {
  const restaurants = await this.api(url, query, "get");
  let result = restaurants.data.results;
  card = "";
  result.filter((restaurant) => {
    card = createCard(restaurant);
  });

  document.querySelector(".filter-card").innerHTML = card;
}

async function postFilter(data) {
  const restaurants = await this.postApi(advancedSearchUrl, data);
  let result = restaurants.data.results;

  card = "";
  result.filter((restaurant) => {
    card = createCard(restaurant);
  });

  document.querySelector(".filter-card").innerHTML = card;
}

function closeCard() {
  document.querySelector(".filter-card").innerHTML = "";
  document.querySelector(".icon_search").classList.remove("close-btn-search");
  searchbar.value = "";
}

function concatPriceClass(priceClass) {
  let priceClassText = "";
  for (let index = 0; index < priceClass; index++) {
    priceClassText += '<i class="fa-solid fa-dollar-sign pt-2 text-dark"></i>';
  }
  return priceClassText;
}

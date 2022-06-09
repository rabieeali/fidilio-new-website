const searchbar = document.querySelector("#searchbar");
const url = "https://fidilio.com/api/search";
let card = "";

searchbar.addEventListener("keyup", (e) => {
  document.querySelector(".icon_search").classList.add("close-btn-search");
  let searchText = e.target.value;
  if (searchText.length == 0) {
    document.querySelector(".loading").innerHTML = "";
    document.querySelector("#searchOutput").innerHTML = "";
    document.querySelector(".icon_search").classList.remove("close-btn-search");
  } else {
    document.querySelector(".loading").innerHTML = `
    <div class="spinner-border p-3 text-danger" role="status"></div>
    `;
    getData(searchText);
  }
});

async function getData(query) {
  const restaurants = await this.api(url, query, "get");
  let result = restaurants.data.results;
  card = "";
  result.slice(0, 6).filter((restaurant) => {
    card += `
    <div class="card costum-height shadow rounded-3">
  <div class="row d-flex align-items-baseline">
    <div class="col-3">
    <img class="img-fluid card-img-top-costum w-100 h-100 shadow-lg"
    onerror="this.onerror=null;this.src='/img/detail_gallery/unnamed.png'"
    src="${restaurant.image}">
    </div>
    <div class="col-7">
      <div class="card-body d-flex flex-column">
       <div class="row">
       <h5 class="col card-title fs-16 text-start text-truncate">${
         restaurant.name
       }</h5>
       <p class="col fs-10 text-warning">دسته بندی</p>
       </div>
        <p class="card-text text-start fs-12 text-secondary text-truncate">${
          restaurant.address
        }</p>
      </div>
    </div>
    <div class="col-2">
    <a href="" class="col text-purple"><i class="fa-solid fa-location-dot"></i>
    </a>
    <p class="fs-12"> ${concatPriceClass(restaurant.priceClass)}</p>
    </div>
  </div>
</div>
        `;
  });

  document.querySelector("#searchOutput").innerHTML = card;
  document.querySelector(".loading").innerHTML = "";
}

function closeCard() {
  document.querySelector("#searchOutput").innerHTML = "";
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

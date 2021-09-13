const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><small class='rating'><span class='star'>&#9733; &#9733; &#9733;	&#9733; &#9734;</span> ${product.rating.count} Ratings | Avarage: ${product.rating.rate}</small></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick = 'viewDetails(${product.id})' class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//view details
const viewDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => addDetails(data))
}
const addDetails = (product) => {
  let div1 = document.createElement('div');
  div1.classList.add('details-wrapper')
  div1.innerHTML = `
  <img class="product-details-image" src=${product.image}>
  <div>
    <h3>${product.title}</h3>
    <p><small class='rating'><span class='star'>&#9733; &#9733; &#9733;	&#9733; &#9734;</span> ${product.rating.count} Ratings | Avarage: ${product.rating.rate}</small></p>
    <p> Brand: No brand </p>
    <h2 class='mt-5'>Price: $ ${product.price}</h2>
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    <button class="btn btn-primary text-center">Buy Now</button>
  </div>
  `;
  let div2 = document.createElement('div');
  div2.classList.add('details');
  div2.innerHTML = `
  <h3 class='header'>Product details of ${product.title}</h3>
  <p class='details-body'>${product.description}</p>
  `;
  document.getElementById('product-wrapper').textContent = '';
  document.getElementById('root-details').appendChild(div1);
  document.getElementById('root-details').appendChild(div2);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  document.getElementById("total-Products").innerText = count;
  updateTaxAndCharge();
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  setInnerText("delivery-charge", 20);
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

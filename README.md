# Javascript Events Shopping List

```js
let productsList = null
class ProductsList {
  constructor(container, products = []) {
    this.container = container;
    this.products = [];
    this.nextProductId = 1;
    products.forEach(this.addProduct.bind(this))
  }

  addProduct(product) {
    product.id = this.nextProductId;
    this.products.push(product);
    this.nextProductId++;
    this.container.appendChild(ProductView.render(product))
    return product
  }

}
```

```js
class ProductView {

  static render(product) {
    let div = document.createElement('div');
    div.dataset.id = product.id;
    div.innerHTML = `
      <h3 class="product text-3xl" data-id="${product.id}">${product.name}</h3>
      <h5>${product.price}</h5>
      <p>${product.description}</p>
    `
    return div;
  }

}
```

```js
function init() {
  let cont = document.querySelector('#productsContainer')
  let products = [
    {
      name: 'Zevia',
      price: 4.99,
      description: 'Awesome soda with no sugar'
    },
    {
      name: 'Beanfields chips',
      price: 4.99,
      description: "Awesome gluten free bean chips"
    }
  ]
  productsList = new ProductsList(cont, products)
}

function attachListeners() {
  document.addEventListener('click', function(e) {
    let target = e.target
    if(target.matches('.product')) {
      console.log(`This product has an id of ${target.dataset.id}`)
    } else if (target.matches('.likeButton')) {
      // have a data attribute for the product id here, use target.dataset.id to access interprets
      // find the product in the ProductsList that has that id, and update its likes property by adding 1 to it
    }
    console.log('clicked somewhere on the document')
  })

  document.addEventListener('submit', function(e) {
    e.preventDefault();
    let target = e.target;
    if(target.matches('#addProduct')) {
      let product = {
        name: e.target.querySelector('#name').value,
        price: e.target.querySelector('#price').value,
        description: e.target.querySelector('#description').value
      }
      productsList.addProduct(product);
    }
  })
}

console.log('A: before the event listener')

window.addEventListener('DOMContentLoaded',function() {
  init();
  console.log('B: DOMContentLoaded')
  attachListeners();
})

console.log('C: after the event listener')
```

You can add icons to your project by including a CDN link to font awesome within the head tag of your HTML
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
```
You can also get up to date links for [Fontawesome on cdnjs.com](https://cdnjs.com/libraries/font-awesome) if you're reading this much later than I'm writing it!

Examples of how you can use this:

```html
<i class="fas fa-heart"></i> <!-- solid heart -->
<i class="far fa-heart"></i> <!-- empty heart -->
```

If you want to use the CSS Grid property for layout, you can use it with tailwindcss.

# Shopping List Applications
Users can add Products to the app (this one is currently done)
they can then add products to their shopping list 
they can check products as in their cart.

We're going to come up with a layers cheatsheet template for JS like the one we have for rails:

## Data (Model)

## Behavior (Controller)

## Display (View)

One thing that's a concern in JS is file structure and organization, so we'll be thinking about that here in this project as well. 
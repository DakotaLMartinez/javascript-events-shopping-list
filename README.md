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
- Users can add Products to the app (this one is currently done)
- they can then add products to their shopping list 
- they can check off products as in their cart. (we're going through the store and adding products to our cart from our list as we go)

We're going to come up with a layers cheatsheet template for JS like the one we have for rails:

## Data (Model)

## Display (View) or How things are displayed in HTML markup initially
## Behavior (Like the Controller - Event Listeners/Handlers) resulting in changes to data and DOM manipulation to update display

## DOM Manipulation when/where are they displayed in the browser window

One thing that's a concern in JS is file structure and organization, so we'll be thinking about that here in this project as well. 

Let's think about our application in terms of CRUD:
## Data
What are our models?
Product
ShoppingListItem

## Display (View) or How things are displayed in HTML markup based on the state of our data
### Templates

### Rendering Logic (how do we take data and render it using templates) 
We'll have 3 columns
The left hand column will show our products that we've added. These are populated from Product.all() displayed by ProductView.render()
The center column will have the products in our ShoppingList. These are populated from ShoppingListItem.all() where inCart == false rendered by ShoppingListItemView
The right hand column will show items in our cart. These are populated from
Center and right columns will contain draggable elements we can move from center to right and back.

## Behavior (tracked by Event Listeners)
What user behaviors do we care about? And, how do those behaviors affect our data?
Feature: Users can add Products to the app (this one is currently done in older version without our CRUD class)
Behavior: User fills in the add product form and submits it.
Data Result: a Product is created and stored in Product.all()
Display Result: we see the Product in #productsContainer

Feature: Users can then add products to their shopping list 
Behavior: User drags a product from the productsList into the ShoppingList
Data Result: a ShoppingListItem matching the product is created.
Display Result: the Product appears in the shoppingListContainer

Feature: they can check off products as in their cart. (we're going through the store and adding products to our cart from our list as we go)
Behavior: User drags a product from their shoppingList to their Cart
Data Result: a ShoppingListItem is updated to have inCart = true
Display Result: the ShoppingListItem is removed from shoppingListContainer and added to CartItemsContainer


## DOM Manipulation


one class that has data behavior and display logic inside of it.
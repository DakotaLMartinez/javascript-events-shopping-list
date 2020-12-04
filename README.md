
# Javascript Events Shopping List

## Resources:

[fontawesome](https://fontawesome.com/)
[tailwindcss](https://tailwindcss.com/components)
[Event Loop talk](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
[json-server](https://github.com/typicode/json-server)

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

# Adding in Fetch with JSON-server

We need to install json-server and

```
npm i -g json-server
```

create a file called `db.json`

```
{
  "products": [
    {
      "id": 1,
      "name": "Zevia",
      "price": 4.99,
      "description": "Awesome soda with no sugar"
    },
    {
      "id": 2,
      "name": "Beanfields chips",
      "price": 3.69,
      "description": "Awesome gluten free bean chips"
    }
  ]
}
```

After we have a db.json file. We can use it to create a RESTful API by running

```
json-server --watch db.json 
```

We can try out connecting to our mock API using fetch like so:

```
fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(data => console.log(data));
```

Transitioning to Async:


```js
  let products = [
    {
      id: 1,
      name: 'Zevia',
      price: 4.99,
      description: 'Awesome soda with no sugar'
    },
    {
      id: 2,
      name: 'Beanfields chips',
      price: 3.69,
      description: "Awesome gluten free bean chips"
    }
  ].map(productAttributes => Product.create(productAttributes))
  products.forEach(product => {
    ProductContainer.addProduct(product)
  })
```

Instead of returning an array, Product.all() will return a promise for an array, that way we can fetch the products (async) and then add them to the DOM after we receive them. If we've fetched products before and already stored them, Product.all() can simply return a resolved promise for the stored array.
```js
  Product.all()
    .then(products => {
      products.forEach(product => {
        ProductContainer.addProduct(product)
      })
    })

    class Product {
      static all() {
        // return this.collection = this.collection || [];
        if(this.collection) {
          return Promise.resolve(this.collection)
        } else {
          return fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then(products => this.collection = products)
        }
      }
    }
    
```

## Assignment for next Tuesday:


* Add the ability to create shopping list items when clicking on the plus button by a product
* Add the ability to delete a shopping list item if you click on the plus button that's already highlighted
* Modify the update method for ShoppingListItem so that if you move it from the list to the cart or vice versa it updates the shopping_list_item on the server before the move is complete.
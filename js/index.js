// the ProductsList class allows us to keep track of a list of products and
// the container on the page that we'll display them in.
// When we create a new instance of this class, we'll attach a particular DOM element to it
// we can also create a list of products and pass that in next.
// The constructor here is analagous to the initialize method in a ruby class.
// The class has a method to allow adding a product to the list
// This method will actually assign an id to the product, add it to the list of products,
// increment the id (for assigning a new id to the next product) and append an element to the container.
// to display the product we just added.

// this is analagous to self in ruby, except for the fact that we can't use it implicitly. (In ruby if we 
// skip self in invoking a method, it interprets what we did as if we did self.name_of_method, in JS if we 
// want to access a property stored inside of this, we have to do this.)
// when we do this.container = container, this is similar to @container = container in initialize.
// in JS we don't need to define a setter and getter to be able to access information in the this object.

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

// The ProductView class has a static method called render (static is analagous to a class method in Ruby)
// When we call the render method and pass in a product object, it will return a div element with some html 
// info about the product inside.

// 
class ProductView {

  static render(product) {
    let div = document.createElement('div');
    div.dataset.id = product.id;
    div.innerHTML = `
      <h3 class="product text-3xl" data-id="${product.id}">${product.name}</h3>
      <h5>${product.price}</h5>
      <p>${product.description}</p>
    `
    // div.addEventListener('click', function(e){
    //   // debugger
    //   e.stopPropagation();
    //   console.log(`clicked on a product with id: ${this.dataset.id}`)
    // })
    return div;
  }
}

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


// What order will we see the logs in?
// 1. A B C
// 2. A C B
// 3. C A B
// 2
// Every event handler is asynchronous - the event handler callbacks won't be triggered until 
// all synchronous code (functions we've already called and code that's still running) has finished running.
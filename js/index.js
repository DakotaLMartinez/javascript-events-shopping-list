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

// let productsList = null
// class ProductsList {
//   constructor(container, products = []) {
//     this.container = container;
//     this.products = [];
//     this.nextProductId = 1;
//     products.forEach(this.addProduct.bind(this))
//   }

//   addProduct(product) {
//     product.id = this.nextProductId;
//     this.products.push(product);
//     this.nextProductId++;
//     this.container.appendChild(ProductView.render(product))
//     return product
//   }

// }

// class ProductContainer {

//   static getContainer() {
//     this.container = this.container || document.querySelector('#productsContainer');
//     return this.container;
//   }
  
//   static addProduct(product) {
//     this.getContainer().appendChild(product.render());

//   }
// }

// class ShoppingListContainer {
//   static getContainers() {
//     this.list = this.list || document.querySelector('#shoppingList');
//     this.cart = this.cart || document.querySelector('#shoppingCart');
//     return {
//       list: this.list,
//       cart: this.cart
//     };
//   }

//   static addItemToList(shoppingListItem) {
//     this.getContainers().list.appendChild(shoppingListItem.render());
//   }

//   static addItemToCart(shoppingListItem) {
//     this.getContainers().cart.appendChild(shoppingListItem.render());
//   }

//   static removeItem(shoppingListItem) {
//     shoppingListItem.element.parentNode.removeChild(shoppingListItem.element);
//   }
// }

console.log('A: before the event listener')


document.addEventListener('DOMContentLoaded',function() {
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
//mdn Node

function init() {
  let promises = [Product.all(), ShoppingListItem.all()]
  Promise.all(promises)
    .then(([products, items]) => {
      products.forEach(product => {
        Product.container().appendChild(product.render())
      })
      items.forEach(item => {
        if(item.in_cart) {
          ShoppingListItem.cart().appendChild(item.render())
        } else {
          ShoppingListItem.list().appendChild(item.render())
        }
      })
    })
}

function attachListeners() {
  document.addEventListener('click', function(e) {
    let target = e.target
    if(target.matches('.addProductToList')) {
      console.log(`This product has an id of ${target.dataset.id}`)
      let product = Product.findById(target.dataset.id);
      let item = null;
      if(product.addedToList()) {
        let item = ShoppingListItem.findBy({product_id: product.id})
        item.destroy()
          // .then(() => product.render())
      } else {
        ShoppingListItem.create({product_id: product.id, in_cart: false})
          // .then(() => product.render())
        
      }
      
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
      // we want to add the product to the DOM only after it's been added to the database via Product.create
      // ProductContainer.addProduct(Product.create(product)) becomes the following =>
      Product.create(product)
        // .then(product => {
        //   ProductContainer.addProduct(product)
        //   Product.container.append(product.render())
        // })
    }
  })
//mdn EventTarget.addEventListener
//mdn element.classList
//mdn EventTarget.dragenter;
/*
We use a dragstart event listener so that we can store a reference to the dragged element.
This is important so that we can interact with the node when it's dropped
*/
  document.addEventListener('dragstart', function(e) {
    let target = e.target;
    if(target.matches('.item')){
      ShoppingListItem.dragged = target;
      console.dir(ShoppingListItem.dragged)
    }
  })
/*
We use the dragenter event listener here in combination with conditional logic to indicate
which target areas are drop areas and if we enter one, we could change the background color of
the element to indicate we've entered a valid dropzone.
The classList attribute returns a DOM token list that allows you to add or remove classes or to toggle 
which will add the class if it's not there and remove the class if it's already there
*/
  document.addEventListener('dragenter', function(e) {
    let target = e.target;
    if (target.matches('#shoppingCart') || target.matches('#shoppingList') || target.matches('.item')) { 
      e.preventDefault();
      e.target.classList.toggle('bg-gray-100')
      // console.log('dragged over', e.target);
    }
  })
/*
the dragleave event fires when we are dragging an element over another element and then we leave 
that element. In this case, we want to remove the gray background if we leave the target dropzone.
*/
  document.addEventListener("dragleave", function(e) {
    let target = e.target;
    if (target.matches('#shoppingCart') || target.matches('#shoppingList') || target.matches('.item')) { 
      e.target.classList.toggle('bg-gray-100')
    }

  })
/*
We prevent default in the dragover listeners only when the target is a valid dropzone so that we
will allow drags to end in this area. (The default is not to allow drags)
*/
  document.addEventListener('dragover', function(e) {
    let target = e.target;
    if (target.matches('#shoppingCart') || target.matches('#shoppingList') || target.matches('.item')) { 
      e.preventDefault();
      // console.dir(e);
    }
  })
/*
We add the drop event listeners to run when the dragged element is dropped. 
The target of this event handler is the element we just dropped into. 
In order to place the dragged element into the target, we need to have stored a reference beforehand
in an accessible place. We did this by storing the element in ShoppingListItem.dragged in this case.
When the element is dropped into a valid dropzone, we want to take it and appendChild to the target. 
Calling appendChild on a node that's already in the DOM has the effect of removing the element from 
its current parent node. (This is actually setting the parentNode to the target, in our case, removing
an element from the column its in to the column we dragged it to)
We also want to remove the gray background we added when we hovered over the dropzone.
*/
  document.addEventListener('drop', function(e){
    let target = e.target;
    console.dir(e);
    if (target.matches('#shoppingCart') || target.matches('#shoppingList') || target.matches('.item')) { 
      e.preventDefault();
      console.log('dropped');
      
      let product = Product.findById(ShoppingListItem.dragged.dataset.productId)
      let item = ShoppingListItem.findBy({product_id: product.id})
      if(target.matches('.item')) {
        if(e.offsetY < 20) {
          target.insertAdjacentElement('beforeBegin',ShoppingListItem.dragged)
        } else {
          target.insertAdjacentElement('afterend',ShoppingListItem.dragged)
        }
      }
      else if(target.matches("#shoppingCart")) {
        console.log('in cart')
        item.update({in_cart: true}) 
          // .then(() => target.appendChild(ShoppingListItem.dragged))
      } else {
        console.log('in list')
        item.update({in_cart: false}) 
          // .then(() => target.appendChild(ShoppingListItem.dragged))
        
      }
      target.classList.toggle('bg-gray-100')
    } 

  })
}
//mdn insertAdjacentElement;



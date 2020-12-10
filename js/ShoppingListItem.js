class ShoppingListItem {

  constructor(attributes) {
    this.id = attributes.id;
    this.product_id = attributes.product_id;
    this.in_cart = attributes.in_cart || false;
  }

  static cart() {
    return this.c ||= document.querySelector('#shoppingCart');
  }

  static list() {
    return this.l ||= document.querySelector('#shoppingList');
  }

  static all() {
    // return this.collection = this.collection || [];
    if(this.collection) {
      return Promise.resolve(this.collection)
    } else {
      return fetch("http://localhost:3000/shopping_list_items")
        .then((response) => response.json())
        .then(items => {
          console.log(items)
          // take the array of items we get from the API and make them into 
          // product instances and store them in this.collection
          return this.collection = items.map(attrs => new ShoppingListItem(attrs))
        })
    }
  }


  static create(attributes) {
    return fetch("http://localhost:3000/shopping_list_items",{
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify(attributes)
    })
      .then(jsonString => jsonString.json())
      .then(itemAttributes => {
        let item = new ShoppingListItem(itemAttributes)
        this.collection.push(item)
        if(item.in_cart) {
          this.cart().appendChild(item.render())
        } else {
          this.list().appendChild(item.render())
        }
        return item
      })
      .then(item => {
        item.product().render()
        return item
      })
  }

  static findBy(attributes) {
    return this.collection.find(model => {
      return Object.keys(attributes).every(attribute => {
        return model[attribute] === attributes[attribute]
      })
    })
  }

  static findById(id) {
    return this.collection.find(model => model.id == id);
  }

  update(attributes) {
    // debugger
    attributes.product_id = this.product_id
    return fetch(`http://localhost:3000/shopping_list_items/${this.id}`, {
      method: 'put', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(attributes)
    })
      .then(jsonString => jsonString.json())
      .then(itemAttributes => {
        Object.keys(itemAttributes).forEach(attr => this[attr] = itemAttributes[attr])
        this.render()
        if(this.in_cart) {
          ShoppingListItem.cart().appendChild(this.element)
        } else {
          ShoppingListItem.list().appendChild(this.element)
        }
        return this;
      })
    
  }

  destroy() {
    // set the all array equal to the filtered array of all objects that aren't this one.
    //this.constructor.collection = this.constructor.all().filter(obj => obj !== this)
    // or we could look for where this object occurs in the array and then splice it out. 
    // approach # 1
    // debugger
    return fetch(`http://localhost:3000/shopping_list_items/${this.id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(() => {
        let index = this.constructor.collection.findIndex(obj => obj == this)
        if(index > -1) {
          this.constructor.collection.splice(index, 1)
        }
        this.element.remove();
        return this
      })
      .then(() => this.product().render())
    
    // approach #2
    // because the find function's callback accepts the index of the element as an 
    // optional second argument, we can call splice from within the callback without
    // having to call findIndex first.
    // return this.constructor.all().find((obj, index) => {
    //   if(obj == this){
    //     this.constructor.all().splice(index, 1);
    //     return true;
    //   }
    // })
  }

  product() {
    return Product.findById(this.product_id)
  }

  render() {
    /*
    Our element should look something like this:
    <div draggable="true" class="item rounded-xl shadow-md my-2 p-5 bg-green-200" data-product-id="1">
      <h3 class="text-xl">Zevia</h3>
      <p>$4.99</p>
    </div>
    We want to build it up incrementally instead of using innerHTML = to prevent XSS attacks 
    if we use innerHTML= and one of our users decides to create a product with a name like this:
    <script>function myNastyJsHere() { // bad stuff();}()</script>
    we could be in trouble!
    Read more here: https://blog.cloudboost.io/why-textcontent-is-better-than-innerhtml-and-innertext-9f8073eb9061
    */
    // <div draggable="true" class="item rounded-xl shadow-md my-2 p-5 bg-green-200" data-product-id="1">
    this.element = this.element || document.createElement('div');
    this.element.draggable = true;
    this.element.classList.add('item', 'rounded-xl', 'shadow-md', 'my-2', 'p-5', 'bg-green-200');
    this.element.dataset.productId = this.product().id;

    // <h3 class="text-xl">Zevia</h3>
    this.header = this.header || document.createElement('h3');
    this.header.classList.add('text-xl');
    this.header.textContent = this.product().name; 
    // <p>$4.99</p>
    this.p = this.p || document.createElement('p');
    this.p.textContent = `$${this.product().price}`;
    /*
      append allows you to add multiple elements at once while appendChild only accepts 
      1 node at a time. Read more here https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append
    */
    //
    let arr = [this.header, this.p]
    this.element.append(...arr) // this is nice because I don't need 2 lines, but not as nice because it adds the header and the p tag every time I call .render()
    // this.element.appendChild(header);
    // this.element.appendChild(p);
    return this.element;
  }
}
//mdn ParentNode.append;

// example of when you would want a regular function vs an arrow function for its this context:
// function Item() {

// }

// Item.prototype.destroy = function() {
//   console.log(this) // will be the item object we called destroy() on.
// }
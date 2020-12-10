class Product {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.price = attributes.price;
    this.description = attributes.description;
  }

  static container() {
    return this.c ||= document.querySelector('#productsContainer')
  }
  //mdn Promise
  // all returns a promise for an array of product instances (this.collection)
  // we have to chain on a then to Product.all() whenever we call it and we won't get the 
  // results instantly
  static all() {
    // return this.collection = this.collection || [];
    if(this.collection) {
      return Promise.resolve(this.collection)
    } else {
      return fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then(products => {
          console.log(products)
          // take the array of products we get from the API and make them into 
          // product instances and store them in this.collection
          return this.collection = products.map(attrs => new Product(attrs))
        })
    }
  }
  // create needs to return a promise for the product we created.
  static create(attributes) {
    // synchronous version
    // let product = new Product(attributes)
    // this.collection.push(product)
    // return product
    // asynchronous version with fetch 
    return fetch("http://localhost:3000/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attributes)
    })
      .then(response => response.json())
      .then(productAttributes => {
        let product = new Product(productAttributes)
        this.collection.push(product)
        return product
      })
      .then(product => {
        this.container().appendChild(product.render())
        return product
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
    Object.keys(attributes).forEach(attr => this[attr] = attributes[attr])
    this.render();
    return this;
  }

  addedToList() {
    return ShoppingListItem.findBy({product_id: this.id});
  }

  render() {
    this.element ||= document.createElement('div');
    
    this.element.dataset.id = this.id;
    this.element.innerHTML = `
      <h3 class="product text-3xl" data-id="${this.id}">${this.name}</h3>
      <h5>${this.price}</h5>
      <p>${this.description}</p>
      <i class="addProductToList text-xl ${this.addedToList() ? 'fa-minus-square fas' : 'fa-plus-square far'}" data-id="${this.id}"></i>
    `
    return this.element;
  }
}
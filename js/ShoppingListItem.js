class ShoppingListItem {

  constructor(attributes) {
    this.product = attributes.product;
    this.inCart = false;
  }

  static all() {
    return this.collection = this.collection || [];
  }

  static create(attributes) {
    let item = new ShoppingListItem(attributes)
    this.all().push(item)
    return item
  }

  static findBy(attributes) {
    return this.all().find(model => {
      return Object.keys(attributes).every(attribute => {
        return model[attribute] === attributes[attribute]
      })
    })
  }

  static findById(id) {
    return this.all().find(model => model.id == id);
  }

  update(attributes) {
    Object.keys(attributes).forEach(attr => this[attr] = attributes[attr])
    this.render();
    return this;
  }

  destroy() {
    // set the all array equal to the filtered array of all objects that aren't this one.
    //this.constructor.collection = this.constructor.all().filter(obj => obj !== this)
    // or we could look for where this object occurs in the array and then splice it out. 
    // approach # 1
    // debugger
    let index = this.constructor.all().findIndex(obj => obj == this)
    if(index > -1) {
      this.constructor.all().splice(index, 1)
      return this
    }
    return false
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

  render() {
    this.element = this.element || document.createElement('div');
    this.element.draggable = true;
    this.element.classList.add('item', 'rounded-xl', 'shadow-md', 'my-2', 'p-5', 'bg-green-200');
    this.element.dataset.productId = this.product.id;
    this.element.innerHTML = `
      <h3 class="text-xl">${this.product.name}</h3>
      <p>$${this.product.price}</p>
    `
    return this.element;
  }
}
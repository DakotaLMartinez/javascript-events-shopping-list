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
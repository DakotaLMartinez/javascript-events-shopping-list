class Product {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.price = attributes.price;
    this.description = attributes.description;
    this.addedToList = false;
  }
//mdn Promise;
  static all() {
    return this.collection = this.collection || [];
  }

  static create(attributes) {
    let product = new Product(attributes)
    this.all().push(product)
    return product
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
    
    this.element.dataset.id = this.id;
    this.element.innerHTML = `
      <h3 class="product text-3xl" data-id="${this.id}">${this.name}</h3>
      <h5>${this.price}</h5>
      <p>${this.description}</p>
      <i class="addProductToList text-xl fa-plus-square ${this.addedToList ? 'fas' : 'far'}" data-id="${this.id}"></i>
    `
    return this.element;
  }
}
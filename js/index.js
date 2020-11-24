// the ProductsList class allows us to keep track of a list of products and
// the container on the pagekeeps track of all of the products in a list.
// It knows how to add a product to the list and 
// how to display the list.
class ProductsList {
  constructor(container, products = []) {
    this.container = container;
    this.products = products;
    this.nextProductId = 1;
  }

  addProduct(product) {
    product.id = this.nextProductId;
    this.products.push(product);
    this.nextProductId++;
  }

  display() {
    let productsContainer = document.querySelector
    this.products.forEach
  }
}

// The ProductView class 
class ProductView {
  constructor(product) {
    this.product = product;
  }

  static display(product) {
    return new ProductView(product).render()
  }

  render() {
    let div = document.createElement('div');
    div.dataset.id = this.product.id;
    div.innerHTML = `
      <h3>${this.product.name}</h3>
      <h5>${this.product.price}</h5>
      <p>${this.product.description}</p>
    `
    return div;
  }
}
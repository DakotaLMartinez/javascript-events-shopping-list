class CRUD {
  // analagous to initialize iterating over the hash of attributes and calling the setter methods
  // for all of the keys and passing the values as arguments:
  // def initialize(attributes = {})
  //   attributes.each do |key, value|
  //     self.send("#{key}=", value)
  //   end 
  // end
  // Whatever class you define that extends the CRUD class, will have these methods defined below
  constructor(attributes = {}) {
    Object.keys(attributes).forEach(attr => this[attr] = attributes[attr])
  }
  // static methods in JS are how we implement class methods (similar to def self.all in ruby)
  static all() {
    // equivalent to @@all ||= []
    // we use this.collection instead of this.all because `this` is the class and `this.all` 
    // is actually this method that we're defining, so we can't assign it to an array.
    // We are storing all instances of the class in a property of the class and allowing access to
    // to it via a class method .all()
    return this.collection = this.collection || [];
  }

  // This method takes an object filled with attributes as an argument, uses them to create a new
  // instance of the class, adds that instance to the collection of all saved instances and 
  // returns the new instance.
  static create(attributes) {
    let model = new this(attributes)
    this.all().push(model)
    return model
  }

  // This method takes an object filled with attributes as an argument, uses them to find a single
  // object in this.all() that matches all of those attributes. Returns undefined if no such object
  // exists.
  static find_by(attributes) {
    return this.all().find(model => {
      return attributes.every(attribute => {
        return model[attribute] === attributes[attribute]
      })
    })
  }

  // This method takes an id as an argument and finds the object in this.all() that has that id. 
  // Returns undefined if no such object exists.
  static find_by_id(id) {
    return this.all().find(model => model.id == id);
  }

  // This method takes an object filled with attributes as an argument, uses them to update the
  // object's attributes with those values. 
  // This method might be called on the return value of find_by_id
  update(attributes) {
    Object.keys(attributes).forEach(attr => this[attr] = attributes[attr])
    return this;
  }

  // This method removes an object from this.all() by setting the collection equal to a filtered
  // version of the collection where that object is not included.
  destroy() {
    // set the all array equal to the filtered array of all objects that aren't this one.
    //this.constructor.collection = this.constructor.all().filter(obj => obj !== this)
    // or we could look for where this object occurs in the array and then splice it out. 
    // approach # 1
    debugger
    let index = this.constructor.all().findIndex(obj => obj == this)
    if(index > -1) {
      this.constructor.all().splice(index, 1)
    }
    // approach #2
    // because the find function's callback accepts the index of the element as an 
    // optional second argument, we can call splice from within the callback without
    // having to call findIndex first.
    return this.constructor.all().find((obj, index) => {
      if(obj == this){
        this.constructor.all().splice(index, 1);
        return true;
      }
    })
    return this;
  }
  // remember that calling constructor on an object, is like calling class on it would be in ruby
}

class Product extends CRUD {
  render() {
    this.element = this.element || document.createElement('div');
    
    this.element.dataset.id = this.id;
    this.element.innerHTML = `
      <h3 class="product text-3xl" data-id="${this.id}">${this.name}</h3>
      <h5>${this.price}</h5>
      <p>${this.description}</p>
    `
    return this.element;
  }
}


//mdn Array.find
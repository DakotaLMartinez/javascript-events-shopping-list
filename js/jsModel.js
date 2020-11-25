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

  static find_by(attributes) {
    return this.all().find(model => {
      return attributes.every(attribute => {
        return model[attribute] === attributes[attribute]
      })
    })
  }

  static find_by_id(id) {
    return this.all().find(model => model.id == id);
  }

  update(attributes) {
    Object.keys(attributes).forEach(attr => this[attr] = attributes[attr])
    return this;
  }

  destroy() {
    // set the all array equal to the filtered array of all objects that aren't this one.
    this.constructor.collection = this.constructor.all().filter(obj => obj !== this)
  }
}

class World extends CRUD {
  
}


//mdn Array.every
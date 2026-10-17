
export class Material {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.category = data.category;
    this.usage = data.usage;
    this.unit = data.unit;
    this.price = data.price;
    this.stock = data.stock;
  }

  paragraph() {
    return `${this.name} is used in ${this.usage.join(', ')}. It costs ₦${this.price?.toLocaleString()} per ${this.unit} and we currently have ${this.stock} in store.`;
  }
};
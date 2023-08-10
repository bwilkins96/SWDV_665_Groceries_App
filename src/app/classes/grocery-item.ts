export class GroceryItem {
    name: string;
    quantity: number;
    _id: number | null;
  
    constructor(name: string, quantity: number, _id: number | null = null) {
      this.name = name;
      this.quantity = quantity;
      this._id = _id
    }
  }
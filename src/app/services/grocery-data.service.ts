import { Injectable } from '@angular/core';
import { GroceryItem } from '../classes/grocery-item';

@Injectable({
  providedIn: 'root'
})
export class GroceryDataService {
  private items: Array<GroceryItem> = [];

  constructor() { }

  getItems() {
    return this.items;
  }

  processQuantityInput(quantity: any) {
    quantity = Math.abs(Number(quantity));
    if (!quantity) quantity = 1;
    return quantity;
  }

  async addItem(result: any) {
    let [name, quantity] = result;
    quantity = this.processQuantityInput(quantity);      

    const newItem = new GroceryItem(name, quantity);
    this.items.push(newItem);
  }

  async editItem(item: GroceryItem, result: any) {
    let [name, quantity] = result;
    quantity = this.processQuantityInput(quantity);
    
    item.name = name;
    item.quantity = quantity;
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}

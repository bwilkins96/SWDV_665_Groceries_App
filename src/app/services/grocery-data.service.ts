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

  addItem(result: Array<any>) {
    let [name, quantity] = result;      
    
    const newItem = new GroceryItem(name, quantity);
    this.items.push(newItem);
  }

  editItem(item: GroceryItem, result: Array<any>) {
    let [name, quantity] = result;
    
    item.name = name;
    item.quantity = quantity;
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}

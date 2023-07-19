import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

class GroceryItem {
  name: string;
  quantity: number;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  items: Array<GroceryItem> = [];

  constructor(private alertController: AlertController) {}

  async presentAddBox() {
    const inputs = [
      {placeholder: 'Item Name'},
      {placeholder: 'Quantity'}
    ]

    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      inputs: inputs,
      buttons: ['Add Item']
    });

    await alert.present();

    try {
      const data = await alert.onDidDismiss();
      const values = data.data.values;
      return [values[0], values[1]];
    } catch {
      return null;
    }
  }

  async addItem() {
    const result = await this.presentAddBox();

    if (result) {
      let [name, quantity] = result;
      quantity = Math.abs(Number(quantity));
      if (!quantity) quantity = 1;

      const newItem = new GroceryItem(name, quantity);
      this.items.push(newItem);
    }
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}

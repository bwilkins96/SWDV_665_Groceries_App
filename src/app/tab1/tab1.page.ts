import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
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

  constructor(private alertController: AlertController, private toastController: ToastController) {}

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

  async presentEditBox(item: GroceryItem) {
    const inputs = [
      {placeholder: 'Item Name', value: item.name},
      {placeholder: 'Quantity', value: item.quantity}
    ]

    const alert = await this.alertController.create({
      header: 'Edit Grocery Item',
      inputs: inputs,
      buttons: ['Update Item']
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

  async presentToast(message: string, duration: number=1250, position: 'top'|'bottom'|'middle'='bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position
    });

    await toast.present();
  }

  processQuantityInput(quantity: any) {
    quantity = Math.abs(Number(quantity));
    if (!quantity) quantity = 1;
    return quantity;
  }

  async addItem() {
    const result = await this.presentAddBox();

    if (result) {
      let [name, quantity] = result;
      quantity = this.processQuantityInput(quantity);      

      const newItem = new GroceryItem(name, quantity);
      this.items.push(newItem);
      this.presentToast('Grocery item added successfully!');
    }
  }

  async editItem(item: GroceryItem) {
    const result = await this.presentEditBox(item);

    if (result) {
      let [name, quantity] = result;
      quantity = this.processQuantityInput(quantity);
      
      item.name = name;
      item.quantity = quantity;
    } 
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}

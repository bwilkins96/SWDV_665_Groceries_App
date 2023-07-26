import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { GroceryDataService } from '../services/grocery-data.service';
import { GroceryItem } from '../classes/grocery-item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  constructor(private alertController: AlertController, 
    private toastController: ToastController,
    private groceryDataService: GroceryDataService) {}

  async parseGroceryItemInput(alert: HTMLIonAlertElement) {
    try {
      const data = await alert.onDidDismiss();
      const values = data.data.values;
      return [values[0], values[1]];
    } catch {
      return null;
    }
  }
  
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
    return this.parseGroceryItemInput(alert);
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
    return this.parseGroceryItemInput(alert);
  }

  async presentToast(message: string, duration: number=1250, position: 'top'|'bottom'|'middle'='bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position
    });

    await toast.present();
  }

  loadItems() {
    return this.groceryDataService.getItems();
  }

  async addItem() {
    const result = await this.presentAddBox();

    if (result) {
      this.groceryDataService.addItem(result);
      this.presentToast('Grocery item added successfully!');
    }
  }

  async editItem(item: GroceryItem) {
    const result = await this.presentEditBox(item);

    if (result) {
      this.groceryDataService.editItem(item, result);
    } 
  }

  removeItem(i: number) {
    this.groceryDataService.removeItem(i);
  }
}

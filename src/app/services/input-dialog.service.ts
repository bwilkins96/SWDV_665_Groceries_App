import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceryItem } from '../classes/grocery-item';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private alertController: AlertController) { }

  private async parseGroceryItemInput(alert: HTMLIonAlertElement) {
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
}

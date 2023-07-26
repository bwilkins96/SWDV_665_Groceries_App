import { Injectable } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { GroceryItem } from '../classes/grocery-item';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private alertController: AlertController) { }

  private processQuantityInput(quantity: any) {
    quantity = Math.abs(Number(quantity));
    if (!quantity) quantity = 1;
    return quantity;
  }

  private async parseGroceryItemInput(alert: HTMLIonAlertElement) {
    try {
      const data = await alert.onDidDismiss();
      const values = data.data.values;

      const name = values[0];
      const quantity = this.processQuantityInput(values[1]);
      
      return [name, quantity];
    } catch {
      return null;
    }
  }
  
  async presentAddBox() {
    const inputs: AlertInput[] = [
      {placeholder: 'Item Name'},
      {placeholder: 'Quantity'},
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
    const inputs: AlertInput[] = [
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

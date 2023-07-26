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
      
      return name ? [name, quantity]: null;
    } catch {
      return null;
    }
  }

  async presentInputBox(item: GroceryItem | null = null) {
    const inputs: AlertInput[] = [
      {
        placeholder:  'Item Name', 
        value: item ? item.name : null
      },
      {
        placeholder: 'Quantity', 
        value: item ? item.quantity : null
      }
    ]

    const alert = await this.alertController.create({
      header: item ? 'Edit Grocery Item' : 'Add Grocery Item',
      inputs: inputs,
      buttons: item ? ['Update Item'] : ['Add Item']
    });

    await alert.present();
    return this.parseGroceryItemInput(alert);
  }
}

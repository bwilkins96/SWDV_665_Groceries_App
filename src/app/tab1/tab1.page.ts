import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Share, ShareOptions } from '@capacitor/share';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { GroceryItem } from '../classes/grocery-item';
import { GroceryDataService } from '../services/grocery-data.service';
import { InputDialogService } from '../services/input-dialog.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  constructor(
    private toastController: ToastController,
    private groceryDataService: GroceryDataService,
    private inputDialogService: InputDialogService
    ) {
      groceryDataService.dataChanged.subscribe((dataChanged: boolean) => {
        if (dataChanged) this.groceryDataService.loadItems();
      })
    }

  ionViewDidEnter() {
    this.groceryDataService.loadItems();
  }

  async presentToast(message: string, duration: number=1250, position: 'top'|'bottom'|'middle'='bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position
    });

    await toast.present();
  }

  getItems() {
    return this.groceryDataService.getItems();
  }

  async addItem() {
    const result = await this.inputDialogService.presentInputBox();

    if (result) {
      this.groceryDataService.addItem(result);
      this.presentToast('Grocery item added successfully!');
    }
  }

  async editItem(item: GroceryItem) {
    const result = await this.inputDialogService.presentInputBox(item);

    if (result) {
      this.groceryDataService.editItem(item, result);
    } 
  }

  removeItem(item: GroceryItem) {
    this.groceryDataService.removeItem(item);
  }

  async shareItem(item: GroceryItem) {
    const shareOptions: ShareOptions = {
      title: 'Grocery Item - shared from Groceries App',
      text: `Name: ${item.name}\nQuantity: ${item.quantity}`
    };

    try {
      await Share.share(shareOptions);
      return true;
    } catch {
      return false;
    }
  }
}

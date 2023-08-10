import { Injectable } from '@angular/core';
import { GroceryItem } from '../classes/grocery-item';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryDataService {
  private items: Array<GroceryItem> = [];
  private serverURL = 'http://localhost:8080/api/groceries';
  
  private dataChangeSubject: Subject<boolean>;
  public dataChanged: Observable<boolean>;

  constructor(private http: HttpClient) { 
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged = this.dataChangeSubject.asObservable();
  }

  loadItems() {
    const req = this.http.get(this.serverURL, { observe: 'response' });
    
    req.subscribe(
      (res) => {
        const body = res.body;
        if (Array.isArray(body)) this.items = body;
      }
    );
  }

  getItems() {
    return this.items;
  }

  addItem(result: Array<any>) {
    let [name, quantity] = result;      
    const newItem = new GroceryItem(name, quantity);

    this.http.post(this.serverURL, newItem).subscribe(
      res => {
        this.dataChangeSubject.next(true);
      }
    );
  }

  editItem(item: GroceryItem, result: Array<any>) {
    let [name, quantity] = result;
    const updated_item = {name: name, quantity: quantity};

    this.http.put(this.serverURL + '/' + item._id, updated_item).subscribe(
      res => {
        this.dataChangeSubject.next(true);
      }
    );
  }

  removeItem(item: GroceryItem) {
    this.http.delete(this.serverURL + '/' + item._id).subscribe(
      res => {
        this.dataChangeSubject.next(true)
      }
    );
  }
}

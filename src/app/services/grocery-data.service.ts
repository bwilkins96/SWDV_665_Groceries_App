import { Injectable } from '@angular/core';
import { GroceryItem } from '../classes/grocery-item';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryDataService {
  public items: Array<GroceryItem> = [];
  private serverURL = 'http://localhost:8080/api/groceries';
  
  private dataChangeSubject: Subject<boolean>;
  public dataChanged: Observable<boolean>;

  constructor(private http: HttpClient) { 
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged = this.dataChangeSubject.asObservable();
  }

  loadItems() {
    console.log('data service loadItems called');
    const req = this.http.get(this.serverURL, { observe: 'response' });
    
    req.subscribe(
      (res) => {
        const body = res.body;
        if (Array.isArray(body)) this.items = body; console.log(body);
      }
    );
  }

  getItems() {
    return this.items;
  }

  addItem(result: Array<any>) {
    let [name, quantity] = result;      
    const newItem = new GroceryItem(name, quantity);
    // this.items.push(newItem);

    this.http.post(this.serverURL, newItem).subscribe(
      res => {
        this.dataChangeSubject.next(true);
        console.log(this.items);
      }
    );
  }

  editItem(item: any, result: Array<any>) {
    let [name, quantity] = result;
    const updated_item = {name: name, quantity: quantity};

    this.http.put(this.serverURL + '/' + item._id, updated_item).subscribe(
      res => {
        this.dataChangeSubject.next(true);
      }
    );
  }

  removeItem(item: any) {
    console.log(item);
    this.http.delete(this.serverURL + '/' + item._id).subscribe(
      res => {
        this.dataChangeSubject.next(true)
      }
    );
  }
}

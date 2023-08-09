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

  getItems() {
    console.log('data service getItems called');
    const req = this.http.get(this.serverURL, { observe: 'response' });
    
    req.subscribe(
      (res) => {
        const body = res.body;

        if (Array.isArray(body)) {
          console.log(body);
          this.items = body;
        };
      }
    );
    
    console.log('from data service -', this.items);
    return this.items;
  }

  addItem(result: Array<any>) {
    let [name, quantity] = result;      
    
    const newItem = new GroceryItem(name, quantity);
    // this.items.push(newItem);

    this.http.post(this.serverURL, newItem).subscribe(
      res => {
        // this.items = res;
        console.log(res);
        this.dataChangeSubject.next(true);
      }
    );
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

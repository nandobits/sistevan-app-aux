import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SistevanService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getCatValues(action){
        return this.http.get(`${this.apiUrl}?action=${action}`).toPromise();
    }

    public getItemName(itemId, arr){
        for(let item of arr){
            if(item.id == itemId)
                return item.description;
        }
        return 'undefined';
    }

    public getItemNameShort(itemId, arr){
        for(let item of arr){
            if(item.id == itemId)
                return item.short;
        }
        return 'undefined';
    }

    public addProduct(params){
        return this.http.get(`${this.apiUrl}?action=add_product${params}`).toPromise();
    }
}

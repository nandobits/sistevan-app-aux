import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SistevanService {
    private apiUrl: string = environment.apiUrl;
    private userInfoKey: string = 'userInfoKey';
    private warehouseKey: string = 'warehouseKey';

    constructor(private http: HttpClient, private router: Router) { }

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

    public getWarehouseId(){
        return this.getWarehouseLS();
    }

    public getUserId(){
        let user: any = this.getUserInfoLS();
        return user.id;
    }

    public setUserInfoLS(info){
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }

    public getUserInfoLS(){
        return JSON.parse(localStorage.getItem(this.userInfoKey));
    }

    public removeUserInfoLS(){
        localStorage.removeItem(this.userInfoKey);
    }

    public setWarehouseLS(warehouseId){
        localStorage.setItem(this.warehouseKey, warehouseId);
    }

    public getWarehouseLS(){
        return localStorage.getItem(this.warehouseKey);
    }

    public removeWarehouseLS(){
        localStorage.removeItem(this.warehouseKey);
    }

    public logout(){
        this.removeUserInfoLS();
        this.removeWarehouseLS();
        this.router.navigate(['/']);
    }
}

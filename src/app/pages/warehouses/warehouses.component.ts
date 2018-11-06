import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SistevanService } from '../../services/sistevan.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
    public warehouse: string;
    public warehouses: any[];

    constructor(private sistevanService: SistevanService, private router: Router) { }

    ngOnInit(){
        this.sistevanService.getCatValues('get_warehouses').then( (warehouses: any[]) => {
            this.warehouses = warehouses;
        })
    }

    public onSave(){
        this.sistevanService.setWarehouseLS(this.warehouse);
        this.router.navigate(['scanner']);
    }

}

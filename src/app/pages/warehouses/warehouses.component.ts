import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SistevanService } from '../../services/sistevan.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent {
    public warehouse: string;
    private warehouses: any[] = [
        {
            id: '1',
            description: 'Bodega 1'
        },
        {
            id: '2',
            description: 'Bodega 2'
        },
        {
            id: '3',
            description: 'Bodega 3'
        },
        {
            id: '4',
            description: 'Bodega 4'
        },
        {
            id: '5',
            description: 'Bodega 5'
        }
    ]

    constructor(private sistevanService: SistevanService, private router: Router) { }

    public onSave(){
        this.sistevanService.setWarehouseLS(this.warehouse);
        this.router.navigate(['scanner']);
    }

}

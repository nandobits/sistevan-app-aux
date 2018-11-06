import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'warehouse', component: WarehousesComponent },
    { path: 'scanner', component: ScannerComponent },
    { path: '**', component: NotFoundComponent },
]

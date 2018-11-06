import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatMenuModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SistevanService } from './services/sistevan.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';

/* Routing */
import { appRoutes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    ScannerComponent,
    WarehousesComponent
  ],
  imports: [
    BrowserModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatIconModule,
  ],
  providers: [SistevanService],
  bootstrap: [AppComponent]
})
export class AppModule { }

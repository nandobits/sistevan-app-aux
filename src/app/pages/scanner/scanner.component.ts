import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatSnackBar } from '@angular/material';
import { Result } from '@zxing/library';
import { SistevanService } from '../../services/sistevan.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
    @ViewChild('scanner')
    scanner: ZXingScannerComponent;
    public scannerEnabled: boolean = false;
    public info: string[];
    public categories: any[];
    public measurements: any[];
    public presentations: any[];
    public providers: any[];
    public units: any;
    public provider: any;
    public realWeight: string = '';
    public user: any;
    private cadScanner: string = "05LN150AM|LONA 1.50 AMARILLA|5|2|1|1|50,1|3";
    hasCameras = false;
    hasPermission: boolean;
    qrResultString: string;
    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;

    constructor(private sistevanService: SistevanService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;
            this.availableDevices = devices;
        });

        this.user = this.sistevanService.getUserInfoLS();

        this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
            console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        });

        this.scanner.permissionResponse.subscribe((answer: boolean) => {
          this.hasPermission = answer;
        });

        this.sistevanService.getCatValues('get_product_categories').then( (categories: any[]) => {
            this.categories = categories;
        })
        this.sistevanService.getCatValues('get_product_measurements').then( (measurements: any[]) => {
            this.measurements = measurements;
        })
        this.sistevanService.getCatValues('get_product_presentations').then( (presentations: any[]) => {
            this.presentations = presentations;
        })
        this.sistevanService.getCatValues('get_product_providers').then( (providers: any[]) => {
            this.providers = providers;
        })
        //this.scanSuccessHandler(this.cadScanner);
    }

    scanSuccessHandler(resultString: string) {
        this.qrResultString = resultString;
        this.info = (this.qrResultString) ? this.qrResultString.split('|') : [];
        this.units = this.info[4];
        this.provider = this.info[7];
        this.scannerEnabled = false;
    }

    onDeviceSelectChange(event) {
        this.scannerEnabled = (event.value) ? true : false;
        this.selectedDevice = this.scanner.getDeviceById(event.value);
    }

    public onSave(){
        let params = "&code="+this.info[0];
        params += "&description="+ this.info[1];
        params += "&category="+ this.info[2];
        params += "&measure="+ this.info[3];
        params += "&units="+ this.units;
        params += "&presentation="+ this.info[5];
        params += "&content="+ this.info[6];
        params += "&real_weight="+ this.realWeight;
        params += "&provider="+ this.provider;
        params += "&warehouse_id="+ this.sistevanService.getWarehouseId();
        params += "&user_id="+ this.sistevanService.getUserId();
        this.sistevanService.addProduct(params).then( res => {
            this.qrResultString = null;
            this.scannerEnabled = true;
            alert('¡Producto guardado!')
            /*this.snackbar.open('¡Producto guardado!', 'Undo', {
              duration: 2500
          });*/
        },
        (error) => {
            this.qrResultString = null;
            this.scannerEnabled = true;
            alert('¡El producto no pudo ser guardado!')
            console.error('ERROR: ',error)
            /*this.snackbar.open('¡El producto no pudo ser guardado!', 'Undo', {
              duration: 2500
          });*/
        })
    }

    public onCancel(){
        this.qrResultString = null;
        this.scannerEnabled = true;
    }

    public getElementValue(itemId, arr){
        return this.sistevanService.getItemName(itemId, arr);
    }

    public getElementValueShort(itemId, arr){
        return this.sistevanService.getItemNameShort(itemId, arr);
    }

    public getContentValue(content){
        let aux = content.split(',');
        let cad = aux[0]+' '+this.getElementValueShort(aux[1], this.measurements)+'.';
        return cad;
    }

    public onLogout(){
        this.sistevanService.logout();
    }
}

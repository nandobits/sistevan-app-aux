import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatSnackBar } from '@angular/material';
import { Result } from '@zxing/library';
import { SistevanService } from './services/sistevan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private cadScanner: string = "05LN150AM|LONA 1.50 AMARILLA|5|1|1|1|50,1|3";
    hasCameras = false;
    hasPermission: boolean;
    qrResultString: string;
    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;

    constructor(private sistevanService: SistevanService, public snackBar: MatSnackBar){

    }

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;

            console.log('Devices: ', devices);
            this.availableDevices = devices;

            // selects the devices's back camera by default
             for (const device of devices) {
                 if (/back|rear|environment/gi.test(device.label)) {
                     this.scanner.changeDevice(device);
                     this.selectedDevice = device;
                     break;
                 }
             }
        });

        this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
            console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        });

        this.scanner.permissionResponse.subscribe((answer: boolean) => {
          this.hasPermission = answer;
        });

        this.sistevanService.getCatValues('get_product_categories').then( (categories: any[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        })
        this.sistevanService.getCatValues('get_product_measurements').then( (measurements: any[]) => {
            console.log('measurements: ', measurements);
            this.measurements = measurements;
        })
        this.sistevanService.getCatValues('get_product_presentations').then( (presentations: any[]) => {
            console.log('presentations: ', presentations);
            this.presentations = presentations;
        })
        this.sistevanService.getCatValues('get_product_providers').then( (providers: any[]) => {
            console.log('providers: ', providers);
            this.providers = providers;
        })
        //this.scanSuccessHandler(this.cadScanner);

    }

    scanSuccessHandler(resultString: string) {
        console.log('Result: ', resultString);
        this.qrResultString = resultString;
        this.info = (this.qrResultString) ? this.qrResultString.split('|') : [];
        this.units = this.info[4];
        this.provider = this.info[7];
        this.scannerEnabled = false;
    }

    onDeviceSelectChange(event) {
        console.log('Selection changed: ', event.value);
        this.scannerEnabled = (event.value) ? true : false;
        this.selectedDevice = this.scanner.getDeviceById(event.value);
    }

    public onSave(){
        console.log('this.info: ',this.info);
        let params = "&code="+this.info[0];
        params += "&description="+ this.info[1];
        params += "&category="+ this.info[2];
        params += "&measure="+ this.info[3];
        params += "&units="+ this.units;
        params += "&presentation="+ this.info[5];
        params += "&content="+ this.info[6];
        params += "&provider="+ this.provider;
        console.log('params: ',params)
        this.sistevanService.addProduct(params).then( res => {
            console.log('res: ', res);
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
        console.log('itemId: ',itemId, ' => ',arr)
        return this.sistevanService.getItemName(itemId, arr);
    }

    public getElementValueShort(itemId, arr){
        console.log('itemId: ',itemId, ' => ',arr)
        return this.sistevanService.getItemNameShort(itemId, arr);
    }

    public getContentValue(content){
        let aux = content.split(',');
        let cad = aux[0]+' '+this.getElementValueShort(aux[1], this.measurements)+'.';
        return cad;
    }
}

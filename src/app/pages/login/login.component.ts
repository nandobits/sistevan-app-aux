import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SistevanService } from '../../services/sistevan.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public loginError: boolean = false;
    private users: any[];

    constructor(private router: Router, private sistevanService: SistevanService) {
        let user = this.sistevanService.getUserInfoLS();
        if(user != null){
            this.goToScanner();
        }
    }

    ngOnInit(){
        this.sistevanService.getCatValues('get_users').then( (users: any[]) => {
            this.users = users;
        })
    }

    public onLogin(){
        let logged = false;
        for(let user of this.users){
            if(user.email == this.email && user.password == this.password){
                logged = true;
                this.sistevanService.setUserInfoLS(user);
                this.goToScanner();
            }
        }
        if(!logged){
            this.loginError = true;
        }
    }

    private goToScanner(){
        this.router.navigate(['warehouse']);
    }

}

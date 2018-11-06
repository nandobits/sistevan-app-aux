import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SistevanService } from '../../services/sistevan.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public email: string;
    public password: string;
    public loginError: boolean = false;
    private users: any[] = [
        {
            id: '1',
            name: 'User1',
            email: 'user1@sistevan.com',
            password: '8172543101'
        },
        {
            id: '2',
            name: 'User2',
            email: 'user2@sistevan.com',
            password: '9198211109'
        },
        {
            id: '3',
            name: 'User3',
            email: 'user3@sistevan.com',
            password: '6611982352'
        },
        {
            id: '4',
            name: 'User4',
            email: 'user4@sistevan.com',
            password: '2516171704'
        },
        {
            id: '5',
            name: 'User5',
            email: 'user5@sistevan.com',
            password: '2312917190'
        }
    ]

    constructor(private router: Router, private sistevanService: SistevanService) {
        let user = this.sistevanService.getUserInfoLS();
        if(user != null){
            this.goToScanner();
        }
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

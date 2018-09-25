import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuardService implements CanActivate  {
    constructor(private loginService: AppService, private router: Router){}

    canActivate() {
        if(this.loginService.autheticated) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage'
import { UserService } from '../structs/user.service'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router, 
              private storage: Storage,
              public userService:UserService,
              public baseService:BaseService) { }
  canActivate(): boolean {
    if (!this.userService.islogin||this.userService.data==[]||this.userService.data.length==0) {
      this.userService.islogin=false;
      this.baseService.presentToast("请登录后再访问此功能.","danger")
      this.router.navigateByUrl('/login/86');
      return false;
    }
    return true
  }

}

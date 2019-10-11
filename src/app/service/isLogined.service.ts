import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage'
import { UserService } from '../structs/user.service'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class IsLogined implements CanActivate {

  constructor(public router: Router, 
              private storage: Storage,
              public userService:UserService,
              public baseService:BaseService) { }
  

  canActivate(): boolean {//已经登录
    if (this.userService.islogin) {
      // this.baseService.presentToast("Please login and visit again","danger")
      history.go(-1);
      return false;
    }
    return true
  }


}

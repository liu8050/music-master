import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../structs/user.service'
// import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class FirstOpen implements CanActivate {

  constructor(public router: Router, 
              public userService:UserService,
              public baseService:BaseService) { }

  canActivate(): boolean {//第一次登录|欢迎页面有更新
    if(this.baseService.firstOpen==null){
      return true;
      }

    if (this.baseService.firstOpen=="1") {
      // this.baseService.presentToast("Please login and visit again","danger")
      // this.baseService.firstOpen=await 
      this.router.navigateByUrl('/app/home');
      return false;
    }
    return true;
  }

}

import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { UserService } from '../structs/user.service'
import { NavController } from '@ionic/angular';
// import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class HomeCheck implements CanActivate {

  constructor(private Router: Router, 
              private router: ActivatedRoute,
              private userService:UserService,
              private nav:NavController,
              private baseService:BaseService) { }

  canActivate(): boolean {//第一次登录|欢迎页面有更新

    // this.baseService.myalert(this.baseService.referURI)
    console.log(this.baseService.referURI,this.baseService.referURI)
   if(this.baseService.referURI.indexOf("dance")>-1){
    // this.baseService.referURI="";
    this.nav.navigateBack("/app/guidance");

    return false;
   }
  //  this.baseService.myalert(this.baseService.referURI)
   if(this.baseService.referURI.indexOf("mycourse")>-1){
    // this.baseService.referURI="";
    this.nav.navigateBack("/app/mycourse");
    return false;
   }
   if(this.baseService.referURI.indexOf("mycenter")>-1){
    // this.baseService.referURI="";
    
    this.nav.navigateBack("/app/mycenter");
    return false;
   }

   if(this.baseService.referURI.indexOf("mycenter")>-1){
    // this.baseService.referURI="";
    this.nav.navigateBack("/app/mycenter");
    return false;
   }


   
    return true;
   
  }

}

import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { UserService } from '../structs/user.service'
import { NavController } from '@ionic/angular';
// import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class OrderCheck implements CanActivate {

  constructor(private Router: Router, 
              private router: ActivatedRoute,
              private userService:UserService,
              private nav:NavController,
              private baseService:BaseService) { }

  canActivate(): boolean {//第一次登录|欢迎页面有更新

    // alert("tet"+this.Router.getCurrentNavigation().extractedUrl)
    let turl="tet"+this.Router.getCurrentNavigation().extractedUrl;

    turl=turl.substr(turl.indexOf("/"))
    turl=turl.replace("/","");
    turl=turl.substr(turl.indexOf("/"))
    turl=turl.replace("/","");
    turl=turl.substr(turl.indexOf("/"))
    turl=turl.replace("/","");
    turl=turl.substr(turl.indexOf("/"))
    turl=turl.replace("/","");
    turl=turl.substr(turl.indexOf("/"))
    turl=turl.replace("/","");

  

    // turl=turl.queryParamMap;
    let Id=parseInt(turl);//解决回退问题
    // alert("id:"+Id+JSON.stringify(this.userService.mycourse))
    this.userService.mycourse.forEach(item => {
      
      if (parseInt(item.product_id) == Id) {
        // this.nav.pop();
        this.nav.navigateBack("/app/home/coursedetails/"+Id);
        return false;
      }
    });
    return true;
   
  }

}

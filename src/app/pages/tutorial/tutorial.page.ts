import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service'
import {WelcomeService} from '../../structs/welcome.service'
import {BaseService} from '../../service/base.service'
import { Router } from '@angular/router';
import to from 'await-to-js';
import {DbService} from '../../service/db.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  picsdata=[];
  canGo=false;
  slideOpts={
    initialSlide: 0,
    speed: 500,
    autoplay:false
  };

  constructor(
    private httpService:HttpService,
    private dbService:DbService,
    private welcomeService:WelcomeService,
    private splashScreen: SplashScreen,
    private router:Router,
    private baseService:BaseService) { 
    // this.baseService.myalert("bbq??why");
    this.splashScreen.hide();
    // this.baseService.myalert("222bbq");
    }

  ngOnInit() {

     this.welcomepics_get();
  }

  //data-init-start
 async welcomepics_get(){
  let r,err;
  let filters=this.welcomeService.filters;
  [ err, r ] = await to(this.httpService.request(filters,this.welcomeService.uriList));
  if(err){
    this.baseService.presentToast("服务器维护中...;请稍后再试", "danger");
    return;
  }
  if(r.code==20000){
    this.picsdata=r["data"];
    console.log(  this.picsdata)
    setTimeout(() => {
      this.canGo=true;
    }, 3000);
   
    this.initApp();
  }

}

async initApp(){//记录OPEN
  this.dbService.setLocalVal("firstOpen","1");
  this.baseService.firstOpen="1";
}

beforeChange(){

}
afterChange(){
  
}
starTravel(){
  if(this.canGo){
    
    this.router.navigateByUrl('/app')
    
  }
}

ionViewWillLeave(){
  this.picsdata=[];
}

//data-init-end

}

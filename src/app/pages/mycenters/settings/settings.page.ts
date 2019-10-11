import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../structs/user.service'
import { NavController } from '@ionic/angular'
import { LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { BaseService} from '../../../service/base.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  islh=false;//是否为刘海屏
  settings:any={a4gv:false,a4ga:false,bplay:false,bitrate:"b1"};

  constructor(
    private location: Location,
    private router: Router,
    private userService:UserService,
    private nav:NavController,
    private baseService: BaseService,
    public storage:Storage,
  ) {
    this.settings=this.userService.settings;
   }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

  }
  check(event,key) {
    console.log(event);
    this.settings[key]=event;
    this.userService.saveSetting(this.settings);
  }

  onClick(event) {
    console.log(event);
  }
  //actions-active-start
  goback() {
    this.location.back();
    //this.location.open(NavComponent);
  }
  afterChange(event) {
    console.log(event, 'afterChange');
  }

  clearall(){

  }
  outContent(){
    this.router.navigateByUrl('/app/mycenter')
    return false;
  }
  logout(){
    // this.storage.remove('user').then((value) =>{
    //   console.log(value)
     
    // })
    this.userService.islogin=false;
    // this.usero
    this.userService.data=null;
    this.userService.userlocalremove();
    this.nav.navigateForward(`/app/home`);
    localStorage.clear()
    this.baseService.presentMessage('登出成功');
  }
  

}

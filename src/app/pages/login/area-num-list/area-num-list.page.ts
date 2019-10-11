import { Component, OnInit, ViewChild } from '@angular/core'

import { Router } from '@angular/router'

import {AreaCodeService } from '../../../structs/area-code.service'
import { LoadingController } from '@ionic/angular'


import { HttpService } from '../../../service/http.service'

import to from 'await-to-js'
import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter'





import { StatusBar } from '@ionic-native/status-bar/ngx'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
@Component({
  selector: 'app-area-num-list',
  templateUrl: './area-num-list.page.html',
  styleUrls: ['./area-num-list.page.scss'],
})
export class AreaNumListPage implements OnInit {
  islh=false;//是否为刘海屏
  nulls:any="";
  Area:any=[];
  constructor(
    // 地区接口
    private router: Router,
    private httpService: HttpService,

    private statusBar: StatusBar,
    private splashScreen: SplashScreen,




    private AreaCodeService:AreaCodeService,
    // private httpService: HttpService,
    // private userService: UserService,
    // private baseService: BaseService,
    // private router: Router,

    // private statusBar: StatusBar,
    // private splashScreen: SplashScreen,


    
  ) { }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    this.getArea()
    // this.mytest()
  }

  async getArea(){
    
    // const   uri='http://mst.zt-tech.net/index.php?route=api/login/phcode'
    let  err,r; 
    [err,r]= await to(
      this.httpService.request(null,this.AreaCodeService.AreaCode)
      )
      if(r!=null){
        this.Area=r
        console.log(this.Area)
      }
    console.log(r)

  }
  jumpLogin(pid){
    console.log(pid)
    this.router.navigate(['/login',pid])
  }
  // async mytest(){
  //   let err,r;
  //   [err, r] = await to(
  //     // api/login/phcode
  //     this.httpService.request(null, ["api/login/phcode","get"])
  //   )
  //     console.log(r)
    // alert(JSON.stringify(err))
    // alert(JSON.stringify(r))


  // }
  
}

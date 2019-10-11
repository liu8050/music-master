import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {BaseService} from '../../service/base.service'

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.page.html',
  styleUrls: ['./guidance.page.scss'],
})
export class GuidancePage implements OnInit {

  constructor(
    private statusBar:StatusBar,
    private baseService:BaseService
  ) { 
    this.statusBar.styleLightContent();
  }

  ngOnInit() {
  }




/*是否显示tabs--start */
ionViewWillLeave(){
  // document.getElementsByTagName("ion-tab-bar")[0].style.display="none";//离开四大主页隐藏
  if(this.baseService.platform=='iOS'){
    // this.statusBar.overlaysWebView(false);
    // this.statusBar.backgroundColorByName("white");
    this.statusBar.styleDefault();
  }
  this.statusBar.styleDefault();
 }
 ionViewDidEnter(){
  this.baseService.referURI="guidance";
  //  document.getElementsByTagName("ion-tab-bar")[0].style.display="flex";//进入四大主页显示
   this.statusBar.styleLightContent();
 
   if(this.baseService.platform=="iOS"){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
   }
   this.statusBar.styleLightContent();
 }
 /*是否显示tabs--end */

 

}

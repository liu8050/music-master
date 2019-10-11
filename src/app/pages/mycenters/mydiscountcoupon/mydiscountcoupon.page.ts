import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import {BaseService} from '../../../service/base.service';
import to from 'await-to-js';
import { Storage } from '@ionic/storage'
@Component({
  selector: 'app-mydiscountcoupon',
  templateUrl: './mydiscountcoupon.page.html',
  styleUrls: ['./mydiscountcoupon.page.scss'],
})
export class MydiscountcouponPage implements OnInit {
  islh=false;//是否为刘海屏
  index = 0;
  flag = true;
  showList = true;
  ticketlist = []; // status 1
  ticketlist_used = []; // status 2
  ticketlist_timeout = []; // status 3
  ticketlist_all = []; // 未领取的其它优惠券 status 0
  constructor(
      private http: HttpClient,
      private router: Router,
      private location: Location,
      private httpService: HttpService,
      private userService: UserService,
      private baseService: BaseService,
      public Storage: Storage) {
    // this.ticketList_get()
    // this.baseService.presentLoading("加载中...")
  }
  ngOnInit(): void {


    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    this.ticketList_get(1);
    setTimeout(() => {
      this.ticketList_get(2);
    }, 500);
    setTimeout(() => {
      this.ticketList_get(3);
    }, 1000);
    this.ticketwlq_get();
  }

  // ionViewWillEnter() {
  //   this.ticketList_get(1);
  //   setTimeout(() => {
  //     this.ticketList_get(2);
  //   }, 500);
  //   setTimeout(() => {
  //    this.ticketList_get(3);
  //   }, 1000);
  //   setTimeout(() => {
  //    this.ticketList_get(0);
  //   }, 1500);
  //
  //   // this.ticketlist_timeout=this.ticketList_get(3);
  //   // this.ticketlist_all=this.ticketList_get(0);
  // }
  //
  async ticketList_get(status) {//获取优惠券信息
    // this.baseService.presentLoading("1")
    let r, err;
    let filters = this.userService.filters;
    filters.uid = this.userService.data.id;
    filters.status = status;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserTicketList));
    // this.baseService.dismissLoading();
    if (r.code == 20000) {
      
      if (status == 1){
      this.ticketlist = r.data;
      }
      if(status==2){
        this.ticketlist_used = r.data;
        }
      if(status==3){
          this.ticketlist_timeout = r.data;
          }
      if(status==0){
            // this.baseService.dismissLoading();
            this.ticketlist_all = r.data;
            }
    }
  }

  //actions-active-start
  goback() {
    this.location.back();
    //this.location.open(NavComponent);
  }
  onChange(item) {
    console.log('onChange', item);
  }
  clicktest(){
    alert("me")
  }

  onTabClick(item) {
    if(item.index!=3){
      this.ticketList_get(item.index + 1);
    } else {
      this.ticketwlq_get()
    }

  }
  outcontent(){
    this.router.navigateByUrl('/app/mycenter')
    return false;
  }
  async drawTicket(id){
    this.baseService.presentLoading("");
    let r, err;
    let filters = this.userService.filters;
    filters.uid = this.userService.data.id;
    [err, r] = await to(this.httpService.request({tid: id, uid: filters.uid}, this.userService.getTicket));
    this.baseService.dismissLoading();
    if (r.code == 20000) {
      this.baseService.presentToast("优惠券领取成功","success");
      this.ticketwlq_get();
    }else{
      this.baseService.presentToast(r.msg,"danger");
    }
  }
  

  selectCard(e) {
    console.log(' ', JSON.stringify(e));
  }

  private async ticketwlq_get() {
    let r, err;
    let filters = this.userService.filters;
    filters.uid = this.userService.data.id;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserTicketWlqList));
    if (r.code == 20000) {
        // this.baseService.dismissLoading();
        this.ticketlist_all = r['data'];
    }
  }
}

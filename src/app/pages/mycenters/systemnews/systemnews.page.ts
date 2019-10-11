import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import { Storage } from '@ionic/storage';
import to from 'await-to-js';

@Component({
  selector: 'app-systemnews',
  templateUrl: './systemnews.page.html',
  styleUrls: ['./systemnews.page.scss'],
})
export class SystemnewsPage implements OnInit {
  islh=false;//是否为刘海屏
  temp: string;
  systemList = [];
  orderpaidlist = [];
  ordersuccesslist = [];
  orderclosedlist = [];
  loadingText = '消息正在加载中，请稍后。。。'; // 加载提示文字
  userfilters = Object.assign({}, this.userService.filters);

  isloading = true; // 判断是否需要继续加载
  constructor(
      private router: Router,
      private location: Location,
      private httpService: HttpService,
      private userService: UserService,
      private storage: Storage
    // private router: Router
  ) {

  }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

  }
  ionViewWillEnter() {
    // console.log(this.dbservice.getLocalVal('userdata'))
    // console.log(this.dbservice.getLocalVal('token'))
    console.log('每次进入页面都会进行的处理')
    this.messageList_get();
  }
  async  messageList_get() { // 获取全部订单
    let r, err;
    const  filters = Object.assign({}, this.userService.filters);
    filters.uid = this.userService.data.id;
    [err, r] = await to(this.httpService.request(filters, this.userService.urisystemnews));
    if (r.code === 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      if (r['data'] == null) {
        return;
      }
      this.systemList = r['data'];
      // this.hotNews=r["data"];
    }
  }
  async loadData(event, a) {// 下拉刷新
    console.log('下拉刷新')
    if (this.isloading) {
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.userfilters.page = this.userfilters.page + 1;
    [err, r] = await to(this.httpService.request(this.userfilters, this.userService.urisystemnews));
    if (r.code == 20000 && r.data != null) {
      this.systemList = r['data'];
      // this.orderlist.push(r.data);
      this.userfilters.page = r['page'];
      event.target.complete();
      return;
    }
    this.loadingText = '资源已经完全加载完毕'
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  accordion(index, temp) {
    this.temp = temp + index;
  }
  goback() {
    this.location.back();
    // this.location.open(NavComponent);
  }
  viewGoods(id) {
    this.router.navigateByUrl('/app/mycenter/systemnewstxt/' + id);
  }
  outmycenter(){
    this.router.navigateByUrl('/app/mycenter')
    return false;
  }
}

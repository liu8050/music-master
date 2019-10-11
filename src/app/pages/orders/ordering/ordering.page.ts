import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { CourseService } from '../../../structs/course.service';
import { OrderService } from '../../../structs/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {BaseService} from '../../../service/base.service';
import { UserService } from '../../../structs/user.service';
import { NavController } from '@ionic/angular';
import to from 'await-to-js';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage {
  islh=false;//是否为刘海屏
  dprice = this.router.snapshot.paramMap.get('dprice'); // 获取课程
  Id = this.router.snapshot.paramMap.get('Id'); // 获取订单ID
    id=this.router.snapshot.paramMap.get('odernumber')
  Courses:  any = this.orderService.inpay;
  zfs: '1';
   public paytype:any ='0';
  paying = false;
  paying1 = false;
  // var createTime;//订单创建时间
  // var curTime;//当前时间
  // var totalSecond;//设置计时总时间（分钟）

  totalSecond = 15 * 60;
  payClass = true;
  payCountDown = '';
  payCountDownS = '';
  payCountDownM = '';
  confirmPay = false;
  constructor(
    private httpService: HttpService,
    private courseService: CourseService,
    private orderService: OrderService,
    private Router: Router,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private baseService: BaseService,
    private userService: UserService,
    private nav: NavController,
  ) {
    console.log(this.Id)
    console.log(this.dprice)
    console.log(this.zfs)
    console.log(this.paytype)
    console.log(this)
    this.orderService.orderdata.dprice=this.dprice;
    this.orderService.orderdata.id=this.Id;
    console.log(this.paytype)
    setInterval(() => {
      this.interval();
    }, 1000);
  
  }
  async create_pay() {



    








}
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    console.log("我是:",this.orderService.inpay,"用户信息:",this.userService)

  }

  ionViewWillLeave(){
    this.baseService.dismissLoading();
  }

  ionViewDidEnter(){
    let tm = false;
    console.log(22)
    if (this.userService.islogin) {
      this.userService.mycourse.forEach(item => {
        if (item.product_id == this.Id) {
          tm = true; // 已经购买课程
        }
      });
    }
    if (tm) {
      // this.isowner=true;//反向，为TRUE时，则为未购买

      this.nav.pop();

    }
  }

  // changepaytype(t){
  //   console.log(t)
  //   this.paytype=t
  //   console.log(this.paytype)
  //   if(t!=this.paytype){
  //   this.paying=false;


  //  }

  //   this.paytype=t;
  //   console.log(t)
    
  // }
  // 定时器
  interval(){
    if (this.totalSecond >= 0) {
      var t1 = Math.floor(this.totalSecond / 60);
      var m = t1 < 10 ? "0" + t1 : t1;
      var t2 = this.totalSecond - t1 * 60;
      var s = t2 < 10 ? "0" + t2 : t2;
      this.totalSecond = this.totalSecond - 1;
      // this.payClass = true;//添加class
      //this.payCountDown = "" + m + ":" + s + ""
      this.payCountDownM = "" + m;
      this.payCountDownS = s + "";

    } else {
      //  this.confirmPay = true;
      //   this.payClass = true;//添加class
      this.payCountDown = "支付超时，请重新下单！";
    }
  }
}

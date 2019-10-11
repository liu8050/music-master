import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../service/http.service'
import { CourseService } from '../../../structs/course.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OrderService } from '../../../structs/order.service'
import { UserService } from '../../../structs/user.service'
import to from 'await-to-js';
@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.page.html',
  styleUrls: ['./ordered.page.scss'],
})
export class OrderedPage implements OnInit {
  islh=false;//是否为刘海屏
  // var createTime;//订单创建时间
  // var curTime;//当前时间
  // var totalSecond;//设置计时总时间（分钟）
  imgs ='/assets/images/ic_pay@2x.png';
  cid = 0;
  Id = this.router.snapshot.paramMap.get('Id');//获取课程ID
  pay = this.router.snapshot.paramMap.get('pay');//获取支付结果
  courseList = [];
  totalSecond = 15 * 60;
  payClass = true;
  payCountDown = '';
  baseFromUrl="";
  backurl='/coursedetails/'+this.router.snapshot.paramMap.get('Id');
  confirmPay = false;
  constructor(private httpService: HttpService,
    private courseService: CourseService,
    private Router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer) {
      console.log(this.backurl)
      let turl=this.Router.getCurrentNavigation().extractedUrl.toString();
      this.baseFromUrl=turl.substr(0,turl.indexOf("/ordered"))//解决回退问题

    setInterval(() => {
      // this.interval();
    }, 1000);
  }

  ngOnInit() {
    //留海屏
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    if(this.pay=="1"){

      this.imgs="/assets/images/ic_pay@2x.png"
      this.get_mycourse();//更新已经购买课程列表-------精品？



    }else{
      this.imgs="/assets/images/oderErro2.png"


      
    }



    this.courseList_get()
  }


  async get_mycourse() { // 获取课程详情
    let r, err;
    [err, r] = await to(this.httpService.request({uid: this.userService.data.id,rows:2000}, this.userService.urimycourse));
    if (r['data'] == null) {
      return;
    }
    if (r.code == 20000) {
      
      this.userService.mycourse=r.data;
      // this.baseService.myalert(JSON.stringify(this.userService.mycourse));
      
      // this.userService.saveSetting = r['data']
      // this.userService.mycourse.set
      // this.router.navigateByUrl('/mycenter')
    } 
  } 


  go_pay(){
    //去支付 // 第一个参数,是否是精品课程 // 第二个参数，课程ID // 课程名 // 价格 // 课程图片
    // alert(JSON.stringify(this.orderService.inpay));
    // this.Router.navigateByUrl('/order/'+this.orderService.inpay.type+'/'+this.orderService.inpay.data["Id"]);
    this.Router.navigateByUrl(this.baseFromUrl+'/ordering'+'/'+this.orderService.orderdata.dprice+'/'+this.orderService.orderdata.id);
  }

  go_learn(){
    if(this.orderService.inpay.type==0){
    this.Router.navigateByUrl(this.baseFromUrl+'/coursedetails/'+this.orderService.inpay.data["id"]);
    }else{
    this.Router.navigateByUrl(this.baseFromUrl+'/seriescourses/'+this.orderService.inpay.data["id"]);
    }
  }


  // 定时器
  async courseList_get() { // 获取课程推荐列表
    let r, err;
    let filters = Object.assign({}, this.courseService.filters);
    // filters.cid = '0';
    filters.rows='6';
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriCourseList));
    if (r.code == 20000) {
      if (r['data'].length == undefined) {
        // 这里可以判断是否显示 nothings(组件)
        return;
      }
      if (r['data'].length <= 4) {
        this.courseList = r.data
        return; // 判断是否大于4个 需求是小于4个推荐
      }
      r.data.forEach((element, index) => {
        if (index <= 4) {
          this.courseList.push(element)
        }
      });
      // this.course.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
    }
  }
}

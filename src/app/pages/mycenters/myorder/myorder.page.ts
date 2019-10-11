import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { CourseService } from '../../../structs/course.service'
import { OrderService } from '../../../structs/order.service'
import {BaseService} from '../../../service/base.service'
import { Storage } from '@ionic/storage'
import { ModalController ,AlertController} from '@ionic/angular';
// import { EmailComponent } from '../../../components/email/email.component';
import to from 'await-to-js';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {
  islh=false;//是否为刘海屏
  index = 0;
  orderlist = []
  orderpaidlist = []
  ordersuccesslist = []
  baseFromUrl=""
  orderclosedlist = []
  cpage=[1,1,1,1];
  reseting=false;
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  userfilters = Object.assign({}, this.userService.filters);

  isloading = true; // 判断是否需要继续加载
  constructor(
        public AlertController: AlertController,

              private Router: Router,
              private location: Location,
              private httpService: HttpService,
              private userService: UserService,
              private courseService: CourseService,
              private baseService:BaseService,
              private orderService:OrderService,
              private storage: Storage,
              public modalController: ModalController) {

                let turl=this.Router.getCurrentNavigation().extractedUrl.toString();
                this.baseFromUrl=turl.substr(0,turl.indexOf("/ordered"))//解决回退问题

                
               }
  ionViewWillEnter() {
    // console.log(this.dbservice.getLocalVal('userdata'))
    // console.log(this.dbservice.getLocalVal('token'))
    console.log('每次进入页面都会进行的处理')
    this.resetorders();
    // this.orderList_get(-1)
    // this.orderList_get(0)
    // this.orderList_get(1)
    // this.orderList_get(2)
  }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

  }
  isArray(arr){
    return Array.isArray(arr);
  }
  async orderList_get(a) {// 获取全部订单
    let r, err;
    const filters = Object.assign({}, this.userService.filters);
    filters.uid = this.userService.data.id;
    filters.status = a;
    filters.rows=10;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserOrderList));
    if (r.code == 20000) {
      if(r['data'] == null){
        return;
      }
      r['data'].forEach((element, index) => {
         if(a == -1){
           this.orderlist.push(element)
           console.log(this.orderlist)
         }
         if(a == 0){
           this.orderpaidlist.push(element)
         }
        if (a == 1) {
          this.ordersuccesslist.push(element)
          console.log(this.ordersuccesslist)
        }
        if (a == 2) {
          this.orderclosedlist.push(element)
        }
          this.isloading = false;
          // console.log(this.orderlist)
      });
      // this.hotNews=r["data"];
    }
  }
//    this.Router.navigateByUrl('/order'+'/'+item.pay_price+'/'+item.id+'/'+item.order_no);
  resetorders(){

    this.orderlist = []
    this.orderpaidlist = []
    this.ordersuccesslist = []
    this.orderclosedlist = []
    
    this.reseting=true;
    this.orderList_get(-1)
    this.orderList_get(0)
    this.orderList_get(1)
    this.orderList_get(2)
    setTimeout(() => {
      this.reseting=false;
    }, 500);
    
  }
  async getMusicbyEmail(item) {
    // const courseId = item;
    // const modal = await this.modalController.create({
    //   cssClass: ['modalClass'],
    //   showBackdrop: true,
    //   component: EmailComponent,
    //   componentProps: { value: '', id: courseId }
    // });
    // return await modal.present();
    // alert(item)
      console.log(item,this.userService.data.email)
    // alert(2)
    // return false
    // alert(1)
    if (this.userService.data.email== ''){
      this.baseService.presentToast('请到个人中心中，先完善自己的邮箱信息', 'danger')
      this.Router.navigateByUrl('/app/mycenter/editmymessage');
      return false;
    }

    if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.userService.data.email))) {
     
      this.baseService.presentToast("请到个人中心中，先完善自己的邮箱信息", 'danger')
      this.Router.navigateByUrl('/app/mycenter/editmymessage');
      return false;
    }
    let r, err;
    const filters = Object.assign({}, this.userService.filters);
    // filters.uid = this.userService.data.id;
    
    [err, r] = await to(this.httpService.request({uid: this.userService.data.id, pid: item.opid, email: this.userService.data.email}, this.userService.uriMusicEmail));
    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理success
      this.baseService.presentToast('发送成功', 'success')
    }else if(r.code==40300){
      this.baseService.presentToast(r.error, 'danger')
    }


  } // 获取曲谱
  outcontent(){
    this.Router.navigateByUrl('/app/mycenter')
    return false;
  }
  async go_pay(item) {
    // alert(JSON.stringify(item))
    // this.Router.navigateByUrl('/app/home/order/' + isxl + '/' + Id)
    // this.orderService.inpay.data = this.course;

  //data-init-start
    this.baseService.presentLoading("");
    let r, err;
    let filters = Object.assign({}, this.courseService.filters);
    filters.id = item.opid;
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriInfo));

    if (r.code == 20000) {
      this.baseService.dismissLoading();
     this.orderService.inpay.data =r["data"]; 
     this.Router.navigateByUrl('/order'+'/'+item.pay_price+'/'+item.id+'/'+item.order_no);
    //  this.Router.navigateByUrl('/ordering'+'/'+item.pay_price+'/'+item.id+'/'+item.order_no);
     
    }



   
  }
  async cancelModal(item) {

    
    const alert = await this.AlertController.create({
      header: '您确定取消订单吗',
      // message: '你好啊',
      buttons: [
        {
          text: '确定',
          handler: async () => {
            // 原始数据
            let r, err
            ;[err, r] = await to(
              this.httpService.request(
                { id: item },
                this.userService.uriOrderCal
              )
            )
            console.log(r)
            if (r.code == 20000) {
              // if (r['data'] == null) {
              //   return;
              // }
              this.resetorders()

              // this.orderList_get(this.index-1);
              // this.hotNews=r["data"];
            }
            // 原始数据结尾
            // console.log('您确定删除操作')
          }
        },
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('取消成功')
            return false
          }
        }
      ]
    })
    await alert.present()

  } // 取消订单
  async deleteModal(item) {
    const alert = await this.AlertController.create({
      header: '您确定删除订单吗',
      // message: '你好啊',
      buttons: [
        {
          text: '确定',
          handler: async () => {
            // 原始数据
            let r, err
            ;[err, r] = await to(
              this.httpService.request(
                { id: item },
                this.userService.uriOrderDelete
              )
            )
            console.log(r, item)
            if (r.code == 20000) {
              // 新闻热点仅限2条 所以做了循环处理
              this.resetorders()

              // if(r['data'] == null){
              //   return;
              // }
              // this.orderList_get(this.index);
              // this.hotNews=r["data"];
            }
            // 原始数据结尾
            // console.log('您确定删除操作')
          }
        },
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('取消成功')
          }
        }
      ]
    })

    await alert.present()
  } // 删除订单
  async loadData(event, a) { // 下拉刷新
    console.log('下拉刷新')
    if (this.isloading) {
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.userfilters.page = this.cpage[(a+1)] + 1;
    this.userfilters.uid= this.userService.data.id;
    this.userfilters.status=a;
    [err, r] = await to(this.httpService.request(this.userfilters, this.userService.uriUserOrderList));
    if (r.code == 20000 && r.data != null) {
      r['data'].forEach((element, index) => {
        if (a == -1) {
          this.orderlist.push(element)
        }
        if (a == 0) {
          this.orderpaidlist.push(element)
        }
        if (a == 1) {
          this.ordersuccesslist.push(element)
          console.log(this.ordersuccesslist)
        }
        if (a == 2) {
          this.orderclosedlist.push(element)
        }
      });
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
  //actions-active-start
  onChange(item) {
    console.log('onChange', item);
  }

  onTabClick(item) {
    // alert(JSON.stringify(item))
    // this.orderList_get(parseInt(item.index)-1);
  }

  goback() {
    this.location.back();
    //this.location.open(NavComponent);
}
}

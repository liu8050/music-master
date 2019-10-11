import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service'
import { CourseService } from '../../../structs/course.service'
import { OrderService } from '../../../structs/order.service'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BaseService } from '../../../service/base.service'
import { UserService } from '../../../structs/user.service'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import to from 'await-to-js';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  islh=false;//是否为刘海屏
  totalSecond = 15 * 60;
  payClass = true;
  payCountDown = '';
  payCountDownS = '';
  payCountDownM = '';
  newsurplus:any
  // 乐享卡优惠面板
  EnjoyKayou:any
  // public youhuiJia:any
  // 
  public afterPreTre:any;
  // 优惠后
  public afterYouHui:any;
  discountsID: any;
  //默认总价
  totle: any;
  //乐享卡id
  HedonicCardID:any
  // 2个必得的参数 isxl 是否是精品课程 1是 0否 Id 无论是精品课程还是普通课程的Id
  isxl = this.router.snapshot.paramMap.get('isxl'); // 是否是精品课程
  Id = this.router.snapshot.paramMap.get('Id'); // 获取课程ID
    user = {
      id: 0
    };
  cardNum = '';
  cardPrice = '';
  cardId = '';//乐享卡ID
  tickettext = '暂无优惠券可用';
  ticket_id="";
  isowner = false

  ticketlist = [];// status 1
  // ticketlist_used =[];// status 2
  ticketlist_all =[];//未领取的其它优惠券 status 0
  course :any;//课程详情
  Courses:any = this.orderService.inpay;
  state = {
    card: true,
    discountcoupon: false,
    bill: false,
    modal4: false
  };
  index = 0;
  //余额
  
  //userInfo={this.router.snapshot.paramMap.get('surplus')};
  userInfo = {surplus:'' };
;

  constructor(
    private httpService: HttpService,
    private courseService: CourseService,
    private orderService: OrderService,
    private Router: Router,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public storage:Storage,
    private baseService:BaseService,
    private userService:UserService,
    private nav: NavController,
  ) {
    this.course=this.Courses.data;
    this.totle =this.course.dprice ;
    console.log(this.newsurplus)
    setInterval(() => {
      this.interval();
    }, 1000);
  }

  ngOnInit() {
    
    this.isxl = this.router.snapshot.paramMap.get('isxl'); // 是否是精品课程
    this.Id = this.router.snapshot.paramMap.get('Id'); // 获取课程ID
    console.log(this.Id)
    this.load_courseInfo();
    this.ticketList_get(1);
    this.ticketwlq_get();

    this.getuserInfo();
      //留海屏
      let h_m=window.screen.height;
      let w_m=window.screen.width;
      if(h_m/w_m>18/9){
        this.islh=true;
      }
    //this.userInfo.surplus = '20.22';
    // this.get_ticketList(0);
    // this.get_ticketList(1);
    // this.storage.get('user').then((value) =>{
    //   console.log(this.tickettext)
    //   if (value == null) {
    //     // 提醒去登录，还未登录
    //     this.baseService.presentToast("您还没有登录，请登录后再购买", "danger");
    //     return
    //   }
    //   this.user = value;

    // })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.isoder()
  }
  isoder(){
    // this.userInfo.surplus-this.course.dprice
    console.log(1)
    console.log(this.userInfo)

  }
  async getuserInfo(){
    let r, err;
    [err, r] = await to(this.httpService.request({id: this.userService.data.id}, this.userService.uriUserInfo));
    console.log(r)
    if (r['data'] == null) {
      return;
    }
    //console.log("返回的数据",r)
    if (r.code == 20000) {
      this.userInfo=r.data;
      this.isoder()
      // if(this.userInfo.surplus )
      //console.log("我执行了")
      // this.baseService.myalert(JSON.stringify(this.userInfo));
    }

  }

  ionViewDidEnter(){
    let tm=false;
    if(this.userService.islogin){
      this.userService.mycourse.forEach(item => {
        if(item.product_id==this.Id){
          tm=true;//已经购买课程
        }
      });
    }
    if(tm){
      // this.isowner=true;//反向，为TRUE时，则为未购买
      this.baseService.presentToast("该课程已经购买，请误重新购买","warning");
      this.nav.pop();

    }
  }

  // async get_ticketList(a) { // 获取课程详情
  //   let r, err;
  //   let filters = Object.assign({}, this.userService.filters);
  //   filters.uid = this.user.id;
  //   filters.rows = 50;
  //   filters.status = a;
  //   [err, r] = await to(this.httpService.request(filters, this.userService.uriUserTicketList));
  //   if (r.code == 20000) {
  //     if(a == 0){
  //       this.noticket = r["data"];
  //     }
  //     if(a == 1){
  //       this.yeticket = r['data'];
  //       if(r['records'] != 0){
  //         this.tickettext = r['records']+'张优惠券可用'
  //       }
  //     }
  //   }
  // }
  async load_courseInfo() { // 获取课程详情
    let r, err;
    let filters = Object.assign({}, this.courseService.filters);
    filters.id = this.Id;
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriInfo));
    console.log(r)
    if (r.code == 20000) {
      console.log(this.newsurplus =( parseFloat(this.userInfo.surplus)*1000-this.course.dprice*1000)/1000)
      this.course = r['data'];
      this.course.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
      // 回调后写
      // this.courseList_get()
    }
  }
  async create_order(){

    let r, err;
    let datas = Object.assign({}, this.orderService.data);
    let filters = Object.assign({}, this.orderService.filters);
    datas.user_id = '1';
    datas.isxl = this.isxl;
    datas.card_id = '';
    datas.opid = this.Id;
    datas.isfq = '0';
    datas.ticket_id = '';
    datas.remark = '';
    // console.log( datas.user_id ,   datas.isxl , datas.card_id, datas.opid,    datas.isfq,   datas.ticket_id, this.baseService.platform)
    // return
    [err, r] = await to(this.httpService.request({ user_id: this.userService.data.id,
                                                   isxl: this.isxl,
                                                   card_id:this.cardId,//使用乐享卡
                                                   opid:this.Id,
                                                   platform:this.baseService.platform,
                                                   isfq:0,
                                                   ticket_id:this.ticket_id,
                                                   remark:'' }, this.orderService.uricreate));
    console.log(r)
    if (r.code == 20000) {
      // this.Router.navigateByUrl('/ordering');
      this.baseService.presentToast("支付成功","success")
      this.Router.navigateByUrl('/ordered'+'/'+this.Id+'/1');
      // if(this.baseService.platform=='iOS'&&r.ismf == 3){
      //   this.baseService.presentToast("支付成功","success")
      //   this.Router.navigateByUrl('/ordered'+'/'+this.Id+'/1');
      // }


      if(r.ismf == 1||r.ismf == 2||r.ismf == 3){
        this.Router.navigateByUrl('/ordered'+'/'+this.Id+'/1');
        return;
      }
      
   
  
      // if(this.baseService.platform!="iOS"){
      // this.Router.navigateByUrl(`/ordering/${this.course.dprice}/${r.order_id}/${r.order_no}`);
      // }


    }

    if(this.baseService.platform=='iOS'&&r.code==20001){
      this.baseService.presentToast("余额不足，请充值","danger")
      this.Router.navigateByUrl('/mymoney')

    }

    if (r.code == 40300) {
      
      this.baseService.presentToast(r.error,"danger");
    }


  }

  //
  async ticketList_get(status) {//获取优惠券
    let r, err;
    let filters = this.userService.filters;
    filters.uid = this.userService.data.id;
    filters.status=status;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserTicketList));
    // console.log(r)
    if (r.code == 20000) {
      if(status==1){
      this.ticketlist = r.data
      }
      if(r.data!=null){
        this.tickettext="选择优惠券";
      }
      if(status==0){
        this.ticketlist_all = r.data
      }
    }
  }


  // async drawTicket(id){
  //   this.baseService.presentLoading("");
  //   let r, err;
  //   let filters = this.userService.filters;
  //   filters.uid = this.userService.data.id;
  //   [err, r] = await to(this.httpService.request({tid: id, uid: filters.uid}, this.userService.getTicket));
  //   this.baseService.dismissLoading();
  //   if (r.code == 20000) {
  //     this.baseService.presentToast("优惠券领取成功","success");
      
  //     this.ticketwlq_get();
  //     this.ticketList_get(1);
  //   }else{
  //     this.baseService.presentToast(r.msg,"danger");
  //   }
  // }
  


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

  async getTicket(tid){//领取优惠券

    let r, err;
    // this.baseService.presentLoading("");
    [err, r] = await to(this.httpService.request({tid:tid,uid:this.userService.data.id}, this.userService.getTicket));
    if (r.code == 20000) {
      // this.onClose("card");
      this.baseService.presentToast("领取成功","success");
      this.ticketList_get(1);
      setTimeout(() => {
        this.ticketList_get(0);
      }, 500);
    }else if(r.code==40300){
      this.cardNum='';
      this.baseService.presentToast("领取失败","danger");
    }
  }

  async useCard(){
    // if(this.cardNum){
    //   this.totle
    // }
    
    if(this.cardNum==""){
      this.baseService.presentToast("请输入正确的乐享卡号码！","danger");
      return;
    }
    
    console.log(this.cardNum)
    let r, err;
    // this.baseService.presentLoading("");
    [err, r] = await to(this.httpService.request({code:this.cardNum}, this.userService.uriisCard));
    console.log(r, this)
     this.EnjoyKayou=r.price
     console.log(this.EnjoyKayou)
    // thisHedonicCardID  =r.id
    // if(this.afterPreTre!=undefined){
    //   this.course.dprice=this.afterPreTre-r.price
    //  return false
    // }
    if (r.code == 20000) {
    // console.log(this.afterPreTre)
    // // 改
  
    //   console.log(this.course.dprice)
      // if(this.afterPreTre==undefined){
        // console.log(r.price,this.youhuiJia)
        this.cardPrice=r.price;
        this.cardId=r.id;
        this.course.dprice=this.course.dprice-r.price;

      // }

      if(this.course.dprice<0){
        this.course.dprice=0;
      }
      this.onClose("card");
    }else if(r.code==40300){
      this.cardNum='';
      this.baseService.presentToast("无效的乐享卡号码，请重新输入","danger");
    }
    // if(this.youhuiJia!==undefined){
    //   this.course.dprice=this.course.dprice-r.price-this.youhuiJia;
    // }
  }
  useTicket(item){
    // this.discountsID =item.id 
    // console.log(this.afterPreTre)
    // this.youhuiJia=item.price
    // =item.price 
    this.afterYouHui=item.price+`优惠券价钱`
    // console.log(this.afterYouHui)
    this.tickettext = '￥' + item.price + '元'
    // console.log(this.discountsID ,  this.totle  ,item,this.course.dprice) 
    // if (items >= this.course.dprice) {
    // console.log(parseFloat(this.totle))
    if (this.discountsID !== item.id  ) {
   
      this.course.dprice = this.course.dprice- item.price
      this.afterPreTre= this.course.dprice
      console.log(this.course.dprice )
      this.discountsID = item.id
    }

    if (this.totle > this.course.dprice && this.discountsID ===item.id)  {
      this.course.dprice = this.totle - item.price
      this.discountsID = item.id
    }
    // }
    // items = this.course.dprice.id

    // console.log(this.course.dprice)
    if (this.course.dprice < 0) {
      this.course.dprice = 0
    }
    this.ticket_id = item.id

    this.onClose('discountcoupon')
  }
  cardHeader() {
    return '使用乐享卡';
  }
  discountcouponHeader() {
    return '优惠券'
  }
  billHeader() {
    return '发票'
  }
  showModal(key) {
    console.log(key)
    console.log('showmodal')
    this.state[key] = true;
    console.log(this.state[key])
  }
  onClose(key) {
    this.state[key] = false;
  }
  onChange(item) {
    console.log('onChange', item);
  }

  onTabClick(item) {
    console.log('onTabClick', item);
  }

  selectCard(e) {
    console.log(' ', JSON.stringify(e));
  }

  changeIndex() {
    this.index = 0;
  }
  // goback() {
  //   this.nav.back()
  // }


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

import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from '../../../service/http.service'
import { CourseService } from '../../../structs/course.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NavController } from '@ionic/angular'
import { UserService } from '../../../structs/user.service'
import { BaseService } from '../../../service/base.service'
import { OrderService } from '../../../structs/order.service'
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx'
import { ActionSheetService, ToastService } from 'ng-zorro-antd-mobile'
import { en_US, ru_RU, zh_CN, sv_SE, da_DK } from 'ng-zorro-antd-mobile'
import to from 'await-to-js'
import { StatusBar } from '@ionic-native/status-bar/ngx' //手机状态颜色
declare var Wechat: any
declare var WeiboSDK: any

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss']
})
export class CoursedetailsPage implements OnInit {
 
  course: any = {
    content: null,
    title: null,
    picurl: null,
    dprice: null,
    cid: null
  } //课程详情
  temp = 'show0'
  courseList = [] // 推荐课程列表
  islh=false;//是否为刘海屏
  baseFromUrl = ''
  videourl = null
  skeleton = true
  isowner = false //是否已经购买了此课程 ---反向
  Id = this.router.snapshot.paramMap.get('Id') //获取课程ID
  index = 0
  activeKey = [0, 1]
  constructor(
    private statusBar: StatusBar,
    private httpService: HttpService,
    private courseService: CourseService,
    private orderService: OrderService,
    private Router: Router,
    private baseService: BaseService,
    private router: ActivatedRoute,
    private qq: QQSDK,
    private nav: NavController,
    private userService: UserService,
    private _actionSheet: ActionSheetService,
    private _toast: ToastService,
    private sanitizer: DomSanitizer
  ) {
    let turl = this.Router.getCurrentNavigation().extractedUrl.toString()
    this.baseFromUrl = turl.substr(0, turl.indexOf('/coursedetails')) //解决回退问题
    this.baseFromUrl = ''
  }
  ionViewWillLeave() {
    //  document.getElementsByTagName("ion-tab-bar")[0].style.display="none";//离开四大主页隐藏
    this.statusBar.styleDefault()
    console.log(this.baseService.platform)
    // return
    if (this.baseService.platform == 'iOS') {
      this.statusBar.backgroundColorByName('black')
      this.statusBar.styleDefault()
    }
  }
  //点击展开折叠
  accordion(index, temp) {
    this.temp = temp + index
  }

  ngOnInit() {
    console.log(this.course)
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

  }

  ionViewDidEnter() {
    this.load_courseInfo()
    let tm = false

    if (this.userService.islogin) {
      this.userService.mycourse.forEach(item => {
        if (item.product_id == this.Id) {
          console.log(item.product_id == this.Id)
          tm = true //已经购买课程
        }
      })
    }
    if (!tm) {
      console.log(tm)
      this.isowner = true //反向，为TRUE时，则为未购买
      console.log(this.isowner)
    } else {
      setTimeout(() => {
        this.isowner = false
        console.log(2)
      }, 500)
    }
  }

  //data-init-start
  async load_courseInfo() {
    // 获取课程详情
    let r, err
    let filters = Object.assign({}, this.courseService.filters)
    filters.id = this.Id
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriInfo)
    )

    if (r.code == 20000) {
      this.course = r['data']
      console.log(this.course)
      this.course.content = this.sanitizer.bypassSecurityTrustHtml(
        r['data'].content
      )
      // 回调后写
      this.courseList_get()
    }
  }
  async courseList_get() {
    // 获取课程推荐列表
    let r, err
    let filters = Object.assign({}, this.courseService.filters)
      // filters.cid = this.course.cid;
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriCourseList)
    )
    if (r.code == 20000) {
      if (r['data'].length == undefined) {
        // 这里可以判断是否显示 nothings(组件)
        return
      }
      // if(r['data'].length <=4){
      //   this.courseList = r.data
      //   return; // 判断是否大于4个 需求是小于4个推荐
      // }
      this.courseList = r['data'].splice(0, 6)
      // r.data.forEach((element,index) => {
      //   if(element.id!=this.Id&&this.courseList.length<7){
      //     this.courseList.push(element)
      //   }
      // });
      this.skeleton = false
      // this.course.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
    }
  }

  playvideo(item, i, t) {
    if (item.issf == '0' || !this.isowner) {
      // this.videourl=item.file;
      // let tv:any;
      // tv=document.getElementById('showvideo')
      // tv.play();
      // this.baseService.myalert(0)
      // console.log(item,i,t)
      // return
      this.Router.navigateByUrl(
        this.baseFromUrl + '/study/' + this.Id + '/' + i + '/' + t
      )
    } else {
      this.baseService.presentToast('付费课程，请购买后学习', 'danger')
    }
  }

  // playvideo(item){
  //   if(item.issf=='0'){
  //     this.videourl=item.file;
  //     let tv:any;
  //     tv=document.getElementById('showvideo')
  //     tv.play();
  //   }else{
  
  //   }

  //   }

  onChange(item) {
    console.log('onChange', item)
  }

  onTabClick(item) {
    console.log('onTabClick', item)
  }

  selectCard(e) {
    console.log(' ', JSON.stringify(e))
  }

  changeIndex() {
    this.index = 0
  }

  go_pay() {
    // 去支付 // 第一个参数,是否是精品课程 // 第二个参数，课程ID // 课程名 // 价格 // 课程图片
    this.orderService.inpay.type = 0
    this.orderService.inpay.data = this.course
    this.Router.navigateByUrl('/order/' + '0' + '/' + this.Id)
    console.log(this.Id)
  }

  showShareActionSheet = () => {
    ActionSheetService.showShareActionSheetWithOptions(
      {
        options: this.baseService.shareDataList,
        message: '分享音乐大师',
        locale: zh_CN
      },
      buttonIndex => {
        return new Promise(resolve => {
          //Toast.info('closed after 1000ms');
          // alert(buttonIndex);
          this.shareAPP(buttonIndex)
          setTimeout(resolve, 0)
        })
      }
    )
  }

  shareAPP(index) {
    // this.shareDataList[index];
    // this.baseService.myalert(index);

    if (index == -1) return

    if (index == 0) {
      let args: any = {}
      args.url = this.baseService.shareData.url
      args.title = this.baseService.shareData.title
      args.description = this.baseService.shareData.description
      args.image = this.baseService.shareData.thumb
      WeiboSDK.shareToWeibo(
        function() {
          // alert('share success');
        },
        function(failReason) {
          // alert(failReason);
        },
        args
      )
    }

    if (index == 1) {
      Wechat.share(
        {
          message: {
            title: this.baseService.shareData.title,
            description: this.baseService.shareData.description,
            thumb: this.baseService.shareData.thumb,
            mediaTagName: this.baseService.shareData.title,
            messageExt: this.baseService.shareData.title,
            // messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: this.baseService.shareData.url
            }
          },
          scene: Wechat.Scene.TIMELINE // share to Timeline
        },
        function() {},
        function(reason) {}
      )
    }
    if (index == 2) {
      Wechat.share(
        {
          message: {
            title: this.baseService.shareData.title,
            description: this.baseService.shareData.description,
            thumb: this.baseService.shareData.thumb,
            mediaTagName: this.baseService.shareData.title,
            messageExt: this.baseService.shareData.title,
            // messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: this.baseService.shareData.url
            }
          },
          scene: Wechat.Scene.SESSION // share to Timeline
        },
        function() {},
        function(reason) {}
      )
    }

    if (index == 3) {
      const options: QQShareOptions = {
        client: this.qq.ClientType.QQ,
        scene: this.qq.Scene.QQ,
        title: this.baseService.shareData.title,
        url: this.baseService.shareData.url,
        image: this.baseService.shareData.thumb,
        description: this.baseService.shareData.description
        // flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
      }

      this.qq
        .shareNews(options)
        .then(() => {})
        .catch(error => {})
    }
  }
  logScrolling(e){
    console.log(e.detail.scrollTop)
  }
  logScrollStart(){
    
  }
}

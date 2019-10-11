import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Location } from '@angular/common'
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { BaseService } from '../../../service/base.service'
import { Platform } from '@ionic/angular'
import to from 'await-to-js'
import { Storage } from '@ionic/storage'
import { ToastService } from 'ng-zorro-antd-mobile'

@Component({
  selector: 'app-tosubscribe',
  templateUrl: './tosubscribe.page.html',
  styleUrls: ['./tosubscribe.page.scss']
})
export class TosubscribePage implements OnInit {
  islh=false;//是否为刘海屏
  valmodul: any = '怎么称呼您'
  sure = true
  bfscrolltop // 获取软键盘唤起前浏览器滚动部分的高度
  datetime = '2019-1-1'
  // CurentTime:any;
  autoFocus = { focus: true, date: new Date() }
  tagList = []
  name: ''
  phone: ''
  sktime: Date
  yearvalue = new Date()
  remark: ''
  qwts = ''
  userFilters = Object.assign({}, this.userService.filters)
  mindate = new Date()
  customBackActionSubscription: any
  inputErrorClick(e) {
    // this._toast.info('Please enter 11 digits')阿
  }
  constructor(
    private _toast: ToastService,
    private router: Router,
    private location: Location,
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    public Storage: Storage,
    private nav: NavController,
    private platform: Platform
  ) {
    this.get_taglist()
    let now = new Date()
    now.setDate(now.getDate())
    this.mindate = now // 可预约日期+1

    this.customBackActionSubscription = this.platform.backButton.subscribe(
      async $event => {
        // this.nav.navigateBack('/app/guidance');
        this.baseService.myalert('back')
      }
    )
  }

  // inputErrorClick(e) {
  //   this._toast.info('Please enter 11 digits')
  // }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

    this.bfscrolltop = document.body.scrollTop
  }
  async get_taglist() {
    //获取期望提升技能接口
    let r, err
    let filters = this.userFilters
    ;[err, r] = await to(
      this.httpService.request(filters, this.userService.uriUsertag)
    )

    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      if (r['data'] == null) {
        return
      }

      this.tagList = r['data']
      this.tagList.forEach((element, index) => {
        element.choose = false
      })
      // this.hotNews=r["data"];
    }
  }
  onfocus() {
    alert(1)
  }
  choose(choose, id) {
    console.log(id, this.tagList)
    this.tagList.forEach((element, index) => {
      if (element.id == id) {
        if (element.choose) {
          element.choose = false
        } else {
          element.choose = true
        }
      }
    })
  }
  CurentTimes(now) {
    //         var now = new Date();
    var year = now.getFullYear() //年
    var month = now.getMonth() + 1 //月
    var day = now.getDate() //日
    var hh = now.getHours() //时
    var mm = now.getMinutes() //分
    var clock = year + '-'
    if (month < 10) clock += '0'
    clock += month + '-'
    if (day < 10) clock += '0'
    clock += day + ' '
    if (hh < 10) clock += '0'
    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm
    return clock
  }

  async post_zgTeacher() {
    // 预约名师
    if (this.name == '' || this.phone == '' || this.remark == '') {
      this.baseService.presentToast('您有未填写的信息', 'danger')
    }
    if (!/^1[34578]\d{9}$/.test(this.phone.replace(/\s+/g,""))) {
      this.baseService.presentToast('手机号码格式不正确', 'danger')
      return false
    }
    this.tagList.forEach((element, index) => {
      if (element.choose) {
        console.log(element)
        this.qwts = this.qwts + ',' + element.title
      }
    })
    this.qwts = this.qwts.substr(1) //删除第一个字符
    let r, err
    ;[err, r] = await to(
      this.httpService.request(
        {
          name: this.name,
          phone: this.phone.replace(/\s+/g,""),
          sktime: this.CurentTimes(this.yearvalue),
          remark: this.remark,
          qwts: this.qwts,
          uid: this.userService.data.id
        },
        this.userService.uriUserzguide
      )
    )
    console.log(this.CurentTimes(this.yearvalue))
    console.log(r)
    if (r.code == 20000) {
      // guidance
      this.router.navigateByUrl('/app/guidance')
      this.baseService.presentMessage('预约成功')
    } else {
      this.baseService.presentToast(r['error'], 'danger')
    }
  }

  hidingSure(item) {
    this.sure = false
  }
  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString())
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()))
  }
  onOk1(result: Date) {
    // this.name1 = this.currentDateFormat(result);
    this.yearvalue = result
    this.sure = true
  }
  dismiss() {
    this.sure = true
  }
  focusInput() {
    // alert(1)
    document.body.scrollTop = document.body.scrollHeight
  }

  blurInput() {
    document.body.scrollTop = this.bfscrolltop
  }

  // goback() {
  //   // this.location.back();
  //   // this.nav.navigateBack("/app/guidance");
  //   this.nav.pop();
  //   this.nav.setTopOutlet
  //   //this.location.open(NavComponent);

  // }

  /*是否显示tabs--start */
  ionViewWillLeave() {
    this.baseService.referURI = 'guidance'
  }

  // goback(){
  //   this.location.back();
  //   //this.location.open(NavComponent);

  // }
}

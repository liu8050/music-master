import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../service/http.service'
import { WelcomeService } from '../../structs/welcome.service'
import { CourseService } from '../../structs/course.service'
import { NewsService } from '../../structs/news.service'
import { VideoService } from '../../structs/video.service'
import { BaseService } from '../../service/base.service'
import { MastersService } from '../../structs/masters.service'
import { UserService } from '../../structs/user.service'
import to from 'await-to-js'
import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { Platform } from '@ionic/angular';

declare var BaiduMobStat: any

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  islh=false;//是否为刘海屏
  // 测试失败加载图
  searchValue:any=''
  errIMG=''
  @ViewChild('homeContent') homeContet: any
  isheight:any=window.screen.width
  imgArr = []
  gengduo = './assets/images/gengduo.png'
  errImg = './assets/images/errImg.png'
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom: false
  }

  //   ionNavDidChange(){
  //     this.baseService.myalert("ionNavDidChange")
  //   }
  // ionNavWillChange(){
  //   this.baseService.myalert("ionNavWillChange")
  // }
  // ionNavWillLoad(){
  //   this.baseService.myalert("ionNavWillLoad")

  // }
  // ionViewDidLoad(){
  //   this.baseService.myalert("ionNavDidChange")
  // }
  // ionViewWillEnter(){
  //   this.baseService.myalert("ionNavDidChange")
  // }
  // // ionViewDidEnter(){
  // //   this.baseService.myalert("ionNavDidChange")
  // // }
  // // ionViewWillLeave(){
  // //   this.baseService.myalert("ionNavDidChange")
  // // }
  // ionViewDidLeave(){
  //   this.baseService.myalert("ionNavDidChange")
  // }
  // ionViewWillUnload(){
  //   this.baseService.myalert("ionNavDidChange")
  // }
  // ionViewCanEnter(){
  //   this.baseService.myalert("ionNavDidChange")
  // }
  // ionViewCanLeave(){
  //   this.baseService.myalert("ionNavDidChange")
  // }

  /* data-start */
  imgBool: Boolean = true
  showButton: Boolean = false
  bannerdata = [] //首页banner数据
  hotNews = [] //热点信息
  courseType = [] //课程类型
  recommendMasters = [] //名师专题
  recommendVideos = [] //组合推荐视频
  recommendVideos1 = [] //推荐视频1
  recommendVideos2 = [] //推荐视频2
  coursePoster = [] //精品课程,课程海报
  newCourses = [] //最新课程
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  coursefilters = Object.assign({}, this.courseService.filters)
  isloading = true // 判断是否需要继续加载
  skeleton = true

  // @ViewChild('#img') images:any
  /* data-end */
  constructor(
    
    private router: Router,
    private httpService: HttpService,
    private welcomeService: WelcomeService,
    private newsService: NewsService,
    private courseService: CourseService,
    private mastersService: MastersService,
    private userService: UserService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private baseService: BaseService,
    private videoService: VideoService
  ) {
    this.initializeHome()
    // console.log(this)
    // console.log(this.isheight)
    // console.log(this.skeleton)
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //留海屏
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
  }

  flag = true
  index = 0

  


  RouterCoursedetails(item) {
    if (item) {
      this.router.navigate(['' + item])
    }
    return false
  }

  onSwipeDown(e) {
    // console.log(e)
  }
  initializeHome() {
    // this.statusBar.show();
    // this.statusBar.overlaysWebView(true);
    // this.statusBar.styleLightContent();
    // this.statusBar.backgroundColorByHexString('#33000000');
    // this.statusBar.styleBlackTranslucent();
    this.splashScreen.hide()
  


        this.splashScreen.hide();

      


    // set status bar to white
    this.statusBar.backgroundColorByHexString('#00000');

    Promise.all([
      this.bannerpic_get(),
      this.hotnews_get(),
      this.courseType_get(),
      this.masters_get(),
      this.videos_get(1),
      this.coursePoster_get(),
      this.newCourses_get()
    ]).then(value => {
      this.videos_get(2)
      this.skeleton = false

      // console.log(value)
      // console.log('全部执行完毕')
    })
    // this.bannerpic_get();
    // this.hotnews_get();
    // this.courseType_get();
    // this.masters_get();
    // this.videos_get();
    // this.coursePoster_get();
    // this.newCourses_get();
  }

  // 走马灯banner图
  beforeChange(event) {}

  afterChange(event) {}
  //data-init-start
  async bannerpic_get() {
    //获取首页banner图片

    let r, err
    let filters = this.welcomeService.filters
    filters.type = 'index'
    ;[err, r] = await to(
      this.httpService.request(filters, this.welcomeService.uriList)
    )
    // console.log(r)
    if (r.code == 20000) {
      this.bannerdata = r['data']
      // console.log(this.bannerdata)
    }
  }

  async get_mycourse() {
    // 获取课程详情
    let r, err
    ;[err, r] = await to(
      this.httpService.request(
        { uid: this.userService.data.id, rows: 2000 },
        this.userService.urimycourse
      )
    )
    if (r['data'] == null) {
      return
    }
    if (r.code == 20000) {
      this.userService.mycourse = r.data
      // this.baseService.myalert(JSON.stringify(this.userService.mycourse));

      // this.userService.saveSetting = r['data']
      // this.userService.mycourse.set
      // this.router.navigateByUrl('/mycenter')
    }
  }
  clasid(id){
    this.baseService.presentMessage('维护中')
      //  this.baseService.presentToast(r.data.msg,'danger')
    // this.router.navigate(['/allcourses',id])
  }
  async hotnews_get() {
    //获取首页新闻热点

    let r, err
    let filters = this.newsService.filters
      // filters.rows=2;
    ;[err, r] = await to(
      this.httpService.request(filters, this.newsService.uriList)
    )
    // console.log(r)
    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理

      // r['data'].forEach((element, index) => {
      //   if (index < 1) {
      //     this.hotNews.push(element)
      //   }
      // })
      this.hotNews = r['data'].slice(0, 1)
    }
  }
  //
  async courseType_get() {
    //获取首页课程类型

    let r, err
    let filters = this.courseService.filters
      // filters.type="index";
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriList)
    )
    // console.log(r)

    if (r.code == 20000) {
      //  console.log( )

      if(r['data']){
        r['data'].sort((a,b)=>{
          return b.sort-a.sort
        })
      }
      // console.log(this.arrImg)
      //  r['data'].forEach((item,i)=>{
      //     //
      //     // for(let i = 0 ; i<arrImg.lenght ;i++ ){
      //       // item.push(this.arrImg[i])
      //     // }
      //     // console.log(this.arrImg[i])
      //   //  console.log(item[this.arrImg[i]])
      //    item.imgurl = this.arrImg[i]
      //     // return item
      //   })
      // r['data']
      this.courseType = r.data
      console.log(this.courseType)
    }
  }



  async newCourses_get() {
    //获取首页最新课程列表

    let r, err
    let filters = this.courseService.filtersCopy
    filters.cid = '0'
    // filters.type = '0'
    filters.rows = '6'
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriCourseList)
    )
    // console.log(filters)
    //   console.log(r)
    if (r.code == 20000) {
       let len=/^[\u4e00-\u9fa5]{20,}$/
      r['data'].forEach(item => {
        if (len.test(item.title)) {
          item.titles = item.title.trim().slice(0, 20) + '...'
          console.log(item.titles)
        } else {
          item.titles = item.title
        }

        // console.log(item)
      })
      r['data'].sort((a, b) => {
        return b.sort - a.sort
      })
      // if(      this.newCourses.length&&this.newCourses.length!>1){
      //   r["data"]
      // }
      // r['data'].
      this.newCourses = r['data']
      console.log(this.newCourses)

      filters.page = r['page']
      this.showButton = true
      this.isloading = false
    }
  }
  async coursePoster_get() {
    //获取首页精品课程列表
    let r, err
    let filters = this.courseService.filters
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriPosterList)
    )
    if (r.code == 20000) {
      this.coursePoster = r['data']
      // console.log(  this.coursePoster )
    }
  }
  async masters_get() {
    //获取首页大师列表
    let r, err
    let filters = this.mastersService.filters
    ;[err, r] = await to(
      this.httpService.request(filters, this.mastersService.homeUriList)
    )
    console.log(r)  
    if (r.code == 20000) {
      this.recommendMasters = r['data']
    console.log(this.recommendMasters)
    }
  }

  async videos_get(page) {
    //获取首页大师列表
    let r, err
    let filters = this.videoService.filters
    filters.rows = 100
    // filters.page= page;
    // this.index = page;
    // filters.type="index";
    ;[err, r] = await to(
      this.httpService.request(filters, this.videoService.uriList)
    )
    // console.log(r)
    if (r.code == 20000) {
      r['data'].forEach(item => {
        // console.log(item.title.indexOf('--'))
        if (item.title.indexOf('--')) {
          item.titles = item.title.split('--')
          // console.log(item)
        }
        // item.titles = item.title.trim().slice(0, 18) + '...'
      })
      console.log(r['data'])
      r['data'].sort((a,b)=>{
        return b.sort-a.sort
      })
      this.recommendVideos1 = r['data']
      // console.log(this.recommendVideos1)
      // if (page == 1) this.recommendVideos1 = r['data']
      // if (page == 2) this.recommendVideos2 = r['data']
      // }
      // const data = this.recommendVideos1
      // const data1 = this.recommendVideos2

      // this.recommendVideos = data.map((item, index, data) => {
      //   data1.map((item1, index1, data1) => {
      //     index == index1
      //       ? (item = Object.assign(item, {
      //           id1: item1.id,
      //           title1: item1.title,
      //           video1: item1.video
      //         }))
      //       : ''
      //   })
      // })
    }
  }
  /*是否显示tabs--start */
  ionViewWillLeave() {
    //  document.getElementsByTagName("ion-tab-bar")[0].style.display="none";//离开四大主页隐藏
    this.statusBar.styleDefault()
    if (this.baseService.platform == 'iOS') {
      this.statusBar.backgroundColorByName('white')
      this.statusBar.styleDefault()
    }
  }
  ionViewDidEnter() {
    this.statusBar.styleLightContent()
    if (this.baseService.platform == 'iOS') {
      this.statusBar.overlaysWebView(true)
      this.statusBar.styleLightContent()
    }
    //   if(style_S=="default"){
    //     this.statusBar.overlaysWebView(true);
    //     this.statusBar.styleLightContent();
    //   }else{
    //     this.statusBar.overlaysWebView(false);
    //     this.statusBar.backgroundColorByName("white");
    //     this.statusBar.styleDefault();
    //   }
    // this.statusBar.backgroundColorByName("red");

    if (this.userService.islogin) {
      this.get_mycourse()
    }
    this.coursefilters.page = 1
    this.newCourses_get()
    // document.getElementsByTagName("ion-tab-bar")[0].style.display="flex";//进入四大主页显示
    BaiduMobStat.onPageStart('进入首页')
    // this.baseService.myalert("i need it:"+this.userService.islogin)
  }
  /*是否显示tabs--end */
  selectCard(e) {}
  async loadData(event) {
    //下拉刷新最新课程列表
    this.showButton = false
    if (this.isloading) {
      event.target.complete()
      return
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err
    this.coursefilters.page = this.coursefilters.page + 1
    ;[err, r] = await to(
      this.httpService.request(
        this.coursefilters,
        this.courseService.uriCourseList
      )
    )

    if (r.code == 20000 && r.data != null && r.data.length > 0) {
      this.newCourses = this.newCourses.concat(r['data'])
      this.coursefilters.page = r['page']
      event.target.complete()
      return
    }
    this.loadingText = '资源已经完全加载完毕'

    setTimeout(() => {
      event.target.complete()
    }, 500)
  }

  // ionTabsDidChange(e){
  //   this.baseService.myalert(JSON.stringify(e))
  // }

  slideDtap() {
    this.baseService.myalert(99)
    return false
  }
}

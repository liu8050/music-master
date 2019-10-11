import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service'
import { UserService } from '../../structs/user.service'
import { Storage } from '@ionic/storage'
import {BaseService} from '../../service/base.service'
import to from 'await-to-js';
@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.page.html',
  styleUrls: ['./mycourse.page.scss'],
})
export class MycoursePage implements OnInit {
  data={
    uid:1,
    course:[]
  }
  total = '';
  mycache = false;
  downnum=0;
  isloading = true;
  cacheOK: any;
  cacheIng: any;
  isshow: Boolean = false;
  skeleton = true;
  filters = Object.assign({}, this.userService.filters);
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  constructor(
    private location: Location,
    private router: Router,
    private httpService: HttpService,
    private userService: UserService,
    private baseService:BaseService,
    public storage: Storage,
  ) {


  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(1)
  }
  ionViewWillEnter() {
    // console.log('避免出现购买后没有的情况，所以每次进入页面都要重新请求一次')
    this.downnum=0;
    this.get_mycourse()
    this.load_Cache();
  }
  async get_mycourse() {
    // console.log('执行')
    // 获取课程详情
    let r, err;
    const filters = this.filters;
    filters.uid = this.userService.data.id;
    [err, r] = await to(this.httpService.request(filters, this.userService.urimycourse));
    // console.log(r['data'] == null)
    console.log(r)
    if (r.code == 20000) {
      if (r['data'] == null) {
        this.skeleton = false;
      } else {
        r['data'].forEach(element => {
          // if(element.title.indexOf('--')!==-1){
          //   element.titles=element.title.split('--')
          // }
        });
        this.data.course = r['data']
        console.log(this.data.course)
        console.log(this.data.course )
        this.total = r['total']
        this.isloading = false;
        this.skeleton = false;
        this.isshow = true;


        console.log(this.skeleton);
      }

      // this.router.navigateByUrl('/mycenter')
    }

  }

  async loadData(event) { // 下拉刷新
    if (this.isloading) {
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.filters.page = this.filters.page + 1;
    [err, r] = await to(this.httpService.request(this.filters, this.userService.urimycourse));
    if (r.code == 20000 && r.data != null) {
      this.data.course = this.data.course.concat(r['data'])
      this.total = r['total']
      this.filters.page = r['page'];
      event.target.complete();
      return;
    }
    this.loadingText = '资源已经完全加载完毕'
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  ngOnInit() {
  }
  //actions-active-start

  segmentChanged(e) {
    console.log(e.detail.value)
    if(e.detail.value=="mycache"){
      this.mycache=true;
    }else{
      this.mycache=false;
    }


  }

  load_Cache(){
    this.cacheOK=this.userService.mydownCourses;
      console.log(this.cacheOK)
    if(this.cacheOK==null) return;
    this.cacheOK.forEach((e,t)=>{

      let leftnum=0;
      let downnum=0;
      let total=0
      e.list.forEach((item,i)=>{

        if(item.state==0){
          leftnum++;
          this.downnum++;
        }
        if(item.state==1){
          downnum++;
          // this.downnum++;
        }
        total=total+item.total;
      })
     let fsize:any=total/1024/1024;
      fsize=fsize.toFixed(2);
     this.cacheOK[t].leftnum=leftnum;
     this.cacheOK[t].downnum=downnum;
     this.cacheOK[t].fsize=fsize;
    })
  }



/*是否显示tabs--start */
ionViewWillLeave(){
  // document.getElementsByTagName("ion-tab-bar")[0].style.display="none";//离开四大主页隐藏
  // this.baseService.referURI="mycourse";
 }
 ionViewDidEnter(){
  this.baseService.referURI="mycourse";
  //  document.getElementsByTagName("ion-tab-bar")[0].style.display="flex";//进入四大主页显示
 }
 /*是否显示tabs--end */


// //actions-active-end
// goCachefinishing(){
//   this.router.navigateByUrl('/app/mycourse/cachefinishing');
// }
// goCachefinished(){
//   this.router.navigateByUrl('/app/mycourse/cachefinished');
// }
// goDefaultcache(){
//   this.router.navigateByUrl('/app/mycourse/defaultcache');
// }
}

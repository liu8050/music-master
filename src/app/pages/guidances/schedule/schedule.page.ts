import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import * as moment from 'moment';
import to from 'await-to-js';
import {BaseService} from '../../../service/base.service'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  islh=false;//是否为刘海屏
  weeks:any = new Array(
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  )
  // obj:any=[
  //   {
  //     name:'zhangsan',
  //     jxtd:['耍帅','皮','dese'],
  //     avatar:'./assets/images/组 16@2x(2).png',
      
  //     shktime:'2019-9-30',
  //     state:'未开始'
  //   },  {
  //     name:'zhangsan',
  //     jxtd:['耍帅','皮','dese'],
  //     avatar:'./assets/images/@2x.png',
  //     shktime:'2019-9-30',
  //     state:'已开始'
  //   },
  //   {
  //     name:'zhangsan',
  //     jxtd:['耍帅','皮','dese'],
  //     avatar:'./assets/images/组 16@2x(2).png',
  //     shktime:'2019-9-30',
  //     state:'未开始'
  //   }
  //   ,  {
  //     name:'zhangsan',
  //     jxtd:['耍帅','皮','dese'],
  //     avatar:'./assets/images/@2x.png',
  //     shktime:'2019-9-30',
  //     state:'未开始'
  //   }
  // ]
  
  index = 0
  classList = [];
  showclasslist=[];
  day7class=[];
  classtype = 0;
  user = {
    id: 0
  }
  userFilters = Object.assign({}, this.userService.filters);
  filterTime = Object.assign({}, this.userService.filterTime);
  constructor(
    private router: Router,
    private location: Location,
    private httpService: HttpService,
    private userService: UserService,
    public  Storage: Storage,
    private nav: NavController,
    private baseService:BaseService
  ) {
   
    this.Refresh();//获取预约课程
    console.log(this.showclasslist)
  }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    this.get_class(2);
    // alert(this.showclasslist.length)
    //  this.get_class()
  }
  // time
  async get_class(time) {//获取课程接口
    console.log(time)
    this.classtype = time;
    this.index = time;
    this.classList = [];
    let r, err;
    let filters = this.userFilters;
    filters.uid = this.userService.data.id;
    // localStorage.getItem('token')
    console.log(filters.uid)
    filters.time = time;
    filters.rows = 500;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserclass));
    console.log(filters)
    console.log(r)
    if (r.code == 20000 ) {
    //   // 新闻热点仅限2条 所以做了循环处理
      if (r['data'] == null) {
        return;
      }
 

      r['data'].forEach(element => {
        // let dt=/{,}|{,}/
        console.log(element)
        if(  element.jxtd!=null){
    if(element.jxtd.indexOf(',')){
          console.log(element)
          element.jxtd=  element.jxtd.split('，')
        }else{
          element.jxtd= element.jxtd
        }
        }
    
      });
      console.log(1)
      this.classList = r['data']
      console.log(   this.classList )
      // this.show_class(2);
      // this.hotNews=r["data"];
    }
  }

  Refresh(){
    this.get_class(this.classtype);
    setTimeout(()=>{
      this.Refresh();
    },300000)
  }
  calbak(){
    history.go(-1)
  }
  goback() {
    // this.location.back();
    this.nav.navigateBack("/app/guidance");
    //this.location.open(NavC bomponent);
    // this.baseService.platform.bac

  }
  // async show_classs(index){
  //   // this.classtype = index;
  //   // this.index = index;
  //   // this.classList = [];
  //   let r, err;
  //   let filters = this.filterTime;
  //   filters.uid = this.userService.data.id;
  //   // localStorage.getItem('token')
  //   // console.log(filters.uid)
  //   filters.time = index;
  //   filters.rows = 500;
  //   [err, r] = await to(this.httpService.request(filters, this.userService.filterTime));
  //   console.log(filters)
  //   console.log(r)
  //   if (r.code == 20000) {
  //     // 新闻热点仅限2条 所以做了循环处理
  //     if (r['data'] == null) {
  //       return;
  //     }
 

  //   //   r['data'].forEach(element => {
  //   //     // let dt=/{,}|{,}/
  //   //     console.log(element)
  //   //     if(  element.jxtd!=null){
  //   // if(element.jxtd.indexOf(',')){
  //   //       console.log(element)
  //   //       element.jxtd=  element.jxtd.split('，')
  //   //     }else{
  //   //       element.jxtd= element.jxtd
  //   //     }
  //   //     }
    
  //   //   });
  //     console.log(1)
  //     this.classList = r['data']
  //     console.log(   this.classList )
  //     // this.show_class(2);

  //     // this.hotNews=r["data"];
  //   }
  // }
// TAB 旧方法
// show_class
  // show_class(index){

  //   console.log(index)
  //   this.showclasslist=[];
  //     this.index=index;

  //     if(index==2){
  //   // console.log(  this.index)
  //       this.classList.forEach((item,i)=>{
         
  //         if(item.etime==null){
  //           item.name="正在预约，请您耐心等待"
  //           this.showclasslist.push(item);
  //           console.log(  this.showclasslist.push(item))
  //         }else if(1==1){
  //           this.showclasslist.push(item);
  //         }
  //       })
  //     }
  //     if(index==0){
  //       let stime=moment().startOf('day').valueOf();
  //       let etime=moment().subtract('days', -1).valueOf();
  //       this.classList.forEach((item,i)=>{
  //         let starttime=Date.parse(item.shktime);
  //         if(item.etime==null){
  //           item.name="正在预约，请您耐心等待"
  //           this.showclasslist.push(item);
            
  //         }else if(starttime>stime&&starttime<etime){
  //           this.showclasslist.push(item);
  //         }
  //       })
  //     }

  //     if(index==1){
  //       let stime=moment().startOf('day').valueOf();
  //       let etime=moment().subtract('days', -7).valueOf();
  //       this.classList.forEach((item,i)=>{
  //         let starttime=Date.parse(item.shktime);
  //         if(item.etime==null){
  //           item.name="正在预约，请您耐心等待"
  //           this.showclasslist.push(item);
            
  //         }else if(starttime>stime&&starttime<etime){
  //           this.showclasslist.push(item);
  //         }
  //       })
  //     }


  // }

  videoPhone(classroom){
    if(classroom.state=='已开始'&&classroom.rmid.length>2){
      this.router.navigateByUrl("/app/guidance/msoup/"+classroom.rmid);
    }

  }

  /*是否显示tabs--start */
ionViewWillLeave(){
  this.baseService.referURI="guidance"
 }

  flag = true;

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


}

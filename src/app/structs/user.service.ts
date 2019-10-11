import { Injectable } from '@angular/core';
import {DbService} from '../service/db.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class  UserService {

  constructor(

    private dbService:DbService
  ) { }


//API 接口
uriOrderCal = ['api/order/cancel', 'get'] // 取消订单
uriOrderDelete = ['api/order/del', 'get'] // 删除订单
uriMusicEmail = ['api/order/music', 'post'] //发送乐谱
  uriUserActiveList = ['api/user/newslists', 'get']//获取我的活动
uriactitvties = ['api/news/questions','get']//报名项请求
uriRegister = ['api/news/answer','post']//报名活动


uriLogin = ["api/login/mlogin","post"];//list
// uriWxLogin = ['api/login/wxlogin',"get"] // 微信登录接口--不绑定手机号，此接口已经废弃
uriWxLogin = ['api/login/wxlogin_phone',"get"] // 微信登录接口--要求绑定手机号
uriQqLogin = ['api/login/qqlogin_phone',"get"] // QQ登录接口--要求绑定手机号
uriWbLogin = ['api/login/wblogin_phone',"get"] // 微博登录接口--要求绑定手机号
bingphone = ['api/login/bind','post']//手机号码绑定

recharge = ['api/user/recharge','post']//临时接口--充值成功

uriGetCode = ["api/login/code","get"]//正文如结构体关联其它接口，可继续定义

uriisCard = ["api/user/iscard","get"]//查看优惠券是否可用
getTicket = ["api/user/getticket","get"]//领取优惠券
// getTicket=["api/user/getticket","get"]//领取优惠券
uriUserTicketWlqList = ["api/user/ticketwlq", "get"]//未领取优惠券

// slq
uriUserInfo=["api/user/infos","get"] // 用户信息
uriUserEdit = ["api/user/edit", "post"] //修改用户信息
uriUserOrderList = ["api/user/order", "get"] //用户订单
uriUserTicketList = ['api/user/ticket','get'] // 用户优惠券
urisystemnews = ['api/user/message', 'get']// 系统消息

    urifeedback = ['api/user/help','post'] // 帮助反馈
urimycourse = ['api/user/product','get'] //我的课程
uriUsertag = ['api/user/tag','get'] // 获取在线指导意向接口
uriUserzguide = ['api/user/zguide','post'] // 预约名师接口
uriUserclass = ['api/user/timetable', 'get'] // 我的课程列表
// 'api/user/about'
// 'api/usr/about'
uriabout = ['api/usr/about', 'get'] // 关于maisete
uriZcxy = ['api/user/zcxy', 'get'] // 注册协议
//
//API 接口

  filters = { uid: 0, id: '', type: "0", status:-1,page:1,time:0,rows:10,keyword:"",desc:""}//查询类型，默认为零，所有跑马灯swiper图片效果，增出自些接口
  filtersRoles = { uid: 1, id: null, status:-1,type:0,page:1,time:0,rows:10,keyword:""}//查询

  filterTime={page:1,rows:10,time:0,uid:0}

logintemp={type:0,data:{openid:"",avatar:"",sex:"",name:""}}//微信或微博或QQ登录时，临时信息



data:any={url:null,link:null,token:''}
  dataRoles = { url: null, link: null, token: null}

settings:any={a4gv:false,a4ga:false,bplay:false,bitrate:"b1"}
bitratename={b1:"标清",b2:"高清",b3:"超清"}



islogin=false;
mycourse=new Map();
mydownCourses=[];//所缓存的课程ID
mycacheCourse=[];//[{key:"key",type:"mp4/jpg/mp3",localuri:"uri",loaded:12,total:100,serveurl:"serverurl",state:1}],state:1,缓存完成,0,缓存中//课件缓存

// static Islogin=false;


 async init(){
  this.data=await this.dbService.getLocalVal("userdata");
  // alert(JSON.stringify(this.data));
  if(this.data==null||this.data.length==0){
    return false;
  }
  this.mycacheCourse=await this.dbService.getLocalVal("caches"+this.data.id);
  this.mydownCourses=await this.dbService.getLocalVal("downs"+this.data.id);
  this.islogin=true;
  let ls=await this.dbService.getLocalVal("settings"+this.data.id);//本地用户初始化
  if(ls!=null)//当前用户本地设置
  {
    this.settings=ls;
  }
}
    userlocalsave(udata){
      this.data=udata;
      // this.islogin=true;
      this.dbService.setLocalVal("userdata",udata);
      // console.log('存储时'+JSON.stringify)
    }

    userlocalremove(){
      this.data=null;
      this.islogin=false;
      this.dbService.removeLocalVal("userdata");
    }

    saveSetting(s){//用户保存本地设定
      this.dbService.setLocalVal("settings"+this.data.id,s);

    }

    saveCache(s){//用户保存本地设定
      this.dbService.setLocalVal("caches"+this.data.id,s);
    }
    saveDown(s){//用户保存本地设定
      this.dbService.setLocalVal("downs"+this.data.id,s);
    }


  updateCacheCourse(downtask){
    // this.mycacheCourse.forEach((item,i)=>{

      // this.mycacheCourse.forEach((item,i)=>{
        this.mydownCourses.forEach((ele,i)=>{
          if(ele.id==downtask.cid){
            this.mydownCourses[i].list.forEach((item,t)=>{


              if(item.key==downtask.key){
                this.mydownCourses[i].list[t].loaded=downtask.loaded;
                this.mydownCourses[i].list[t].total=downtask.total;
                if(downtask.loaded==downtask.total){
                  this.mydownCourses[i].list[t].state=1;
                  this.mydownCourses[i].list[t].loaded=downtask.loaded;
                  this.mydownCourses[i].list[t].total=downtask.total;
                  this.mydownCourses[i].list[t].localuri=downtask.localuri;
                  // alert("bb:"+downtask.loaded+"good"+downtask.total)
                  // alert(("in:"+JSON.stringify(this.mycacheCourse)))
                  this.saveDown(this.mydownCourses);
                  // this.saveCache(this.mycacheCourse);
                }
              }

            })

    }
    })

  }

  // CheckCache(key){//旧版，未按课程存储课件下载列表--暂弃用
  //   // alert(JSON.stringify(this.mycacheCourse))
  //  let titem:any=null;
  //   if(this.mycacheCourse!=null){
  //   this.mycacheCourse.forEach((item,i)=>{
  //     if(key==item.key){
  //       titem=item;
  //     }
  //   })
  // }
  //   return titem;
  // }

    CheckCachebyid(key,id){//旧版，未按课程存储课件下载列表--暂弃用
    // alert(JSON.stringify(this.mycacheCourse))
    let titem:any=null;
    this.mydownCourses.forEach((et,t)=>{

        if(et.id==id){
          et.list.forEach(element => {
            if(key==element.key){
              titem=element;
            }
          });
        }
    })

  //   if(this.mycacheCourse!=null){
  //   this.mycacheCourse.forEach((item,i)=>{
  //     if(key==item.key){
  //       titem=item;
  //     }
  //   })
  // }
    return titem;
  }


  CheckCache(key,tlist){//新版，按课程存储课件下载列表  tlist--当前课程下载列表
    // alert(JSON.stringify(this.mycacheCourse))
   let titem:any=null;
    if(tlist!=null){
      tlist.forEach((item,i)=>{
      if(key==item.key){
        titem=item;
      }
    })
  }
    return titem;
  }



}

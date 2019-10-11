import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserService } from '../../structs/user.service';
import {BaseService} from '../../service/base.service';
import {HttpService} from '../../service/http.service';
import { Storage } from '@ionic/storage' ;
import { DbService } from '../../service/db.service';
import { ActionSheetService, ToastService } from 'ng-zorro-antd-mobile';
import { en_US, ru_RU, zh_CN, sv_SE, da_DK } from 'ng-zorro-antd-mobile';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx';
// copy
import { LoadingController } from '@ionic/angular'
import to from 'await-to-js';



import { StatusBar } from '@ionic-native/status-bar/ngx'; 
// import {BaseService} from '../../../service/base.service'
declare var Wechat: any;
declare var WeiboSDK: any;

@Component({
  selector: 'app-mycenter',
  templateUrl: './mycenter.page.html',
  styleUrls: ['./mycenter.page.scss'],
})
export class MycenterPage  implements OnInit {
  a:any=0;
  myoder:any
  nulls:any='';
// 获取屏幕宽度
   HtmlWidth = window.screen.width;
  //  退出
   isout=this.userService.islogin
  //  this.ro
  //  分成16分
   htmlnum = 16;
  //  暂不用⬆️
  mymoney=this.router
  userImg ='./assets/images/WechatIMG47.png';

  islogin: Boolean=false; // 当前用户是否已经登录
  user: any;
  userValue = null;
  isIOS=false;

  userName:any
  // userImg=''

  constructor(

    private statusBar:StatusBar,

    private route:ActivatedRoute,
    private router: Router,
    private loadingCtrl:LoadingController,
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    public storage:Storage,
    public dbservice:DbService,
    private _actionSheet: ActionSheetService, private _toast: ToastService,
    private qq: QQSDK
    ) {
      // this.islogin = false;
    // this.storage.remove('user')
    // this.user.avatar = ''
    this.statusBar.styleLightContent();
    if(this.baseService.platform=='iOS'){
      this.isIOS=true;//判断是否为IOS
    }
    // alert(this.islogin)

    this.islogin= this.isout
    console.log(this.isout)
 
    // console.log('这是一个构造器')
  }
  ngOnInit(): void{
   
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log(++this.a)
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // alert(1)
    // console.log('初始化数据')
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  // console.log('销毁')
     console.log('aaa')
    let tk=localStorage.getItem('token')
    if(tk){
      this.islogin=true
      return
    }else{
      this.islogin=false
      return
    }
  }
 ngOnChanges(): void {
   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   //Add '${implements OnChanges}' to the class.
  //  this.islogin

  console.log('父子数据改变')
 }

 ngAfterViewChecked(): void {
   //Called after every check of the component's view. Applies to components only.
   //Add 'implements AfterViewChecked' to the class.

  //console.log('销毁周期',this.baseService.myoder,)
  let manny=this.baseService.myoder
  if(manny){
  
    this.user.surplus=this.baseService.myoder
     console.log(this.user.surplus)
     console.log('这是我的钱啊')
    // return false
  }
 }


  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // 
    this.inituser();
    // console.log(this.userService)
    // console.log(this.islogin)
  }

  // 手机号过滤
  filtersphone(phone){
    if(phone){
    return  phone.slice(0,3).concat('****',phone.slice(7,11))
    }
  }
  inituser() {
    this.islogin = this.userService.islogin;
    this.user = null;
  
    if (this.islogin) {
      // to()
      // console.log(this.userService.data)
     this.userService.data.username= this.filtersphone(this.userService.data.username)
    //  console.log(this.userService.data)
    console.log(this.user)
    this.user = this.userService.data;
    


    console.log(this.user)
    // this.userName= this.user.nickname 

    
    // setTimeout(() => {
    //   if(this.baseService.referURI=="mycenter"){
    //   this.inituser();
    //  }
    // }, 500);
    // this.baseService.myalert(JSON.stringify(this.userService.data))
      /**极光推送开启 */
      // this.jpush.init();//插件初始化
      // this.jpush.setDebugMode(true);
      // /*消息推送配置**/
      // this.jpushUtil.initPush();//监听初始化
      // this.jpushUtil.setAlias(user.userCode);    //设置别名
    }
  }
  ionViewWillEnter() {
    // this.baseService.referURI="mycenter";
    // console.log(this.dbservice.getLocalVal('userdata'))
    // console.log(this.dbservice.getLocalVal('token'))
    // console.log('每次进入页面都会进行的处理')
  }

/*是否显示tabs--start */
ionViewWillLeave(){
  
  // document.getElementsByTagName('ion-tab-bar')[0].style.display="none";//离开四大主页隐藏
 }
 ionViewDidEnter(){
  //  document.getElementsByTagName('ion-tab-bar')[0].style.display="flex";//进入四大主页显示、
   this.inituser();
   this.getuserInfo();
  // alert(1)
  // 滑动
  this.baseService.referURI="mycenter";
  //  document.getElementsByTagName("ion-tab-bar")[0].style.display="flex";//进入四大主页显示
   this.statusBar.styleLightContent();
 
   if(this.baseService.platform=="iOS"){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
   }
   this.statusBar.styleLightContent();
 }

async getuserInfo(){
    let r, err;
    [err, r] = await to(this.httpService.request({id: this.userService.data.id}, this.userService.uriUserInfo));
    if (r['data'] == null) {
      return;
    }
    if (r.code == 20000) {
      //this.user=r.data;
      this.user.surplus=r.data.surplus;
      // this.baseService.myalert(JSON.stringify(this.userInfo));
      console.log("执行了",r)
    }

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
          this.shareAPP(buttonIndex);
        setTimeout(resolve, 0);
      });
    }
  );
}



shareAPP(index){

  // this.shareDataList[index];
  // this.baseService.myalert(index);



  if(index==-1) return;

  if(index==0){

    let args:any = {};
      args.url = this.baseService.shareData.url;
      args.title = this.baseService.shareData.title;
      args.description = this.baseService.shareData.description;
      args.image =  this.baseService.shareData.thumb;
      WeiboSDK.shareToWeibo(function () {
        // alert('share success');
      }, function (failReason) {
        // alert(failReason);
      }, args);


  }


  if(index==1){
  Wechat.share({
    message: {
        title:  this.baseService.shareData.title,
        description:  this.baseService.shareData.description,
        thumb:  this.baseService.shareData.thumb,
        mediaTagName: this.baseService.shareData.title,
        messageExt: this.baseService.shareData.title,
        // messageAction: "<action>dotalist</action>",
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: this.baseService.shareData.url
      }
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
}, function (reason) {
});
}
if(index==2){
      Wechat.share({
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
        scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
    }, function (reason) {
    });
    }

if(index==3){

  const options: QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene: this.qq.Scene.QQ,
    title: this.baseService.shareData.title,
    url: this.baseService.shareData.url,
    image: this.baseService.shareData.thumb,
    description: this.baseService.shareData.description,
    // flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
  }

  this.qq.shareNews(options)
 .then(() => {
 })
 .catch(error => {
 });

}


}


ionViewWillUnload(){
  // console.log('触发ionViewWillUnload');
}



async presentLoading(msg){
  const loading = await this.loadingCtrl.create({
    spinner: null,
    duration: 2000,
    // message: 'Please wait...',
    translucent: true,
    cssClass: 'custom-class custom-loading',
    message: msg,//loading框显示的内容
    // leaveAnimation: true, // 是否在切换页面之后关闭loading框
    showBackdrop: true  //是否显示遮罩层
  });
  return await loading.present();
}

async qqlogin_reg(res) {
  let r, err;
  [err, r] = await to(this.httpService.request({ openid:res.userid,token:res.access_token}, this.userService.uriQqLogin));
  // this.baseService.myalert(JSON.stringify(r))
  // console.log(r)
  if (r.code == 30200) {
    this.userService.islogin = false;//用户已经登录退出
    this.userService.data = null;
    // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
    return;
  }else if (r.code == 20000) {
    this.userService.userlocalsave(r.data); // 存储用户信息
    this.dbservice.setLocalVal('token', r.data.token) // 存储token
    this.userService.init();//用户初始化
    this.router.navigateByUrl('/app/home');
    this.baseService.presentMessage('登录成功');
  }else if(r.code==20001){
    this.baseService.presentToast("请先绑定手机号码","warning");
    this.userService.logintemp.type=1;
    // this.userService.logintemp.data=r.msg
    this.userService.logintemp.data.avatar=r.msg.figureurl;
    this.userService.logintemp.data.name=r.msg.nickname;
    this.userService.logintemp.data.openid=r.msg.openid;
    this.userService.logintemp.data.sex=r.msg.gender;

    this.router.navigateByUrl("/bingphone");
  }


}

// weboAuth() {
//   this.presentLoading('跳转微博登录中...')
//   WeiboSDK.ssoLogin(
//     args => {
//       this.wblogin_reg(args)
//     },
//     failReason => {
//       // alert(failReason);
//     }
//   )
// }

QQlogin() {
  this.presentLoading("跳转QQ登录中...") 
  const clientOptions: QQShareOptions = {
    client: this.qq.ClientType.QQ,
  }

  this.qq.checkClientInstalled(clientOptions)
 .then(() => {
    // console.log('Installed');

  this.qq.ssoLogin(clientOptions)
  .then(result => {
     // SuccessuriQqLogin
    // this.baseService.myalert(JSON.stringify(result))
    this.qqlogin_reg(result);
     console.log('token is ' + result.access_token);
     console.log('userid is 101559282' + result.userid);
     console.log('expires_time is ' + new Date(parseInt(result.expires_time)) + ' TimeStamp is ' + result.expires_time);





  })
  .catch(error => {
     console.log(error); // Failed
     this.baseService.presentToast("本机未安装QQ，无法使用QQ登录","danger")
  });

 })
 .catch(() => {
    console.log('Not Installed');
 });}




 weboAuth(){
  this.presentLoading("跳转微博登录中...") 
  WeiboSDK.ssoLogin((args)=>{
    this.wblogin_reg(args);
 }, (failReason)=> {
    // alert(failReason);
 });
}

weChatAuth() {
  this.presentLoading("跳转微信登录中...") 
  try {
    let scope = "snsapi_userinfo",
      state = "_" + (+new Date());
    // 1. 获取code
    Wechat.auth(scope, state, (response) => {
      // console.log(response)
      this.wxlogin_reg(response)
    }, (reason) => {
      // alert("Failed: " + reason);
    });
  } catch (error) {
    // console.log(error);
  } finally { 
  }
}
async wxlogin_reg(res) {
  let r, err;
  [err, r] = await to(this.httpService.request({ code:res.code}, this.userService.uriWxLogin));
  //  console.log(r)
  if (r.code == 30200) {
    this.userService.islogin = false;//用户已经登录退出
    this.userService.data = null;
    // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
    return;
  }else if (r.code == 20000) {
    this.userService.userlocalsave(r.data); // 存储用户信息
    this.dbservice.setLocalVal('token', r.data.token) // 存储token
    this.userService.init();//用户初始化
    this.router.navigateByUrl('/app/home');
    this.baseService.presentMessage('登录成功');
  }else if(r.code==20001){
    this.baseService.presentToast("请先绑定手机号码","warning");
    this.userService.logintemp.type=0;
    // this.userService.logintemp.data=r.msg
    this.userService.logintemp.data.avatar=r.msg.headimgurl;
    this.userService.logintemp.data.name=r.msg.nickname;
    this.userService.logintemp.data.openid=r.msg.openid;
    if(r.msg.sex==1){
    this.userService.logintemp.data.sex="男";
  }
    if(r.msg.sex==0){
    this.userService.logintemp.data.sex="女";
  }

    this.router.navigateByUrl("/bingphone");
  }
}
async wblogin_reg(res) {
  let r, err;
  [err, r] = await to(this.httpService.request({ openid: res.userId,token: res.access_token}, this.userService.uriWbLogin));
  // this.baseService.myalert(JSON.stringify(r))
  if (r.code == 30200) {
    this.userService.islogin = false;//用户已经登录退出
    this.userService.data = null;
    // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
    return;
  }else if (r.code == 20000) {
    this.userService.userlocalsave(r.data); // 存储用户信息
    this.dbservice.setLocalVal('token', r.data.token) // 存储token
    this.userService.init();//用户初始化
    this.router.navigateByUrl('/app/home');
    this.baseService.presentMessage('登录成功');
  }else if(r.code==20001){
    this.baseService.presentToast("请先绑定手机号码","warning");

    this.userService.logintemp.type=2;
    // this.userService.logintemp.data=r.msg
    this.userService.logintemp.data.avatar=r.msg.avatar_large;
    this.userService.logintemp.data.name=r.msg.name;
    this.userService.logintemp.data.openid=r.msg.id;
    if(r.msg.gender=="M"){
      this.userService.logintemp.data.sex="男";
    }
      if(r.msg.gender=="F"){
      this.userService.logintemp.data.sex="女";
    }


    this.router.navigateByUrl("/bingphone");
  }
}
 /*是否显示tabs--end */


  //actions-active-start
  //前往订单页面
  gomyOrder() {
    // console.log('1')
    this.router.navigateByUrl('/myorder');
  }
  // 前往优惠券页面
  gomyDiscountCoupon() {
    this.router.navigateByUrl('/mydiscountcoupon');
  }
  goActivies(){
    this.router.navigateByUrl('/activitieslist');
  }
  gotoeditmymessage() {
    this.router.navigateByUrl('/editmymessage');
  }
  gotonews() {
    this.router.navigateByUrl('/systemnews');
  }
  gotofeedback() {
    this.router.navigateByUrl('/feedback');
  }
  gotoabout() {
    this.router.navigateByUrl('/about');
  }
  gotoMymoney() {
    this.router.navigateByUrl('/mymoney');
  }
  gologin(){
    this.router.navigateByUrl('/login');
  }
  goservice(){
    this.router.navigateByUrl(`/service`);
  }



  
//actions-active-end
}

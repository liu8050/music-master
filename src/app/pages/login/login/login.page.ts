import { Component, OnInit, ViewChild } from '@angular/core'
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'

import { BaseService } from '../../../service/base.service'
import { Router,ActivatedRoute } from '@angular/router'
import to from 'await-to-js'
import { LoadingController } from '@ionic/angular'
import { from } from 'rxjs'
import { DbService } from '../../../service/db.service'
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx'
// import { Component } from '@angular/core'

// 引入微信服务
// cn.master_music.ap
declare var Wechat: any;

// declare var QQSDK: any;
declare var WeiboSDK: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  numberFocus = {
    focus: false,
    // date: new Date()
  };

  userlogin:any={
    username:'',
    password:''
  }
  // 定时器标识
  clearSet:any;
  // 登录账号密码
  userIp:any;
  userPwd:any;
  @ViewChild('domgetCode') domgetCode:any
  verifyCode = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: false
  }
  // 倒计时
  num:number=60000
  // getCodeContent:any='获取验证码'
  //验证吗
  vftCode:any;
  // quhao
  code:any=86
  AreaCode:any='+'+this.code
  // phonenum
  phonenum = ''
  tabIsBlock:boolean = true;

  constructor(
    private routerPrma:ActivatedRoute,
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    private router: Router,
    private qq: QQSDK,
    private loadingCtrl: LoadingController,
    private dbservice: DbService
  ) {
    // console.log( this.routerPrma.snapshot.params['id'])
    
    if( this.routerPrma.snapshot.params['id']!==""){
      
      this.code=this.routerPrma.snapshot.params['id']
      this.AreaCode='+'+this.code
      console.log(1)
    }else{
      this.AreaCode='+86'
      console.log(2)
    }
   
    // this.AreaCode=''+this.code
    // console.log(this.code,)
  }

  ngOnInit() {
 
  }

  async userIslog(){
    if(this.userlogin.username.length!<0){
      this.baseService.presentToast('账号不能为空，请填写', 'danger')
      return false
    }
    if(this.userlogin.password.length!<0){
      this.baseService.presentToast('密码不能为空，请填写', 'danger')
      return false
    }
    let err,r;
    [err,r] = await to(this.httpService.request({username:this.userlogin.username,password:this.userlogin.password},["api/login/login","post"]))
    // console.log(r)
    if(r!=null&&r.code == '20000'){
      this.userService.userlocalsave(r.data) // 存储用户信息
      // console.log(  this.userService.userlocalsave)
      // console.log()
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() //用户初始化
      this.router.navigateByUrl('/app/mycenter')
      this.baseService.presentMessage('登录成功')


      return false
    }else{
      this.baseService.presentToast(r.data.msg,'danger')
      return false
    }
  }


  weboAuth() {
    this.presentLoading('跳转微博登录中...')
    WeiboSDK.ssoLogin(
      args => {
        this.wblogin_reg(args)
      },
      failReason => {
        // alert(failReason);
      }
    )
  }

  
  async CklLogin(){
    /*
      ^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7[^0129\D](?(?<=4)(?:0\d|1[0-2]|9\d)|\d{2})|9[189]\d{2}|66\d{2})\d{6}$
    */ 
   if (this.phonenum == null) {
    this.baseService.presentToast('手机号码不能为空，请填写', 'danger')
    return false
  }

  if (!/^1(3|4|6|5|7|8|9)\d{9}$/.test(this.phonenum)) {
    this.baseService.presentToast('手机号码有误，请重填', 'danger')
    return false
  }
  if (this.phonenum.length!<11) {
    this.baseService.presentToast('手机号码有误，请重填', 'danger')
    return false
  }
  if(this.vftCode<4&&this.vftCode!=null){
    this.baseService.presentToast('短信码有误', 'danger')
    return false
  }
  //  let phonenums=this.code+this.phonenum
    // console.log(phonenums,this.vftCode)
    
    let r, err
    ;[err, r] = await to(
      this.httpService.request({phone:this.phonenum,code:this.vftCode},this.userService.uriLogin)
    )
    console.log(r)
    if (r.code == 30200) {
      this.userService.islogin = false //用户已经登录退出
      this.userService.data = null
      this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
      return
    } else if (r.code == 20000) {
      this.userService.userlocalsave(r.data) // 存储用户信息
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() //用户初始化
      this.router.navigateByUrl('/app/home')
      this.baseService.presentMessage('登录成功')
      this.vftCode.empty()
    } else if (r.code == 20001) {
      this.baseService.presentToast('请先绑定手机号码', 'warning')
      this.userService.logintemp.type = 0
      // this.userService.logintemp.data=r.msg
      this.userService.logintemp.data.avatar = r.msg.headimgurl
      this.userService.logintemp.data.name = r.msg.nickname
      this.userService.logintemp.data.openid = r.msg.openid
      if (r.msg.sex == 1) {
        this.userService.logintemp.data.sex = '男'
      }
      if (r.msg.sex == 0) {
        this.userService.logintemp.data.sex = '女'
      }

      // this.router.navigateByUrl('/bingphone')
    }
    
  }
  DensityFree(){
    this.tabIsBlock=true
  }
  userLoign(){

    this.tabIsBlock=false
  }
  // 验证码
  settime() {


/*
      verifyCode = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: true
  }
*/ 

    // this.getCodeTxt.el.=true
    // if (this.verifyCode.countdown == 1) {
    //   // this.verifyCode.countdown = 60;
    //   this.verifyCode.verifyCodeTips = '获取验证码'
    //   this.verifyCode.disable = true

    //   return
    // }
    // this.verifyCode.disable = false
    // this.verifyCode.countdown--

    // this.verifyCode.verifyCodeTips =
    //   '重新获取' + this.verifyCode.countdown + 's'
    //   this.clearSet= setTimeout(() => {
    //   if (this.verifyCode.countdown > 0) {
    //     this.settime()
     
    //   }
    // }, 1000)
  }
  weChatAuth() {
    this.presentLoading('跳转微信登录中...')
    try {
      let scope = 'snsapi_userinfo',
        state = '_' + +new Date()
      // 1. 获取code
      Wechat.auth(
        scope,
        state,
        response => {
          this.wxlogin_reg(response)
        },
        reason => {
          // alert("Failed: " + reason);
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  async wxlogin_reg(res) {
    let r, err
    ;[err, r] = await to(
      this.httpService.request({ code: res.code }, this.userService.uriWxLogin)
    )
    if (r.code == 30200) {
      this.userService.islogin = false //用户已经登录退出
      this.userService.data = null
      // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
      return
    } else if (r.code == 20000) {
      this.userService.userlocalsave(r.data) // 存储用户信息
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() //用户初始化
      this.router.navigateByUrl('/app/home')
      this.baseService.presentMessage('登录成功')
    } else if (r.code == 20001) {
      this.baseService.presentToast('请先绑定手机号码', 'warning')
      this.userService.logintemp.type = 0
      // this.userService.logintemp.data=r.msg
      this.userService.logintemp.data.avatar = r.msg.headimgurl
      this.userService.logintemp.data.name = r.msg.nickname
      this.userService.logintemp.data.openid = r.msg.openid
      if (r.msg.sex == 1) {
        this.userService.logintemp.data.sex = '男'
      }
      if (r.msg.sex == 0) {
        this.userService.logintemp.data.sex = '女'
      }

      this.router.navigateByUrl('/bingphone')
    }
  }



  async wblogin_reg(res) {
    let r, err
    ;[err, r] = await to(
      this.httpService.request(
        { openid: res.userId, token: res.access_token },
        this.userService.uriWbLogin
      )
    )
    // this.baseService.myalert(JSON.stringify(r))
    if (r.code == 30200) {
      this.userService.islogin = false //用户已经登录退出
      this.userService.data = null
      // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
      return
    } else if (r.code == 20000) {
      this.userService.userlocalsave(r.data) // 存储用户信息
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() //用户初始化
      this.router.navigateByUrl('/app/home')
      this.baseService.presentMessage('登录成功')
    } else if (r.code == 20001) {
      this.baseService.presentToast('请先绑定手机号码', 'warning')

      this.userService.logintemp.type = 2
      // this.userService.logintemp.data=r.msg
      this.userService.logintemp.data.avatar = r.msg.avatar_large
      this.userService.logintemp.data.name = r.msg.name
      this.userService.logintemp.data.openid = r.msg.id
      if (r.msg.gender == 'M') {
        this.userService.logintemp.data.sex = '男'
      }
      if (r.msg.gender == 'F') {
        this.userService.logintemp.data.sex = '女'
      }

      this.router.navigateByUrl('/bingphone')
    }
  }
  // async isLoin() {
  //   let r, err

  // ;[err, r] = await to(this.httpService.request())
  // }
  async qqlogin_reg(res) {
    let r, err
    ;[err, r] = await to(
      this.httpService.request(
        { openid: res.userid, token: res.access_token },
        this.userService.uriQqLogin
      )
    )
    // this.baseService.myalert(JSON.stringify(r))
    if (r.code == 30200) {
      this.userService.islogin = false //用户已经登录退出
      this.userService.data = null
      // this.baseService.presentToast("验证码错误，请重新输入或获取!", "danger");
      return
    } else if (r.code == 20000) {
      this.userService.userlocalsave(r.data) // 存储用户信息
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() //用户初始化
      this.router.navigateByUrl('/app/home')
      this.baseService.presentMessage('登录成功')
    } else if (r.code == 20001) {
      this.baseService.presentToast('请先绑定手机号码', 'warning')
      this.userService.logintemp.type = 1
      // this.userService.logintemp.data=r.msg
      this.userService.logintemp.data.avatar = r.msg.figureurl
      this.userService.logintemp.data.name = r.msg.nickname
      this.userService.logintemp.data.openid = r.msg.openid
      this.userService.logintemp.data.sex = r.msg.gender

      this.router.navigateByUrl('/bingphone')
    }
  }

  QQlogin() {
    this.presentLoading('跳转QQ登录中...')
    const clientOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ
    }

    this.qq
      .checkClientInstalled(clientOptions)
      .then(() => {
        // console.log('Installed');

        this.qq
          .ssoLogin(clientOptions)
          .then(result => {
            // SuccessuriQqLogin
            // this.baseService.myalert(JSON.stringify(result))
            this.qqlogin_reg(result)
            // console.log('token is ' + result.access_token)
            // console.log('userid is 101559282' + result.userid)
            // console.log(
            //   'expires_time is ' +
            //     new Date(parseInt(result.expires_time)) +
            //     ' TimeStamp is ' +
            //     result.expires_time
            // )
          })
          .catch(error => {
            // console.log(error) // Failed
            this.baseService.presentToast(
              '本机未安装QQ，无法使用QQ登录',
              'danger'
            )
          })
      })
      .catch(() => {
        console.log('Not Installed')
      })
  }
  async getCode(e) {

    // console.log(this.clearSet)
    if(    this.clearSet !=undefined){
    
      console.log(e,this.clearSet)
      clearTimeout(this.clearSet)
    }
    if (this.phonenum == null) {
      this.baseService.presentToast('手机号码不能为空，请填写', 'danger')
      return false
    }

    if (!/^1(3|4|6|5|7|8|9)\d{9}$/.test(this.phonenum)) {
      this.baseService.presentToast('手机号码有误，请重填', 'danger')
      return false
    }
      this.getCodemThon()
    let r,
      err
      // let dataRoles=this.userService.dataRoles;
      // console.log(this.phonenum,this.userService.uriGetCode);
    ;[err, r] = await to(
      this.httpService.request(
        { phone: this.phonenum },
        this.userService.uriGetCode
      )
    )
    // console.log(this.phonenum)
    // console.log(r)
    if (r.code == 20000) {
      // this.router.navigateByUrl('/logined/' + this.phonenum)
      return
    }
    this.baseService.presentToast('服务器繁忙，请稍后再试', 'danger')
  }
  consoleValue(e) {
    console.log(e)
    // console.log(this.phonenum)
  }



  // 验证码
  getCodemThon(){
    // if()
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60;

      this.verifyCode.verifyCodeTips = "获取验证码";
       this.verifyCode.disable=false
      // this.verifyCode.disable = true;
      // console.log(this.getCodeTxt+'233')
      return  false;
    } else {
      this.verifyCode.countdown--;
      this.verifyCode.disable=true
      // console.log( this.domgetCode.nativeElement)
     
      // this.domgetCode.nativeElement(data=>{
      //   console.log(data)
      // })
      // console.dir( this.domgetCode)

      // this.domgetCode.setAttribute('disable',true)

    }
    // this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown;

    let setime=setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown;
      
      if(this.verifyCode.countdown > 0){
        
        this.getCodemThon()
      }{
        clearTimeout(setime)
      }
   
    }, 1000);
  }






  // ngDoCheck():void{
  //   if(this.code!=this.oldcode){
  //     this.oldcode=this.code;
  //     this.inputKeyUp();
  //   }

  // }
  //   inputKeyUp(): void {
  //     console.log(this.code)
  //       this.currentIndex = this.code.length;
  //       this.codeArr = this.code.split('');

  //   }

  // async login_reg(){
  //   let r,err;
  //   // let dataRoles=this.userService.dataRoles;

  //   if(this.code.length<4){

  //     this.baseService.presentToast('请输入完整的验证码!', 'danger');

  //     return;

  //   }

  //   [ err, r ] = await to(this.httpService.request({phone: this.phonenum, code: this.code}, this.userService.uriLogin));
  //   console.log(this.phonenum,r)

  //   if(r.code==40300){

  //     this.userService.islogin = false;//用户已经登录
  //     this.userService.data = null;

  //     this.baseService.presentToast('验证码错误，请重新输入或获取!', 'danger');

  //     return;

  //   }
  //   if(r.code==20000){ 
  //     // console.log(r)
  //     this.userService.userlocalsave(r.data); // 存储用户信息
  //     this.dbservice.setLocalVal('token', r.data.token) // 存储token
  //     this.userService.init();// 用户初始化
  //     // console.log(this.dbservice.getLocalVal('user'))
  //     this.router.navigateByUrl('/app/home');
  //     // location.reload()
  //     this.baseService.presentMessage('登录weboAuth成功')

  //     // this.nav.
  //     // this.nav.navigateForward('/app/mycenter');
  //   }

  // }

  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 2000,
      // message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      message: msg, //loading框显示的内容
      // leaveAnimation: true, // 是否在切换页面之后关闭loading框
      showBackdrop: true //是否显示遮罩层
    })
    return await loading.present()
  }

  // Jumpagreement(){
  //   this.router.navigateByUrl('/app/pages/agreement/');
  // }
}

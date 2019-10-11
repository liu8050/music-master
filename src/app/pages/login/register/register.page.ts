import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../service/http.service'
import to from 'await-to-js';

import { UserService } from '../../../structs/user.service';
import { BaseService } from '../../../service/base.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { DbService } from '../../../service/db.service'
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx';
declare var Wechat: any;
declare var WeiboSDK: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('getunicode') getunicode:any;
  nulls:any=null;
  RgisterUser:any={
    username:'',
    phone:'',
    code:'',
    password:'',
    confirmPassword:''

  }
  verifyCode = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: false
  }
  
  constructor(
    private routerPrma:ActivatedRoute,
    private router: Router,
    // private qq: QQSDK,
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    private loadingCtrl: LoadingController,
    private qq: QQSDK,
    private dbservice: DbService
  ) { }

  ngOnInit() {
    // this.getcode()
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

  // 微信
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
  
  // getuniCode(e){
  //   console.log(e)
  // }
 async getcode(){
    let err,r;

    [err,r]= await to(this.httpService.request(null,['api/login/phcode','get']))
    console.log(r)
  }
  async isRgisters(){
    if(this.RgisterUser.username==null){
      this.baseService.presentToast('账号不能为空', 'danger')
      return
    }
    if(this.RgisterUser.username.length!<6){
      this.baseService.presentToast('账号不能小于六位', 'danger')
      return
    }
    if(this.RgisterUser.password==null){
      this.baseService.presentToast('密码不能为空', 'danger')
      
      return
    }
    if(this.RgisterUser.password.length!<6){
      this.baseService.presentToast('密码不能小于六位', 'danger')
      return
    }   
    if(this.RgisterUser.password!==this.RgisterUser.confirmPassword){
      this.baseService.presentToast('密码不相同', 'danger')
      return
    }

   console.log(1);
    let err,r;

    
   [err,r]= await to(this.httpService.request({username:this.RgisterUser.username,
                                                phone:this.RgisterUser.phone,
                                                password:this.RgisterUser.password},['api/login/regedit','post']))
  // 手机格式不正确
  console.log(r)
  if(r['code']=='20000'){
    this.router.navigateByUrl('/app/home')
    this.baseService.presentMessage('注册成功')
    return false
  }else{
    this.baseService.presentMessage(r.error)
    return false
  }
    // if(r.code===e"手机已注册"){
    //   this.baseService.presentToast('手机号已注册', 'danger')
    // }
  // if(r['data'].code=='20000'){
  //   console.log(r['data'])
  // }
    // console.log(r)
                                                //  if(r!=null&&r['data'].code=='20000'){
     
  //   this.router.navigateByUrl('/app/login')
  //   this.baseService.presentMessage('登录成功')
  //   return false
  //  }else{
  //   this.baseService.presentToast('注册失败', 'danger')
  //  }
   
   
   
    //                                             console.log(r) 
    // console.log(2)
    // console.log(this.RgisterUser.username,this.RgisterUser.phone,this.RgisterUser.code,this.RgisterUser.password) 
   }
   // console.log(this.RgisterUser.username)
    // const usernames =/^[a-zA-Z0-9] {6,14}$/;
    
    // const pwd =/^[a-zA-Z0-9_]{6}$/;
    // console.log( typeof this.RgisterUser.username)
    
    // console.log(this.RgisterUser.username.trim())
    // if(this.RgisterUser.username==null){
    //   this.baseService.presentToast('用户名不能为空', 'danger')
    //   //   return false
    // }
    // if(!usernames.test(this.RgisterUser.username)){
    //   // !(trim(userIdField.value).length >=4 && trim(userIdField.value).length >=6)
    //   // alert(1)
    //   this.baseService.presentToast('用户代码必须为数字或字母，只能为6~14位！', 'danger')
    //   return false
    // }


    // if(pwd.test(this.RgisterUser.password)){
    //   // this.baseService.presentToast('您的密码不能小于六位且不能大于十四位.', 'danger')
    //   return false
    // }
    
    // to(this.HttpService.request())
    // this.HttpClient.get('')
    // console.log(this.RgisterUser.username.length)
    // QQlogin() {
    //   this.presentLoading("跳转QQ登录中...") 
    //   const clientOptions: QQShareOptions = {
    //     client: this.qq.ClientType.QQ,
    //   }
    
    //   this.qq.checkClientInstalled(clientOptions)
    //  .then(() => {
    //     // console.log('Installed');
    
    //   this.qq.ssoLogin(clientOptions)
    //   .then(result => {
    //      // SuccessuriQqLogin
    //     // this.baseService.myalert(JSON.stringify(result))
    //     this.qqlogin_reg(result);
    //      console.log('token is ' + result.access_token);
    //      console.log('userid is 101559282' + result.userid);
    //      console.log('expires_time is ' + new Date(parseInt(result.expires_time)) + ' TimeStamp is ' + result.expires_time);
    
    
    
    
    
    //   })
    //   .catch(error => {
    //      console.log(error); // Failed
    //      this.baseService.presentToast("本机未安装QQ，无法使用QQ登录","danger")
    //   });
    
    //  })
    //  .catch(() => {
    //     console.log('Not Installed');
    //  });}
  AccNumbers(e){
    console.log(e)
  }
  phones(e){
    console.log(e)
  }
  codes(e){
    console.log(e)
  }
  userPasswords(e){
    console.log(e)
  }
  confirmPasswords(e){
    console.log(e)
  }

  async getCode(e) {
// if()
    // console.log(this.clearSet)
    if(    this.RgisterUser.phone !=undefined){
    
      // console.log(e,this.clearSet)
      // clearTimeout(this.clearSet)
    }
    if ( this.RgisterUser.phone == null) {
      this.baseService.presentToast('手机号码不能为空，请填写', 'danger')
      return false
    }

    if (!/^1(3|4|6|5|7|8|9)\d{9}$/.test( this.RgisterUser.phone)) {
      this.baseService.presentToast('手机号码有误，请重填', 'danger')
      return false
    }
    // if
    // console.log(this.getCodeTxt)
    // console.log( )
    
    //   let seti=setInterval(()=>{
    //  console.log( this.getunicode)
    //   console.log(--this.verifyCode.countdown)
    //   },1000)
   
    this.getCodemThon() 
   

  //  console.log(this.getCodeTxt)

    // console.log(this.phonenum )
    let r,
      err
      // let dataRoles=this.userService.dataRoles;
      // console.log(this.phonenum,this.userService.uriGetCode);
    ;[err, r] = await to(
      this.httpService.request(
        { phone: this.RgisterUser.phone },
        this.userService.uriGetCode
      )
    )
    // console.log(this.phonenum)
    console.log(r)
    if (r.code == 20000) {
      // this.router.navigateByUrl('/logined/' + this.phonenum)
      return
    }
    this.baseService.presentToast('服务器繁忙，请稍后再试', 'danger')
  }
  // consoleValue(e) {
  //   console.log(e)
  //   console.log( this.RgisterUser.phone)
  // }



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
}







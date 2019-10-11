import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { Router } from '@angular/router';
import {BaseService} from '../../../service/base.service'
import to from 'await-to-js';
import { LoadingController } from '@ionic/angular'
import { from } from 'rxjs';
import { DbService } from '../../../service/db.service'
import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-bingphone',
  templateUrl: './bingphone.page.html',
  styleUrls: ['./bingphone.page.scss'],
})
export class BingphonePage implements OnInit {

  phonenum="";
  vcode=false;//验证码是否已经发送
  vcoded=false;//验证码发送成功
  vcodenum="";//验证码
  loading=false;


  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    private router: Router,
    private loadingCtrl:LoadingController,
    public pickerCtrl: PickerController,
    private dbservice:DbService) { }

  ngOnInit() {
  }



  async getCode(){

    if(this.phonenum==""){ 
      this.baseService.presentToast("Please enter the phone number.","danger")
      return false; 
    }
    this.loading=true;
    this.baseService.presentLoading("Loading...");
    let r,err;
    // let dataRoles=this.userService.dataRoles;
    [ err, r ] = await to(this.httpService.request({phone:this.phonenum},this.userService.uriGetCode));

    this.baseService.dismissLoading();

    if(r.code==20000){ 
    // this.router.navigateByUrl('/logined/'+this.phonenum);
    this.vcoded=true;//验证码发送成功
    this.baseService.presentToast("请输入手机验证码", "success");
      return;
    }

    if(r.code==40300){
      this.baseService.presentToast("手机验证码错误，请重试 ", "danger");
      return;
    }

   
    this.baseService.presentToast("服务器繁忙，请稍后再试 ", "danger");


  }


 

  async login(){
    let r,err;
    // let dataRoles=this.userService.dataRoles;

    if(this.vcodenum.length<4){

      this.baseService.presentToast("请输入完整的验证码!", "danger");

      return;

    }
    this.baseService.presentLoading("Loading");
    let bingdata=
      {code:this.vcodenum,
      type:this.userService.logintemp.type,
      phone:this.phonenum,
      openid:this.userService.logintemp.data.openid,
      avatar:this.userService.logintemp.data.avatar,
      sex:this.userService.logintemp.data.sex,
      name:this.userService.logintemp.data.name};

    [ err, r ] = await to(this.httpService.request(bingdata,this.userService.bingphone));

      this.baseService.myalert(JSON.stringify(r));
    if(r.code==30200){ 
      
      this.userService.islogin=false;//用户已经登录失败
      this.userService.data=null;
      
      this.baseService.presentToast("验证失败", "danger");
      
      return;
   
    }
    if(r.code==20000){ 
      this.userService.userlocalsave(r.data); // 存储用户信息
      this.userService.islogin=true;
      this.dbservice.setLocalVal('token',r.data.token) // 存储token
      this.userService.init();//用户初始化
      // console.log(this.dbservice.getLocalVal('user'))
      this.router.navigateByUrl('/');
      
      this.baseService.presentMessage('绑定成功')
      // this.nav.
      // this.nav.navigateForward('/app/mycenter'); 
    }
    this.baseService.dismissLoading();

  }

  // async openPicker() {
  //   this.baseService.myalert(33);
  //   const picker = await this.pickerCtrl.create({
  //     buttons: [{
  //       text: 'Done',
  //     }],
  //     columns: [
  //       {
  //         name: 'days',
  //         options: [
  //           {
  //             text: '1',
  //             value: 1
  //           },
  //           {
  //             text: '2',
  //             value: 2
  //           },
  //           {
  //             text: '3',
  //             value: 3
  //           },
  //         ]
  //       }
  //     ]
  //   });
  //   await picker.present();
  // }
  
  
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import to from 'await-to-js';
import { Storage } from '@ionic/storage';
import { BaseService } from '../../../service/base.service'
// import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  islh=false;//是否为刘海屏
  user ={
    id:''
  }
  data = {
    uid: '',
    content: '',
    image: [],
    lxfs: ''
  };
  constructor(
    private location: Location,
    private router: Router,
    private httpService: HttpService,
    private userService: UserService,
    public Storage: Storage,
    private baseService: BaseService
  ) { }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

    this.data.uid =  this.userService.data.id;
     this.Storage.get('user').then((value) =>{
      this.user = value
      console.log(+this.user)
      console.log(this.data.uid)
    })
  }
  outcontent(){
    this.router.navigateByUrl('/app/mycenter')
    return false;
  }
  save(){
    if(this.data.content==""){
      this.baseService.presentToast('所填内容不为空', "danger"  )
      return
    }

    if(this.data.lxfs==""){
      this.baseService.presentToast("手机号不为空", "danger")
      return
    }

      this.files.forEach((element,index) =>{
        console.log(element)
         this.data.image.push(element.url)
      })
      this.save_feedback()
      this.data.content==""
      this.data.lxfs==""


  }
  async save_feedback() { // 同步保存反馈内容
    let r, err;
    [err, r] = await to(this.httpService.request(this.data, this.userService.urifeedback));
    if (r.code == 40300){
      this.baseService.presentToast("如果需要反馈的话请先登录哦～", "danger")
      return
    }

    // if (this.data.content ==" "){
    //   this.baseService.presentToast("反馈意见不为空", "danger")
    //   return
    // }

    if (r.code == 20000) {
      console.log('1')
      this.baseService.presentToast("反馈成功", "success")
     this.router.navigateByUrl('/app/mycenter')
    }



  }
  files = this.data.image.slice(0);
  multiple = false;
  multipleTab = 1;

  changeMultiple(value: number) {
    this.multipleTab = value;
  }

  fileChange(params) {

    console.log(params);
    const { files, type, index } = params;
  }

  imageClick(params) {
    console.log(params);
  }

  //actions-active-start
  goback() {
    this.location.back();
    //this.location.open(NavComponent);
  }
}

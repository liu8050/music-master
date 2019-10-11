import { Component, OnInit  } from '@angular/core';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import {BaseService} from '../../../service/base.service';
import {HttpService} from '../../../service/http.service'
import { UserService } from '../../../structs/user.service';
import { ActivatedRoute,Router } from '@angular/router'
import to from 'await-to-js';


@Component({
  selector: 'app-mymoney',
  templateUrl: './mymoney.page.html',
  styleUrls: ['./mymoney.page.scss'],
})
export class MymoneyPage implements OnInit {
  islh=false;//是否为刘海屏
  Cmoney=[6,68,88,208,388,998];
  pid="";
  userInfo={surplus:this.router.snapshot.paramMap.get('surplus')};
  CmoneyStyle=['outline','outline','outline','outline','outline','outline'];

  constructor(
    private route:Router,
    private iap: InAppPurchase,
    private baseService:BaseService,
    private userService:UserService,
    private httpService:HttpService,
    private router:ActivatedRoute
  ) { 
console.log(this.iap)
    let products=[];
    this.Cmoney.forEach((item)=>{
      products.push("app"+item)
    })

    this.iap
 .getProducts(products)
 .then((products) => {
   console.log(products);
  //  this.baseService.myalert(JSON.stringify(products));
 })
 .catch((err) => {
   console.log(err);
 });

  }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    //this.getuserInfo();

    // console.log(this.userInfo )


  }
  loginmycenter(mymoney){
    // this.route.navigate(['/mycenter'],mymoney)
    this.baseService.myoder= this.userInfo.surplus;
     //localStorage.setItem('suplus',this.userInfo.surplus)
    return false;
  }
  // async getuserInfo(){
  //   let r, err;
  //   [err, r] = await to(this.httpService.request({id: this.userService.data.id}, this.userService.uriUserInfo));
  //   if (r['data'] == null) {
  //     return;
  //   }
  //   if (r.code == 20000) {
  //     this.userInfo=r.data;
  //     // this.baseService.myalert(JSON.stringify(this.userInfo));
  //   }

  // }

  Recharge(i){
    this.CmoneyStyle.forEach((item,t)=>{
      this.CmoneyStyle[t]='outline';
    })
    this.pid="app"+this.Cmoney[i];
    this.CmoneyStyle[i]='solid';
  }

  buyProduct(){

    if(this.pid==''){
      this.baseService.presentToast("请选择购买金额","danger");
      return ;
    }
    this.baseService.presentLoading("");
    let puid=this.pid
    this.iap
  .buy(puid)
  .then((data)=> {
    this.pushMoney(data,puid);
    
    // console.log(data);
    // this.baseService.myalert(JSON.stringify(data))
    // {
    //   transactionId: ...
    //   receipt: ...
    //   signature: ...
    // }

    // &id=5&surplus=100
   
  })
  .catch((err)=> {
    this.baseService.dismissLoading()
    this.baseService.presentToast("付款失败","danger")
   
  });
  }

  async pushMoney(data,pid:string){
    pid=pid.replace("app","");
    let r, err;
    [err, r] = await to(this.httpService.request({uid: this.userService.data.id,data:data,surplus:pid}, this.userService.recharge));
    console.log(r)
    // this.baseService.dismissLoading()

    if (r.code == 20000) {
      this.baseService.presentToast("帐户余额更新成功","success")
      this.userInfo.surplus=r.surplus;
      this.route.navigateByUrl('/app/mycenter')
      return ;
    }
    this.baseService.presentToast("付款不成功","danger")

    
  }

}

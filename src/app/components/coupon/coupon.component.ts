import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../structs/user.service';
import {BaseService} from '../../service/base.service';
import to from 'await-to-js';
import { Storage } from '@ionic/storage'
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  @Input("Coupon") Coupon: any;

  constructor(
      private http: HttpClient,
      private router: Router,
      private location: Location,
      private httpService: HttpService,
      private userService: UserService,
      private baseService: BaseService,
      public Storage: Storage
  ) { }

  ngOnInit() {

    this.Coupon["price"]=parseInt(this.Coupon["price"]);

  }
  // async drawTicket(id){
  //   let r, err;
  //   let filters = this.userService.filters;
  //   filters.uid = this.userService.data.id;
  //   [err, r] = await to(this.httpService.request({tid: id, uid: filters.uid}, this.userService.getTicket));
  //   if (r.code == 20000) {
  //     // this.baseService.dismissLoading();
  //   }
  // }

}

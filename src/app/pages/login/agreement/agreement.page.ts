import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import to from 'await-to-js';
import { Storage } from '@ionic/storage';
import { BaseService } from '../../../service/base.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {
  islh=false;//是否为刘海屏
  agreement = {
    title: null,
    content: null
  };



  userFilters = Object.assign({}, this.userService.filters);

  constructor(
    private location: Location,
    private router: Router,
    private httpService: HttpService,
    private userService: UserService,
    public Storage: Storage,
    private baseService: BaseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.get_zcxy();
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
  }



  async get_zcxy() {//获取期望提升技能接口
    let r, err;
    this.agreement = {title: null,
      content: null};
// index.php?route=api/usr/zcxy
    [err, r] = await to(this.httpService.request( this.agreement, ['api/usr/zcxy', 'get']));
console.log(r)
    if (r.code == 20000) {

      if (r['data'] == null) {
        return;
      }
      this.agreement = r['data']
      this.agreement.title = this.sanitizer.bypassSecurityTrustHtml(r['data'].title);
      this.agreement.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
      console.log( this.agreement )
    }

  }

}








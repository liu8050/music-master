import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import to from 'await-to-js';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  islh=false;//是否为刘海屏
  about = {
    content: null
  };
  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private Router: Router,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.load_aboutInfo()
  }
  async load_aboutInfo() { // 获取课程详情
    let r, err;
    // let filters = Object.assign({}, this.userService.filters);
    // filters.id = this.Id;
    [err, r] = await to(this.httpService.request('', this.userService.uriabout));

    if (r.code == 20000) {

      this.about = r["data"];
      this.about.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
      // 回调后写
      // this.courseList_get()
    }
  }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
  }

  outcontent(){
    this.Router.navigateByUrl('/app/mycenter')
    return false;
  }
}

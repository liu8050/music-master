import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import {BaseService} from '../../../service/base.service';
import to from 'await-to-js';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-activitieslist',
  templateUrl: './activitieslist.page.html',
  styleUrls: ['./activitieslist.page.scss'],
})
export class ActivitieslistPage implements OnInit {
    islh=false;//是否为刘海屏
  items = [

    /*
    {
      title: '2018舒伯特国际青少年钢琴比赛',
      picurl: '',
      description: '组织机构主办世界音乐艺术教育协会中国教育学会少年儿童校外教育分会承办迈斯特国际奥地利联艺传媒全国城区少年宫工作研究会协办/支持德国...'
  }
    */
  ]

  constructor(
      private http: HttpClient,
      private router: Router,
      private location: Location,
      private httpService: HttpService,
      private userService: UserService,
      private baseService: BaseService,
      public Storage: Storage
  ) { }
    ionViewWillEnter() {
        this.activeList_get();
    }
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

      this.activeList_get();
  }
    async activeList_get() { // 获取我的活动信息
        let r, err;
        const filters = this.userService.filters;
        filters.uid = this.userService.data.id;
        [err, r] = await to(this.httpService.request(filters, this.userService.uriUserActiveList));
        console.log(r)
        if (r.code == 20000) {
           this.items = r['data']
        }
    }
    CarouselContentFilter (  ) {
        return function (str) {
            if(str){
                var carContent = '';
                if(str.length >= 50){
                    str.length = 50;
                    carContent = str.substring(0,50) + '...';
                }
                else {
                    carContent = str
                }
                return carContent
            }
        }
    }
    goDetail(id){
        this.router.navigateByUrl('/newstxt/' + id);
    };
    goSign(id){
        this.router.navigateByUrl('/activities/' + id);
    };
    outcontent(){
        this.router.navigateByUrl('/app/mycenter')
        return false;
      }
}

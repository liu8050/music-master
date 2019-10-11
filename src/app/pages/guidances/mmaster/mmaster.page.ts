import { Component, OnInit , ContentChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service'
import to from 'await-to-js';
import { MastersService } from '../../../structs/masters.service'

@Component({
  selector: 'app-mmaster',
  templateUrl: './mmaster.page.html',
  styleUrls: ['./mmaster.page.scss'],
})
export class MmasterPage implements OnInit {
  errImg=''
  islh=false;//是否为刘海屏
  mmaster = null;//大师列表
  pageset = { page: 1, row: 10 };//前页分页
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  mastersfilters = Object.assign({ }, this.mastersService.filters);
  isloading = true // 判断是否需要继续加载
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private mastersService: MastersService,
    private httpService: HttpService,
  ) {}
  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

    this.load_mmasters();
  }
  //data-init-start
  async load_mmasters() {
    let r, err;
    let filters = this.mastersService.filters;
    // filters.id = this.Id;
    [err, r] = await to(this.httpService.request(filters, this.mastersService.uriList));
      console.log(r)
    if (r.code == 20000) {
      this.mmaster = r["data"];
      console.log(this.mmaster)
      this.mastersfilters.page = r['page']
      this.isloading = false;
    }
    
  }
  async loadData(event) {//下拉刷新
    console.log('下拉刷新')
    if (this.isloading) {
      console.log(this.isloading)
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.mastersfilters.page = this.mastersfilters.page + 1;
    [err, r] = await to(this.httpService.request(this.mastersfilters, this.mastersService.uriList));
      console.log(r)
    if (r.code == 20000 && r.data != null) {
      console.log(r.data,this.mmaster)
      // this.mmaster.push(r.data);
      // console.log( this.mmaster.push(r.data))
      if(r['data']){
        r['data'].forEach(element => {
          this.mmaster.push(element)
        });
      }
      this.mastersfilters.page = r['page'];
      console.log(this.mmaster)
      // console.log(this.mastersfilters.page)
      event.target.complete();
      return;
    }
    this.loadingText = '资源已经完全加载完毕'
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  //data-init-end

  goback() {
    this.location.back();
    //this.location.open(NavComponent);

  }

  //actions-active-start
  gohome() {
    this.router.navigateByUrl('/app');
  }
  //actions-active-end

  //actions-passive-start
  afterChange($e) {
    if ($e == 0) {
      this.router.navigateByUrl('/tabs');
    }
  }
  beforeChange($e) {

  }
//actions-passive-end
}

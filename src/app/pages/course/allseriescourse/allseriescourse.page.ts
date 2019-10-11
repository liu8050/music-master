import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service'
import to from 'await-to-js';
import { CourseService } from '../../../structs/course.service'

@Component({
  selector: 'app-allseriescourse',
  templateUrl: './allseriescourse.page.html',
  styleUrls: ['./allseriescourse.page.scss'],
})
export class AllseriescoursePage implements OnInit {
  islh=false;//是否为刘海屏
  allSeriesCourse = [];//精品课程列表
  pageset = { page: 1, row: 10 };//前页分页
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  coursefilters = Object.assign({}, this.courseService.filters);
  isloading = true // 判断是否需要继续加载

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private courseService: CourseService,
    private httpService: HttpService,
  ) {


  }

  ngOnInit() {
        //留海屏
        let h_m=window.screen.height;
        let w_m=window.screen.width;
        if(h_m/w_m>18/9){
          this.islh=true;
        }
    this.load_courses();
    
  }



  //data-init-start
  async load_courses() {
    let r, err;
    let filters = this.courseService.filters;
    // filters.id = this.Id;
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriPosterList));
   console.log(r)
    if (r.code == 20000) {
      this.allSeriesCourse = r["data"];
      console.log( this.allSeriesCourse)
      this.isloading = false;
    }
  }
  async loadData(event) {//下拉刷新
    // console.log('下拉刷新')
    if (this.isloading) {
      // console.log(this.isloading)
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.coursefilters.page = this.coursefilters.page + 1;
    [err, r] = await to(this.httpService.request(this.coursefilters, this.courseService.uriPosterList));
    if (r.code == 20000 && r.data != null) {
      this.allSeriesCourse.push(r.data);
      this.coursefilters.page = r['page'];
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

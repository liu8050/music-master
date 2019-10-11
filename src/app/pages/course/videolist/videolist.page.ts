import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../../../service/http.service'
import to from 'await-to-js';
import { VideoService } from '../../../structs/video.service'
@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.page.html',
  styleUrls: ['./videolist.page.scss'],
})
export class VideolistPage implements OnInit {

  videolist = [];//视频赏析列表
  pageset = { page: 1, row: 10 };//前页分页
  loadingText = '资源正在加载中，请稍后。。。' // 加载提示文字
  videofilters = Object.assign({}, this.videoService.filters);
  isloading = true;// 判断是否需要继续加载

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private videoService: VideoService,
    private httpService: HttpService,
  ) {


  }

  ngOnInit() {
    this.load_courses();
  }



  //data-init-start
  async load_courses() {
    let r, err;
    // filters.id = this.Id;
    [err, r] = await to(this.httpService.request(this.videofilters, this.videoService.uriLists));
    console.log(r)
    if (r.code == 20000) {
      r['data'].forEach(element => {
        element.titles=element.title.split('--')
        console.log( element.titles)

      });
      // r['data']
      r['data'].sort((a,b)=>{
        return b['sort']-a['sort']
      })
      this.videolist = r['data'];
      console.log(this.videolist)
      this.videofilters.page = r['page'];
      this.isloading = false;
    }
  }
  async loadData(event) {//下拉刷新
    console.log('下拉刷新')
    if (this.isloading) {
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    this.videofilters.page += 1;
    [err, r] = await to(this.httpService.request(this.videofilters, this.videoService.uriList));
    if (r.code == 20000 && r.data != null) {
      this.videolist = this.videolist.concat(r['data']);
      console.log(this.videolist)
      console.log(r['data'])
      this.videofilters.page = r['page'];
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

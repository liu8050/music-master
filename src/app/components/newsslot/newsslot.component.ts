import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from '../../service/http.service'
import {NewsService} from '../../structs/news.service'
import { Router } from '@angular/router';
import to from 'await-to-js';

@Component({
  selector: 'app-newsslot',
  templateUrl: './newsslot.component.html',
  styleUrls: ['./newsslot.component.scss']
})
export class NewsslotComponent implements OnInit {

  @Input("typeId") typeid: any;
    num ='20'
  News: any;

    loadingText = '正在加载中，请稍后。。。';
    isloading = true

  constructor(
    private router:Router,
    private newsService:NewsService,
    private httpService:HttpService
  ) { 
    this.newsService.filters.rows=this.num
  }

  ngOnInit() {
    // this.newsService.filters.rows= 20
    // if (this.typeid == 1) {
      this.news_get();
    // }
    
  }


  //data-init-start

  async news_get() {//获取首页新闻热点

        let r,err;
        const filters=this.newsService.filters;
        filters.type=this.typeid;

        console.log(filters);

        [ err, r ] = await to(this.httpService.request(filters, this.newsService.uriList));
    console.log(r)
        if(r.code==20000 && r.data != null){
          this.News=r["data"];
        }


  }
    async loadData(event) {//下拉刷新最新课程列表
        if(this.isloading){
            event.target.complete();
            return ;
        }
        this.loadingText = '资源正在加载中，请稍后。。。'
        const filters = this.newsService.filters;
        filters.type = this.typeid;
        filters.page += 1;
        console.log(filters);
        let r, err;
        [ err, r ] = await to(this.httpService.request(filters, this.newsService.uriList));
        if (r.code == 20000 && r.data != null) {
            this.News=r['data'];
            event.target.complete();
            return;
        }
        this.loadingText = '资源已经完全加载完毕'

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

  //data-init-end

}

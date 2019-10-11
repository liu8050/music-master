import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../service/http.service'
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsService } from '../../../structs/news.service'
import to from 'await-to-js';


@Component({
  selector: 'app-newstxt',
  templateUrl: './newstxt.page.html',
  styleUrls: ['./newstxt.page.scss'],
})
export class NewstxtPage implements OnInit {
  islh=false;//是否为刘海屏
  news = {
    type: '',
    content:null,
    signup: '',
  };//新闻详情
  Id = this.router.snapshot.paramMap.get('Id');//获取大师ID
  skeleton = false;
  constructor(
    private route:Router,
    private http: HttpClient,
    private router: ActivatedRoute,
    private newsService: NewsService,
    private httpService: HttpService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

    this.news_get();
  }



 async news_get(){//获取首页新闻热点

    let r, err;
    let filters = this.newsService.filters;
    filters.id = this.Id;
   [err, r] = await to(this.httpService.request(filters, this.newsService.uriNewsInfo));
    if (r.code == 20000) {
      this.news = r["data"];

      this.news.content = this.sanitizer.bypassSecurityTrustHtml(this.news.content);
      this.skeleton = false;

    }
    // this.http
    //     .request(
    //         "GET",
    //         "api/newsshow#!method=get",
    //         {
    //             responseType:"json"
    //         }).subscribe(r=>{
    //           this.news=r["data"];
    //           this.news.content=this.sanitizer.bypassSecurityTrustHtml(this.news.content);
    //         })
  }
  logNewsList(){
    // this.router
    this.route.navigateByUrl('/newslist')
    return false;
  }
}

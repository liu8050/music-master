import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from '../../../service/http.service'
import {NewsService} from '../../../structs/news.service'
import to from 'await-to-js';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.page.html',
  styleUrls: ['./newslist.page.scss'],
})
export class NewslistPage implements OnInit {
  islh=false;//是否为刘海屏
  newsType=[];//新闻类型
  typeindex=0;
   num =100
  constructor(
    private router:Router,
    private newsService:NewsService,
    private httpService:HttpService
  ) { 
    // this.newsService.filters.rows=this.num
  }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

    this.newstype_get();
    
  }
  //data-init-start

 async newstype_get(){//获取首页新闻热点
  let r,err;
  let filters=null;
 

  [ err, r ] = await to(this.httpService.request(filters,this.newsService.uriType));
  console.log(filters,this.newsService.uriType)
console.log(r)
  if(r.code==20000){
    r["data"].forEach(element => {
      element.title= element.title
      // console.log(element.title)
      if(element.title.length>7){
        console.log(element.title)
        element.title=element.title.slice(0,7)
      }
      console.log(element.title)
    });
    // r['data'].slice(0,4)
    this.newsType=r["data"].slice(0,4);
    console.log(this.newsType)
  }

  }

  //data-init-end


  //active-start


  onChange(item) {
    console.log('onChange', item);
  }

  onTabClick(item) {
    console.log('onTabClick', item);
  }

  selectCard(e) {
    // console.log(' ', JSON.stringify(e));
    console.log(e.index)
    this.typeindex=e.index;
  }

  //active-end

}

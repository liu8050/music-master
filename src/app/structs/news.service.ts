import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

//API 接口
  uriList=["api/news/lists","get"];//list
  uriInfo=["api/news/lists","get"]//正文如结构体关联其它接口，可继续定义

  uriType=["api/news/type","get"];//新闻分类
  // slq
  uriNewsInfo=["api/news/info","get"]
  // 
//API 接口

  filters={id:'',type:"0",page:0,rows:'',keyword:"",desc:""}//查询类型，默认为零，所有跑马灯swiper图片效果，增出自些接口
  filtersRoles={id:null,type:0,page:1,rows:10,keyword:""}//查询

  data={url:null,link:null}
  dataRoles={url:null,link:null}



}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }
  //API 接口
  uriList = ["api/video/lits", "get"];//list
  uriLists = ["api/video/lists", "get"];
  uriInfo = ["api/video/info", "get"]//正文如结构体关联其它接口，可继续定义
  // 
  //API 接口

  filters = { id: '', page: 1, rows: 10, keyword: "", desc: "" }//查询类型，默认为零，所有跑马灯swiper图片效果，增出自些接口
  filtersRoles = { id: null, page: 1, rows: 10, keyword: "" }//查询

  data = { url: null, link: null }
  dataRoles = { url: null, link: null }
}

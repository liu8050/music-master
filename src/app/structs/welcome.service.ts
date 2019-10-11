import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  constructor() { }
  uriList=["api/banner/lists",'get'];//list
  filters={type:"welcome"}//查询类型，默认为WELCOME，所有跑马灯swiper图片效果，增出自些接口
  filtersRoles={type:0,page:0,rows:10,keyword:""}//查询
  data={url:null,link:null}
  roles={url:null,link:null}
}

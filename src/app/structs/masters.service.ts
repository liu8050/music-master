import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  constructor() { }
  // 大师列表
  uriList = ["api/masters/lists", 'get'];//list
  homeUriList =['api/masters/tlists','get']
  // 大师详情
  uriInfo=["api/masters/info","get"]//正文如结构体关联其它接口，可继续定义
  filters = {id:'',keyword: '', page: 1, rows: '' }//查询类型
  filtersall = {id:'',keyword: '', page: 1, rows:100 }
  filtersRoles = {id:'', page: 1, rows: 10, keyword: "" }//查询
  masters={id:''}
  data = { url: null, link: null }
  roles = { url: null, link: null }
}

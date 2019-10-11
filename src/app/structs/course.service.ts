import { Injectable } from '@angular/core';
import {BaseService} from '../service/base.service'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private baseService:BaseService
  ) {
    setTimeout(() => {
    this.filters.platform=this.baseService.platform;
    }, 300);
   }
  
   AreaCode=['route=api/login/phcode','get'];// 区号
  // 课程类型列表
  
  // api/zclass/type
  uriList = ["api/ztag/type", 'get'];//list
  // 课程列表
  uriCourseList = ['api/course/lists','get']
  uriCourseTagmain = ['api/zclass/type','get']
  // 精品课程列表
  uriPosterList = ['api/course/zseries','get']
  // 课程详情 slq
  uriInfo =['api/course/info','get']
  // 精品课程详情 slq
  uriPosterInfo = ['api/course/zseriesinfo','get']
  // 搜索条件列表
  searchList = ['api/course/search','get']
    // 精品课程是否已经被购买
  isbuyjp = [' api/order/isbuy','get']

 
  // 搜索接口
  
  filters = { cid:'',id: '', type: '',platform:this.baseService.platform, isfree: '', keyword: '', orderby: '', page: 1, master:'',rows:'' }//查询类型

  filtersCopy = { cid:'',id: '', type: '',platform:this.baseService.platform, isfree: '', keyword: '', orderby: '', page: 1, master:'',rows:'' }


  filtersFreeAdmission = { cid:'',id: '', type: '',platform:this.baseService.platform, isfree: '', keyword: '', orderby: '', page: 1, master:'',rows:100}
  filtersRoles = {cid:'', id: '', type: 0, page: 0, rows: 10, keyword: "", master:'' }//查询
  data = { url: null, link: null }
  roles = { url: null, link: null }
}

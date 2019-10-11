import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //API 接口
  inpay={type:0,data:{}};
  orderdata={id:"",dprice:""};
  uricreate = ["api/order/buyNow", "post"];//创建订单
  uripay = ['api/order/pay', "get"]//正文如结构体关联其它接口，可继续定义
  filters = { id: '', zf:'', keyword: '', page: 1, rows: '' }//查询类型
  filtersRoles = { id: '', page: 1, rows: 10, keyword: "" }//查询
  getTicketdata = { user_id:'',isxl:'',opid:'',isfq:'',card_id:'',ticket_id:'',remark:'' }
  roles = { }
  data = { user_id:'',isxl:'',opid:'',isfq:'',card_id:'',ticket_id:'',remark:'' }
  constructor() { }

}

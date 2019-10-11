import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../structs/user.service';
import {BaseService} from '../../service/base.service'
import to from 'await-to-js';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  value = '';
  id = '';
  show = false;
  constructor(
      private userService: UserService,
      private httpService: HttpService,
      private baseService: BaseService
  ) { }

  ngOnInit() {
  }
  async getOpern() {
    if (this.value == ''){
      this.baseService.presentToast('邮箱不能为空，请填写', 'danger')
      return false;
    }

    if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.value))) {
      this.show = true;
      this.baseService.presentToast("请输入正确的邮箱地址", 'danger')
      return false;
    }
    let r, err;
    const filters = Object.assign({}, this.userService.filters);
    filters.uid = this.userService.data.id;
    [err, r] = await to(this.httpService.request({uid: filters.uid, pid: this.id, email: this.value}, this.userService.uriMusicEmail));
    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理success
      this.baseService.presentToast('发送成功', 'success')
    }else if(r.code==40300){
      this.baseService.presentToast(r.error, 'danger')
    }
  }

}

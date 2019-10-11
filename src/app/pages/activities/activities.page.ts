import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import {HttpService} from '../../service/http.service';
import {UserService} from '../../structs/user.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import to from 'await-to-js';
import { BaseService } from '../../service/base.service'
@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {


  islh=false;//是否为刘海屏
  systemList = {};
  pid = '';
  defaultSex = [
    [
      '男',
      '女',
    ]
  ];
  user = {
    id: ''
  };
  data = {
    uid: '',
    content: '',
    image: [],
    lxfs: ''
  };
  form = [
    { val: '是', isChecked: true },
    { val: '否', isChecked: false },
   ];
  activities = {
    uid: '',
    nid: this.pid,
    age: '',
    name: '',
    school: '',
    sex: '',
    city: '',
    email: '',
    phone: '',
    introduction: '',
    content: {},
    image: [],

  }
  constructor(
      private pickerController: PickerController,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private location: Location,
      private httpService: HttpService,
      private userService: UserService,
      public baseService: BaseService,
      private storage: Storage
  ) { }

  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.params['Id'];
    this.signupList_get();



        //留海屏
        let h_m=window.screen.height;
        let w_m=window.screen.width;
        if(h_m/w_m>18/9){
          this.islh=true;
        }

  }
  async  signupList_get() { // 获取报名信息
    let r, err;
    const  filters = Object.assign({}, this.userService.filters);
    filters.id = this.pid;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriactitvties));
    if (r.code === 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      if (r['data'] == null) {
        return;
      }
      this.systemList = r['data'];
      // this.hotNews=r["data"];
    }
  }

  changeMultiple(value: number) {
    this.multipleTab = value;
  }

  fileChange(params) {

    console.log(params);
    const { files, type, index } = params;
  }

  imageClick(params) {
    console.log(params);
  }
  files = this.activities.image.slice(0);
  multiple = false;
  multipleTab = 1;

  //actions-active-start
  goback() {
    this.location.back();
    //this.location.open(NavComponent);
  }
  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }
  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }
  async selectSex(numColumns = 1, numOptions = 2, columnOptions = this.defaultSex) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            // this.baseService.myalert(JSON.stringify(value))
            this.activities.sex = value['col-0'].text;
          }
        }
      ]
    });
    await picker.present();
  }
  async register(){
    let filters = Object.assign({}, this.userService.filters);
    this.activities.uid = this.userService.data.id;
      this.files.forEach((element, index) =>{
          console.log(element)
          this.activities.image.push(element.url)
      })
    this.activities.nid = this.pid
    let r, err;
    [err, r] = await to(this.httpService.request(this.activities, this.userService.uriRegister));
    // this.editUserAlert();

    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      this.baseService.presentAlert('报名成功!')
      this.router.navigateByUrl('/app/mycenters/activitieslist');
      // this.showList = true
      // this.hotNews=r["data"];
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { HttpService } from '../../../service/http.service';
import { UserService } from '../../../structs/user.service';
import to from 'await-to-js';
import {zh_CN} from 'ng-zorro-antd-mobile';
import { BaseService } from 'src/app/service/base.service';
// import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-editmymessage',
  templateUrl: './editmymessage.page.html',
  styleUrls: ['./editmymessage.page.scss'],
})
export class EditmymessagePage implements OnInit {
  islh=false;//是否为刘海屏
  islogin = false;
  locale = zh_CN;
  singleArea = [
    '男',
    '女'
  ];
  defaultSex = [
    [
      '男',
      '女',
    ]
  ];  cameratype = [
    [
      '拍照',
      '相册',
    ]
  ];
  defaultEdu = [
    [
      '小学生',
    '初中生',
    '高中生',
    '大学生',
    '研究生',
    '博士生',
    '在职人员',
    ]
  ];
  educationArea = [
    '小学生',
    '初中生',
    '高中生',
    '大学生',
    '研究生',
    '博士生',
    '在职人员',
  ];
  localuser = {
    id: ''
  };
  user: any = {
    id: '',
    nickname: '',
    avatar:'',
    sex: '选择',
    birthday: '',
    username:'',
    type:'',
    email:'',
    edu: '选择',
    wx: '',
    qq: ''
  };
  base64Image = '';
  year = '出生年份';
  sex = 'xxxxxx';
  education = '选择';
  yearvalue = new Date();
  sexvalue = [];
  veducation = [];
  value = [];
  inputFocus = {
    focus: false,
    date: new Date()
  };
  titleFocus = {
    focus: false,
    date: new Date()
  };
  constructor(
    private location: Location,
    private httpService: HttpService,
    private userService: UserService,
    public baseService: BaseService,
    // private base64: Base64,
    private camera: Camera,
    private router: Router,
    private pickerController: PickerController,
  ) {

    // this.inituser();
  }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
  }
  inituser() {
    this.islogin = this.userService.islogin;
    // this.user = null;
    if (this.islogin) {
      this.user = this.userService.data;
      // this.user.avatar = this.userService.data.avatar;
      // this.user.name = this.userService.data.nickname;
      // this.user.username = this.userService.data.username;
      console.log(this.user)
      /**极光推送开启 */
      // this.jpush.init();//插件初始化
      // this.jpush.setDebugMode(true);
      // /*消息推送配置**/
      // this.jpushUtil.initPush();//监听初始化
      // this.jpushUtil.setAlias(user.userCode);    //设置别名
    }
  }
  ionViewWillEnter() {
    // console.log(this.dbservice.getLocalVal('userdata'))
    // console.log(this.dbservice.getLocalVal('token'))
    // console.log('每次进入页面都会进行的处理')
    // this.user.id = this.userService.data.id;
    this.inituser();
    // this.userInfo_get();
  }




  async userInfo_get() {
    let r, err;
    const filters = this.userService.filters;
    filters.id = this.userService.data.id;
    [err, r] = await to(this.httpService.request(filters, this.userService.uriUserInfo));
    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      console.log(r.data)
      this.user = r.data
      this.yearvalue = new Date();
      // this.showList = true
      // this.hotNews=r["data"];
    }
  }
  async selectEdu(numColumns = 1, numOptions = 7, columnOptions = this.defaultEdu) {
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
            this.user.edu = value['col-0'].text;
          }
        }
      ]
    });
    await picker.present();
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
              // this.baseService.myalert(JSON.stringify(this.user)+"::"+value['col-0'].text)
              this.user.sex = value['col-0'].text;
              // this.baseService.myalert(JSON.stringify(this.user)+"::"+value['col-0'].text)
            }
          }
        ]
      });
      await picker.present();
  }

 getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }

    return options;
  }


  clickTitle() {
    this.titleFocus = {
      focus: true,
      date: new Date()
    };
  }
   // actions-active-start
  goback() {
    this.location.back();
    // this.location.open(NavComponent);
  }
  onOkyear(result) {
    this.user.birthday = this.currentDateFormat(result, 'yyyy-mm-dd');
    // console.log(this.user);
  }
  onOksex(result) {
    this.user.sex = this.getResult(result);
    console.log(this.user);
    // console.log(this.user.sex)
  }

  onOkeducation(result) {
    this.user.edu = this.getResult(result);
    console.log(this.user);
  }
  async shareUser() {

    if (this.user.nickname == ''){
      this.baseService.presentToast('昵称不能为空，请填写', 'danger')
      return false;
    }

    if (this.user.email == ''){
      this.baseService.presentToast('邮箱不能为空，请填写', 'danger')
      return false;
    }

    if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.user.email))) {
    
      this.baseService.presentToast("请输入正确的邮箱地址", 'danger')
      return false;
    }

    let err, r;
    // this.user.avatar = this.files.length > 0 ?  this.files[0].url : '';
    [err, r] = await to(this.httpService.request(this.user, this.userService.uriUserEdit));
    // this.editUserAlert();

    if (r.code == 20000) {
      // 新闻热点仅限2条 所以做了循环处理
      this.baseService.presentAlert('修改成功!')
      this.userService.userlocalsave(this.user); // 存储用户信息
      this.userService.init(); // 用户初始化
      // this.router.navigateByUrl('/app/mycenter');
      // this.showList = true
      // this.hotNews=r["data"];
    }
  }

  // changeImg(){
  //   const options: CameraOptions = {
    
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     this.base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }
  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }
  files = [];
  multiple = false;
  multipleTab = 1;

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

  gomyconter(){
    this.router.navigateByUrl('/app/mycenter')
  }
  getPictureAndUpload(sourceType: number) {
    const cameraOptions: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK
    };

    this.camera.getPicture(cameraOptions).then(image => {
      this.onUploadPicture(image);
    }, error => {
      console.log(error);
    });
  }

  onUploadPicture(fileURI: string) {
    if(fileURI.indexOf("base64")==-1){
      fileURI="data:image/jpeg;base64,"+fileURI;
    }
    //image/jpeg;base64,
    this.user.avatar=fileURI;
    // const fileTransferObject: FileTransferObject = this.fileTransfer.create();

    // const fileUploadOptions: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: 'avatar.jpg',
    //   httpMethod: 'POST',
    //   mimeType: 'image/jpeg',
    //   params: {},
    //   chunkedMode: true,
    //   headers: {'Content-Type': 'multipart/form-data'}
    // };

    // let url: string = 'https://sm.ms/api/upload?smfile=' + fileURI;

    // fileTransferObject.upload(fileURI, url, fileUploadOptions).then(data => {
    //   console.log(data["response"]);
    //   wilddog.auth().onAuthStateChanged(user => {
    //     user.updateProfile({'photoURL': JSON.parse(data["response"])["data"]["url"]}).then(() => {
    //       this.getUserData();
    //     }, error => {
    //       this.presentToast(error.name + ': ' + error.message);
    //     });
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }

  async presentChangeAvatarActionSheet(numColumns = 1, numOptions = 2, columnOptions = this.cameratype) {

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //     result => console.log('Has permission?',result.hasPermission),
    //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    //   );

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
            // this.baseService.myalert(JSON.stringify(this.user)+"::"+value['col-0'].text)
           if(value['col-0'].text=="拍照"){
            this.getPictureAndUpload(this.camera.PictureSourceType.CAMERA);
           }else{
            this.getPictureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
           }
          }
        }
      ]
    });
    await picker.present();

  }

}

import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from '../structs/user.service'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})



export class BaseService {
  myoder:any;
  loadingElement:any;
  baseDir="Amusicmaster";
  saveDir="";
  freedisk=0;
  firstOpen="";//第一次打开APP或欢迎页面更新
  platform="iOS";
  downinglist=[];//正在下载中的文件，防止出现重复下载
  referURI="";

  shareDataList = [
    // { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'sina', title: '新浪微博' },
    { url: 'weixinp', title: '微信朋友圈' },
    { url: 'weixin', title: '微信好友' },
    { url: 'qqshare', title: 'QQ' }
  ].map(obj => ({
    icon: `<img src="/assets/${obj.url}.png" style="width:36px"/>`,
    title: obj.title
  }));
  shareData={
    title: "音乐大师学院",
    // 迈斯特国际立足于文化全球化的时代背景，扎根于中华民族五千年文明历史，继续搭建中外文化交流的高品质平台，为中外文化艺术的交流与发展做出贡献。
    // 音乐大师学院是以合唱指挥教学、合唱团建设与展示、少儿声乐培训为主的在线音乐教育平台。首次向外界公开维也纳童声合唱团五百年教学秘笈，顶级专家为你量身定制“线上+线下”课程，让你与名师面对面，随时随地接受世界一流教学指导。
    description: "音乐大师学院是以合唱指挥教学、合唱团建设与展示、少儿声乐培训为主的在线音乐教育平台。首次向外界公开维也纳童声合唱团五百年教学秘笈，顶级专家为你量身定制“线上+线下”课程，让你与名师面对面，随时随地接受世界一流教学指导。",
    // http://m.music-masters.cn/music/images/down.png    自己域名
    // thumb: "http://mst.zt-tech.net/music/images/down.png",
    thumb: "http://m.music-masters.cn/music/images/WechatIMG153.png",

    url:`http://m.music-masters.cn/music/demo.html`,
  }


  
  constructor(public toastController: ToastController,
              public alertController: AlertController,
              private loadingCtrl: LoadingController,
              private statusBar:StatusBar,
              private transfer: FileTransfer, private file: File,
              private userService:UserService,
              private router:Router) { 

                this.isweixinopen()
              }

    // 提示框
  async presentToast(msg,state) {
    // msg 文本, state 状态
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color:state,
      // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium","dark"
      duration: 2000
    });
    toast.present();
  }
  isweixinopen(){

    // alert(this.ua)
  //  let  ua = navigator.userAgent.toLowerCase();
  //   alert(ua)
  //   let sWeixin = ua.indexOf('micromessenger') != -1; 
    // if(sWeixin){
    //   console.log(1)
    //   // alert(sWeixin)
    //   // alert(2)
    //   return this.shareData.url='http://m.music-masters.cn/music/index.html'
    // }else{
    //     // console.log(2)
    //   return this.shareData.url='http://m.music-masters.cn/music/demo.html'
    // }

    // alert( ua )
    // alert(1)



  }
  downLoadFile(downtask){
     this.myalert("indown");
     if(this.downinglist.indexOf(downtask.key)>-1){
       return;
     }
     this.downinglist.push(downtask.key);

    let fileTransfer: FileTransferObject = this.transfer.create();
    let savapath=this.saveDir+"/";
    if(downtask.type=="视频") savapath+=downtask.key+".mp4"
    if(downtask.type=="音频") savapath+=downtask.key+".mp3"
    if(downtask.type=="文本") savapath+=downtask.key+".jpg"
     this.myalert(savapath+downtask.serverurl);
    fileTransfer.download(encodeURI(downtask.serverurl),savapath).then((entry) => {
      this.myalert("11are you ok?"+entry.toURL());
      this.presentToast(downtask.name+"下载成功","success");
      this.myalert("okk:"+JSON.stringify(this.userService.mycacheCourse))
      
    }, (error) => {
      // handle error
      this.downinglist.splice(this.downinglist.indexOf(downtask.key),1)//删除正在下载列表下载
      //  this.myalert("22are you ok?"+JSON.stringify(error));
    });
    fileTransfer.onProgress((p)=>{

      if (p.lengthComputable) {
        // console.log(p.loaded / p.total);
        downtask.localuri=savapath;
        downtask.lastloaded=downtask.loaded;
        downtask.loaded=p.loaded;
        downtask.total=p.total;
        this.userService.updateCacheCourse(downtask);
      } else {
        // this.myalert(p.total+":are you ok?"+p.loaded);
      }

    })
    
  }


//loading
async presentLoading(msg) {
  this.loadingElement = await this.loadingCtrl.create({
   message: msg
 });
 await this.loadingElement.present();
}

async dismissLoading(){
 this.loadingElement.dismiss();
}


  // 弹出框
  async presentAlert(msg){

    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: [
        {
          text: '取消',
          // role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            // 这里需要定制确定之后所进行的操作\
            this.router.navigateByUrl('/login');
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  // 一般消息提示
  async presentMessage(mes) {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 500,
      // message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class',
      message: mes,//loading框显示的内容
      // leaveAnimation: true, // 是否在切换页面之后关闭loading框
      showBackdrop: true  //是否显示遮罩层
    });
    return await loading.present();
  }
  myalert(str){
  //  alert(str);
  }

  mylog(str){
    console.log(str);
  }


  getProtooUrl(peerId,roomId,forceH264){
    let hostname = "192.168.2.100";
    hostname = "192.168.31.165";
    // hostname = "123.56.84.219";
    hostname="xiaoxiang.zt-tech.net";
    // let url = `wss://${hostname}:4443/?peerName=${peerName}&roomId=${roomId}`;
    let url='wss://'+hostname+':4443/?roomId='+roomId+'&peerId='+peerId
    if (forceH264)
      url = `${url}&forceH264=true`;
  
    return url;
  }

  // shareAPP(index){

  //   // this.shareDataList[index];

  //   Wechat.share({
  //     message: {
  //         title: "Hi, there",
  //         description: "This is description.",
  //         thumb: "www/img/thumbnail.png",
  //         mediaTagName: "TEST-TAG-001",
  //         messageExt: "这是第三方带的测试字段",
  //         messageAction: "<action>dotalist</action>",
  //         media: "YOUR_MEDIA_OBJECT_HERE"
  //     },
  //     scene: Wechat.Scene.TIMELINE   // share to Timeline
  // }, function () {
  //     alert("Success");
  // }, function (reason) {
  //     alert("Failed: " + reason);
  // });


  // }
  
  statusbarSet(style_S){
    if(this.platform=="iOS"){

      if(style_S=="default"){
        this.statusBar.overlaysWebView(true);
        this.statusBar.styleLightContent();
      }else{
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByName("white");
        this.statusBar.styleDefault();
      }

    }

    if(this.platform=="Android"){


    }
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import { Location } from '@angular/common';
import {BaseService} from '../../../service/base.service';//../../service/base.service
import { HttpService } from '../../../service/http.service';
import to from 'await-to-js';
import { VideoService } from '../../../structs/video.service';

// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController } from '@ionic/angular';

declare var screen:any;
declare var TCPlayer:any;

@Component({
  selector: 'app-videoplay',
  templateUrl: './videoplay.page.html',
  styleUrls: ['./videoplay.page.scss'],
})
export class VideoplayPage implements OnInit {
  isIOS=false;
  bool:any=false;
  vid=new Date().getTime()+"bd";
  Id = this.router.snapshot.paramMap.get('Id'); // 获取课程ID
   title= this.router.snapshot.paramMap.get('title')
  videofilters = Object.assign({}, this.videoService.filters);
  licshow:any;
  istencent=false;
  video: any;
  backshow=true;
  constructor(
    private route:Router,
    private http: HttpClient,
    private router: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private videoService: VideoService,
    private httpService: HttpService,
    // private screenOrientation: ScreenOrientation,
    public nav: NavController
  ) {
  //   function loop($scope, $location, $http, $sce) {

  //     //直播视频播放事件
  //     $scope.videoUrlFun = function (url) {
  //       var urlFun = $sce.trustAsResourceUrl(url);
  //       return urlFun;
  //     };
  //  }
  if(this.baseService.platform=='iOS'){
    this.isIOS=false;//判断是否为IOS
  }

  }

  ionViewWillLeave(){
    // this.screenOrientation.unlock();
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    clearInterval(this.licshow)
    screen.orientation.unlock();
    screen.orientation.lock('portrait');
   }
   ionViewDidEnter(){
    // this.screenOrientation.unlock();
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.licshow=setInterval(()=>{
        if(this.istencent){
          // console.log(this.vid)
        let tc=document.getElementById("player-container-"+this.vid).className.indexOf("vjs-user-active");
        let tc2=document.getElementById("player-container-"+this.vid).className.indexOf("vjs-paused");
        // console.log(tc,tc2)
        if(tc>-1||tc2>-1){
          // alert(1)
          // console.log(tc,tc2)
          // console.log(this.backshow)
          this.backshow=true;
        }else{
          this.backshow=false;
        }
      }
      },100);
     // document.getElementById("player-container-"+this.vid).style.width=window.screen.width+"px";
     
   


    screen.orientation.unlock();
    screen.orientation.lock('landscape');
   }

  
  ngOnInit() {
    // console.log(this.router.snapshot.paramMap,this.title)
    this.load_courses();
  }
  async load_courses() {
    let r, err;
    this.videofilters.id = this.Id;
    [err, r] = await to(this.httpService.request(this.videofilters, this.videoService.uriInfo));
    // console.log(r)
    if (r.code == 20000) {
      this.video = r["data"];
      if(this.video.fileid==null||this.video.fileid==""){
        
      }else{

      this.istencent=true;

      setTimeout(() => {

        var player = TCPlayer("player-container-"+this.vid, { // player-container-id 为播放器容器 ID，必须与 html 中一致
          fileID: this.video.fileid, // 请传入需要播放的视频 filID（必须）
          appID: '1300073628', // 请传入点播账号的 appID（必须）
          controlBar:{fullscreenToggle:false}
        });
        
      }, 200);
      
     
    }

      // this.isloading = false;
    }
  }
  ck(){
    this.bool= !this.bool
  }
// 返回按钮
goback() {
  this.nav.pop();
}
clickvideo(){
  // document.getElementById("").
  alert(1)
  if(this.backshow){
    // this.backshow=false;
    setTimeout(() => {
      this.backshow=false;
    }, 1000);
  }else{
    this.backshow=true;
    setTimeout(() => {
      this.backshow=true;
    }, 1000);
  }
}
loginhome(){
  this.route.navigateByUrl('/app/home')
  return false;
}
// isviode(){
//   alert(1)
// }
}

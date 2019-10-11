import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../service/http.service'
import { CourseService } from '../../../structs/course.service'
import { NavController } from '@ionic/angular'
import { UserService } from '../../../structs/user.service'
import {BaseService} from '../../../service/base.service'
import { OrderService } from '../../../structs/order.service'
import to from 'await-to-js';
import { Md5 } from 'ts-md5/dist/md5';



@Component({
  selector: 'app-downcache',
  templateUrl: './downcache.page.html',
  styleUrls: ['./downcache.page.scss'],
})
export class DowncachePage implements OnInit {
  course:any;
  tasks:any;
  freedisk="";
  baseFromUrl="";
  Id = this.router.snapshot.paramMap.get('Id');//获取课程ID
  constructor(private httpService: HttpService,
    private courseService: CourseService,
    private orderService: OrderService,
    private Router: Router,
    private baseService:BaseService,
    private router: ActivatedRoute,
    private nav: NavController,
    private userService:UserService) {
      let turl=this.Router.getCurrentNavigation().extractedUrl.toString();
      this.baseFromUrl=turl.substr(0,turl.indexOf("/downcache"))//解决回退问题
      if(this.userService.mydownCourses==null){
        this.userService.mydownCourses=[];
      }
     }

  ngOnInit() {
    // this.load_courseInfo();
    this.getfreeDisk();
  }


  //data-init-start
  async load_courseInfo() { // 获取课程详情
    let r, err;
    let filters = Object.assign({}, this.courseService.filters);
    filters.id = this.Id;
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriInfo));

    if (r.code == 20000) {
      this.course = r["data"];
      // this.course.forEach((element,i) => {
      //   element.forEach
      // });
      this.checkisdown();
    }
  }

  ionViewDidEnter(){
    this.load_courseInfo();
    if(this.userService.mydownCourses==null){
      this.userService.mydownCourses=[];
    }
  }

  async getfreeDisk(){
    this.freedisk=this.baseService.freedisk.toString()+"Gb";
  }

  checkisdown(){//是否已经下载成功
    this.course.kj.forEach(myitem => {
      myitem.children.forEach(element => {

        element.checked=false;
        element.downed=false;
        let isIdin=true;
        let tlist=[];
        this.userService.mydownCourses.forEach((el,l)=>{
          if(el.id==this.Id){
          isIdin=false;
          tlist=el.list;//得到当前已经下载课程列表及下载状态
          }
        })
        if(isIdin){
        return;//本课程全部未缓存
        }
        let downinfo=this.userService.CheckCache(Md5.hashStr(element.file).toString(),tlist);
        // let downinfo=this.userService.CheckCache(Md5.hashStr(element.file).toString());
          if(downinfo!=null){
            element.checked=true;
            element.downed=true;
            element.downinfo=downinfo;
          }
      });
    });
  }

  check(item){
    this.course.kj.forEach((myitem,i) => {
      myitem.children.forEach((element,t) => {
        if(element.file==item.file){
          if(element.checked&&!item.downed){
            this.course.kj[i].children[t]["checked"]=false;
          }else if(!element.checked&&!item.downed){
            if(this.course.kj[i].children[t]["type"]!="文本"){
            this.course.kj[i].children[t]["checked"]=true;
          }else{
            this.baseService.presentToast("对不起，图片类型不支持缓存！","danger");
            this.course.kj[i].children[t]["checked"]=false;
          }
          }
        }
    });
      });
  }

  checkall(){
    this.course.kj.forEach((myitem,i) => {
      myitem.children.forEach((element,t) => {
        // if(element.file==item.file){
          if(element.checked&&!element.downed){
            this.course.kj[i].children[t]["checked"]=false;
          }else if(!element.checked&&!element.downed){
            this.course.kj[i].children[t]["checked"]=true;
          }
        // }
    });
      });

  }

  createDowntask(){
    ////[{key:"key",name:"name",type:"mp4/jpg/mp3",localuri:"uri",loaded:12,total:100,serverurl:"serverurl",state:1}],state:1,缓存完成,0,缓存中
    // this.baseService.myalert(this.userService.mydownCourses.length)
    let downcourse=[];
    this.course.kj.forEach((myitem,i) => {
      // this.baseService.myalert("db")
      myitem.children.forEach((element,t) => {
        // this.baseService.myalert("db2")
        let key="";
        try{
          // this.baseService.myalert("db3"+element.file)
         key=Md5.hashStr(element.file).toString();
        // this.baseService.myalert("db4"+element.file)
      }catch(e){
        // return true
      }
          // if(element.checked&&!element.downed){
            if(key!=""){
          if(element.checked){
            let ishaved=false;
            downcourse.forEach((item,i)=>{
              if(item.key==key){
               ishaved=true;
              }
            })
            if(!ishaved){
              let downtask=new Map();
              // this.baseService.myalert(JSON.stringify(key));
              downtask["key"]=key;
              downtask["name"]=element.name;
              downtask["type"]=element.type;
              downtask["serverurl"]=element.file;
              downtask["localuri"]=null;
              downtask["kid"]=element.id;//课件ID
              downtask["cid"]=this.Id;//课程ID
              if(element.downed){
              downtask["state"]=element.downinfo.state;
              downtask["loaded"]=element.downinfo.loaded;
              downtask["lastloaded"]=element.downinfo.lastloaded;
              downtask["total"]=element.downinfo.total;
               }else{
              downtask["state"]=0;
              downtask["loaded"]=0;
              downtask["lastloaded"]=0;
              downtask["total"]=0;
              }
              if(downtask["state"]=="0"){
                this.baseService.downLoadFile(downtask);
              }
              downcourse.push(downtask)
            }
          }
        }
    });
      });
      // this.baseService.myalert("downcourse.length"+downcourse.length)
      if(downcourse.length>0){
        // if(this.userService.mycacheCourse!=null){
        // this.userService.mycacheCourse.concat(downcourse);
        // }else{
        //   this.userService.mycacheCourse=downcourse;
        // }
        let isIdin=true;
        let c_course=new Map();
        c_course["id"]=this.Id;//课程中被下载的课件
        c_course["picurl"]=this.course.picurl;//课程中被下载的课件
        c_course["title"]=this.course.title;//课程中被下载的课件
        c_course["list"]=downcourse;//课程中被下载的课件
        this.userService.mydownCourses.forEach((c_item,c)=>{
          if(c_item.id==this.Id){
            isIdin=false;
            c_item.list=downcourse;
            }
        })
       
        if(isIdin){
          // this.userService.mydownCourses.push(this.Id);
          this.userService.mydownCourses.push(c_course);
        }
        this.userService.saveDown(this.userService.mydownCourses);

        // downcourse.forEach((item)=>{
        //   let isInTask=false;
        //   this.userService.mycacheCourse.forEach((et)=>{
        //     if(et.key==item.key){
        //       isInTask=true;
        //     }
        //   })
        //   if(!isInTask){//不在任务中则创建任务
        //   this.userService.mycacheCourse.push(item);
        //   this.baseService.downLoadFile(item);
        // }
        // });
        // this.userService.saveCache(this.userService.mycacheCourse);//更新CACHE
        this.Router.navigateByUrl(this.baseFromUrl+"/cacheprogress/"+this.Id);
      }else{
        this.baseService.presentToast("请选中需要下载的课件","warning");
      }
  }

  cachedown(){
    this.Router.navigateByUrl(this.baseFromUrl+"/cacheprogress/"+this.Id);
  }

}

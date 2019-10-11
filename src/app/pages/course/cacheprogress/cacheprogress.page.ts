import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../structs/user.service'
import { Router,ActivatedRoute } from '@angular/router';
import {BaseService} from '../../../service/base.service'

@Component({
  selector: 'app-cacheprogress',
  templateUrl: './cacheprogress.page.html',
  styleUrls: ['./cacheprogress.page.scss'],
})
export class CacheprogressPage implements OnInit {

  downTasks:any=[];
  isRefresh=true;
  Id = this.router.snapshot.paramMap.get('Id');//获取课程ID//相关课程ID，0为全部
  checkeds=[];//已经被选中的项目

  constructor(
    private baseService:BaseService,
    private userService:UserService,
    private router: ActivatedRoute,
  ) { 
    // this.baseService.myalert(this.Id)
  }

  ngOnInit() {
  
  }

  loading(){
    this.loadTasks();
    if(this.isRefresh){
    setTimeout(()=>{
      this.loading();
    },700);//每半秒刷新一次--计算速度参数来源
  }
  }

  downtask(){
    
  }
  ionViewDidEnter(){
    this.isRefresh=true;
    this.loading()
    if(this.userService.mydownCourses==null){
      this.userService.mydownCourses=[];
    }
  }
  ionViewWillLeave(){
    this.isRefresh=false;
  }

  loadTasks(){
    this.downTasks=[];
    // if(this.Cid!="0"){
    //   this.userService.mycacheCourse.forEach((et)=>{
    //     if(et.cid==this.Cid){
    //       this.downTasks.push(et);
    //     }
    //   })
    // }else{
    //   this.downTasks=this.userService.mycacheCourse;
    // }
    // this.baseService.myalert(JSON.stringify(this.userService.mydownCourses))
    this.userService.mydownCourses.forEach((c_item,c)=>{
      if(this.Id!='0'){
      if(c_item.id==this.Id){
        this.downTasks=c_item.list;
        }
      }else{
      //  if(this.downTasks==[]){
        
        c_item.list.forEach(element => {
          this.downTasks.push(element)
        });;
      //  }else{
      //   this.downTasks.concat(c_item.list);
      // }
      }
    })
    // this.baseService.myalert(JSON.stringify(this.downTasks))
    // this.downTasks=this.userService.mycacheCourse;
    this.downTasks.forEach((element,i) => {
      
      let fsize:any;//文件大小，单位M，保留两位小数
      fsize=element.total/1024/1024;
      fsize=fsize.toFixed(2);
      this.downTasks[i]["fsize"]=fsize;
      let tsize:any;
      tsize=element.loaded-element.lastloaded;
      let mspeed:any=tsize*2/1024;//每半秒刷新一次
      mspeed=mspeed.toFixed(2);
      let Percentage:any=element.loaded/element.total;
      Percentage=Percentage.toFixed(2);
      let Percentage2=Percentage+0.01;
      this.downTasks[i]["Percentage"]=Percentage;
      this.downTasks[i]["Percentage2"]=Percentage2;
      this.downTasks[i]["speed"]=mspeed;
      this.downTasks[i]["checked"]=false;
      this.checkeds.forEach((et)=>{
          if(et==this.downTasks[i]["key"]){
            this.downTasks[i]["checked"]=true;
          }
      })
    });
  }


  check(item){
    this.downTasks.kj.forEach((element,i) => {
          if(element.key==item.key){
            if(element.checked){
            this.userService.mycacheCourse[i]["checked"]==false;
            }else{
              this.userService.mycacheCourse[i]["checked"]==true;
            }
          }
      });
  }

  checkall(){
    this.downTasks.forEach((element,t) => {
          if(element.checked&&!element.downed){
            this.downTasks[t]["checked"]=false;
            let rm=this.checkeds.indexOf(element.key);
            if(rm>-1){
            this.checkeds.splice(rm,1);
          }
          }else if(!element.checked&&!element.downed){
            this.downTasks[t]["checked"]=true;
            this.checkeds.push(element.key);
          }
    });
  }

  deleteDowntask(){
    
  }

}

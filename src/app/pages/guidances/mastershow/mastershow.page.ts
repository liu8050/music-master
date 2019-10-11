import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../../../service/http.service'
import { MastersService } from '../../../structs/masters.service'
import { CourseService } from '../../../structs/course.service'
import { BaseService } from '../../../service/base.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { LoadingController, IonContent } from '@ionic/angular';
import { NavController } from '@ionic/angular'
// import { LoadingController } from 'ionic-angular';
import to from 'await-to-js'




@Component({
  selector: 'app-mastershow',
  templateUrl: './mastershow.page.html',
  styleUrls: ['./mastershow.page.scss']
})
export class MastershowPage implements OnInit {

  // @ViewChild("mymastershow") mymastershow:any;

  // 调试错误图片
  // arrImg:any=[
  //   {url:''}
  // ]
  //  判断老师的职业长度 
  len:any=0;
  ispadding:any=0;
  // 区号默认
  AreaCode:any=86
  bool = false
  boolTxt = '全部展开'
  boolTrue = false
  // tab切换
  flag = true
  index = 1
  

  isfixed=false;//是否顶部浮动显示
  ttop=0;

  masterDetal: any = {}
  masterDetallengt:any=[]
  // 
  
   TheFirstThree:any
  // 免费课程
  freeList: any = []
  // 付费课程

  // 付费课程
  PaidCourses: any = []
  slidetxt: any
  // txtBool=false;

  slideOff = false
  // 屏幕宽度
  @ViewChild('#domLength') htDom: any
  viewport = document.body.clientWidth
  showAlls = 0
  master = { title: '', picurl: '' } //大师详情
  infoLength = 0
  Coursesshow = false //延迟加载
  skeleton = true
  Id = this.router.snapshot.paramMap.get('Id') //获取大师ID
  Courses = [] //大师相关课程
  coursefilters = Object.assign({}, this.courseService.filters)
  isloading = false
  loadingText = '数据正在加载中，请稍后。。。'
  constructor(
    public loadingController: LoadingController,
    private httpService: HttpService,
    private mastersService: MastersService,
    private courseService: CourseService,
    private baseService: BaseService,
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private nav:NavController
  ) {

    



  }
ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  console.log(this.masterDetal!=null)
}
  ngOnInit() {
    console.log(this.Id)
    this.load_mmastershow()
    this.load_mmasterCourses()

    // 大师详情

    this.presentLoadingWithOptions()
    this.getCourseList()

    this.FreeAdmission()
    setTimeout(() => {
      this.Coursesshow = true
      this.load_mmasterDetails()
    }, 1000)
  }

  async FreeAdmission() {
    let r,
      err,
      filters = this.courseService.filtersFreeAdmission
      filters.master=this.Id 
 

    // filters.isfree=1;
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriCourseList)
    )
    // console.log(filters)
    // console.log(r)
    if (r.code == 20000) {
      if(r['data']!=null){
   
               r['data'].sort((a,b)=>{
        return b['sort']-a['sort']
      })
     
        r['data'].forEach(element => {
          if(element.title.indexOf('--')!==-1){
            element.titles=element.title.split('--')
          }
        });
      }
      // console.log(r['data'])
    
      this.freeList=r['data']
   


    }
  }

  onChange(item) {

    // if (item == 1) {
    //    console.log('onChange', item)
    // }
    // let t2=document.getElementById("maindiv").getBoundingClientRect();
    // if(this.isfixed&&t2.top<1){
    //   document.getElementById("maindiv2").style.top=0+"px";
    // }
  }
  goback(){
    this.nav.pop();
  }


  onTabClick(item) {

    this.ispadding= item.index
    console.log('onTabClick', item)
    // if(item.index==0){
    //   // console.log(0)
    //  this.ispadding= item.index
    // }else{
    //   // console.log(1)
    //   this.ispadding= item.index
    // }
  }

  selectCard(e) {
    console.log(' ', JSON.stringify(e))
  }

  changeIndex() {
    this.index = 0
  }
async  getCourseList(){
    let err,r;
   [err,r]= await to(this.httpService.request(this.courseService.filtersFreeAdmission,this.courseService.uriCourseList))
  console.log(r)
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      animated:true,
      duration: 900,
      message: '加载中请稍后...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  //data-init-start
  async load_mmastershow() {
    // console.log(this.Id)
    let r, err
    let filters = this.mastersService.filters
    filters.id = this.Id
    ;[err, r] = await to(
      this.httpService.request(filters, this.mastersService.uriInfo)
    )
    console.log(
      await to(this.httpService.request(filters, this.mastersService.uriInfo))
    )
    if (r.code == 20000) {
      this.master = r['data']
      //  let  HtmlLenght: = document.createElement('p').innerHTML(this.master)
      this.infoLength = this.master['infos'].length
      // this.master["infos"] = this.sanitizer.bypassSecurityTrustHtml(this.master["infos"]);
      this.master['infos2'] = this.sanitizer.bypassSecurityTrustHtml(
        this.master['infos']
      )
    }
  }
  TakeInverse() {
  
    // console.log(this.masterDetal)
    if(this.masterDetal.achievement.length<4&&this.boolTxt=="全部展示"){
      // this.boolTxt="收起"
      return
    }
    if(this.masterDetal.achievement.length>=4&&this.boolTxt=="收起"){
      console.log(1)
      this.boolTrue=  false
      this.boolTxt="展开全部"
      return

    }
   
    if(this.masterDetal.achievement.length>=4||this.boolTxt=="展开全部"){
    // console.log(this.boolTrue=false  )
      this.boolTrue=true  
      this.boolTxt="收起"
      return
    }
    // else{
    //   this.boolTxt="收起"
    //   this.boolTrue=true
    // }
    
  }
  async load_mmasterDetails() {
    console.log(this.coursefilters, this.Id, this.mastersService)

    let r,
      err,
      filters = this.mastersService.masters
    filters.id = this.Id
    ;[err, r] = await to(
      this.httpService.request(filters, this.mastersService.uriInfo)
    )
    console.log(r)
    if (r.code == 20000) {
      const  splitTag:any=/[',']|['，']/ 
//       // console.log(splitTag)
// console.log(r['data'])

      if(r.data.achievement!=null&&splitTag.test(r.data.achievement)){

// [`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]
// 数据处理以逗号分割
        r.data.achievement= r.data.achievement.split(/[',']|['，']/)
        // 判断每一项不为空  为空删除
        r.data.achievement.forEach((item,i)=>{
          console.log(item)
          if(!item){
            r.data.achievement.splice(i,1)
          }
        })
        
        if(     r.data.achievement!=null&& r.data.achievement.length>1){
          console.log(r.data.achievement)
      
          const three=r.data.achievement.splice(0,3)
        
          r.data.achievement=[ ...three,...r.data.achievement]
            
          r.data.achievements=three
            // let vides=/"<video.*?>.+?</video>"/
          // console.log(vides.test(    r['data'].infos))
          // if(vides.test(r['data'].infos)){
          //   console.log(  r['data'].infos.slice(vides))
          // }
          // .video.test(vide)
          this.masterDetal=r.data
          
          // console.log(this.masterDetal)
        
          this.len=this.masterDetal.achievement.length
          return false;
  
        }

      }
      // ler arr =innerHTML( r['data'].infos)
      // console.log(arr)
      this.masterDetal=r.data

      this.len=this.masterDetal.achievement.length
      return false;

    }
  }

  async load_mmasterCourses() {
    console.log(this.Id)
    //
    let r,
      err,
      filters = this.courseService.filtersFreeAdmission
      // 特定老师的素材
      // let r, err,filters = this.coursefilters;
      // filters.master = this.Id;
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriCourseList)
    )
    // console.log(filters)
    // console.log(r)

    if (r.code == 20000) {
      //   r.['data'].forEach(element => {
      // // console.log(lement.title)
      //   });
      //   console.log(r['data'])
      console.log(r['data'])
      r['data'].forEach(item => {
        // console.log(222)
        if (item.title.length >= 20) {
          // console.log()
          return (item.titles = item.title.slice(0, 18) + '...')
        }
        item.titles = item.title
      })
      this.Courses = r['data'].filter(item => {
        if (item.dprice > 0) {
          // console.log(item.title.length)
          return item
        }
      })
      console.log(this.Courses)
      this.isloading = false
      this.skeleton = false
    }
  }

  // async load_mmasterPaidCourses() {

  //   console.log(this.Id)
  //   let r, err,filters = this.coursefilters;
  //   filters.master = this.Id;
  //   [err, r] = await to(this.httpService.request(filters, this.courseService.uriCourseList));
  //   console.log(filters)
  //   console.log(r)

  //   if (r.code == 20000) {
  //   //   r.['data'].forEach(element => {
  //   // // console.log(lement.title)
  //   //   });
  //   //   console.log(r['data'])
  //     this.Courses = r["data"];
  //     this.isloading = false;
  //     this.skeleton=false;
  //   }
  // }
  async loadData(event) {
    //下拉刷新
    if (this.slideOff) {
      console.log('没有更多数据')
      this.loadingText = '没有更多数据...'
      event.target.complete()
      return false
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    console.log('下拉刷新')
    // if()
    if (this.isloading) {
      console.log(this.isloading)
      event.target.complete()
      return
    }

    let r, err
    this.coursefilters.page = this.coursefilters.page + 1
    ;[err, r] = await to(
      this.httpService.request(
        this.coursefilters,
        this.courseService.uriCourseList
      )
    )
    console.log(r)
    if (r.code == 20000 && r.data != null) {
      if (r.records <= 10) {
        console.log(r.total, r.records)
        this.slideOff = true
        // return false
      }
      // console.log(r.data.length)
      for (let i = 0; i < r.data.length; i++) {
        this.Courses.push(r.data[i])
      }
      //  console.log(  this.Courses)
      // this.load_mmasterCourses()
      // console.log(  this.Courses, r.data, this.Courses.push(r.data))
      this.coursefilters.page = r['page']

      event.target.complete()
      // console.log(parseInt(r.total)%10!=0,r.total)
      return
    }

    this.loadingText = '资源已经完全加载完毕'

    // if(r.records>10&& paseInt(r.total)%10!=0){
    //   alert(1)
    // }
    setTimeout(() => {
      event.target.complete()
    }, 1500)
  }

  showAll() {
    this.showAlls = 1
  }

  logScrolling(e){

    let t=document.getElementById("mymastershow").getBoundingClientRect();
    let t2=document.getElementById("maindiv").getBoundingClientRect();
    // document.getElementById("mymastershow").classList
    

    // var doit=setInterval("this.movetoPostion()",50)
    let topt=t.top;
    if(t.top<2){
      this.isfixed=true;
      document.getElementById("backicon").hidden=true;
      document.getElementById("mymaincontent").style.marginTop="50px";
      document.getElementById("mymaincontent").style.paddingTop="-50px";
      
      if(t.top<-20){
        topt=-20;
      }
      console.log(topt)
      document.getElementById("mymastershow").style.top="0px";
      
      // this.movetoPostion();
      console.log("kk::::"+document.getElementById("mymastershow").getBoundingClientRect())
    }
    if(t2.top>0&&t2.top>this.ttop){
      console.log(t2.top,this.ttop)
      document.getElementById("mymaincontent").style.marginTop="0px";
      document.getElementById("mymaincontent").style.paddingTop="0px";
      console.log("kk22::::"+document.getElementById("mymastershow").getBoundingClientRect())
      this.isfixed=false;
      document.getElementById("backicon").hidden=false;
    }
    this.ttop=t2.top;
    // ;

   
  //  this.isfixed=true;

  }

  movetoPostion(){
    let t=document.getElementById("mymastershow").getBoundingClientRect();
    console.log(t)

    if(t.top<-10){
      document.getElementById("mymastershow").style.top="-2px";
    }
    document.getElementById("mymastershow").style.top=t.top+0.5+"px";
    if((0-t.top)>0.5){
    setTimeout(() => {
      this.movetoPostion();
    }, 300);
  }else{
    document.getElementById("mymastershow").style.top="0px";
  }
  }

  logScrollStart(){

    // let t1= document.getElementById("maindiv1").getBoundingClientRect()
    // let t2= document.getElementById("maindiv2").getBoundingClientRect()

    // if(t1.height>t2.height){
    //   document.getElementById("maindiv2").style.height=t1.height+"px";
    // }else{
    //   document.getElementById("maindiv1").style.height=t1.height+"px";
    // }
    

  }

  hideAll() {
    this.showAlls = 0
  }
  //data-init-end
}

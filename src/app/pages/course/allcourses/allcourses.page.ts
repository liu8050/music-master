import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../structs/course.service';
import { HttpService } from '../../../service/http.service';
import {BaseService} from '../../../service/base.service';
import { NavController } from '@ionic/angular';
import to from 'await-to-js';
import { max } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx' //手机状态颜色
@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.page.html',
  styleUrls: ['./allcourses.page.scss'],
})
export class AllcoursesPage implements OnInit {
  islh=false;//是否为刘海屏
    arr:any=[
    {picurl:'',dprice:'10',oprice:'10',titles:'这个是哥哥哥哥哥哥'},
  ]
// 第一次进入
searchValue:any;
 num = 0;
  slider= false;
  ischoose = true;
  radios = 1;
  shoWait=false;
  // priceasc
  orderby = ''; // priceasc 价格正序 pricedesc价格倒叙 descnew:最新
  isfree = ''; // 0 正常 1 免费
  keyword = this.router.snapshot.paramMap.get('keyword'); // 获取搜索条件

  type= '';
  Cid = this.router.snapshot.paramMap.get('Id'); // 获取从类型进入
  Courses:any = []; // 所有课程
  loadingText = '资源正在加载中，请稍后。。。' ; // 加载提示文字
  coursefilters = Object.assign({}, this.courseService.filters);
  isloading = true ; // 判断是否需要继续加载

  Json = [
    //  {
    //    'id': '1',
    //    'name': '指挥技法',
    //    'children': [
    //      {
    //        'id': '1',
    //        'name': '指挥技巧',
    //        'choose': false,
    //        'title' : '指挥技巧'
    //      },
    //     ]
    //  },
  ];
  height: number = document.documentElement.clientHeight;
  nums: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  state = {
    open: false
  };


  showEnd = true;
  constructor(    private statusBar: StatusBar,private httpService: HttpService, private courseService: CourseService,private baseService:BaseService,
    public nav: NavController,
    private router: ActivatedRoute, private menu: MenuController) { }
    ngAfterContentChecked(): void {
      //Called after every check of the component's or directive's content.
      //Add 'implements AfterContentChecked' to the class.
      // this.router.navigateByUrl('/allcourses',{queryParams:{'name':'yxman'}});
    }
  ngOnInit() {
  // alert()
  let h_m=window.screen.height;
  let w_m=window.screen.width;
  if(h_m/w_m>18/9){
    this.islh=true;
  }
  console.log(this.Courses)
    // this.type=
    // console.log(this.keyword ,this.Cid )
    this.Course_get();
    this.SearchList_get();
    setTimeout(() => {
      this.shoWait=true;
    }, 600);
    // console.log(this.type)
    // console.log('初始化执行'+this.keyword)
    // this.openCustom();
  }
  ionViewWillLeave() {
    //  document.getElementsByTagName("ion-tab-bar")[0].style.display="none";//离开四大主页隐藏
    this.statusBar.styleDefault()
    if (this.baseService.platform == 'iOS') {
      this.statusBar.backgroundColorByName('black')
      this.statusBar.styleDefault()
    }
  }
  // data-init-start
  async Course_get() { // 获取课程
     this.num= ++this.num
    let r, err, filters = this.coursefilters;
    // filters.cid = this.Cid;
    filters.orderby = this.orderby;
    filters.isfree = this.isfree;

    filters.page=0;

    if (this.type != null && this.type != 'null'){ // 如果没有进入的类型 那么他的type就为0
      
      filters.type = this.type
    } else {
      filters.type = "0";
    }
    if (this.Cid != null && this.Cid != 'null' &&this.num<=1){ // 如果没有进入的类型 那么他的type就为0
      filters.cid = this.Cid

    } else {
      filters.cid = "0";
    }
    if (this.keyword != null && this.keyword != 'null'){ // 如果没有关键字 那么他的keyword就为 空
      filters.keyword = this.keyword
    } else {
      filters.keyword = ''
    }
    // if(filters.type!=null||filters.type!=""){
    //   filters.cid=""
    // }
    //
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriCourseList));
 
    if (r.code == 20000&& r['data'] != null) {
      // 
      filters.cid =""
  
    // if(r['data']){
    //   r["data"].forEach((item)=>{
        
    //   }
     
  
      
    //   )
    // }

    // if(r['data']!==null){
    // console.log(r['data'])    
      r['data'].sort((a,b)=>{
        return b['sort']-a['sort']
      })
      // console.log(r["data"])
   
      
      this.Courses = r["data"];
      console.log(this.Courses)
 
      this.isloading = false;
    }
  }
  // isback(){
    // history.go(-1)
    // this.router
    // this.router.navigate('/app/home');
//  console.dir(   this.router)
  // }search
  // 搜索类型列表
  async SearchList_get(){
    let r, err;
    // console.log(this.type) 
    let filters = this.courseService.filters;
    this.router.queryParams.subscribe((data)=>{
      // console.log(data)
    });
    [err, r] = await to(this.httpService.request(filters, this.courseService.searchList));
    console.log(r)
    console.log(filters)
    if (r.code == 20000 && r['data'] != null) {
      this.Json.forEach((element, index) => {
        // if (element.children.length >=1){
          element.children.forEach((a, b) => {
          // if(this.type == a.id){
          //   a.radios = false
          // }else{
            a.choose = false
          // }
          })
        // }
      })
        r['data'].forEach(element => {
          console.log(this.Cid)
          console.log(element.id)
          if(element.id==this.Cid){
            console.log(element)
            for(var i in element.children){
              console.log(element.children[i].choose)
              element.children[i].choose=true
            }
        return    this.Json = r['data'];
            // element.children.forEach(element1 => {
            //   // console.log(element1.choose)
           
            //   console.log(element1['choose'],element1.id,element1.title)

            //   // console.log(element1.choose)
            //   element1['choose']=true 
            //   return this.Json = r['data'];
            //   // console.log(element1)
       
            // });
          }
        });
      this.Json = r['data'];
    
      // console.log(this.Json)
    
    }
  }
  //data-init-end
  // 改变选中的搜索类型
  choose(choose, id){
    console.log(choose, id)
    // console.log(id)
  
    this.Json.forEach((element, index) => {
      if (element.children.length >= 1) {
        element.children.forEach((a, b) => {
          if(a.id == id){
            console.log(a.id,id)
            if(a.choose){
             
              a.choose = false
              console.log(a.choose)
            } else {
         
              a.choose = true
              console.log(a.choose)
            }
          }
        })
      }
    })
  }

  // 搜索方法
  search() {
    this.type = '';
    this.state.open=false;
    // search方法重置keyword关键字
    // 不对搜索字段进行二次筛选
    this.keyword = null;
    this.Json.forEach((element, index) => {
      if (element.children.length >= 1) {
        element.children.forEach((a, b) => {
          if(a.choose){
            this.type= this.type + ','+ a.title
            console.log(this.type)
          }
        })
      }
    })
    this.type = this.type.substr(1); //删除第一个字符
    // console.log('转换完毕' + this.type)
    this.Course_get()
    this.menu.close('end');
  }
  loadCourses(e) {
    // console.log(e)
  }

  // 重置方法
  reset(){
    this.type = ''; // 重置类型
    this.radios = 1 ; // 重置回全部
    this.orderby = ''; // 重置排序
    this.isfree = ''; // 重置全部
    // 重置 选中的选择条件
    console.log(this.Json)
    this.Json.forEach((element, index) => {
      if (element.children.length >= 1) {
        element.children.forEach((a, b) => {
          console.log(a,b)
          a.choose = false
        })
      }
    })
  }
  // 改变单选情况
  radio(index, next){
    this.radios = index
    if(index == 1){
      this.type = ''
      this.orderby = ''
      this.isfree = ''
    } else if(index == 2){
      this.type = ''
      this.orderby = 'descnew'
      this.isfree = ''
    } else if(index == 3){
      this.type = ''
      this.orderby = ''
      this.isfree = '1'
    }
    if(next==1){
      this.Course_get()
    } else {
    }
  }
  async loadData(event) {//下拉刷新
      let filters = this.coursefilters;
      console.log(this.Courses,this.Courses.length)
 if(this.Courses.length % 10!=0){
  event.target.complete();
   return false
  // filters.cid=this.Cid
 }
    if(this.slider){

      return false
    }
    if (this.isloading) {
      event.target.complete();
      return;
    }
    this.loadingText = '资源正在加载中，请稍后。。。'
    let r, err;
    // if()
    this.coursefilters.page = this.coursefilters.page + 1;
    [err, r] = await to(this.httpService.request(this.coursefilters, this.courseService.uriCourseList));
    console.log(r) 
    console.log(this.coursefilters)
    if (r.code == 20000 && r.data != null&&r.data.length>0) {
    // if(r['data']!=null){
    //   r['data'].forEach(item=>{
    //     // console.log(item)
    //     if(item.title.indexOf('--')){
    //       item.titles=item.title.split('--')
    //     }else{
    //       item.titles=item.title
    //     }
    //     // item.titles=
    //   })
    // }
        
      // this.Courses.push(r.data);
      this.Courses=this.Courses.concat(r['data']);
      console.log(this.Courses)
      this.coursefilters.page = r['page'];
      if(r['data'].length>10){
        this.slider=true
      }
      event.target.complete();
      return;
    }
    
    this.loadingText = '资源已经完全加载完毕'
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  // 打开侧边栏
  openEnd() {
    this.menu.open('end');
    this.showEnd = false;
  }
  goback(){
    this.nav.pop();
  }
  openChange() {
    this.state.open = !this.state.open;
    // console.log(this.state.open)
  }

}

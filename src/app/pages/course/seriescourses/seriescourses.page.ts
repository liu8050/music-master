import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { CourseService } from '../../../structs/course.service'
import { OrderService } from '../../../structs/order.service'
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { BaseService } from '../../../service/base.service'
import to from 'await-to-js'
@Component({
  selector: 'app-seriescourses',
  templateUrl: './seriescourses.page.html',
  styleUrls: ['./seriescourses.page.scss']
})
export class SeriescoursesPage implements OnInit {
  Courses: any //系列课程
  shoWait = false
  islh=false;//是否为刘海屏
  Id = this.router.snapshot.paramMap.get('Id') //获取精品课程ID
  isbuy = false //是否已经购买此精品课程
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private Router: Router,
    private baseService: BaseService,
    private courseService: CourseService,
    private orderService: OrderService,
    private userService: UserService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    //留海屏
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
    console.log(h_m,w_m)
    console.log(h_m/w_m>18/9)
    this.load_Courses()
    setTimeout(() => {
      this.shoWait = true
    }, 600)
  }
  //data-init-start
  async load_Courses() {
    let r, err
    let filters = Object.assign({}, this.courseService.filters)
    filters.id = this.Id
    ;[err, r] = await to(
      this.httpService.request(filters, this.courseService.uriPosterInfo)
    )
    // console.log(r)
    if (r.code == 20000) {
      r['data'].product.forEach(element => {
        if (element.name.indexOf('--') !== -1) {
          element.names = element.name.split('--')
        }
      })
      this.Courses = r['data']
      console.log(this.Courses)
    }
  }

  // ionViewDidEnter(){
  //   this.isbuythis();
  // }

  async isbuythis() {
    if (!this.userService.islogin) {
      this.isbuy = true
      return
    }

    let r, err
    let filters = Object.assign({}, this.courseService.filters)
    filters.id = this.Id
    ;[err, r] = await to(
      this.httpService.request(
        { id: this.Id, uid: this.userService.data.id },
        this.courseService.isbuyjp
      )
    )
    console.log(r)
    if (r.code == 20000) {
      this.isbuy = true
    }
  }

  // loadCourses($e) {

  // }
  go_pay() {
    //去支付 // 第一个参数,是否是精品课程 // 第二个参数，课程ID // 课程名 // 价格 // 课程图片

    this.orderService.inpay.type = 1
    this.orderService.inpay.data = this.Courses
    console.log(this.Id)
    // return
    this.Router.navigateByUrl('/order/' + '1' + '/' + this.Id)
  }
}

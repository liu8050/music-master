import { Injectable } from '@angular/core';
import { BaseService } from '../service/base.service'
import { Router } from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError, retry, finalize, tap, } from 'rxjs/operators';
import { UserService } from '../structs/user.service';
/*设置请求的基地址，方便替换*/
// const baseurl = 'https://www.easy-mock.com/mock/5c2afdf37ad0ee55b5ddacb7/';

const baseurl = 'http://m.music-masters.cn/index.php?route=';
// const baseurl = 'http://shiyin.mst.cn/index.php?route=';

 
@Injectable()
export class BaseInterceptor implements HttpInterceptor {
 
  constructor(
    private baseService:BaseService,
    private userService:UserService,
    private router:Router
  ) {}
 
  intercept(req, next: HttpHandler) {
 
    let newReq = req.clone({
      url: req.hadBaseurl ? `${req.url}` : `${baseurl}${req.url}`,
    });
    /*此处设置额外的头部，token常用于登陆令牌*/
    // if(!req.cancelToken) {
    //   /*token数据来源自己设置，我常用localStorage存取相关数据*/
    //   // newReq.headers =
    //   if(this.userService.data == null){
    //     alert(1)
    //   } else {
    //     // alert(this.userService.data.token)
    //    newReq.headers.set('token', this.userService.data.token)
    //   }
    // }
    if (!req.cancelToken) {
      /*token数据来源自己设置，我常用localStorage存取相关数据*/
      
      let token = 'my token'
      // console.log(this.userService.data)
      if(this.userService.data != null && this.userService.data != 'null'){
        token = this.userService.data.token
      }
      // this.baseService.presentLoading("");
      // console.log(this.userService.data.token)
      // alert(1)
      // alert(this.userService.data.token)
      // newReq.header("Access-Control-Allow-Headers")
      newReq.headers =
        newReq.headers.set('token', token)
        // .set('platform',this.baseService.platform)
    }
    const started = Date.now();
    let ok: string;
    // send cloned request with header to the next handler.
    // 将带有头的克隆请求发送到下一个处理程序。
    return next.handle(newReq)
    .pipe(
        /*失败时重试2次，可自由设置*/
      tap(
        // Succeeds when there is a response; ignore other events
        event => {
          const response = event as HttpResponse<any>;
          ok = event instanceof HttpResponse ? 'succeeded' : '';
          // this.baseService.dismissLoading();
          // console.log('response.body' + JSON.stringify(response.body)) // response.body 可以拿到所有的返回结果信息 code,data,rows等
          if (response.body) {    //请求的body直接拿到返回的数据，这时可判断错误码等信息。 // 判断response.body是否存在
            // (event as any).body = response.body.data;
            (event as any).code = response.body.code; // 获取code 的值
            if ((event as any).code == 40300){
              this.userService.data=null;
              this.userService.islogin=false
              // 40300 // 表示无权限访问 token失效 token失效只有一个条件，用户在其他地方登录后才会造成token失效
              // this.baseService.presentToast("您还没有权限访问该页面哦", "Secondary")
              // this.baseService.presentAlert("您需要登录后才可以访问该页面，是否前往登录？")
              // alert(JSON.stringify(this.userService.data))
              // alert("登录失效")
            }
            if ((event as any).code == 20000){
              //  console.log('执行正常，无需做任何处理')
            }
            // console.log((event as any).body)
            // console.log((event as any).code)
          }
        },
        error => {
          error.method = req.method;
          ok = 'failed';
        }
      ),
      finalize(() => {
        const elapsed = Date.now() - started;  //可计算出请求所消耗时间
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        // console.log(msg);
      }),
        retry(2),
        /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/

        catchError(this.handleError)
      )
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // 后端返回一个不成功的响应代码。
      // 反应体可能包含出错原因的线索，
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // 返回一个带有面向用户的错误消息的observable
    return throwError(
      'Something bad happened; please try again later.');
  };
}

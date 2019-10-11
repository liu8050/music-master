import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {DbService} from './db.service';
import {BaseService} from './base.service';
import to from 'await-to-js';
import { Jsonp } from '@angular/http';
// import {HttpClient}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  

  constructor( private dbService:DbService,private baseService:BaseService,private http:HttpClient) { }

  makeKey(params,uri){
    let key=JSON.stringify(params)+uri.join("-");
    return Md5.hashStr(key).toString();
  }
  gets(api){

    return new Promise((resolve,reject)=>{
        this.http.get(api).subscribe((response)=>{

          resolve(response);

        },(err)=>{
          reject(err);
          
        })
    })

  }
  //  req(method,url){
  //   var xhr=new XMLHttpRequest()
  //   xhr.open(method,url)
  //   xhr.send(null)
   
  //   xhr.onreadystatechange =function(e){
  //       // Jsonp.s
  //       if(xhr.readyState==4&&xhr.status==2000){
  //         console.log(xhr.responseText)
  //       }
  //   }
  //  }

  // request(allParams,uri){

  //   // const p = new Promise(function(resolve, reject) {
  //     let key=this.makeKey(allParams,uri);
  //     let val=null;
  //     alert(key)
  //     this.dbService.getHttpVal(key).then(v=>{
      
  //       if(v!=null)
  //       {
  //        val=v;
  //        return val;
  //       }else{
  //         alert(uri)
  //         if(uri[1]=="get"){
  //         this.http.request(
  //           uri[1],
  //           uri[0],
  //           {params: allParams,
  //            responseType:"json"
  //           }).subscribe(r=>{
  //             val=r;
  //             return val;
  //           })

  //         }else{

  //           this.http.request(
  //             uri[1],
  //             uri[0],
  //             {body: allParams,
  //              responseType:"json"
  //             }).subscribe(data=>
  //               { 
  //                 val=data;
  //                 return val;
  //               },
  //               error=>{
                
  //               })
  //         }



  //       }

  //     // })


  //   })
  
  // }


  async request(allParams,uri) {


  let _allParams=allParams;
    let key=this.makeKey(_allParams,uri);
    let val:any;

     val=await this.dbService.getHttpVal(key);
   
     if(val!=null)
     {
     
       return val;
     }
     //缓存过期后

    let err=null;
   
    if(uri[1]=="get"){
      [ err, val ] =await to(this.http.request(
         uri[1],
         uri[0],
         {params: _allParams,
          responseType:"json"
         }).toPromise());
        }else{
      [ err, val ] =await to(this.http.request(
            uri[1],
            uri[0],
            {body: _allParams,
             responseType:"json"
            }).toPromise());
        }

        if(err){
          this.baseService.presentToast("服务器维护中...;请稍后再试","danger");
          return;
        }
        
      //val=await this.http.get(uri[0],params:{["d":"2"]}) {params: {"type":"welcome"},
      this.dbService.setHttpVal(key,val);
      
     
     return val;
    
  }

//暂不考虑--意义不大--意图：统计标准化数据初始化代码
  // async data_get(structs){

  //   let t_pic,err;
  //   let dofil="this."+structs+".filters";
  //   let dofun="this."+structs+".uriList";
  //   let filters=eval(dofil);
  //   [ err, t_pic ] = await to(this.request(filters,eval(dofun)));
  
  //   if(err){
  //     this.baseService.presentToast("服务器维护中...;请稍后再试");
  //     return;
  //   }
  
  //   if(t_pic.code==20000){
  //    return t_pic["data"];
  //   }
  
  // }
//暂不考虑--意义不大--end

}

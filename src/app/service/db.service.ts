// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import to from 'await-to-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class DbService {

//   private  expirationTime=0*60*1000;//0分钟过期，不使用缓存

//   constructor(
//     public storage:Storage
//   ) { }

//   async getHttpVal(key,nocache=false){
//     alert("getHttpVal2::1")
//     if(nocache==true) return null;
//     alert("getHttpVal2::1222")
//    let ctime=new Date().getTime();
//    let val:any
//    val={timePoint:0,data:{}};
//    alert("getHttpVal2:22:1")
//   val=await this.storage.get(key)
//   alert("getHttpVal2:22:3")
//   alert("getHttpVal2::"+JSON.stringify(val))
//    if((val!=null)&&((ctime-val.timePoint)<this.expirationTime)){
//     return val.data;
//   }
//   this.storage.remove(key);
//   return null;
  
//   }
//   async setHttpVal(key,val){
//    // let ctime=new Date().getTime();
//     let myval={timePoint:0,data:{}};
//     myval.timePoint=new Date().getTime();
//     myval.data=val;
//     this.storage.set(key,myval);
//    }



//   //  slq
//   async getLocalVal(key){
//     let val:any
//    val =await this.storage.get(key);
//    if(val!=null){
//      return val;
//    }
//    return null;
//    } 
//   //  slq 改写
//    async setLocalVal(key,val){
//     this.storage.set(key,val);
//   }
//   // slq 改写
//   async removeLocalVal(key){
//     this.storage.remove(key);
//     }

// }






import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private  expirationTime=0*60*1000;//0分钟过期，不使用缓存

  constructor(
    // public storage:Storage
  ) { }


  async getHttpVal(key){
    
   let ctime=new Date().getTime();
   let val:any
   val={timePoint:0,data:{}};
   
   val=await JSON.parse(localStorage.getItem(key))
  
   if((val!=null)&&((ctime-val.timePoint)<this.expirationTime)){
    return val.data;
  }
  localStorage.removeItem(key);
  return null;
  
  }
  async setHttpVal(key,val){
   // let ctime=new Date().getTime();
    let myval={timePoint:0,data:{}};
    myval.timePoint=new Date().getTime();
    myval.data=val;
    localStorage.setItem(key,JSON.stringify(myval));

   }



  //  slq
  async getLocalVal(key){
    //  await this.storage.get(key).then((value) => {
    //   return value;
    // })
    let val:any
   val = await JSON.parse(localStorage.getItem(key))
   console.log(val)
    // val = localStorage.getItem(key)
    // return val
   if(val!=null){
     return val;
   }
   //return [];
   return null;
   } 
  //  slq 改写
   async setLocalVal(key,val){
    // this.storage.set(key, val);
     localStorage.setItem(key, JSON.stringify(val));
  }
  // slq 改写
  async removeLocalVal(key){
    // this.storage.remove(key)
      localStorage.removeItem(key);
    }

}


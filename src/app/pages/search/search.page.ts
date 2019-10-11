import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../service/db.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  islh=false;//是否为刘海屏
  searchValue = '';
  localsearch;
  searchelement = [];

  @ViewChild('searchKeys') myInput ;

  constructor(private router:Router,
              private navCtrl: NavController,
              private dbService:DbService) {
  // this.localsearch = this.dbService.getLocalVal('localsearch'); // ZoneAwarePromise {__zone_symbol__state: null, __zone_symbol__value: Array(0)}
                console.log(this.localsearch)
                this.init()
            }
  async init () {
    this.localsearch = await this.dbService.getLocalVal('localsearch');
    console.log(this.localsearch)
    if (this.localsearch == null || this.localsearch == 'null'){
      this.searchelement = [];
      return;
    }
    // console.log(this.searchelement)
    this.searchelement = this.localsearch
  }
  ngOnInit() {
   //留海屏
   let h_m=window.screen.height;
   let w_m=window.screen.width;
   if(h_m/w_m>18/9){
     this.islh=true;
   }
  }

  

  ionViewDidEnter(){
    // const el: HTMLInputElement = this.searchKey.nativeElement;
    // el.focus();
    setTimeout(() => {
      this.myInput.setFocus();//为输入框设置焦点
    }, 200);
  
    // let el2=document.getElementById("searchKey");
    // el2.focus();
}

  search(){
    this.searchelement.push(this.searchValue)
    this.searchelement = this.removeDuplicatedItem(this.searchelement) // 数组去重之后在进行存储
    this.setlocalsearch(this.searchelement)
    this.router.navigateByUrl('/allcourses/' + 'null'+'/'+this.searchValue);
    this.searchValue = '';// 初始化搜索条件
  }
  setlocalsearch(udata) {
    this.dbService.setLocalVal("localsearch", udata);
  }
  changeValue(item){
    this.searchValue = item;
  }
  removeDuplicatedItem(arr) { // 数组去重方法
      for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
              if (arr[i] == arr[j]) {
                arr.splice(j, 1);//console.log(arr[j]);
                 j--;
      }
    }
  }
    let length = 0;
  if(arr.length >=10){
    length = arr.length - 10
  }
  arr.splice(0,length)
    return arr;
}
  goback(){
    let r=this.navCtrl.pop();
    console.log(this.navCtrl,r)
    // this.navCtrl.navigateBack();
  }
 // 筛选最多十个 如果大于10个就进行去除 从最里面开始去除

}


import { Component, ViewChild } from '@angular/core'
import { BaseService } from '../service/base.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tab') tabs: any;
  tabshow = false;
  flag = 'tab1';

  constructor(private baseService: BaseService) {}
  ngAfterViewInit(): void {
    // let tabs = document.querySelectorAll('.tabImg')
    // console.log(tabs)
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.dir(this.tabs)
    // let tabss:any= document.querySelectorAll('.tabImg')
    // console.log(tabss)
    // this.tabs.addEventListener('touchend',function(){
    // console.log(11)
    // console.log(e)
    // })
  }

  // NG
  resetab() {
    this.baseService.referURI = ''
  }
  change(event) {
    console.log(event)
    this.flag = event.detail.tab
  }
}

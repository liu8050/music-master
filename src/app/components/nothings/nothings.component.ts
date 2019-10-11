import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nothings',
  templateUrl: './nothings.component.html',
  styleUrls: ['./nothings.component.scss']
})
/**
 * vText 显示的文本,必传
 * vImg 需要显示的图片 必传
 * vClick 是否需要点击刷新，点击刷新的文本
 * vButton 是否需要按钮，按钮显示的文本
 * vButtonLink 按钮所要去的路径
 */

export class NothingsComponent implements OnInit {

  @Input("vText") vtext: String;
  @Input("vClick") vclick: String;
  @Input("vImg") vimg: String;
  @Input("vButton") vbutton: String;
  @Input("vButtonLink") vbuttonlink: String;
  constructor(private router:Router,) { }

  ngOnInit() {
    console.log(this.vtext)
    console.log(this.vclick)
  }
  // 点击刷新
  refresh() {
    window.location.reload();
  }
  //button按钮执行的方法
  onClick() {
    // console.log(this.vbuttonlink)
    // this.router.navigate([this.vbuttonlink]);
  }

}

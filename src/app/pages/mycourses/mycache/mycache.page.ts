import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycache',
  templateUrl: './mycache.page.html',
  styleUrls: ['./mycache.page.scss'],
})
export class MycachePage implements OnInit {
  finished() {
    return '已完成';
  }
  loading() {
    return '未完成';
  }
  constructor() { }

  ngOnInit() {
  }
}

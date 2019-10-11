import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cachefinishing',
  templateUrl: './cachefinishing.page.html',
  styleUrls: ['./cachefinishing.page.scss'],
})
export class CachefinishingPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  checkItemListData = [
    { value: 0, name: '1.1课程介绍', checked: false, size: '300m' },
    { value: 1, name: '1.2课程介绍', checked: true, size: '300m' },
    { value: 2, name: '1.3课程介绍', checked: false, size: '300m' }
  ];
  disabledStatus: boolean = true;
  disabledCheckboxItemStatus: boolean = true;
  agreeItemData = { value: 'Agree Submit', name: 'Agree Item', checked: true };

  onChange = (val: any) => {
    // console.log('onChange Event: ', val);
    // console.log('changed data: ', this.checkItemListData);
  }

  onChange2 = e => {
    this.disabledStatus = !this.disabledStatus;
    // console.log('onChange2 Event: ', e);
    // console.log('agreeItemData: ', this.agreeItemData);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    alert('agree it');
  }

  renderHeader() {
    return '第一章 课程介绍';
  }
}

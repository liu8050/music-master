import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cachefinished',
  templateUrl: './cachefinished.page.html',
  styleUrls: ['./cachefinished.page.scss'],
})
export class CachefinishedPage implements OnInit {
  percent = 50;
  barStyleDemo = {
    border: '2px solid #108ee9'
  };

  constructor() { }

  add() {
    this.percent += 10;
    if (this.percent >= 100) {
      this.percent = 0;
    }
  }


  checkItemListData = [
    { value: 0, name: 'Ph.D.', checked: false, percent: 50, speed: '1m/s' },
    { value: 1, name: 'Bachelor', checked: true, percent: 60, speed: '568k/s' },
    { value: 2, name: 'College diploma', checked: false, percent: 70, speed: '成功' }
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
    return '第一个课件';
  }

  ngOnInit() {
  }

}

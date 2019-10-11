import { Component, ViewEncapsulation } from '@angular/core';
import { en_US } from 'ng-zorro-antd-mobile';

@Component({
  selector: '<%= selector %>',
  encapsulation: ViewEncapsulation.None,
  <% if(inlineTemplate) { %>template: `
    <List [className]="'date-picker-list'">
      <ListItem
        DatePicker
        [extra]="currentDateFormat(value)"
        [arrow]="'horizontal'"
        [mode]="'time'"
        [locale]="locale"
        [(ngModel)]="value"
        (onOk)="onOk($event)"
      >
        UTC Time
        <Brief>{{ name }}</Brief>
      </ListItem>
    </List>
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>,
  <% if(inlineStyle) { %>styles: [`
      .date-picker-list .am-list-item .am-list-line .am-list-extra {
        flex-basis: initial;
      }
    `]<% } else { %>styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %>
})
export class <%= classify(name) %>Component {
  locale = en_US;
  name = '选择';
  nowTimeStamp = Date.now();
  now = new Date(this.nowTimeStamp);
  utcNow = new Date(this.now.getTime() + this.now.getTimezoneOffset() * 60000);
  value = this.utcNow;

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk(result: Date) {
    this.name = this.currentDateFormat(result);
    this.value = result;
  }

  formatIt(date: Date, form: string) {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${dateStr} ${timeStr}`;
  }
}

import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-grade-star',
  templateUrl: './grade-star.component.html',
  styleUrls: ['./grade-star.component.scss']
})
export class GradeStarComponent implements OnInit {

  @Input("myScore") scoreVal: number;
  starsVal = 0;
  stars = [];
  starsOtherVal = 0;
  starsOther = [];
  halfstar = 0;

  constructor() { }

  ngOnInit() {

    this.starsVal = Math.floor(this.scoreVal / 2);
    for (let i = 0; i < this.starsVal; i++) {
      this.stars.push("1");
    }
    if ((this.scoreVal % 2) == 1) {
      this.halfstar = 1;
    }

    this.starsOtherVal = 4 - this.starsVal - this.halfstar;

    for (let i = 0; i <= this.starsOtherVal; i++) {
      this.starsOther.push("1");
    }

  }

}

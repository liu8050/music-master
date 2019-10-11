import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  islh=false;//是否为刘海屏
  constructor(
    private Router:Router
  ) { }

  ngOnInit() {
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }

  }
  outcontent(){
    this.Router.navigateByUrl('/app/mycenter')
    return false;
  }
}

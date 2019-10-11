import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-systemnewstxt',
  templateUrl: './systemnewstxt.page.html',
  styleUrls: ['./systemnewstxt.page.scss'],
})
export class SystemnewstxtPage implements OnInit {
  productList = [];
  private pid: number;

  constructor(
      // private httpService: HttpService,
      // private userService: UserService,
      // private baseService: BaseService,
      // // private router: Router,
      private router: ActivatedRoute,
      // private loadingCtrl: LoadingController,
      // public pickerCtrl: PickerController,
      // private dbservice: DbService
  ) { }

  ngOnInit() {
    this.pid = this.router.snapshot.params['id'];
  }

}

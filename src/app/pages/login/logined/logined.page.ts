import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  DoCheck
} from '@angular/core'
import { HttpService } from '../../../service/http.service'
import { UserService } from '../../../structs/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BaseService } from '../../../service/base.service'
import { NavController } from '@ionic/angular'
import { DbService } from '../../../service/db.service'
import { Keyboard } from '@ionic-native/keyboard/ngx'

// import { Storage } from '@ionic/storage'
import to from 'await-to-js'

@Component({
  selector: 'app-logined',
  templateUrl: './logined.page.html',
  styleUrls: ['./logined.page.scss']
})
export class LoginedPage implements OnInit, DoCheck {
  length: Array<Number> = new Array(4)
  codeArr: Array<String> = []
  code: String = ''
  oldcode: String = ''
  currentIndex: Number = 0

  @ViewChild('codeEl')
  codeEl: ElementRef

  phonenum = this.arouter.snapshot.paramMap.get('phonenum') // 获取大师ID
  keyindex = 0
  codeval = ''

  verifyCode = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: true
  }
  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private baseService: BaseService,
    private arouter: ActivatedRoute,
    private router: Router,
    private nav: NavController,
    public dbservice: DbService,
    private keyboard: Keyboard
  ) // private keyboard: Keyboard
  {
    // this.keyboard.show();
  }

  ionViewDidEnter() {
    const el: HTMLInputElement = this.codeEl.nativeElement
    el.focus()
  }
  ngOnInit() {
    const el: HTMLInputElement = this.codeEl.nativeElement
    el.focus()

    this.settime()
  }
  ngDoCheck(): void {
    if (this.code != this.oldcode) {
      this.oldcode = this.code
      this.inputKeyUp()
    }
  }
  inputKeyUp(): void {
    console.log(this.code)
    this.currentIndex = this.code.length
    this.codeArr = this.code.split('')
  }

  settime() {
    if (this.verifyCode.countdown == 1) {
      // this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = '获取验证码'
      this.verifyCode.disable = true
      return
    }
    this.verifyCode.disable = false
    this.verifyCode.countdown--

    this.verifyCode.verifyCodeTips =
      '重新获取' + this.verifyCode.countdown + 's'
    setTimeout(() => {
      if (this.verifyCode.countdown > 0) {
        this.settime()
      }
    }, 1000)
  }
  showkeyword() {
    this.keyboard.show()
    // this.keyindex == 0? this.keyindex=1: this.keyindex=0;
  }

  backspace() {
    this.codeval = this.codeval.substring(0, this.codeval.length - 1)
  }

  // Event way
  numberClick(key: number) {
    if (this.codeval.length < 4) {
      this.codeval += key
    } else {
    }
  }

  async login_reg() {
    let r, err
    // let dataRoles=this.userService.dataRoles;

    if (this.code.length < 4) {
      this.baseService.presentToast('请输入完整的验证码!', 'danger')

      return
    }

    ;[err, r] = await to(
      this.httpService.request(
        { phone: this.phonenum, code: this.code },
        this.userService.uriLogin
      )
    )
    // console.log(this.phonenum, r)

    if (r.code == 40300) {
      this.userService.islogin = false //用户已经登录
      this.userService.data = null

      this.baseService.presentToast('验证码错误，请重新输入或获取!', 'danger')

      return
    }
    if (r.code == 20000) {
      // console.log(r)
      this.userService.userlocalsave(r.data) // 存储用户信息
      this.dbservice.setLocalVal('token', r.data.token) // 存储token
      this.userService.init() // 用户初始化
      // console.log(this.dbservice.getLocalVal('user'))
      this.router.navigateByUrl('/app/home')
      // location.reload()
      this.baseService.presentMessage('登录成功')

      // this.nav.
      // this.nav.navigateForward('/app/mycenter');
    }
  }
}

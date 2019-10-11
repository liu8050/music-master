import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile'
import { IonicModule } from '@ionic/angular'
import { QQSDK } from '@ionic-native/qqsdk/ngx'
import { LoginPage } from './login.page'

// import { NzInputModule } from 'ng-zorro-antd/input'
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
]

@NgModule({
  imports: [
    // NzInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  providers: [QQSDK],
  declarations: [LoginPage]
})
export class LoginPageModule {}

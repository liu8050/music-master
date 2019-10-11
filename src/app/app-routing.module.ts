import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthService } from './service/auth.service'
import { IsLogined } from './service/isLogined.service'
import { FirstOpen } from './service/firstOpen.service'
import { OrderCheck } from './service/orderCheck.service'
const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule',
    canActivate: [FirstOpen]
  },
  {
    path: 'newsshow',
    loadChildren: './pages/news/newsshow/newsshow.module#NewsshowPageModule'
  },
  {
    path: 'newstxt/:Id',
    loadChildren: './pages/news/newstxt/newstxt.module#NewstxtPageModule'
  },
  {
    path: 'newslist',
    loadChildren: './pages/news/newslist/newslist.module#NewslistPageModule'
  },
  {
    path: 'activities/:Id',
    loadChildren: './pages/activities/activities.module#ActivitiesPageModule'
  },
  {
    path: 'mycache',
    loadChildren: './pages/mycourses/mycache/mycache.module#MycachePageModule'
  },
  {
    path: 'schedule',
    loadChildren:
      './pages/guidances/schedule/schedule.module#SchedulePageModule'
  },
  {
    path: 'login/:id',
    loadChildren: './pages/login/login/login.module#LoginPageModule',
    canActivate: [IsLogined]
  },
  // { path: 'order/:isxl/:Id', loadChildren: './pages/orders/order/order.module#OrderPageModule', canActivate: [AuthService] },
  // { path: 'ordering/:dprice/:Id', loadChildren: './pages/orders/ordering/ordering.module#OrderingPageModule' },
  // { path: 'ordered/:Id/:pay', loadChildren: './pages/orders/ordered/ordered.module#OrderedPageModule' },
  {
    path: 'logined/:phonenum',
    loadChildren: './pages/login/logined/logined.module#LoginedPageModule',
    canActivate: [IsLogined]
  },
  {
    path: 'bingphone',
    loadChildren: './pages/login/bingphone/bingphone.module#BingphonePageModule'
  },
  {
    path: 'agreement',
    loadChildren: './pages/login/agreement/agreement.module#AgreementPageModule'
  },

  {
    path: 'coursedetails/:Id',
    loadChildren:
      './pages/course/coursedetails/coursedetails.module#CoursedetailsPageModule'
  },
  {
    path: 'study/:Id/:Index/:playindex',
    loadChildren: './pages/course/study/study.module#StudyPageModule'
  },
  {
    path: 'downcache/:Id',
    loadChildren:
      './pages/course/downcache/downcache.module#DowncachePageModule',
    canActivate: [AuthService]
  },
  {
    path: 'cacheprogress/:Id',
    loadChildren:
      './pages/course/cacheprogress/cacheprogress.module#CacheprogressPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'allseriescourse',
    loadChildren:
      './pages/course/allseriescourse/allseriescourse.module#AllseriescoursePageModule'
  },
  {
    path: 'seriescourses/:Id',
    loadChildren:
      './pages/course/seriescourses/seriescourses.module#SeriescoursesPageModule'
  },
  {
    path: 'allcourses/:Id/:keyword',
    loadChildren:
      './pages/course/allcourses/allcourses.module#AllcoursesPageModule'
  },
  {
    path: 'order/:isxl/:Id',
    loadChildren: './pages/orders/order/order.module#OrderPageModule',
    canActivate: [AuthService, OrderCheck]
  },
  {
    path: 'order/:dprice/:Id/:odernumber',
    loadChildren: './pages/orders/order/order.module#OrderPageModule',
    canActivate: [AuthService, OrderCheck]
  },
  {
    path: 'ordered/:Id/:pay',
    loadChildren: './pages/orders/ordered/ordered.module#OrderedPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'videoplay/:Id/:title',
    loadChildren:
      './pages/course/videoplay/videoplay.module#VideoplayPageModule'
  },
  {
    path: 'videolist',
    loadChildren:
      './pages/course/videolist/videolist.module#VideolistPageModule'
  },
  {
    path: 'search',
    loadChildren: './pages/search/search.module#SearchPageModule'
  },
  {
    path: 'mastershow/:Id',
    loadChildren:
      './pages/guidances/mastershow/mastershow.module#MastershowPageModule'
  },
  // { path: 'mmaster', loadChildren: './pages/mycenters/myorder/myorder.module#MyorderPageModule', canActivate: [AuthService] },
  {
    path: 'mmaster',
    loadChildren: './pages/guidances/mmaster/mmaster.module#MmasterPageModule'
  },

  {
    path: 'schedule',
    loadChildren:
      './pages/guidances/schedule/schedule.module#SchedulePageModule',
    canActivate: [AuthService]
  },
  {
    path: 'tosubscribe',
    loadChildren:
      './pages/guidances/tosubscribe/tosubscribe.module#TosubscribePageModule',
    canActivate: [AuthService]
  },
  {
    path: 'msoup/:roomId',
    loadChildren: './pages/guidance/msoup/msoup.module#MsoupPageModule',
    canActivate: [AuthService]
  },
  // { path: 'mycourse', loadChildren: './mycourse/mycourse.module#MycoursePageModule' },
  // { path: 'mycenter', loadChildren: './mycenter/mycenter.module#MycenterPageModule' },
  // { path: 'guidance', loadChildren: './pages/guidance/guidance.module#GuidancePageModule' }
  // { path: 'cachefinished', loadChildren: '../pages/mycourses/cachefinished/cachefinished.module#CachefinishedPageModule' },
  // { path: 'cachefinishing', loadChildren: '../pages/mycourses/cachefinishing/cachefinishing.module#CachefinishingPageModule' },
  // { path: 'defaultcache', loadChildren: '../pages/mycourses/defaultcache/defaultcache.module#DefaultcachePageModule' },
  {
    path: 'about',
    loadChildren: './pages/mycenters/about/about.module#AboutPageModule'
  },
  {
    path: 'myorder',
    loadChildren: './pages/mycenters/myorder/myorder.module#MyorderPageModule',
    canActivate: [AuthService]
  },
  // { path: 'ordering/:dprice/:Id', loadChildren: './pages/orders/ordering/ordering.module#OrderingPageModule' },
  {
    path: 'ordered/:Id/:pay',
    loadChildren: './pages/orders/ordered/ordered.module#OrderedPageModule'
  },
  {
    path: 'mydiscountcoupon',
    loadChildren:
      './pages/mycenters/mydiscountcoupon/mydiscountcoupon.module#MydiscountcouponPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'editmymessage',
    loadChildren:
      './pages/mycenters/editmymessage/editmymessage.module#EditmymessagePageModule',
    canActivate: [AuthService]
  },
  {
    path: 'systemnews',
    loadChildren:
      './pages/mycenters/systemnews/systemnews.module#SystemnewsPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'feedback',
    loadChildren:
      './pages/mycenters/feedback/feedback.module#FeedbackPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'settings',
    loadChildren:
      './pages/mycenters/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'seriescourses/:Id',
    loadChildren:
      './pages/course/seriescourses/seriescourses.module#SeriescoursesPageModule'
  },
  {
    path: 'coursedetails/:Id',
    loadChildren:
      './pages/course/coursedetails/coursedetails.module#CoursedetailsPageModule'
  },
  {
    path: 'study/:Id/:Index/:playindex',
    loadChildren: './pages/course/study/study.module#StudyPageModule'
  },
  {
    path: 'systemnewstxt/:id',
    loadChildren:
      './pages/mycenters/systemnewstxt/systemnewstxt.module#SystemnewstxtPageModule'
  },
  {
    path: 'activitieslist',
    loadChildren:
      './pages/mycenters/activitieslist/activitieslist.module#ActivitieslistPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'mymoney/:surplus',
    loadChildren: './pages/mycenters/mymoney/mymoney.module#MymoneyPageModule',
    canActivate: [AuthService]
  },
  // 注册
  {
    path: 'register',
    loadChildren: './pages/login/register/register.module#RegisterPageModule',
    canActivate: [IsLogined]
  },
  {
    path: 'area-num-list',
    loadChildren:
      './pages/login/area-num-list/area-num-list.module#AreaNumListPageModule'
  },
  {
    path: 'service',
    loadChildren: './pages/mycenters/service/service.module#ServicePageModule'
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

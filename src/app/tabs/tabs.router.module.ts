import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthService } from '../service/auth.service';
import { OrderCheck } from '../service/orderCheck.service';
import { HomeCheck } from '../service/homeCheck.service';

//{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
            , canActivate: [HomeCheck]},
          // { path: 'coursedetails/:Id', loadChildren: '../pages/course/coursedetails/coursedetails.module#CoursedetailsPageModule' },
          // { path: 'study/:Id/:Index/:playindex', loadChildren: '../pages/course/study/study.module#StudyPageModule' },
          // { path: 'downcache/:Id', loadChildren: '../pages/course/downcache/downcache.module#DowncachePageModule' , canActivate: [AuthService]},
          // { path: 'cacheprogress/:Id', loadChildren: '../pages/course/cacheprogress/cacheprogress.module#CacheprogressPageModule' , canActivate: [AuthService]},
          // { path: 'allseriescourse', loadChildren: '../pages/course/allseriescourse/allseriescourse.module#AllseriescoursePageModule' },
          // { path: 'seriescourses/:Id', loadChildren: '../pages/course/seriescourses/seriescourses.module#SeriescoursesPageModule' },
          // { path: 'allcourses/:Id/:keyword', loadChildren: '../pages/course/allcourses/allcourses.module#AllcoursesPageModule' },
          // { path: 'order/:isxl/:Id', loadChildren: '../pages/orders/order/order.module#OrderPageModule', canActivate: [AuthService,OrderCheck] },
          // { path: 'ordering/:dprice/:Id', loadChildren: '../pages/orders/ordering/ordering.module#OrderingPageModule', canActivate: [AuthService,OrderCheck] },
          // { path: 'ordered/:Id/:pay', loadChildren: '../pages/orders/ordered/ordered.module#OrderedPageModule' , canActivate: [AuthService] },
          // { path: 'videoplay/:Id', loadChildren: '../pages/course/videoplay/videoplay.module#VideoplayPageModule' },
          // { path: 'videolist', loadChildren: '../pages/course/videolist/videolist.module#VideolistPageModule' },
          // { path: 'search', loadChildren: '../pages/search/search.module#SearchPageModule' },
          // { path: 'mastershow/:Id', loadChildren: '../pages/guidances/mastershow/mastershow.module#MastershowPageModule' },
          // { path: 'mmaster', loadChildren: '../pages/guidances/mmaster/mmaster.module#MmasterPageModule' },
          // { path: 'myorder', loadChildren: '../pages/mycenters/myorder/myorder.module#MyorderPageModule', canActivate: [AuthService] },
        ]
      },
      {
        // 这里为什么要加chidren
        path: 'guidance',
        //loadChildren: '../pages/guidance/guidance.module#GuidancePageModule'
        children: [
          // { path: '', loadChildren: '../pages/guidance/guidance.module#GuidancePageModule', canActivate: [AuthService]},
          { path: '', loadChildren: '../pages/guidance/guidance.module#GuidancePageModule'},
          
        ]
        // children: [
        //   {
        //     path: '',
        //   }
        // ]
      },
        // { path: 'mycenter', loadChildren: './mycenter/mycenter.module#MycenterPageModule' },



      {
        path: 'mycenter',
        children: [
          {
            path: '',
            loadChildren: '../pages/mycenter/mycenter.module#MycenterPageModule',
          },
          // { path: 'myorder', loadChildren: '../pages/mycenters/myorder/myorder.module#MyorderPageModule', canActivate: [AuthService] },
          // { path: 'ordering/:dprice/:Id', loadChildren: '../pages/orders/ordering/ordering.module#OrderingPageModule' },
          // { path: 'ordered/:Id/:pay', loadChildren: '../pages/orders/ordered/ordered.module#OrderedPageModule' },
          // { path: 'mydiscountcoupon', loadChildren: '../pages/mycenters/mydiscountcoupon/mydiscountcoupon.module#MydiscountcouponPageModule', canActivate: [AuthService] },
          // { path: 'editmymessage', loadChildren: '../pages/mycenters/editmymessage/editmymessage.module#EditmymessagePageModule', canActivate: [AuthService] },
          // { path: 'systemnews', loadChildren: '../pages/mycenters/systemnews/systemnews.module#SystemnewsPageModule', canActivate: [AuthService] },
          // { path: 'feedback', loadChildren: '../pages/mycenters/feedback/feedback.module#FeedbackPageModule', canActivate: [AuthService] },
          // { path: 'settings', loadChildren: '../pages/mycenters/settings/settings.module#SettingsPageModule' },
          // { path: 'seriescourses/:Id', loadChildren: '../pages/course/seriescourses/seriescourses.module#SeriescoursesPageModule' },
          // { path: 'coursedetails/:Id', loadChildren: '../pages/course/coursedetails/coursedetails.module#CoursedetailsPageModule' },
          // { path: 'study/:Id/:Index/:playindex', loadChildren: '../pages/course/study/study.module#StudyPageModule' },
          // { path: 'systemnewstxt/:id', loadChildren: '../pages/mycenters/systemnewstxt/systemnewstxt.module#SystemnewstxtPageModule' },
          // { path: 'activitieslist', loadChildren: '../pages/mycenters/activitieslist/activitieslist.module#ActivitieslistPageModule' , canActivate: [AuthService] },
          ]
      },
      //   // { path: 'mycourse', loadChildren: './mycourse/mycourse.module#MycoursePageModule' },
      {
        path: 'mycourse',
        children: [
          // {
          //   path: '',
          //   loadChildren: '../pages/mycourse/mycourse.module#MycoursePageModule',
          //   canActivate: [AuthService]
          // },
          {
            path: '',
            loadChildren: '../pages/mycourse/mycourse.module#MycoursePageModule'
          },
          // { path: 'coursedetails/:Id', loadChildren: '../pages/course/coursedetails/coursedetails.module#CoursedetailsPageModule' },//解决回退问题
          // { path: 'study/:Id/:Index/:playindex', loadChildren: '../pages/course/study/study.module#StudyPageModule' },//解决回退问题
          // { path: 'downcache/:Id', loadChildren: '../pages/course/downcache/downcache.module#DowncachePageModule' , canActivate: [AuthService]},
          // { path: 'cacheprogress/:Id', loadChildren: '../pages/course/cacheprogress/cacheprogress.module#CacheprogressPageModule' , canActivate: [AuthService]},
          // { path: 'cachefinished', loadChildren: '../pages/mycourses/cachefinished/cachefinished.module#CachefinishedPageModule' },
          // { path: 'cachefinishing', loadChildren: '../pages/mycourses/cachefinishing/cachefinishing.module#CachefinishingPageModule' },
          // { path: 'defaultcache', loadChildren: '../pages/mycourses/defaultcache/defaultcache.module#DefaultcachePageModule' },
        ]
      },


      // {
      //   path: 'login',
      //   children: [
      //     {
      //       path: 'agreement',
      //       loadChildren: '../pages/login/agreement/agreement.module#AgreementPageModule',
      //       canActivate: [AuthService]
      //     },

      //   ]
      // },

      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

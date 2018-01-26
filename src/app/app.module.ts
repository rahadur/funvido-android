import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { ComponentsModule } from './../components/components.module';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VideoServiceProvider } from '../providers/video-service/video-service';
import { CategoryServiceProvider } from '../providers/category-service/category-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    
    IonicStorageModule.forRoot({
			name: '__funvido',
			   driverOrder: ['indexeddb', 'sqlite', 'websql']
		  })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideoServiceProvider,
    CategoryServiceProvider,
    AdMobFree
  ]
})
export class AppModule {}

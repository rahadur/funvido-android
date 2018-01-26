import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPage } from './topic';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    TopicPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPage),
  ],
  providers: [
    AdMobFree
  ]
})
export class TopicPageModule {}

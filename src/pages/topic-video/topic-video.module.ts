import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicVideoPage } from './topic-video';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    TopicVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicVideoPage),
    ComponentsModule
  ],
  providers: [
    AdMobFree
  ]
})
export class TopicVideoPageModule {}

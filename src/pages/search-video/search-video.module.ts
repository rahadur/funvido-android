import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchVideoPage } from './search-video';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    SearchVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchVideoPage),
    ComponentsModule
  ],
  providers: [
    AdMobFree
  ]
})
export class SearchVideoPageModule {}

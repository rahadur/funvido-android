import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavePage } from './save';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    SavePage,
  ],
  imports: [
    IonicPageModule.forChild(SavePage),
  ],
  providers: [
    AdMobFree
  ]
})
export class SavePageModule {}

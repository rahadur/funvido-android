import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';

import { LaughingPage } from './laughing';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LaughingPage,
  ],
  imports: [
    IonicPageModule.forChild(LaughingPage),
    ComponentsModule,
  ],
  providers: [
    AdMobFree
  ]
})
export class LaughingPageModule {}

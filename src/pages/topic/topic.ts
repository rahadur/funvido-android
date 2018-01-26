import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { Category } from './../../models/category-model';
import { CategoryServiceProvider } from './../../providers/category-service/category-service';




@IonicPage()
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
  providers: [
    CategoryServiceProvider
  ]
})
export class TopicPage {

  categories: Category[];

  loading = this.loadingCtrl.create({
    content: ''
  });

  constructor(private navCtrl: NavController, 
    private admobFree: AdMobFree,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryServiceProvider) {
      
      const bannerConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-9624484306285530/8595481993',
        isTesting: false,
        autoShow: true
       };
  
       this.admobFree.interstitial.config(bannerConfig);

  }

  ionViewDidLoad(){
    this.loading.present();

    this.categoryService.getCategories().subscribe( (data) => {
      this.categories = data;
      this.loading.dismiss();
    }, (error) => {
      this.loading.dismiss();
    });

    this.admobFree.interstitial.prepare()
    .then(() => {
    // banner Ad is ready
    // if we set autoShow to false, then we will need to call the show method here
    //this.admobFree.banner.show()
    })
    .catch(e => console.log(e));
  }
  

  showVideos(categoryId) {
    this.navCtrl.push('TopicVideoPage', { categoryId: categoryId });
  }

  openSearch() {
    this.navCtrl.push('SearchPage');
  }

}
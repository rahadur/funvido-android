import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Video } from '../../models/video-model';

import { CategoryServiceProvider } from '../../providers/category-service/category-service';

interface CategoryVideo {
  _id: String,
  title: String,
  details: String,
  thumbnail: String,
  videos: Video[],
  created: Date,
  modified: Date
}


@IonicPage()
@Component({
  selector: 'page-topic-video',
  templateUrl: 'topic-video.html',
  providers: [
    CategoryServiceProvider
  ]
})
export class TopicVideoPage {

  category: CategoryVideo;
  categoryId: String;

  loading = this.loadingCtrl.create({
    content: ''
  });

  constructor(private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private admobFree: AdMobFree,
    private categoryService: CategoryServiceProvider,
    private youtube: YoutubeVideoPlayer) {

      this.categoryId = this.navParams.get('categoryId');


      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-9624484306285530/3455724002',
        isTesting: false,
        autoShow: true
       };
  
       this.admobFree.banner.config(bannerConfig);


  }

  ionViewDidLoad(){

    this.loading.present();

    this.categoryService.getCategoryVideos(this.categoryId, 16).subscribe( (data) => {
      this.category = data;
      this.loading.dismiss();
    }, (error) => {
      this.loading.dismiss();
    });
  }


  ionViewWillEnter(){
    this.admobFree.banner.prepare()
    .then(() => {
    // banner Ad is ready
    // if we set autoShow to false, then we will need to call the show method here
    //this.admobFree.banner.show()
    })
    .catch(e => console.log(e));
  }


  ionViewDidLeave(){
    this.admobFree.banner.remove().then(() => {
    }).catch(e => console.log(e));
  }



  playVideo(videoId) {
    this.youtube.openVideo(videoId);
  }
  

  doInfinite(infiniteScroll) {
    this.categoryService.getCategoryVideos(this.categoryId, 16).subscribe( (data) => {
        for(let i = 0; i < data.videos.length; i++){
          this.category.videos.push(data.videos[i]);
        }
        infiniteScroll.complete();
    });
  }

}

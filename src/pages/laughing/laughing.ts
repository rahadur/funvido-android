import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { VideoServiceProvider } from './../../providers/video-service/video-service';
import { Video } from '../../models/video-model';


@IonicPage()
@Component({
  selector: 'page-laughing',
  templateUrl: 'laughing.html',
  providers: [
    VideoServiceProvider
  ]
})
export class LaughingPage {

  videos: Video[];

  loading = this.loadingCtrl.create({
    content: ''
  });


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingCtrl: LoadingController,
     private videoService: VideoServiceProvider, 
     private youtube: YoutubeVideoPlayer,
     private admobFree: AdMobFree) {

      this.loading.present();

      this.videoService.getLaughingVideos(16).subscribe(data => {
        this.videos = data;
        this.loading.dismiss();
      });

      const bannerConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-9624484306285530/8595481993',
        isTesting: false,
        autoShow: true
       };
  
       this.admobFree.interstitial.config(bannerConfig);

  }

  ionViewDidLoad(){
   
    
  }

  doRefresh(refresher) {
    this.videoService.getLaughingVideos(16).subscribe(data => {
      this.videos = data;

      this.admobFree.interstitial.prepare().then(() => {
      // banner Ad is ready
      // if we set autoShow to false, then we will need to call the show method here
      //this.admobFree.banner.show()
      })
      .catch(e => console.log(e));

      refresher.complete();
    }, (error) => {
      refresher.complete();
    });
  }


  doInfinite(infiniteScroll) {

    this.videoService.getVideos(10)
    .subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.videos.push(data[i]);
        infiniteScroll.complete();
      }
    }, (error) => {
      infiniteScroll.complete();
    });
  }



  playVideo(videoId) {
    this.youtube.openVideo(videoId);
  }


  openSearch() {
    this.navCtrl.push('SearchPage');
  }

}

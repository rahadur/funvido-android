import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Video } from './../../models/video-model';
import { VideoServiceProvider } from './../../providers/video-service/video-service';


@IonicPage()
@Component({
  selector: 'page-search-video',
  templateUrl: 'search-video.html',
  providers: [
    VideoServiceProvider
  ]
})
export class SearchVideoPage {

  videos: Video[];
  searchText: String;

  loading = this.loadingCtrl.create({
    content: ''
  });


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private admobFree: AdMobFree,
    private videoService: VideoServiceProvider,
    private youtube: YoutubeVideoPlayer) {

    this.searchText = this.navParams.get('searchText');

    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-9624484306285530/3455724002',
      isTesting: false,
      autoShow: true
      };

      this.admobFree.banner.config(bannerConfig);
  }


  ionViewDidLoad() {
      this.loading.present();
      this.videoService.getAllSearchVideos(this.searchText).subscribe( (data) => {
        this.videos = data;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      });
  }


  ionViewDidEnter(){
    this.admobFree.banner.prepare()
    .then(() => {
    // banner Ad is ready
    // if we set autoShow to false, then we will need to call the show method here
    //this.admobFree.banner.show()
    })
    .catch(e => console.log(e));
  }


  searchVideos() {
    if(this.searchText  && this.searchText !== '') {
      this.videoService.getAllSearchVideos(this.searchText).subscribe( (data) => {
        this.videos = data;
      });
    }
  }


  backToSearch() {
    this.navCtrl.pop();  
  }

  

  playVideo(videoId) {
    this.youtube.openVideo(videoId);
  }

}

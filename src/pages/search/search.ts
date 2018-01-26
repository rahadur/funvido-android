import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { Video } from '../../models/video-model';
import { VideoServiceProvider } from './../../providers/video-service/video-service';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [
    VideoServiceProvider
  ]
})
export class SearchPage {

  videos: Video[];
  searchText: String;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private admobFree: AdMobFree,
    private videoService: VideoServiceProvider) {
      
    this.searchText = this.navParams.get('searchText');

    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-9624484306285530/3455724002',
      isTesting: false,
      autoShow: true
      };

      this.admobFree.banner.config(bannerConfig);
  }



  ionViewDidLoad() {
    if(this.searchText && this.searchText !== '' ) {
      this.videoService.getSearchVideos(this.searchText, 10).subscribe( (data) => {
        this.videos = data;
      });
    } else {
      this.videoService.getVideos(50).subscribe((data) => {
        this.videos = data;
      });
    }
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
  

  ionViewWillUnload(){
    this.admobFree.banner.remove().then(() => {
    }).catch(e => console.log(e));
  }



  onInput(event) {
    if(this.searchText !== '' && this.searchText !== null ) {
      this.videoService.getSearchVideos(this.searchText, 20).subscribe( (data) => {
        this.videos = data;
      });
    }
  }


  titleSelected(title) {
    this.navCtrl.push('SearchVideoPage', { searchText: title });
  }


  searchVideos() {
    this.navCtrl.push('SearchVideoPage', { searchText: this.searchText });
  }

  
  refreshSearch() {
    this.videoService.getVideos(20).subscribe((data) => {
      this.videos = data;
    })
  }

}

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController, ActionSheetController, Events} from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { Video } from '../../models/video-model';
import { VideoServiceProvider } from './../../providers/video-service/video-service';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    VideoServiceProvider
  ]
})
export class HomePage {

  @ViewChild(Content) content: Content;

  videos: Video[];

  loading = this.loadingCtrl.create({
    content: ''
  });

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private videoService: VideoServiceProvider, 
    private youtube: YoutubeVideoPlayer,
    private admobFree: AdMobFree,
    private events: Events) {

    this.loading.present();

    this.events.subscribe('page:scrollToTop', (page) => {
      console.log('Scroll Up');
      //this.content.scrollToTop();
    });


    const bannerConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-9624484306285530/8595481993',
      isTesting: false,
      autoShow: true
     };

     this.admobFree.interstitial.config(bannerConfig);
    
  }


  ionViewDidLoad(){
    this.videoService.getVideos(16).subscribe(data => {
      this.videos = data;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }


  ionViewDidEnter(){
    
  }



  doRefresh(refresher) {
  
    this.videoService.getVideos(10)
        .subscribe(data => {
          this.videos = data;

          refresher.complete();

          this.admobFree.interstitial.prepare()
          .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
          //this.admobFree.banner.show()
          })
          .catch(e => console.log(e));

        }, (error) => {
          refresher.complete();
        });
  }


  doInfinite(infiniteScroll) {

    this.videoService.getVideos(10)
      .subscribe(data => {
        for(let i = 0; i < data.length; i++) {
          this.videos.push(data[i]);
        }
        infiniteScroll.complete();
        
      }, (error) => {
        infiniteScroll.complete();
      });
  }


  playVideo( id, videoId) {
    this.youtube.openVideo(videoId);
  }


  presentActionSheet(videoId) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Play',
          icon: 'play',
          handler: () => {
            this.youtube.openVideo(videoId);
          }
        },
        {
          text: 'Save',
          icon: 'book',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        
      ]
    });

    actionSheet.present();
  }


  openSearch() {
    this.navCtrl.push('SearchPage');
  }

}

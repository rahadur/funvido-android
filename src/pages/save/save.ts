import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Video } from './../../models/video-model';



@IonicPage()
@Component({
  selector: 'page-save',
  templateUrl: 'save.html',
})
export class SavePage {

  videos: Video[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController,
    private admobFree: AdMobFree,
    private youtube: YoutubeVideoPlayer,
    private storage: Storage) {

      const bannerConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-9624484306285530/8595481993',
        isTesting: false,
        autoShow: true
       };
  
       this.admobFree.interstitial.config(bannerConfig);
  }


  ionViewDidLoad(){
    this.admobFree.interstitial.prepare()
    .then(() => {
    // banner Ad is ready
    // if we set autoShow to false, then we will need to call the show method here
    //this.admobFree.banner.show()
    })
    .catch(e => console.log(e));
  }

  ionViewDidEnter(){
    this.videos = [];
    this.storage.forEach((value, key) => {
      this.videos.push(value);
    });
  }



  playVideo(videoId) {
    this.youtube.openVideo(videoId);
  }

  removeVideo(video) {
    let index = this.videos.indexOf(video);
    this.storage.remove(video._id).then(() => {
      this.videos.splice(index, 1);
      this.presentToast();
    })
  }


  openSearch() {
    this.navCtrl.push('SearchPage');
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Removed video',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}

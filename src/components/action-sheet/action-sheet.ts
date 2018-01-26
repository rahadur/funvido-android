import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Video } from './../../models/video-model';


@Component({
  selector: 'action-sheet',
  templateUrl: 'action-sheet.html',

})
export class ActionSheetComponent{

  @Input() video: Video

  constructor(private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private youtube: YoutubeVideoPlayer) {
    
  }


  presentActionSheet(video) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Play',
          icon: 'play',
          handler: () => {
            this.youtube.openVideo(video.videoId);
          }
        },
        {
          text: 'Save',
          icon: 'book',
          handler: () => {
            this.storage.set(video._id, video);
            this.presentToast();
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


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Video save in library',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}

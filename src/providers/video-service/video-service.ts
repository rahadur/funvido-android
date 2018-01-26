import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Video } from '../../models/video-model';


@Injectable()
export class VideoServiceProvider {

  baseUrl: String;

  constructor(public http: HttpClient) {
    this.baseUrl = 'http://api-funvido.7e14.starter-us-west-2.openshiftapps.com/api/v1.0/';
  }


  getVideos(limit): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(this.baseUrl+'videos/'+limit);
  }


  getLaughingVideos(limit): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(this.baseUrl+'videos/'+limit+'/laughing');
  }


  getSearchVideos(title: String, limit: Number): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(this.baseUrl+'videos/'+title+'/search/'+limit);
  }

  getAllSearchVideos(title: String): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(this.baseUrl+'videos/'+title+'/search');
  }


  viewVideo(videoId) {
    return new Promise( resolve => {
        this.http.patch(this.baseUrl+'videos/'+videoId, {}).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

}

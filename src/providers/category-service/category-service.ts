
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Video } from '../../models/video-model';
import { Category } from './../../models/category-model';


interface CategoryVideo {
  _id: String,
  title: String,
  details: String,
  thumbnail: String,
  videos: Video[],
  created: Date,
  modified: Date
}

@Injectable()
export class CategoryServiceProvider {

  baseUrl: String;
  
  constructor(public http: HttpClient) {
    this.baseUrl = 'http://api-funvido.7e14.starter-us-west-2.openshiftapps.com/api/v1.0/';
  }


  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.baseUrl+'categories');
  }


  getCategoryVideos(categoryId, limit): Observable<CategoryVideo> {
    return this.http.get<CategoryVideo>(this.baseUrl+'categories/'+categoryId+'/'+limit+'/videos');
  }

  /* getCategoryVideos(categoryId, limit) {
      return new Promise( (resolve) => {
          this.http.get(this.baseUrl+'categories/'+categoryId+'/'+limit+'/videos').subscribe( (data) => {
            resolve(data);
          }, (err) => {
            console.log(err);
          });
      });
  } */

}

import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'LaughingPage';
  tab3Root = 'TopicPage';
  tab4Root = 'SavePage';

  //@ViewChild(Content) content: Content;

  constructor(private events: Events) {
    
  }

  scrollToTop() {
    this.events.publish('page:scrollToTop', 'home');
  }
}

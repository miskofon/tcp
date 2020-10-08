import { Component } from '@angular/core';
import { ITweetData, TweetsManagerService } from './tweets/tweets-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweets-list';
  public get tweets(): ITweetData[] {
    return this.tweetsManager.tweets;
  }
  constructor(private tweetsManager: TweetsManagerService) { }
}

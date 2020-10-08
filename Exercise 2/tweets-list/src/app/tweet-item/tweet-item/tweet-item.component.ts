import { Component, Input, OnInit } from '@angular/core';
import { ITweetData } from 'src/app/tweets/tweets-manager.service';

@Component({
  selector: 'tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss']
})
export class TweetItemComponent implements OnInit {

  @Input() public tweet: ITweetData;
  constructor() { }

  ngOnInit(): void {
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

const TIME_IN_MINISECONDS_BETWEEN_UPDATES = 5000;

export interface ITweetData {
  mention: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TweetsManagerService {

  public get tweets(): ITweetData[] {
    return [...this.mentions, ...this.myTweets];
  }

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  private init(): void {
    this.prepareTweets()
      .subscribe(() => { this.subscribeForTweetsUpates(); })
  }

  private prepareTweets(): Observable<void> {
    return this.getAllDataFromServer().pipe(
      tap((data: ITweetData[]) => {
        this.displayNewTweets(data);
      }),
      map(() => { }));
  }

  private displayNewTweets(data: ITweetData[]): void {
    if (data == null || !Array.isArray(data) || data.length === 0) {
      return;
    }

    const newMentions = data.filter((tweet: ITweetData) => tweet.mention);
    if (newMentions.length > 0) {
      this.mentions = [...this.mentions, ...newMentions];
    }

    const newTweets = data.filter((tweet: ITweetData) => !tweet.mention);
    if (newTweets.length > 0) {
      this.myTweets = [...this.tweets, ...newTweets];
    }

    this.timeWhenTweetsWhereCollectedInMiliseconds = Date.now();
  }

  private getAllDataFromServer(): Observable<ITweetData[]> {
    return this.httpClient.get<ITweetData[]>("https://us-central1-hello-world-dotnet-262708.cloudfunctions.net/tweeterwebhook?crc_token=a");
  }

  private subscribeForTweetsUpates(): void {
    setTimeout(() => {
      this.addNewTweetsIfExists()
        .pipe(
          finalize(() => this.subscribeForTweetsUpates()))
        .subscribe();
    }, TIME_IN_MINISECONDS_BETWEEN_UPDATES);
  }

  private addNewTweetsIfExists(): Observable<void> {
    return this.getNewDataFromServer().pipe(
      tap(()=>{}),
      map(() => {})
    );
  }

  private getNewDataFromServer(): Observable<ITweetData[]> {
    return this.httpClient.get<ITweetData[]>(`https://server/getData?after=${this.timeWhenTweetsWhereCollectedInMiliseconds}`);
  }

  private timeWhenTweetsWhereCollectedInMiliseconds = Date.now();
  private myTweets: ITweetData[] = [{mention: false, message: "My Tweet"}];
  private mentions: ITweetData[] = [];
}


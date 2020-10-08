import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import { Request } from 'express';
import { ITweetEntity, ReadTweetsService } from './read-tweets.service';

const readTweetService = new ReadTweetsService();

export const readTweets: HttpFunction = (req: Request, res) => {
  const tweetsAfterParam = req.query["after"] as string;
  let filterTimeInMiliseconds: number = 0;
  if (tweetsAfterParam != null) {
    filterTimeInMiliseconds = parseInt(tweetsAfterParam);
  }
  readTweetService.readTweetsWhereMentionsAreFirst(filterTimeInMiliseconds)
  .then((tweets: ITweetEntity[]) => res.status(200).send(tweets))
  .catch(() => res.status(500).send());
};
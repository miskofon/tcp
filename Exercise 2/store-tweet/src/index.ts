import { Context, EventFunction } from "@google-cloud/functions-framework/build/src/functions";
import { StoreTweetService } from "./store/store-tweet.service";

const storeService = new StoreTweetService();

export const storeTweet: EventFunction = (event: any, context: Context) => {
  const topicEventDataAsString = Buffer.from(event.data, 'base64').toString();
  const topicEventData = JSON.parse(topicEventDataAsString);
  const tweetEvent =  topicEventData.event;
  return storeService.storeTweetEvents(tweetEvent);
}
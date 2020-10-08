import { Request } from "express";

const { PubSub } = require('@google-cloud/pubsub');

export class OrderStoreTweetService {
    public static async storeTweet(request: Request): Promise<void> {
        const eventData = request.body;
        if (eventData.tweet_create_events != null) {
            await this.sendTweetObject(eventData);
        } else {
            console.log("Event not supported");
        }
    }

    private static async sendTweetObject(tweeterEvent: any): Promise<void> {
        const pubsub = new PubSub();
        const topic = pubsub.topic("store-tweet-topic");

        const messageObject = {
            event: tweeterEvent
        };
        const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');

        // Publishes a message
        try {
            await topic.publish(messageBuffer);
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
}
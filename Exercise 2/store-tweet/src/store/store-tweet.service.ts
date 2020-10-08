
import { Datastore } from "@google-cloud/datastore";
import { CommitResponse } from "@google-cloud/datastore/build/src/request";
const tweetEntityKeyName = "tweet";
const datastore = new Datastore();

interface ITweetEntity {
    message: string,
    creationDate: Date;
    mention: boolean;
}

export class StoreTweetService {
    public async storeTweetEvents(tweetEvent: any): Promise<void> {
        console.log("--- tweetEvent ---");
        console.log(tweetEvent);

        const tweetObjects = tweetEvent.tweet_create_events as any[];
        console.log("--- tweetObjects ---");
        console.log(tweetObjects);

        for (const tweetObject of tweetObjects) {
            await this.storeTweet(tweetObject.id_str, tweetObject.text, new Date(tweetObject.created_at), tweetEvent.user_has_blocked != null);
        }
    }

    public storeTweet(tweetId: string, tweetMessage: string, tweetCreationDate: Date, isMention: boolean): Promise<CommitResponse> {
        console.log("--- storeTweet() ---");
        console.log(tweetId);
        console.log(tweetMessage);
        console.log(tweetCreationDate);
        console.log(isMention);
        const key = datastore.key([tweetEntityKeyName, tweetId]);
        const tweetEntry: ITweetEntity = {
            message: tweetMessage,
            creationDate: tweetCreationDate,
            mention: isMention
        };
        console.log("--- tweetEntry ---");
        console.log(tweetEntry);
        
        return datastore.save(
            {
                key: key,
                data: tweetEntry
            }
        );
    }
}
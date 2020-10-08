import { Datastore } from "@google-cloud/datastore";
const datastore = new Datastore();
const tweetEntityKeyName = "tweet";

export interface ITweetEntity {
    message: string,
    creationDate: Date;
    mention: boolean;
}

export class ReadTweetsService {
    public async readTweetsWhereMentionsAreFirst(filterTimeInMiliseconds: number): Promise<ITweetEntity[]> {
        const query = datastore.createQuery(tweetEntityKeyName)
        .order("creationDate", {descending: true})
        .limit(50);
        if (filterTimeInMiliseconds != null && !isNaN(filterTimeInMiliseconds)) {
            query.filter("creationDate", ">", new Date(filterTimeInMiliseconds));
        }
        const [tweets] = await datastore.runQuery(query);
        return tweets;
    }
}
import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import { Request, Response } from 'express';
import { OrderStoreTweetService } from './order-store-tweet.service';
import { RegistrationHelper } from './twitter/registration-response.helper';

export const twitterwebhook: HttpFunction = (req: Request, res: Response<any>) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }

  if (req.method == "POST") {
    OrderStoreTweetService.storeTweet(req)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => { res.status(200).send(); });

  } else if (req.method == "GET") {
    RegistrationHelper.respondeToWebHookRegistration(req, res);
  } else {
    res.status(405).send();
  }
};
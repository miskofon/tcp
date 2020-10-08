import { Request, Response } from "express";
import { getChallengeResponse } from "./security";

const auth = require('./auth')

export class RegistrationHelper {
    public static respondeToWebHookRegistration(request: Request, response: Response): void {
        const crc_token = request.query.crc_token as string;

        if (crc_token) {
            const hash = getChallengeResponse(crc_token, auth.twitter_oauth.consumer_secret);
            response.status(200);
            response.send({
                response_token: 'sha256=' + hash
            });
        } else {
            response.status(400);
            response.send('Error: crc_token missing from request.');
        }
    }
}
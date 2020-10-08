const crypto = require('crypto')


/**
 * Creates a HMAC SHA-256 hash created from the app TOKEN and
 * your app Consumer Secret.
 * @param  token  the token provided by the incoming GET request
 * @return string
 */
export function getChallengeResponse(crcToken: string, consumerSecret: string) {

  return crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');
}
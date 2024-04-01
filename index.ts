import {Callback, Context, Handler} from 'aws-lambda';
import {SsmHandler} from './src/utils/ssm-handler';
import {CloudfrontSignedHandler} from "./src/utils/cloudfront-signed-handler";

const cfDomainUrl = process.env.CLOUDFRONT_DOMAIN || "";
const keyPairId = process.env.KEY_PAIR_ID || "";
const ssmParameterKey = process.env.CLOUDFRONT_KEYPAIR_PATH || "";


const handler: Handler = async (event: any, context: Context, callback: Callback) => {

    console.debug('event', event)
    console.debug('context', context)
    console.debug('cfDomainUrl', cfDomainUrl)
    console.debug('keyPairId', keyPairId)

    try {
        if (!event.hasOwnProperty('s3ObjectPath')) {
            throw new Error("S3 Bucket s3ObjectPath property not found in the event object.");
        }
        const {s3ObjectPath, expireDays} = event;
        const privateKey = await SsmHandler.getInstance().getParameter(ssmParameterKey);
        const {
            signedUrl,
            dateLessThan
        } = CloudfrontSignedHandler.getInstance(cfDomainUrl, keyPairId, privateKey).getSignedUrl(s3ObjectPath, parseInt(expireDays) || 7)

        console.info(`
            s3ObjectPath: ${s3ObjectPath}
            keyPairId: ${keyPairId}
            signedUrl: ${signedUrl}
            expireDay: ${dateLessThan}
        `);
        return {
            statusCode: 200,
            body: JSON.stringify({signedUrl: signedUrl, expireDay: dateLessThan}, null, 2),
        };
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({message: error})
        };
    }

};

export {handler};
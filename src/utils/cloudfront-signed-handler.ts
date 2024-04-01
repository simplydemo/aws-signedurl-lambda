import {getSignedCookies, getSignedUrl} from '@aws-sdk/cloudfront-signer';
import {CloudfrontSignedCookiesOutput} from "@aws-sdk/cloudfront-signer/dist-types/sign";
import {format} from "date-fns";

class CloudfrontSignedHandler {
    private static instance: CloudfrontSignedHandler;

    private readonly cfDomainUrl;
    private readonly privateKey;
    private readonly keyPairId;

    private constructor(cfDomainUrl: string, keypairId: string, privateKeyString: string) {
        this.cfDomainUrl = cfDomainUrl;
        this.privateKey = privateKeyString;
        this.keyPairId = keypairId;
    }

    public static getInstance(cfDomainUrl: string, keypairId: string, privateKeyString: string): CloudfrontSignedHandler {
        if (!CloudfrontSignedHandler.instance) {
            CloudfrontSignedHandler.instance = new CloudfrontSignedHandler(cfDomainUrl, keypairId, privateKeyString);
        }
        return CloudfrontSignedHandler.instance;
    }

    private getExpireDay(expireDays?: number): string {
        const expireDate = new Date()
        expireDate.setTime(Date.now() + ((expireDays || 7) * 24 * 60 * 60 * 1000));
        const expireDay = format(expireDate, 'yyyy-MM-dd');
        console.log('expireDate: ', expireDate.getTime())
        console.log('expireDay: ', expireDay)
        return expireDay;
    }

    public getSignedUrl(s3ObjectPath: string, expireDays?: number): { signedUrl: string, dateLessThan: string } {
        // dateLessThan, dateGreaterThan, url, keyPairId, privateKey, ipAddress, policy, passphrase,
        const url = `${this.cfDomainUrl}/${s3ObjectPath}`;
        const keyPairId = this.keyPairId;
        const privateKey = this.privateKey;
        const dateLessThan = this.getExpireDay(expireDays);
        const signedUrl = getSignedUrl({
            url,
            privateKey,
            keyPairId,
            dateLessThan,
        });
        return {signedUrl, dateLessThan};
    }

    public getSignedCookies(s3ObjectPath: string, expireDays?: number): CloudfrontSignedCookiesOutput {
        const url = `${this.cfDomainUrl}/${s3ObjectPath}`;
        const keyPairId = this.keyPairId;
        const privateKey = this.privateKey;
        const dateLessThan = this.getExpireDay(expireDays);
        // ipAddress, url, privateKey, keyPairId, dateLessThan, dateGreaterThan, policy, passphrase
        const cookies = getSignedCookies({
            url,
            privateKey,
            keyPairId,
            dateLessThan,
        });
        return cookies;
    }

}

export {CloudfrontSignedHandler}

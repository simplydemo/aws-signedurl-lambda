import {GetParameterCommand, SSMClient} from '@aws-sdk/client-ssm';

// const AWS_REGION = process.env.AWS_REGION

class SsmHandler {
    private static instance: SsmHandler;

    private ssmClient: SSMClient;

    private constructor(region?: string) {
        let options: { region?: string } = {};
        if (region) {
            options = {region: region};
        }
        this.ssmClient = new SSMClient(options);
    }

    public static getInstance(region?: string): SsmHandler {
        if (!SsmHandler.instance) {
            SsmHandler.instance = new SsmHandler(region);
        }
        return SsmHandler.instance;
    }

    async getParameter(name: string, region?: string, withDecryption?: boolean): Promise<string> {
        const requestParam = {
            Name: name,
            WithDecryption: withDecryption ?? true
        }
        const requestCommand = new GetParameterCommand(requestParam)
        return new Promise((resolve, reject) => {
            this.ssmClient.send(requestCommand, function (err: Error, data: any) {
                if (err) {
                    return reject(err)
                }
                if (!data?.Parameter) {
                    return reject(new Error('not found'))
                }
                resolve(data.Parameter.Value)
            })
        })
    }
}

export {SsmHandler}

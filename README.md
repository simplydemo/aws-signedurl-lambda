# aws-signedurl-lambda
AWS Lambda for CloudFront Signed URL Generator

## Git

```
git clone https://github.com/simplydemo/aws-signedurl-lambda.git

cd aws-signedurl-lambda
```

## Build

```
npm install

npm run build
```

## Build Image

```
docker build -t aws-signedurl-lambda:local -f ./cicd/docker/Dockerfile .
```

## Run Docker

```
docker run --rm --platform linux/arm64 --name aws-signedurl-lambda -p 9000:8080 \
  -v ~/.aws/credentials:/root/.aws/credentials \
  -e AWS_PROFILE=<AWS_PROFILE> \
  -e AWS_REGION=<AWS_REGION> \
  -e CLOUDFRONT_DOMAIN=<CLOUDFRONT_DOMAIN> \
  -e CLOUDFRONT_KEYPAIR_PATH="<CLOUDFRONT_KEYPAIR_PATH>" \
  -e KEY_PAIR_ID="<KEY_PAIR_ID>" \
  aws-signedurl-lambda:local

# docker exec -it aws-signedurl-lambda bash
```

## Test

[aws-lambda-rie](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html) 와 [Jest](https://jestjs.io/) 를 통해 테스트를 진행할 수 있습니다. 

### Built-In된 AWS Based 컨테이너의 Endpoint (/2015-03-31/functions/function/invocations) 로 테스트 수행  

```
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"s3ObjectPath":"<S3_OBJECT_PATH>","expireDays":"3"}'
```

[AWS 기본 이미지에서 빌드된 이미지 테스트](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/images-test.html#images-test-AWSbase)

<br>

### Jest 테스트 프레임워크를 통한 테스트 수행 

```
jest src/test/handler.test.js
```

<br>

## Dependencies
- [cloudfront-signer](https://www.npmjs.com/package/@aws-sdk/cloudfront-signer?activeTab=readme)
- [client-ssm](https://www.npmjs.com/package/@aws-sdk/client-ssm)
- [@types/aws-lambda](https://www.npmjs.com/package/@types/aws-lambda)
- [aws-lambda](https://www.npmjs.com/package/aws-lambda)
- [date-fns](https://www.npmjs.com/package/date-fns)

<br>

## References
- [serverless guide](https://www.serverless.com/framework/docs/providers/aws/guide/)
- [typescript guide](https://www.typescriptlang.org/docs/handbook/intro.html)
- [npmjs repository](https://www.npmjs.com/)
- [npmjs repository](https://www.npmjs.com/)


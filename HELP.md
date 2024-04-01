# Usage

`aws-signedurl-lambda` 람다 함수를 사용 하는 가이드 입니다.

<br>

## AWS CLI

```
aws lambda invoke --function-name aws-signedurl-lambda \
    --cli-binary-format raw-in-base64-out \
    --payload '{"s3ObjectPath":"uploads/hellow.pdf", "expireDays":"7"}' response.json

# 응답은 response.json 파일로 생성됩니다.
cat response.json
```

<br>

## Python

```
import boto3
import json

def invoke_lambda(payload):
    # AWS Lambda 클라이언트 생성
    lambda_client = boto3.client('lambda')
    response = lambda_client.invoke(
        FunctionName='aws-signedurl-lambda',
        InvocationType='RequestResponse',
        Payload=json.dumps(payload)
    )
    response_body = response['Payload'].read().decode('utf-8')
    return json.loads(response_body)  # JSON 형식으로 응답 반환
        

# 요청 메시지
request_payload = {
    "objectPath": "reports/WAF-NETWORK-WAF-GWLB.jpg",
    "expireDays": "7"
}
    
response = lambda_invoke(request_payload)
print(response)
```

<br>

## Java

```
    public static void main(String[] args) {
        String payload = "{\"objectPath\": \"reports/WAF-NETWORK-WAF-GWLB.jpg\", \"expireDays\": \"7\"}";

        AWSLambda lambdaClient = AWSLambdaClientBuilder.defaultClient();
        InvokeRequest invokeRequest = new InvokeRequest().withFunctionName("aws-signedurl-lambda").withPayload(payload);

        InvokeResult invokeResult = lambdaClient.invoke(invokeRequest);
        if (invokeResult.getStatusCode() == 200) {
            String response = new String(invokeResult.getPayload().array());
            System.out.println(response);
        } else {
            System.out.println("Lambda invocation failed. Status code: " + invokeResult.getStatusCode());
        }
    }
```

<br>

## IAM Policy 

- function_name: "aws-signedurl-lambda"

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"lambda:InvokeFunctionUrl",
				"lambda:InvokeFunction",
				"lambda:InvokeAsync"
			],
			"Resource": "arn:aws:lambda:<region>:<account_id>:function:aws-signedurl-lambda"
		}
	]
}
```


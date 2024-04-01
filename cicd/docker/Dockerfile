FROM public.ecr.aws/lambda/nodejs:20.2023.12.06.12-arm64
LABEL authors="symplesims@gmail.com"

COPY package.json tsconfig.json ./
ADD index.ts ${LAMBDA_TASK_ROOT}/
ADD src/ ${LAMBDA_TASK_ROOT}/src/

RUN npm install --omit=dev
RUN npm run build

ADD dist/ $LAMBDA_TASK_ROOT

CMD [ "index.handler" ]


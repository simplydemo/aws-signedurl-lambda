import axios from 'axios';

const event = require('./event.json');

console.log(event);
describe('Lambda Function', () => {
    it('should return expected response', async () => {
        const response = await axios.post('http://localhost:9000/2015-03-31/functions/function/invocations', event);
        console.log(response);
        expect(response.status).toBe(200); // 예상 HTTP 상태 코드
        // expect(response.data).toEqual({ /* 예상 응답 데이터 */ }); // 예상 응답 데이터
    });
});
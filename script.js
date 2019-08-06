import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // vus: 1000,
  // duration: '60s',
  // rps: 1000,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '60s', target: 100 },
    // { duration: '90s', target:  500},
    // { duration: '120s', target: 1000 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3003/api/product/9500000');
  check(res, {
    'status was 200': r => r.status == 200,
  });
  sleep(1);
}

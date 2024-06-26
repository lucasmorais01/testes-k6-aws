//Registration e auth: Registro - Realizar o registro de um novo usuário

// Critérios: Performance test - Carga 10 VU por 10s
//Limites: requisição com falha inferior a 1 % | Duração da requisição p(95) < 500 | Requisição com sucesso superior a 95%

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [{duration: '20s', target: 10}],
    thresholds: {
        checks:['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
};

export default function(){
    const USER = `${Math.random()}@mail.com`;
    const pass = 'user123'
    const BASE_URL = 'https://test-api.k6.io';
    console.log(USER + pass)
    

const res = http.post(`${BASE_URL}/user/register/`,{
       username: USER,
       first_name: 'crocodilo',
       last_name: 'dino',
       email: USER,
       password:pass
});

check(res, {
    'sucesso ao registrar': (r) => r.status ===201
});

sleep(1);



}


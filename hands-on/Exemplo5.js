//Private API: Buscando todos os crocodilos

//Criterios: performance test - 100 VU por 10s

//Limites:requisição com falha inferior a 1% - duração da requisição p(95) <250


// Teste de Carga

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 250']
    }
}

const BASE_URL = 'https://test-api.k6.io';

export function setup(){
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.5577608357004727@mail.com',
        password: 'user123'
    });
    const token = loginRes.json('access');
    return token;
}


export default function(token){
    
    const params = {
        headers: {
            Authorization: `Bearer ${token}` ,
            'Content-Type': 'application/json'
        }
    }
    const res = http.get(`${BASE_URL}/my/crocodiles`, params);

    check(res, {
        'status code 200': (r) => r.status === 200
    });
}
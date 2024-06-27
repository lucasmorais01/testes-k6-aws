//TESTE DE CARGA 
// PUBLIC API: Exemplo2

//Criterios:
// Performance test - ramp up 10 VU em 10s | CARGA: 10 VU por 10s | LIMITES: requisição com sucesso > 95%
// Tempo requisição p(90) < 200

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";



//CONFIGURAÇÃO
export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '10s', target: 10},
        {duration: '10s', target: 0},
    ],
    thresholds: {
            checks: ['rate > 0.95'],
            http_req_duration: ['p(95) < 200']

    }
}

const data = new SharedArray('leitura do json', function(){
    return JSON.parse(open('/dados.json')).crocodilos
})


//EXECUÇÃO
export default function(){
    const crocodilo = data[Math.floor(Math.random() * data.length)].id
    console.log(crocodilo);


    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/${crocodilo}';
    const res = http.get(BASE_URL)

    check(res, {
        'status code 200': (r) => r.status ===200
    });

    sleep(1)
}
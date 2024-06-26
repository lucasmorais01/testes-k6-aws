// Registration e auth : Login - Realizar login com um novo usuário


//Criterios- Stress Test

// Ramp up 5 VU em 5s /  Carga 5 VU por 5s / Ramp up 50 VU em 2s / Carga de 50 VU em 2s / Ramp down 0 VU em 5s

//  Limites - Requisição com falha inferior a 1%


import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
export const options = {


    stages: [{duration: '5s', target: 5},
             {duration: '5s', target: 5},
             {duration: '2s', target: 50},
             {duration: '2s', target: 50},
             {duration: '5s', target: 0}
    ],
    thresholds: {
        checks:['rate < 0.01'],
        
    }
}

const csvData = new SharedArray('Ler dados', function(){
    return papaparse.parse(open('usuarios.csv'),{header: true}).data;
})

export default function(){
    const USER = csvData[Math.floor(Math.random()* csvData.length)].email
    const pass = 'user123'
    const BASE_URL = 'https://test-api.k6.io';
    console.log(USER + pass)
    

const res = http.post(`${BASE_URL}/auth/token/login/`,{
       username: USER,
       password:pass
});

check(res, {
    'sucesso no login': (r) => r.status ===200,
    'token gerado':(r) => r.json('acess') !== ''
});

sleep(1);



}


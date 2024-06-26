// Realizar consulta a API de listagem de crocodilos e busca por id de crocodilos.
// Verificar que é esperado um RPS de 200 Requisições para a api de listagem de crocodilos durante 30 segundos
// para a busca por id, o sistema deve atender 50 usuários onde cada usuário realiza até 20 solicitações
   // Usuários PAR devem realizar busca ao crocodilo de ID 2
   // Usuários IMPAR devem realizar busca ao crocodilo de ID 1
// Ambos os testes devem ser executados simultaneamente.
//api: 'https://test-api.k6.io/public'


import http from "k6/http";

//configuração:
export const options = {
    scenarios:{
        listar:{
            executor: ' constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVud: 150,
            gracefulStop: '10s',
            tags: {test_type: ' listagem_de_crocodilos'}
        },
        buscar:{
            executor: 'per-vu-iteration',
            exec: ' buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: {test_type: 'busca_de_crocodilos'}


        }
    }

};

//execução:
export function listar(){
    http.get(__ENV.URL+'crocodiles');

}
export function buscar(){
    if(__VU % 2 === 0){
        http.get(__ENV.URL+'/crocodiles/2')

 } else{
    http.get(__ENV.URL+'/crocodiles/1')

 }

}


  
  
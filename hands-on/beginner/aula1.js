//1. inicialização
import eleep, { sleep } from 'k6';



//2. configuração
export const option = {
    vus:1,
    duration: '10s'
}


//3. execução // codigo vu
export default function(){
    console.log("testando k6");
    sleep(1);
}

//4. desmontagem
export function teardown(data){
    console.log(data)


}

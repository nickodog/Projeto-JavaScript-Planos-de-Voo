import { Piloto } from './Piloto.js';
import { ServicoPilotos } from './Piloto.js';
import { Aeronave } from './Aeronave.js';
import { aviaoPequeno } from './Aeronave.js';
import { aviaoPassageiro } from './Aeronave.js';
import { aviaoCarga } from './Aeronave.js';
import { ServicoAeronaves } from './Aeronave.js';
import { Aerovia } from './Aerovia.js';
import { ServicoAerovias } from './Aerovia.js';
import { Plano, ServicoPlanos} from './Plano.js';
import { OcupacaoAerovia } from './OcupacaoAerovia.js';
import promptsync from 'prompt-sync';
import nReadlines from 'n-readlines';
const prompt = promptsync({sigint: true});
export let ocupacoes = [];
export let altitudes = [25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000];
export let pilotos = [];
export let aeronaves = [];
export let aerovias = [];
export let planos = [];

export class Menu{

    listarAerovias(origem, destino) {
        let aerovias2 = [];
        for (let a of aerovias) {
            if (a.origem === origem || a.destino === destino || a.origem === destino || a.destino === origem) {
                aerovias2.push(a);
            }else{
                continue;
            };
        };
        for (let a of aerovias2) {
            console.log(a.toString());
        };
        aerovias2 = [];
    };

    listaraltitudesLivres(idAerovia, data, horario) {
        if (!data.includes("/")){
            return(console.log("Data inválida.\n"))
        };
        if (!horario.includes(":")){
            return(console.log("Horario inválido.\n"))
        };
        let altitudesOcupadas = []
        for (let o of ocupacoes){
            if (o[0] === idAerovia){
                if (o[1] === data){
                    if (o[2] === horario){
                        altitudesOcupadas.push(o[3]);
                        continue;
                    };
                }else{
                    continue;
                };
            }else{
                continue;
            };
        };
        if (altitudesOcupadas[0] === undefined){
            return(console.log("Não há ocupações nesta data/aerovia/horário.\n"))
        }else{
            console.log(altitudesOcupadas);
            console.log(`As altitudes livres na Aerovia ${idAerovia}, no dia ${data}, no horário ${horario} são: ${altitudes.filter(a => !altitudesOcupadas.includes(a))}\n`);
            altitudesOcupadas = [];
        };
    };
      
    listarPlanoID(id3){
        for (let p of planos) {
            if (p.id === id3){
                return(console.log(p.toString()));
            }else{
                continue;
            };
        };
        return(console.log(`Não foi possível achar um plano com o ID ${id3}\n`));
    };

    cancelarPlano(id){
        for (let p of planos){
            if (id === p.id){
                if (p.cancelado === true){
                    return(console.log("Este plano já está cancelado.\n"));
                }else{
                    p.cancelado = true;
                    for (let i = ocupacoes.length - 1; i >= 0; i--){
                        if (p.idAerovia === ocupacoes[i][0] && p.data === ocupacoes[i][1] && p.horario === ocupacoes[i][2] && p.altitude === ocupacoes[i][3] && p.slots === ocupacoes[i][4]){
                            ocupacoes.splice(i, 1)
                        };
                    };
                    p.id = p.id.replace(/A/, '');
                    return(console.log(`O Plano de Voo ${id} foi cancelado.\n`));
                };
            }else{
                continue;
            };
        };
        return(console.log(`O Plano de Voo ${id} não existe.\n`));
    };

    aprovarPlano(id2) {
        for (let p of planos){
            if (id2 === p.id){
                if (p.cancelado === true){
                    console.log("\nEste plano está cancelado.\n");
                    let confirm = prompt("Deseja aprovar mesmo assim (''s'' ou ''n'')?  ");
                    if (confirm === "s"){
                        if (p.id.includes("A")){
                            return(console.log("Este plano já está aprovado!"));
                        };
                        for (let pi of pilotos){
                            if (pi.matricula === p.matrPiloto){
                                if (pi.carteira === false){
                                    return(console.log("O Piloto está com a habilitação inativa.\n"));
                                };
                            }else{
                                continue;
                            };
                        };
                        for (let a of aeronaves){
                            if (a.idAeronave === p.idAeronave){
                                if (a.tipo === "Aeronave particular de pequeno porte"){
                                    if (p.altitude != 25000 && p.altitude != 26000 && p.altitude != 27000){
                                        return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                    };
                                };
                                if (a.tipo === "Aeronave comercial de passageiros"){
                                    if (p.altitude === 25000 && p.altitude === 26000 && p.altitude === 27000 && p.altitude === 28000){
                                        return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                    };
                                };
                                if (a.tipo === "Aeronave comercial de carga"){
                                    for (let s of p.slots){
                                        if (s != 0 && s != 1 && s != 2 && s != 3 && s != 4 && s != 5 && s !=6){
                                            return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                        };
                                    };
                                };
                                for (let ae of aerovias){
                                    if (ae.idAerovia === p.idAerovia){
                                        if (a.autonomia < ae.tamanho * 1.1){
                                            return(console.log("Não foi possível aprovar pois a autonomia da aeronave não é suficiente.\n"));
                                        }else{
                                            break;
                                        }
                                    }else{
                                        continue;
                                    };
                                };
                            }else{
                                continue;
                            };
                        };
                        for (let o of ocupacoes){
                            if (p.idAerovia === o[0]){
                                if (p.data === o[1]){
                                    if (p.altitude === o[3]){
                                        for (let b of o[4]){
                                            for (let s of p.slots){
                                                if (b === s){
                                                    return(console.log("Já existe um plano com os mesmos slots.\n"));
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        ocupacoes.push([p.idAerovia, p.data, p.horario, p.altitude, p.slots]);
                        p.cancelado = false;
                        p.id = `A`+p.id;
                        return(console.log("O Plano foi aprovado!\n"));
                    }else{
                        return(console.log("O Plano não foi aprovado.\n"));
                    };
                }else{
                    if (p.id.includes("A")){
                        return(console.log("Este plano já está aprovado!"));
                    };
                    for (let pi of pilotos){
                        if (pi.matricula === p.matrPiloto){
                            if (pi.carteira === false){
                                return(console.log("O Piloto está com a habilitação inativa.\n"));
                            };
                        }else{
                            continue;
                        };
                    };
                    for (let a of aeronaves){
                        if (a.idAeronave === p.idAeronave){
                            if (a.tipo === "Aeronave particular de pequeno porte"){
                                if (p.altitude != 25000 && p.altitude != 26000 && p.altitude != 27000){
                                    return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                };
                            };
                            if (a.tipo === "Aeronave comercial de passageiros"){
                                if (p.altitude === 25000 && p.altitude === 26000 && p.altitude === 27000 && p.altitude === 28000){
                                    return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                };
                            };
                            if (a.tipo === "Aeronave comercial de carga"){
                                for (let s of p.slots){
                                    if (s != 0 && s != 1 && s != 2 && s != 3 && s != 4 && s != 5 && s !=6){
                                        return(console.log("Não foi possível aprovar pois o tipo de aeronave não é compatível com o plano.\n"));
                                    };
                                };
                            };
                            for (let ae of aerovias){
                                if (ae.idAerovia === p.idAerovia){
                                    if (a.autonomia < ae.tamanho * 1.1){
                                        return(console.log("Não foi possível aprovar pois a autonomia da aeronave não é suficiente.\n"));
                                    }else{
                                        break;
                                    }
                                }else{
                                    continue;
                                };
                            };
                        }else{
                            continue;
                        };
                    };
                    for (let o of ocupacoes){
                        if (p.idAerovia === o[0]){
                            if (p.data === o[1]){
                                if (p.altitude === o[3]){
                                    for (let b of o[4]){
                                        for (let s of p.slots){
                                            if (b === s){
                                                return(console.log("Já existe um plano com os mesmos slots.\n"));
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    ocupacoes.push([p.idAerovia, p.data, p.horario, p.altitude, p.slots]);
                    p.id = `A`+p.id;
                    return(console.log("O Plano foi aprovado!\n"));
                };
            }else{
                continue;
            };
        };
        return(console.log("Não existe nenhum plano com este ID.\n"));
    };

    listarOcupacao(data2){
        if (!data2.includes("/")){
            return(console.log("Data inválida.\n"));
        };
        for (let o of ocupacoes) {
            if (o[1] === data2){
                console.log(o);
            };
        };
        return(console.log("Não há ocupações nesta data.\n"));
    };

    listarPlanosData(data3){
        if (!data3.includes("/")){
            return(console.log("Data inválida.\n"));
        };
        for (let p of planos){
            if (p.data === data3 && p.id.includes("A")){
                console.log(p.toString());
            }else{
                continue;
            };
        };
        return(console.log("Não há planos aprovados para esta data.\n"));
    };

    exibirMenu() {
        console.log("\nMenu de Opções:\n");
        console.log("1. Listar Aerovias");
        console.log("2. Listar Altitudes Livres");
        console.log("3. Listar Plano pelo ID");
        console.log("4. Cancelar Plano");
        console.log("5. Aprovar Plano");
        console.log("6. Listar Ocupacões pela Data");
        console.log("7. Listar Planos Aprovados pela Data\n")
        console.log("Sair\n");
    };
};

//criação de classes serviço
const Menu1 = new Menu();
const GerenciadorMatriculas = new ServicoPilotos();
const GerenciadorAeronaves = new ServicoAeronaves();
const GerenciadorAerovias = new ServicoAerovias();
const GerenciadorPlanos = new ServicoPlanos();
const GerenciadorOcupacao = new OcupacaoAerovia();

//carregamento de dados csv.
//na especificação do projeto é dito que pelo menos as informações relativas aos pilotos e as aerovias devem ser armazenadas em csv.
const carregaPilotos = function(){
    let arq = new nReadlines("pilotos.csv");
    let buf = "";
    let line = "";
    let dados = "";

    arq.next();
    while (buf = arq.next()){
        line = buf.toString('utf8');
        dados = line.split(",");
        let carteira = Number(dados[1]);
        pilotos.push(new Piloto(dados[0], carteira));
    };
    return pilotos;
};

const carregaAerovias = function(){
    let arq = new nReadlines("aerovias.csv");
    let buf = "";
    let line = "";
    let dados = "";

    arq.next();
    while (buf = arq.next()){
        line = buf.toString('utf8');
        dados = line.split(",");
        let tamanho = Number(dados[2]) 
        aerovias.push(new Aerovia(dados[0], dados[1], tamanho));
    };
    return aerovias;
};
carregaPilotos();
carregaAerovias();

//criaçao de objeto Aeronave genérico.
let a1 = new Aeronave(500, 8000);
let a2 = new Aeronave(100, 8000);
let a3 = new Aeronave(500, 500);
aeronaves.push(a1, a2, a3);

//criação de avioes particulares.
let ap1 = new aviaoPequeno(500, 8000, "Nico");
let ap2 = new aviaoPequeno(500, 8000, "Ni");
let ap3 = new aviaoPequeno(500, 4000, "Nico2");
aeronaves.push(ap1, ap2, ap3);


//criaçao de aviao de passageiros
let acp1 = new aviaoPassageiro(500, 8000, "hello", 300);
let acp2 = new aviaoPassageiro(500, 8000, "hello", 100);
let acp3 = new aviaoPassageiro(500, 8000, "hello", 600);
let acp4 = new aviaoPassageiro(500, 8000, "a", 300);
aeronaves.push(acp1, acp2, acp3, acp4);

//criaçao de cargueiros.
let acc1 = new aviaoCarga(500, 8000, "hello", 18000);
let acc2 = new aviaoCarga(500, 8000, "hello", 500);
aeronaves.push(acc1, acc2);


//criação de planos.
let pv1 = new Plano(2,"A1",2,"10/08/2023","13:00",25000,[13,14,15]);
let pv2 = new Plano(2,"A1",2,"10/08/2023","23:00",25000,[23,0,1]);
let pv3 = new Plano(2,"A1",2,"10/08/2023","16:00",25000,[16,17,18]);
let pv4 = new Plano(1,"A1",2,"11/08/2023","15:00",25000,[15,16,17]);
let pv5 = new Plano(2,"A1",2,"11/08/2023","13:00",26000,[13,14,15]);
let pv6 = new Plano(2,"A1",3,"11/08/2023","20:00",28000,[20,21,22]);
let pv7 = new Plano(2,"A1",2,"10/08/2023","20:00",28000,[20,21,22]);
let pv8 = new Plano(2,"A1",5,"10/08/2023","13:00",25000,[13,14,15]);
let pv9 = new Plano(2,"A1",2,"15/08/2023","13:00",25000,[13,14,15]);
let pv10 = new Plano(2,"A1",2,"10/08/2023","13:00",25000,[13,14,15]);
let pv11 = new Plano(2,"A2",2,"10/08/2023","13:00",25000,[13,14,15]);
planos.push(pv1,pv2,pv3,pv4,pv5,pv6,pv7,pv8,pv9,pv10,pv11);

//chama função recupera()
console.log("Piloto Recuperado:");
GerenciadorMatriculas.recupera(1);

//cham funçao listarPilotos()
console.log("Todos os Pilotos:");
GerenciadorMatriculas.listarPilotos();

//chama função recuperaAerovia()
console.log("Aerovias Recuperadas:");
GerenciadorAerovias.recuperaAerovia("POA", "RJ");
GerenciadorAerovias.recuperaAerovia("nicolas", "bernardo");

//chama funçao listarAeronaves()
console.log("Todas as Aeronaves:");
GerenciadorAeronaves.listarAeronaves();

//recuperaPlano.
console.log("Planos Recuperados: ");
GerenciadorPlanos.recuperaPlano("P1");
//chama função que lista todos os planos.
console.log("Todos os Planos: ");
GerenciadorPlanos.lista();
//chama função que analisa se o parametro é um plano.
GerenciadorPlanos.consiste(pv1);
//chama função que faz um slot ser ocupado.
GerenciadorOcupacao.ocupa("A1","20/08/2023",25000,[13]);

while (true) {
    Menu1.exibirMenu();
    //teste altitudes ocupadas.
    //para testar, aprove o plano P11
    GerenciadorOcupacao.altitudesOcupadas("A2","10/08/2023");
    //teste slots ocupados.
    //para testar, aprove o plano P1
    GerenciadorOcupacao.slotsOcupados("A1","10/08/2023",25000);
    //chama função que retorna true or false dependendo se um slot está ocupado.
    //para testar, aprove o plano P1
    console.log(GerenciadorOcupacao.isOcupado("A1","10/08/2023",25000,13))
    for (let o of ocupacoes){
        console.log(o);
    };

    let escolha = prompt("Escolha uma opção ou 'sair' para encerrar o programa: ");
    if (escolha === "sair"){
        break;
    }else{
        switch (escolha) {
            case "1":
                let origem = prompt("Digite o aeroporto de origem: ");
                let destino = prompt("Digite o aeroporto de destino: ");
                Menu1.listarAerovias(origem, destino);
                break;
            case "2":
                let idAerovia = prompt("Digite o ID da Aerovia desejada: ");
                let data = prompt("Digite a data desejada: ");
                let horario = prompt("Digite o horário desejado: ");
                Menu1.listaraltitudesLivres(idAerovia, data, horario);
                break;
            case "3":
                //antes de confirmar o plano, os IDs são "P" mais um número, após confirmar são "AP" mais um número. (P de plano e A de aprovado).
                let id3 = prompt("Digite o ID do Plano de Voo: ")
                Menu1.listarPlanoID(id3);
                break;
            case "4":
                let id = prompt("Digite o ID do Plano de Voo: ");
                Menu1.cancelarPlano(id);
                break;
            case "5":
                let id2 = prompt("Digite o ID do Plano de Voo: ");
                Menu1.aprovarPlano(id2);
                break;
            case "6":
                let data2 = prompt("Digite a data desejada: ");
                Menu1.listarOcupacao(data2);
                break;
            case "7":
                let data3 = prompt("Digite a data desejada: ");
                Menu1.listarPlanosData(data3);
                break;
            case "8":
                //teste para liberar a ocupação do plano P1
                //é necessário cancelar o plano após usar esta função, pois apenas a ocupação é retirada.
                GerenciadorOcupacao.libera("A1","10/08/2023",25000,[13,14,15])
                break;
            default:
              console.log("Opção inválida. Tente novamente.\n");
        };
    };
};
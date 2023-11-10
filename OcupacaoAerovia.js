import { validate } from "bycontract";
import { ocupacoes } from "./projetoparte2.js";

export class OcupacaoAerovia{
    altitudesOcupadas(idAerovia, data){
        validate(arguments,["string","string"])
        let altitudesOcupadas = []
        for (let o of ocupacoes){
            if (o[0] === idAerovia){
                if (o[1] === data){
                    for (let a in altitudesOcupadas){
                        console.log(a)
                        if (o[3] === a){
                            break;
                        }else{
                            continue;
                        }
                    }
                    altitudesOcupadas.push(o[3])
                    continue;
                }else{
                    continue;
                }
            }else{
                continue;
            }
        }
        if (altitudesOcupadas[0] === undefined){
            return(console.log("Não há nenhuma altitude ocupada nesta data/aerovia.\n"));
        }else{
            console.log(`As altitudes ocupadas na aerovia ${idAerovia}, no dia ${data}, são: ${altitudesOcupadas}\n`);
            altitudesOcupadas = [];
        }
    }

    slotsOcupados(idAerovia, data, altitude){
        validate(arguments,["string","string"]);
        let slotsOcupados = [];
        for (let o of ocupacoes){
            if (o[0] === idAerovia){
                if (o[1] === data){
                    if (o[3] === altitude){
                        slotsOcupados.push(o[4]);
                        continue;
                    };
                }else{
                    continue;
                };
            }else{
                continue;
            };
        };
        if (slotsOcupados[0] === undefined){
            return(console.log("Não há nenhum slot ocupado.\n"));
        }else{
            console.log(`Os slots ocupados na Aerovia ${idAerovia}, no dia ${data}, na altitude ${altitude} são: ${slotsOcupados}\n`);
            slotsOcupados = [];
        };
    };

    ocupa(idAerovia, data, altitude, slot){
        for (let o of ocupacoes){
            if (o[0] === idAerovia){
                if (o[1] === data){
                    if (o[3] === altitude){
                        for (let s of o[4]){
                            if (slot === s){
                                return false;
                            }else{continue};
                        };
                    }else{continue};
                }else{continue};
            }else{continue};
        }
        let horario = slot+`:00`
        ocupacoes.push([idAerovia, data, horario, altitude, slot]);
        return true;
    };

    libera(idAerovia, data, altitude, slot){
        for (let i=0; i<ocupacoes.length; i++){
            if (ocupacoes[i][0] === idAerovia){
                if (ocupacoes[i][1] === data){
                    if (ocupacoes[i][3] === altitude){
                        for (let s of ocupacoes[i][4]){
                            for (let s2 of slot){
                                if (s === s2){
                                    ocupacoes.splice(i, 1);
                                    return true;
                                }else{continue};
                            };
                        };
                    }else{continue};
                }else{continue};
            }else{continue};
        }return false;
    };

    isOcupado(idAerovia, data, altitude, slot){
        for (let o of ocupacoes){
            if (o[0] === idAerovia ){
                if (o[1] === data){
                    if (o[3] === altitude){
                        for (let s of o[4]){
                            if (slot === s){
                                return true;
                            }else{continue};
                        };
                    }else{continue};
                }else{continue};
            }else{continue};
        }
    };
};
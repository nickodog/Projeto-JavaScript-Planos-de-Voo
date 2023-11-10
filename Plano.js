import { validate } from 'bycontract';
import { planos } from './projetoparte2.js';

export class Plano{
    static #idGen = 0;
    #id;
    #matrPiloto;
    #idAerovia;
    #idAeronave;
    #data;
    #horario;
    #altitude;
    #slots = [];
    #cancelado = false;

    get cancelado(){ return this.#cancelado};
    get matrPiloto(){ return this.#matrPiloto};
    get data(){ return this.#data};
    get idAeronave(){ return this.#idAeronave};
    get altitude(){ return this.#altitude};
    get slots(){ return this.#slots};
    get id(){ return this.#id};
    get idAerovia(){ return this.#idAerovia};
    get horario(){ return this.#horario};
    /**
     * @param {boolean} valor
     */
    set cancelado(valor){ this.#cancelado = valor};
    set id(valor){ this.#id = valor};

    constructor(matrPiloto, idAerovia, idAeronave, data, horario, altitude, slots) {
        validate(arguments,["number", "string", "number", "string", "string", "number", "array"]);
        if (this.#cancelado === false){
            Plano.#idGen++;
            this.#id = Plano.#idGen;
            this.#id = `P${this.#id}`;
            this.#matrPiloto = matrPiloto;
            this.#idAerovia = idAerovia;
            this.#idAeronave = idAeronave;
            this.#altitude = altitude;
            this.#data = data;
            this.#horario = horario;
            this.#slots = slots;
        }else{
            this.#matrPiloto = null;
            this.#idAerovia = null;
            this.#data = null;
            this.#horario = null;
            this.#altitude = null;
            this.#slots = null;
        };
    };
    
    toString(){
        let str = ``;
        if (this.#cancelado === true){
            str = `ID: ${this.#id}, Plano cancelado.\n`;
            return str;
        }else{
            str = `ID do Plano: ${this.#id}, Matrícula do Piloto: ${this.#matrPiloto}, ID da Aerovia: ${this.#idAerovia}, ID da Aeronave: ${this.#idAeronave}, Data: ${this.#data}, Horário: ${this.#horario}, Altitude: ${this.#altitude}, Slots: ${this.#slots}.\n`;
            return str;
        };
    };
};

export class ServicoPlanos{
    consiste(plano){
        if (plano instanceof Plano){
            return(console.log(plano));
        }else{
            return(console.log("Não existe."));
        };
    };

    lista(){
        for (let p of planos){
            console.log(p.toString());
        };
    };

    recuperaPlano(id) {
        for (let p of planos) {
            if (id === p.id) {
                if (p.cancelado === true){
                    return(console.log("Plano de Voo Cancelado."));
                }else{
                    return(console.log(p.toString()));
                };
            }else{
                return(console.log("Não há resultados."));
            };
        };
    };
};
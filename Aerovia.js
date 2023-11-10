import { validate } from 'bycontract';
import { aerovias } from './projetoparte2.js';

export class Aerovia {
    #idAerovia;
    static #viaGen = 0;
    static #i = 0;
    #alfabeto = ["A", "B", "C", "D", "E", "F", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    #origem;
    #destino;
    #tamanho;


    get idAerovia() { return this.#idAerovia; };
    get origem() { return this.#origem; };
    get destino() { return this.#destino; };
    get tamanho() { return this.#tamanho; };

    constructor(origem, destino, tamanho) {
        validate(arguments, ["string", "string", "number"]);
        if (origem.length < 2) {
            this.#origem = "x";
        } else {
            this.#origem = origem;
        };
        if (destino.length < 2) {
            this.#destino = "x";
        } else {
            this.#destino = destino;
        };
        if (tamanho < 100 || tamanho > 4660) {
            this.#tamanho = -1;
        } else {
            if (this.#origem === "x" || this.#destino === "x" || this.#tamanho === -1) {
                this.#idAerovia = "Inválido";
                this.#str2 = this.#idAerovia;
            } else {
                this.#tamanho = tamanho;
                Aerovia.#viaGen++;
                this.#idAerovia = `${this.#alfabeto[Aerovia.#i]}`+Aerovia.#viaGen;
            };
        };
        if (Aerovia.#viaGen > 2) {
            Aerovia.#viaGen = 1;
            Aerovia.#i++;
            this.#idAerovia = `${this.#alfabeto[Aerovia.#i]}`+Aerovia.#viaGen;
        }
    }

    toString() {
        let str = ``;
        if (this.#origem === "x") {
            str = "Aeroporto de origem inválido.\n";
            return str;
        };
        if (this.#destino === "x") {
            str = "Aeroporto de destino inválido.\n";
            return str;
        };
        if (this.#tamanho === -1) {
            str = "Tamanho de aerovia inválido.\n";
            return str;
        } else {
            str = `ID: ${this.#idAerovia}, Aeroporto de origem: ${this.#origem}\n`;
            str += `Aeroporto de destino: ${this.#destino}, Tamanho da aerovia: ${this.#tamanho} Km\n`;
            return str;
        };
    };

    #str2 = ``;
    get str2() { return this.#str2; };
}

export class ServicoAerovias {
    recuperaAerovia(origem, destino) {
        validate(arguments, ["string", "string"]);
        let aerovias2 = [];
        for (let a of aerovias) {
            if (a.origem === origem || a.destino === destino || a.origem === destino || a.destino === origem) {
                aerovias2.push(a);
            } else {
                continue;
            }
        }
        console.log(aerovias2); //teste para ver se é array.
        for (let a of aerovias2) {
            console.log(a.toString());
        }
        aerovias2 = [];
    };

}
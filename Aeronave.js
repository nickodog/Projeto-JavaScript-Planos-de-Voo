import { validate } from 'bycontract';
import { aeronaves } from './projetoparte2.js';

export class Aeronave {
    #idAeronave;
    static idGen = 0;
    #vel;
    #autonomia;

    get idAeronave() { return this.#idAeronave; };
    get vel() { return this.#vel; };
    get autonomia() { return this.#autonomia; };

    set idAeronave(value) { this.#idAeronave = value;}
    constructor(velocidade, auto) {
        validate(arguments, ["number", "number"]);
        this.#vel = velocidade;
        if (velocidade < 200) {
            this.#vel = -1;
        };
        if (auto < 4000) {
            this.#autonomia = -1;
        } else {
            if (this.#vel === -1 || this.#autonomia === -1) {
                this.#idAeronave = "Inválido";
            } else {
                this.#autonomia = auto;
                Aeronave.idGen++;
                this.#idAeronave = Aeronave.idGen;
            };
        };
    };

    toString() {
        let str = ``;
        if (this.#vel === -1) {
            str = `Velocidade de Cruzeiro abaixo da média.\n`;
            return str;
        };
        if (this.#autonomia === -1) {
            str = `Autonomia abaixo da média.\n`;
            return str;
        } else {
            str = `ID: ${this.#idAeronave}, Velocidade de Cruzeiro: ${this.#vel}Km/h, Autonomia: ${this.#autonomia}Km\n`;
            return str;
        };
    };
}
export class aviaoPequeno extends Aeronave {
    #empresa;
    #tipo = "Aeronave particular de pequeno porte";

    get empresa() { return this.#empresa; };
    get tipo() { return this.#tipo; };

    constructor(velocidade, auto, empre) {
        validate(arguments, ["number", "number", "string"]);
        super(velocidade, auto);
        if (empre.length < 3) {
            this.idAeronave = "Inválido";
            this.#empresa = "x";
            Aeronave.idGen--;
        } else {
            this.#empresa = empre;
        };
    };

    toString() {
        let str = ``;
        if (this.#empresa === "x") {
            str = `Empresa Inválida\n`;
            return str;
        } else {
            return super.toString() + `Tipo: ${this.#tipo}, Empresa: ${this.#empresa}\n`;
        };
    };
}

export class aviaoComercial extends Aeronave {
    #nomeCia;

    get nomeCia() { return this.#nomeCia; };

    constructor(velocidade, auto, cia) {
        validate(arguments, ["number", "number", "string"]);
        super(velocidade, auto);
        if (cia.length < 3) {
            this.#nomeCia = "x";
            this.idAeronave = "Inválido";
            Aeronave.idGen--;
        } else {
            this.#nomeCia = cia;
        };
    };

    toString() {
        let str = ``;
        if (this.#nomeCia === "x") {
            str = "Companhia aérea inválida.\n";
            return str;
        } else {
            return super.toString() + `Nome da companhia aérea: ${this.#nomeCia}\n`;
        };
    };
}

export class aviaoPassageiro extends aviaoComercial {
    #limite;
    #tipo = "Aeronave comercial de passageiros";

    get limite() { return this.#limite; };
    get tipo() { return this.#tipo; };

    constructor(velocidade, auto, cia, limite) {
        validate(arguments, ["number", "number", "string", "number"]);
        super(velocidade, auto, cia);
        if (limite < 250 || limite > 500) {
            this.idAeronave = "Inválido";
            this.#limite = -1;
            Aeronave.idGen--;
        } else {
            this.#limite = limite;
        };
    };

    toString() {
        let str = ``;
        if (this.#limite === -1) {
            str = "O limite de pessoas é inválido.\n";
            return str;
        } else {
            if (this.nomeCia === "x") {
                str = "Companhia aérea inválida.\n";
                return str;
            } else {
                return super.toString() + `Tipo: ${this.#tipo}, Limite de pessoas: ${this.#limite} pessoas\n`;
            };
        };
    };
}

export class aviaoCarga extends aviaoComercial {
    #carga;
    #tipo = "Aeronave comercial de carga";

    get carga() { return this.#carga; };
    get tipo() { return this.#tipo; };

    constructor(velocidade, auto, cia, carga) {
        validate(arguments, ["number", "number", "string", "number"]);
        super(velocidade, auto, cia);
        if (carga < 1000) {
            this.idAeronave = "Inválido";
            this.#carga = -1;
            Aeronave.idGen--;
        } else {
            this.#carga = carga;
        };
    };

    toString() {
        let str = ``;
        if (this.#carga === -1) {
            str = "O limite de carga do aviao é inválido.\n";
            return str;
        } else {
            if (this.nomeCia === "x") {
                str = "Companhia aérea inválida.\n";
                return str;
            } else {
                return super.toString() + `Tipo: ${this.#tipo}, Limite de carga: ${this.#carga} Kg\n`;
            }

        };
    };
}

export class ServicoAeronaves {

    listarAeronaves() {
        for (let a of aeronaves) {
            console.log(a.toString());
        }
    };
}
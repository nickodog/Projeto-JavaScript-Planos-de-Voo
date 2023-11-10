import { validate } from 'bycontract';
import { pilotos } from './projetoparte2.js';

export class Piloto {
    #matricula;
    #nome;
    #carteira;
    static #mGen = 0;

    get nome() { return this.#nome; };
    get carteira() { return this.#carteira; };
    get matricula() { return this.#matricula; };

    constructor(nome, carteira) {
        validate(arguments, ["string", "number"]);
        this.#nome = nome;
        if (carteira === 1) {
            this.#carteira = true;
            Piloto.#mGen++;
            this.#matricula = Piloto.#mGen;
        }else{
            this.#carteira = false;
            Piloto.#mGen++;
            this.#matricula = Piloto.#mGen;
        };
    }

    toString() {
        let str = ``;
        if (this.#carteira === false) {
            str = `Matrícula: ${this.#matricula}, Habilitação: Inativa.\n`;
            return str;
        } else {
            str = `Matrícula: ${this.#matricula}, Nome do Piloto: ${this.#nome}, Habilitação: Ativa\n`;
            return str;
        };
    };
}
export class ServicoPilotos {
    recupera(matricula) {
        for (let p of pilotos) {
            if (matricula === p.matricula) {
                if (p.carteira === false){
                    return(console.log("Piloto inadmissível."));
                }else{
                    return(console.log(p.toString()));
                };
            }else{
                continue;
            }
        }
        return(console.log("Não há resultados."))
    };

    listarPilotos() {
        for (let p of pilotos) {
                console.log(p.toString());
            }
        };
    }


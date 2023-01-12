import { Parse } from "../DAO/http-common";

class Impiegato {
    nome: string;
    chip: string;
    id: string; 

    constructor(impiegato: Parse.Object<Parse.Attributes>);
    constructor(
        nome: string,
        chip: string,
        id?: string,
        )
    constructor(...args: any[]) {
        if(args.length == 1 && typeof args[0] != 'string'){
            this.nome = args[0].get('nome')
            this.chip = args[0].get('chip')
            this.id = args[0].id
        }else {
            this.nome = args[0];
            this.chip = args[1]
            this.id = args[2];
        }
    }


  }

  export default Impiegato;
import { Parse } from "../DAO/http-common";

class Macchina {
    nome: string;
    id: string; 

    constructor(machina: Parse.Object<Parse.Attributes>);
    constructor(
        nome: string,
        id?: string,
        )
    constructor(...args: any[]) {
        if(args.length == 1 && typeof args[0] != 'string'){
            this.nome = args[0].get('nome')
            this.id = args[0].id
        }else {
            this.nome = args[0];
            this.id = args[1];
        }
    }


  }

  export default Macchina;
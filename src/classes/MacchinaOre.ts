import { Parse } from "../DAO/http-common";

class MacchinaOre {
    nome: string;
    ore: number;
    id: string; 

    constructor(machina: Parse.Object<Parse.Attributes>);
    constructor(
        nome: string,
        ore: number,
        id?: string,
        )
    constructor(...args: any[]) {
        if(args.length == 1 && typeof args[0] != 'string'){
            this.nome = args[0].get('nome')
            this.ore = args[0].get('ore')
            this.id = args[0].id
        }else {
            this.nome = args[0];
            this.ore = args[1];
            this.id = args[2];
        }
    }


  }

  export default MacchinaOre;
import { Parse } from "../DAO/http-common";
import MacchinaOre from "./MacchinaOre";

class Articolo {
    totPreventivo: string;
    totOre: string;
    oreMacchina: MacchinaOre[];
    numDisegno: string;
    numPezzi: string;
    costMat: string;
    costoOrario: string;
    id: string; 


    constructor(commessa: Parse.Object<Parse.Attributes>);
    constructor(
        totPreventivo: string,
        totOre: string,
        oreMacchina: MacchinaOre[],
        numDisegno: string,
        numPezzi: string,
        costMat: string,
        costoOrario: string,
        id?: string, 
        )
    constructor(...args: any[]) {
        if(args.length == 1){
            this.totPreventivo = args[0].get('totPreventivo')
            this.totOre = args[0].get('totOre')
            this.oreMacchina = args[0].get('oreMacchina')
            this.numDisegno = args[0].get('numDisegno')
            this.numPezzi = args[0].get('numPezzi')
            this.costMat = args[0].get('costMat')
            this.costoOrario = args[0].get('costoOrario')
            this.id = args[0].id
        }else {
            this.totPreventivo = args[0];
            this.totOre = args[1];
            this.oreMacchina = args[2];
            this.numDisegno = args[3];
            this.numPezzi = args[4];
            this.costMat = args[5];
            this.costoOrario = args[6];
            this.id = args[7];
        }
    }

  }

  export default Articolo;
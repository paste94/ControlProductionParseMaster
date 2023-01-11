import { Parse } from "../DAO/http-common";

class Commessa {
    nome: string;
    numero: string;
    data_offerta: Date;
    data_consegna: Date;
    id: string; 
    chiusa: boolean = false;
    totPreventivo: number = 0;
    totOre: number = 0;
    // _preventivo: any[]
    archiviata: boolean = false;
    minutiReali: number = 0;

    constructor(commessa: Parse.Object<Parse.Attributes>);
    constructor(
        nome: string,
        numero: string,
        data_offerta: Date,
        data_consegna: Date,
        id?: string,
        chiusa?: boolean,
        totPreventivo?: number,
        totOre?: number,
        //preventivo: any[],
        archiviata?: boolean,
        minutiReali?: number,
        )
    constructor(...args: any[]) {
        if(args.length == 1){
            this.nome = args[0].get('nome')
            this.numero = args[0].get('numero')
            this.data_offerta = args[0].get('data_offerta')
            this.data_consegna = args[0].get('data_consegna')
            this.id = args[0].id,
            this.chiusa = args[0].get('chiusa') ?? false
            this.totPreventivo = args[0].get('totPreventivo') ?? 0
            this.totOre = args[0].get('totOre') ?? 0
            // this._preventivo = args[0].get('preventivo')
            this.archiviata = args[0].get('archiviata') ?? false
            this.minutiReali = args[0].get('minutiReali') ?? 0
        }else {
            //console.log(args)
            this.nome = args[0];
            this.numero = args[1];
            this.data_offerta = args[2];
            this.data_consegna = args[3];
            this.id = args[4];
            this.chiusa = args[5] ?? false;
            this.totPreventivo = args[6] ?? 0;
            this.totOre = args[7] ?? 0;
            //this._preventivo = args[7]
            this.archiviata = args[8] ?? false;
            this.minutiReali = args[9] ?? 0;
        }
    }

    get data_consegna_string(): string {
        return this.data_consegna.toISOString()
    }

    get data_offerta_string(): string {
        return this.data_offerta.toISOString()
    }

    set data_offerta_string(newVal:string) {
        this.data_offerta = new Date(newVal)
    }

    set data_consegna_string(newVal:string) {
        this.data_offerta = new Date(newVal)
    }

    /*

    set id(id: string) {
        this.id = id;
    }
    get id() : string {
        return this.id ?? "";
    }

    get nome() : string {
        return this._nome;
    }

    get numero() : string {
        return this._numero;
    }

    get data_offerta() : string {
        return this._data_offerta;
    }

    get data_consegna() : string {
        return this._data_consegna;
    }

    get chiusa() : boolean {
        return this.chiusa;
    }

    get totPreventivo() : number {
        return this.totPreventivo;
    }

    get totOre() : number {
        return this.totOre;
    }

    /*
    get preventivo() : any {
        return this._preventivo;
    }
    

    get archiviata() : boolean {
        return this.archiviata;
    }
    
    get minutiReali() : number {
        return this.minutiReali;
    }

    set id(id: string) {
        this.id = id;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    set numero(numero: string) {
        this._numero = numero;
    }

    set data_offerta(data_offerta: string) {
        this._data_offerta = data_offerta;
    }

    set data_consegna(data_consegna: string) {
        this._data_consegna = data_consegna;
    }

    set chiusa(chiusa: boolean) {
        this.chiusa = chiusa;
    }

    set totPreventivo(totPreventivo: number) {
        this.totPreventivo = totPreventivo;
    }

    set totOre(totOre: number) {
        this.totOre = totOre;
    }

    /*
    set preventivo(preventivo: any) {
        this._preventivo = preventivo;
    }
    

    set archiviata(archiviata: boolean) {
        this.archiviata = archiviata;
    }
    
    set minutiReali(minutiReali: number) {
        this.minutiReali = minutiReali;
    }
    */

  }

  export default Commessa;
class Commessa {
    private _id: string;
    private _nome: string;
    private _numero: string;
    private _data_offerta: Date;
    private _data_consegna: Date;
    private _chiusa: boolean;
    private _totPreventivo: number;
    private _totOre: number;
    private _preventivo: number;
    private _archiviata: boolean;
    private _minutiReali: number;
   
    constructor(
        id: string,
        nome: string,
        numero: string,
        data_offerta: Date,
        data_consegna: Date,
        chiusa: boolean,
        totPreventivo: number,
        totOre: number,
        preventivo: number,
        archiviata: boolean,
        minutiReali: number,
        ) {
            this._id = id;
            this._nome = nome;
            this._numero = numero;
            this._data_offerta = data_offerta;
            this._data_consegna = data_consegna;
            this._chiusa = chiusa;
            this._totPreventivo = totPreventivo;
            this._totOre = totOre;
            this._preventivo = preventivo;
            this._archiviata = archiviata;
            this._minutiReali = minutiReali;
    }

    
    public get id() : string {
        return this._id;
    }

    public get nome() : string {
        return this._nome;
    }

    public get numero() : string {
        return this._numero;
    }

    public get data_offerta() : Date {
        return this._data_offerta;
    }

    public get data_consegna() : Date {
        return this._data_consegna;
    }

    public get chiusa() : boolean {
        return this._chiusa;
    }

    public get totPreventivo() : number {
        return this._totPreventivo;
    }

    public get totOre() : number {
        return this._totOre;
    }

    public get preventivo() : number {
        return this._preventivo;
    }

    public get archiviata() : boolean {
        return this._archiviata;
    }
    
    public get minutiReali() : number {
        return this._minutiReali;
    }

    public set id(id: string) {
        this._id = id;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public set numero(numero: string) {
        this._numero = numero;
    }

    public set data_offerta(data_offerta: Date) {
        this._data_offerta = data_offerta;
    }

    public set data_consegna(data_consegna: Date) {
        this._data_consegna = data_consegna;
    }

    public set chiusa(chiusa: boolean) {
        this._chiusa = chiusa;
    }

    public set totPreventivo(totPreventivo: number) {
        this._totPreventivo = totPreventivo;
    }

    public set totOre(totOre: number) {
        this._totOre = totOre;
    }

    public set preventivo(preventivo: number) {
        this._preventivo = preventivo;
    }

    public set archiviata(archiviata: boolean) {
        this._archiviata = archiviata;
    }
    
    public set minutiReali(minutiReali: number) {
        this._minutiReali = minutiReali;
    }

  }
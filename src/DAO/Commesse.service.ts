import { LiveQuerySubscription } from 'parse';
import Commessa from '../classes/Commessa';
import {commesse, Parse} from './http-common';
import callbackExec from '../utils/callbackExec';

let subscription: LiveQuerySubscription;

/**
 * Ottiene la subscription alle commesse
 * @param callback callback per successo che prende come parametro i dati ottenuti
 * @param errorCallback Callback di notifica dell'errore.
 */
async function subscribeCommesse(callback: (data: Array<Commessa>) => void, errorCallback?: (msg: string) => void) {
    const query = new Parse.Query(commesse);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        getAllCommesse(callback, errorCallback)
    })

    subscription.on('create', () => {
        getAllCommesse(callback, errorCallback);
    });

    subscription.on('update', () => {
        getAllCommesse(callback, errorCallback);
    });

    subscription.on('enter', () => {
        getAllCommesse(callback, errorCallback);
    });

    subscription.on('leave', () => {
        getAllCommesse(callback, errorCallback);
    });

    subscription.on('delete', () => {
        getAllCommesse(callback, errorCallback);
    });

    Parse.LiveQuery.on('error', (error :any) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
async function unsubscribeCommesse():Promise<void> {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutte le commesse dal database
 * @param callback callback per successo che prende come parametro i dati ottenuti
 * @param errorCallback Callback di notifica dell'errore.
 */
async function getAllCommesse(callback: (data: Array<Commessa>) => void, errorCallback?: (msg: string) => void): Promise<void> {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .notEqualTo('archiviata', true)
        .find()
        .then((result :any) => {
            const data: Commessa[] = []
            result.forEach((elem: Parse.Object<Parse.Attributes>) => {
                data.push(new Commessa(elem))
            })
            callback(data)
        }, 
        err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Trova la commessa dato un certo ID
 * @param objectId l'Id della commessa
 * @param callback Callback che restituisce la commessa cercata
 * @param errorCallback Callback di notifica dell'errore.
 */
function getCommessa(objectId:string, callback:(comm: Commessa) => void, errorCallback?:(msg: string) => void): void {
    const commessa = new Parse.Query(commesse)
    commessa.get(objectId).then(
        elem => callback(new Commessa(
            elem.get('nome'),
            elem.get('numero'),
            elem.get('data_offerta'),
            elem.get('data_consegna'),
            elem.id,
            elem.get('chiusa'),
            elem.get('totPreventivo'),
            elem.get('totOre'),
            elem.get('archiviata'),
            elem.get('minutiReali'),
        )),
        err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Aggiunge una commesssa al database
 * @param newCommessa la commessa da aggiungere
 * @param callback Callback per il successo, usato per aprire la nuova pagina di commessa singola appena creata
 * @param errorCallback Callback di notifica dell'errore.
 */
function addCommessa(newCommessa:Commessa, callback:(commessaId: string) => void, errorCallback?:(msg: string) => void): void {
    const commessa = new Parse.Object(commesse)
    let property: keyof typeof newCommessa; // Specifica quali sono le property della commessa
    for (property in newCommessa){
        commessa.set(property, newCommessa[property])
    }
    commessa.save().then(
        elem => callback(elem.id),
        err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param id identificativo della commessa
 * @param successCallback Callback di notifica dell'avvenuta operazione.
 * @param errorCallback Callback di notifica dell'errore.
 */
function deleteCommessa(id: string, successCallback?: (msg: string) => void, errorCallback?: (msg: string) => void): void {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => {
                const e: any = elem.set('eliminato', true)
                e.save().then(
                    () => callbackExec(`Commessa eliminata con successo`, successCallback),
                    (err: any) => callbackExec(`ERRORE: ${err.message}`, errorCallback),
                    )
            },
            err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Archivia la commessa con ID selezionato.
 * L'elemento viene archiviato impostando un flag 'archiviato' a true
 * @param id identificativo della commessa
 * @param successCallback Callback di notifica dell'avvenuta operazione.
 * @param errorCallback Callback di notifica dell'errore.
 */
 function archiveCommessa(id:string, successCallback?:(msg: string) => void, errorCallback?:(msg: string) => void): void {
    Parse.Cloud.run('archiviaCommessa', {'id': id})
    .then(
        () => callbackExec(`Commessa archiviata con successo`, successCallback),
        err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Aggiorna un campi della commessa
 * @param id id della commessa da modificare
 * @param successCallback Callback di notifica dell'avvenuta operazione.
 * @param errorCallback Callback di notifica dell'errore.
 * @param newVal Oggetto {key: value} dove _key_ è il campo da modificare e _value_ è il nuovo valore
 */
function updateCommessa(id:string, newVal:{[key: string]: any}, successCallback?:(msg: string) => void, errorCallback?:(msg: string) => void): void {
    const [key] = Object.keys(newVal)
    const query = new Parse.Query(commesse)

    newVal[key] = (key === 'data_offerta' || key === 'data_consegna') ?
        new Date(newVal[key]) :
        newVal[key]
    if (newVal[key] != 'Invalid Date') {
        query.get(id)
        .then(
            elem => {
                const e: any = elem.set( key, newVal[key] )
                e.save().then(
                    () => callbackExec(`Commessa modificata con successo`, successCallback),
                    (err: any) => callbackExec(`ERRORE: ${err.message}`, errorCallback),
                )
            },
            err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
    }
}

/**
 * Clona commessa
 * @param id id della commessa da clonare
 * @param {object} newCommessa nuova commessa da creare (con nuovo nome, numero e date)
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function cloneCommessa(id:string, newCommessa:Commessa, successCallback?:Function, errorCallback?:Function) {
    const c = {
        'commessaId': id,
        'nome': newCommessa.nome,
        'numero': newCommessa.numero,
        'data_offerta': newCommessa.data_offerta,
        'data_consegna': newCommessa.data_consegna,
    }
    Parse.Cloud.run('cloneCommessa', c)
        .then(
            elem => callbackExec( `Commessa ${newCommessa.numero} copiata con successo` , successCallback),
            err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

export {
    addCommessa,
    deleteCommessa,
    updateCommessa,
    subscribeCommesse,
    unsubscribeCommesse,
    archiveCommessa,
    cloneCommessa,
    getCommessa,
};

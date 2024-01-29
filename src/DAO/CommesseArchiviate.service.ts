import { LiveQuerySubscription } from 'parse';
import { deleteCommessa } from './Commesse.service';
import {commesse, Parse} from './http-common';
import Commessa from '../classes/Commessa';
import callbackExec from '../utils/callbackExec';

let subscription: LiveQuerySubscription;

/**
 * Ottiene la subscription alle commesse
 * @param {Function} callback callback per successo che prende come parametro i dati ottenuti
 * @param {Function} callbackError callback per errore.
 */
async function subscribeCommesseArchiviate(
        callback: (data: Array<Commessa>) => void, 
        callbackError?: (msg: string) => void,
    ) {
    const query = new Parse.Query(commesse);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        getAllCommesseArchiviate(callback, callbackError)
    })

    subscription.on('create', (object) => {
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('update', (object) => {
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        getAllCommesseArchiviate(callback, callbackError);
    });

    Parse.LiveQuery.on('error', (error) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
async function unsubscribeCommesseArchiviate(): Promise<void> {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutte le commesse dal database
 * @param {Function} callback callback per successo che prende come parametro i dati ottenuti
 * @param {Function} callbackError callback per errore.
 */
async function getAllCommesseArchiviate(
        callback: (data: Array<Commessa>) => void, 
        callbackError?: (msg: string) => void,
    ): Promise<void> {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .equalTo('archiviata', true)
        .find()
        .then((result:any) => {
            const data: Commessa[] = []
            result.forEach((elem: Parse.Object<Parse.Attributes>) => {
                data.push(new Commessa(elem))            
            })
            callback(data)
        })
        .catch(
            (err: any) => callbackExec(err.message, callbackError),
        )
}

/**
 * Disarchivia la commessa con ID selezionato.
 * L'elemento viene archiviato impostando un flag 'archiviato' a true
 * @param {string} id identificativo della macchina
 * @param {Function} successCallback funzione da eseguire nel caso di successo
 * @param {Function} errorCallback funzione da eseguire nel caso di errore
 */
function unarchiveCommessa(
    id: string, 
    successCallback?: (msg: string) => void, 
    errorCallback?: (msg: string) => void,
): void {
    Parse.Cloud.run('disarchiviaCommessa', {'id': id})
    .then(() => callbackExec(`Commessa archiviata con successo`, successCallback))
    .catch((err: any) => callbackExec('ERRORE:' + err.message, errorCallback))
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function deleteCommessaArchiviata(id: string, successCallback?: (msg: string) => void, errorCallback?: (msg: string) => void): void {
    deleteCommessa(id, successCallback, errorCallback)
}

export {
    deleteCommessaArchiviata,
    subscribeCommesseArchiviate,
    unsubscribeCommesseArchiviate,
    unarchiveCommessa,
};

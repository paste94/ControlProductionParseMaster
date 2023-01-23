import { LiveQuerySubscription } from 'parse';
import {articoli, Parse} from './http-common';
import Articolo from '../classes/Articolo';
import callbackExec from '../utils/callbackExec';

let subscription: LiveQuerySubscription;

/**
 * Ottiene la subscription agli articoli
 * @param {function} callback callback per successo.
 * @param {function} errorCallback callback per errore.
 */
async function subscribeArticoli(callback: (data: Array<Articolo>) => void, errorCallback?: (msg: string) => void) {
    const query = new Parse.Query(articoli);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        // console.log('articoli opened');
        getAllArticoli(callback, errorCallback)
    })

    subscription.on('create', () => {
        // console.log('Articoli created: ', object);
        getAllArticoli(callback, errorCallback);
    });

    subscription.on('update', () => {
        // console.log('Articoli updated', object);
        getAllArticoli(callback, errorCallback);
    });

    subscription.on('enter', () => {
        // console.log('Articoli entered', object);
        getAllArticoli(callback, errorCallback);
    });

    subscription.on('leave', () => {
        // console.log('Articoli left', object);
        getAllArticoli(callback, errorCallback);
    });

    subscription.on('delete', () => {
        // console.log('Articoli deleted', object);
        getAllArticoli(callback, errorCallback);
    });

    subscription.on('close', () => {
        // console.log('subscription Articoli closed');
    });

    Parse.LiveQuery.on('error', (error) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
async function unsubscribeArticoli():Promise<void> {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutti gli articoli dal DB
 * @param {function} callback Cosa eseguire quando i dati sono stati ottenuti
 * @param {function} errorCallback Funzione di callback per l'errore
 */
function getAllArticoli(callback: (data: Array<Articolo>) => void, errorCallback?: (msg: string) => void) {
    new Parse.Query(articoli)
        .notEqualTo('eliminato', true)
        .find()
        .then(
            (result: any) => {
                const data: Articolo[] = []
                result.forEach((elem: Parse.Object<Parse.Attributes>) => {
                    data.push(new Articolo(elem))
                })
                callback(data)
            },
            err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Aggiunge un articolo al DB
 * @param {Articolo} newArticolo L'articolo da aggiungere al DB
 * @param {function} callback
 * @param {function} errorCallback
 */
function addArticolo(newArticolo: Articolo, callback: (articoloId: string) => void, errorCallback?:(msg: string) => void): void {
    const commessa = new Parse.Object(articoli)
    let property: keyof typeof newArticolo; // Specifica quali sono le property della commessa
    for (property in newArticolo){
        commessa.set(property, newArticolo[property])
    }
    commessa.save().then(
        elem => callback(elem.id),
        err => callbackExec(`ERRORE: ${err.message}`, errorCallback),
        )
}

/**
 * Elimina un articolo dato l'ID
 * @param {String} id L'ID dell'articolo
 */
function deleteArticolo(id: string, successCallback?: (msg: string) => void, errorCallback?: (msg: string) => void) {
    new Parse.Query(articoli)
        .get(id)
        .then(
            elem => {
                const e: any = elem.set('eliminato', true)
                e.save().then(
                    () => callbackExec(`Articolo eliminato con successo`, successCallback),
                    (err: any) => callbackExec(`ERRORE: ${err.message}`, errorCallback),
                    )
            })
        .catch(error => console.error('ERRORE:', error.message))
}

/**
 * Modifica l'articolo dato l'ID
 * @param {String} artId L'ID dell'articolo da modificare
 * @param {Articolo} newArticolo L'articolo nuovo
 * @param {function} callback funzione di callback di successo
 */
function updateArticolo(artId: string, newArticolo: Articolo, callback: () => void, errorCallback?: (msg: string) => void) {
    new Parse.Query(articoli)
        .get(artId)
        .then(
            elem => {
                Object
                    .keys(newArticolo)
                    // @ts-ignore
                    .forEach( (key: string) => elem.set(key, newArticolo[key]) )
                elem.save().then(() => callback())
            },
            (err: any) => callbackExec(`ERRORE: ${err.message}`, errorCallback)
            )
}

export {
    addArticolo,
    deleteArticolo,
    updateArticolo,
    getAllArticoli,
    subscribeArticoli,
    unsubscribeArticoli,
}

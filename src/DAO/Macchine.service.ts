import { LiveQuerySubscription } from 'parse';
import { macchine, Parse} from './http-common';
import Macchina from '../classes/Macchina';

let subscription: LiveQuerySubscription;

/**
 * Ottiene la subscription alle macchine
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribeMacchine(callback: Function, callbackError: Function) {
    const query = new Parse.Query(macchine);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        // console.log('Macchine opened');
        getAllMacchine(callback, callbackError)
    })

    subscription.on('create', (object) => {
        // console.log('macchina created: ', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('update', (object) => {
        // console.log('macchina updated', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        // console.log('macchina entered', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        // console.log('macchina left', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        // console.log('macchina deleted', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('close', () => {
        // console.log('subscription macchina closed');
    });

    Parse.LiveQuery.on('error', (error) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
 async function unsubscribeMacchine() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}


/**
 * Ottiene tutte le macchine dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function getAllMacchine(callback: Function, callbackError: Function) {
    new Parse.Query(macchine)
        .notEqualTo('eliminato', true)
        .find()
        .then( result => {
            const data: Macchina[] = []
            result.forEach((elem: Parse.Object<Parse.Attributes>) => {
                data.push(new Macchina(elem))
            })
            callback(data)
        }, (error) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })
}

/** Aggiunge una nuova macchina al database
 *
 * @param {Macchina} newMacchina la macchina da aggiungere
 * @param {function} callback callback per successo.
 */
 function addMacchina(newMacchina: Macchina, successCallback: Function, errorCallback: Function) {
    const macchina = new Parse.Object(macchine);
    let property: keyof typeof newMacchina; // Specifica quali sono le property dell'oggetto
    for (property in newMacchina){
        macchina.set(property, newMacchina[property])
    }
    macchina.save().then(
        elem => successCallback(elem.id),
        err => errorCallback(err.message),
    )
}

/**
 * Elimina la macchina con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 */
function deleteMacchina(id: string, successCallback: Function, errorCallback: Function) {
    new Parse.Query(macchine)
        .get(id)
        .then(
            elem => {
                const e: any = elem.set('eliminato', true)
                e.save().then(
                    () => successCallback(`Macchina ${elem.attributes.nome} eliminata con successo`),
                    (error:any) => errorCallback(error.message)
                )
            },
            error => console.error('ERRORE:', error.message),
        )
}

// TODO: Function update macchina (se fattibile)

export {subscribeMacchine, getAllMacchine, addMacchina, deleteMacchina, unsubscribeMacchine};

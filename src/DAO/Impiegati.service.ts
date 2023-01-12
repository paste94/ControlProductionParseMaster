import { LiveQuerySubscription } from 'parse';
import { impiegati, Parse} from './http-common';
import Impiegato from '../classes/Impiegato';

let subscription: LiveQuerySubscription;

/**
 * Ottiene la subscription agli impiegati
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribeImpiegati(callback: Function, callbackError: Function) {
    const query = new Parse.Query(impiegati);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        // console.log('Impiegati opened');
        getAllImpiegati(callback, callbackError)
    })

    subscription.on('create', (object) => {
        // console.log('impiegato created: ', object);
        getAllImpiegati(callback, callbackError);
    });

    subscription.on('update', (object) => {
        // console.log('impiegato updated', object);
        getAllImpiegati(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        // console.log('impiegato entered', object);
        getAllImpiegati(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        // console.log('impiegato left', object);
        getAllImpiegati(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        // console.log('impiegato deleted', object);
        getAllImpiegati(callback, callbackError);
    });

    subscription.on('close', () => {
        // console.log('subscription impiegato closed');
    });

    Parse.LiveQuery.on('error', (error) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
 async function unsubscribeImpiegati() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/** Ottiene tutti gli impiegati dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function getAllImpiegati(callback: Function, callbackError: Function) {
    new Parse.Query(impiegati)
        .notEqualTo('eliminato', true)
        .find()
        .then(
            result => {
                const data: Impiegato[] = []
                result.forEach(elem => data.push(new Impiegato(elem))
                )
                callback(data)
            },
            error => {
                console.error(error)
                callbackError(error.message)
            })
}

/** Aggiunge un nuovo impiegato al database
 *
 * @param {Impiegato} newImpiegato l'impiegato da aggiungere
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function addImpiegato(newImpiegato:Impiegato, successCallback: Function, errorCallback: Function) {
    const impiegato = new Parse.Object(impiegati)

    let property: keyof typeof newImpiegato; // Specifica quali sono le property dell'oggetto
    for (property in newImpiegato){
        impiegato.set(property, newImpiegato[property])
    }

    impiegato.save().then(
        elem => successCallback(`Impiegato ${elem.attributes.nome} creato con successo`),
        err => errorCallback('ERROR: ', err),
    )
}

/** Elimina l'impiegato selezionato
 *
 * @param {String} id ID dell'impiegato da eliminare.
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function deleteImpiegato(id:string, successCallback:Function, errorCallback:Function) {
    new Parse.Query(impiegati)
        .get(id)
        .then(
            elem => {
                const e: any = elem.set('eliminato', true)
                e.set('eliminato', true)
                    .save().then(
                        () => successCallback(`Impiegato ${elem.attributes.nome} rimosso con successo`),
                        (err:any) => errorCallback(err.message))
            })
}

/** Modifica un campo dell'impiegato
 *
 * @param {String} id ID dell'impiegato da modificare
 * @param {Impiegato} newVal Oggetto che indica {nome_parametro : nuovo_valore}
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function updateImpiegato(id:string, newVal:any, successCallback:Function, errorCallback:Function) {
    const [key] = Object.keys(newVal)
    new Parse.Query(impiegati)
        .get(id)
        .then( elem => {
            const e: any = elem.set( key, newVal[key] )
            e.save().then(
                () => successCallback(`Impiegato modificato con successo`),
                (err:any) => errorCallback('ERRORE:', err.message)
            )
        },
        (err:any) => errorCallback('ERRORE:', err.message))
}

export {
    getAllImpiegati,
    addImpiegato,
    deleteImpiegato,
    updateImpiegato,
    subscribeImpiegati,
    unsubscribeImpiegati,
};

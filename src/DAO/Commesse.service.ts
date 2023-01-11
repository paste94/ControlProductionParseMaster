import Commessa from '../classes/Commessa';
import {commesse, Parse} from './http-common';

let subscription: any;

/**
 * Ottiene la subscription alle commesse
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function subscribeCommesse(callback: Function, callbackError: Function) {
    const query = new Parse.Query(commesse);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        // console.log('commesse opened');
        getAllCommesse(callback, callbackError)
    })

    subscription.on('create', () => {
        // console.log('commesse created: ', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('update', () => {
        // console.log('commesse updated', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('enter', () => {
        // console.log('commesse entered', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('leave', () => {
        // console.log('commesse left', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('delete', () => {
        // console.log('commesse deleted', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('close', () => {
        // console.log('subscription commesse closed');
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
        console.log('COMMESSE UNSUBSCRIBED')
    }
}

/**
 * Ottiene tutte le commesse dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function getAllCommesse(callback :Function, callbackError :Function) {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .notEqualTo('archiviata', true)
        .find()
        .then((result :any) => {
            const data: Commessa[] = []
            console.log(result)
            result.forEach((elem: Parse.Object<Parse.Attributes>) => {
                data.push(new Commessa(
                    elem.get('nome'),
                    elem.get('numero'),
                    elem.get('data_offerta'),
                    elem.get('data_consegna'),
                    elem.id,
                    elem.get('chiusa'),
                    elem.get('totPreventivo'),
                    elem.get('totOre'),
                    //elem.get('preventivo'),
                    elem.get('archiviata'),
                    elem.get('minutiReali'),
                ))
            })
           callback(data)
        }, (error:any) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })
}

/**
 * Trova la commessa dato un certo ID
 * @param {String} objectId l'Id della commessa
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function getCommessa(objectId:string, successCallback:Function, errorCallback:Function) {
    const commessa = new Parse.Query(commesse)
    commessa.get(objectId).then(
        elem => successCallback(new Commessa(
            elem.get('nome'),
            elem.get('numero'),
            elem.get('data_offerta'),
            elem.get('data_consegna'),
            elem.id,
            elem.get('chiusa'),
            elem.get('totPreventivo'),
            elem.get('totOre'),
            //elem.get('preventivo'),
            elem.get('archiviata'),
            elem.get('minutiReali'),
        )),
        err => errorCallback(err.message),
    )
}

/**
 * Aggiunge una commesssa al database
 * @param {Commessa} newCommessa la commessa da aggiungere,
 *                      campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function addCommessa(newCommessa:Commessa, successCallback:Function, errorCallback:Function) {
    const commessa = new Parse.Object(commesse)
    let property: keyof typeof newCommessa; // Specifica quali sono le property della commessa
    for (property in newCommessa){
        commessa.set(property, newCommessa[property])
    }
    commessa.save().then(
        elem => successCallback(elem.id),
        err => errorCallback(err.message),
    )
    
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function deleteCommessa(id: string, successCallback: Function, errorCallback: Function) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => {
                const e: any = elem.set('eliminato', true)
                e.save().then(
                    () => successCallback(`Commessa ${elem.attributes.numero} eliminata con successo`),
                    (error:any) => errorCallback(error.message),
                )
            },
            error => errorCallback(error.message),
        )
}

/**
 * Archivia la commessa con ID selezionato.
 * L'elemento viene archiviato impostando un flag 'archiviato' a true
 * @param {int} id identificativo della macchina
 * @param {function} successCallback
 * @param {function} errorCallback
 */
 function archiveCommessa(id:string, successCallback:Function, errorCallback:Function) {
    Parse.Cloud.run('archiviaCommessa', {'id': id})
    .then(
        () => successCallback( `Commessa archiviata con successo` ),
        err => errorCallback('ERRORE:', err.message),
    )
}

/**
 * Aggiorna un campi della commessa
 * @param {int} id id dell'elemento da modificare
 * @param {Object} newVal Oggetto {key: value} dove
 *                 key_ è il campo da modificare e _value_ è il nuovo valore
 * @param {function} callback callback per successo
 */
function updateCommessa(id:string, newVal:any) {
    const [key] = Object.keys(newVal)
    const query = new Parse.Query(commesse)
    console.log(key)
    newVal[key] = (key === 'data_offerta' || key === 'data_consegna') ?
        new Date(newVal[key]) :
        newVal[key]
    if (newVal[key] != 'Invalid Date') {
        query.get(id)
        .then(
            elem => {
                const e: any = elem.set( key, newVal[key] )
                e.save().catch((err:any) => console.error('ERRORE: ', err.message))
            },
            error => console.error('ERRORE:', error.message),
        )
    }
}

/**
 * Clona commessa
 * @param {string} id id della commessa da clonare
 * @param {object} newCommessa nuova commessa da creare (con nuovo nome, numero e date)
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function cloneCommessa(id:string, newCommessa:Commessa, successCallback:Function, errorCallback:Function) {
    const c = {
        'commessaId': id,
        'nome': newCommessa.nome,
        'numero': newCommessa.numero,
        'data_offerta': newCommessa.data_offerta,
        'data_consegna': newCommessa.data_consegna,
    }
    Parse.Cloud.run('cloneCommessa', c)
        .then(
            elem => successCallback( `Commessa ${newCommessa.numero} copiata con successo` ),
            err => errorCallback('ERRORE:', err.message),
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

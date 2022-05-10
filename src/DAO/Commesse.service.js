import {commesse, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription alle commesse
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function subscribeCommesse(callback, callbackError) {
    const query = new Parse.Query(commesse);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('commesse opened');
        getAllCommesse(callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('commesse created: ', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('commesse updated', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('commesse entered', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('commesse left', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('commesse deleted', object);
        getAllCommesse(callback, callbackError);
    });

    subscription.on('close', () => {
        console.log('subscription commesse closed');
    });

    Parse.LiveQuery.on('error', (error) => {
        console.log(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
async function unsubscribeCommesse() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutte le commesse dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function getAllCommesse(callback, callbackError) {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .notEqualTo('archiviata', true)
        .find()
        .then((result) => {
            const data = []
            result.forEach(elem => {
                data.push({
                    id: elem.id,
                    nome: elem.get('nome') != undefined ? elem.get('nome') : '',
                    numero: elem.get('numero') != undefined ? elem.get('numero') : '',
                    data_offerta: elem.get('data_offerta') != undefined ? elem.get('data_offerta').toISOString() : '',
                    data_consegna: elem.get('data_consegna') != undefined ? elem.get('data_consegna').toISOString() : '',
                    chiusa: elem.get('chiusa') != undefined ? elem.get('chiusa') : '',
                    totPreventivo: elem.get('totPreventivo') != undefined ? elem.get('totPreventivo') : 0,
                    totOre: elem.get('totOre') != undefined ? elem.get('totOre') : 0,
                    preventivo: elem.get('preventivo') != undefined ? elem.get('preventivo') : '',
                    archiviata: elem.get('archiviata') != undefined ? elem.get('archiviata') : '',
                    minutiReali: elem.get('minutiReali') != undefined ? elem.get('minutiReali') : 0,
                })
            })
           callback(data)
        }, (error) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })
}

/**
 * Aggiunge una commesssa al database
 * @param {Commessa} newCommessa la commessa da aggiungere,
 *                      campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function addCommessa(newCommessa, successCallback, errorCallback) {
    const commessa = new Parse.Object(commesse)
    Object
        .keys(newCommessa)
        .forEach( key => commessa.set(key, newCommessa[key]) )
    commessa.save().then(
        elem => successCallback(`Commessa ${elem.attributes.numero} aggiunta con successo`),
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
function deleteCommessa(id, successCallback, errorCallback) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => elem.
                set('eliminato', true).
                save().
                then(
                    () => successCallback(`Commessa ${elem.attributes.numero} eliminata con successo`),
                    error => callbackError(error.message),
                ),
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
 function archiveCommessa(id, successCallback, errorCallback) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => {
                elem.set('archiviata', true).save()
                successCallback(`Commessa ${elem.attributes.numero} archiviata con successo`)
            },
            error => errorCallback(error.message),
        )
}

/**
 * Aggiorna un campi della commessa
 * @param {int} id id dell'elemento da modificare
 * @param {Object} newVal Oggetto {key: value} dove
 *                 key_ è il campo da modificare e _value_ è il nuovo valore
 * @param {function} callback callback per successo
 */
function updateCommessa(id, newVal) {
    const [key] = Object.keys(newVal)
    const query = new Parse.Query(commesse)
    newVal[key] = (key === 'data_offerta' || key === 'data_consegna') ?
        new Date(newVal[key]) :
        newVal[key]
    if (newVal[key] != 'Invalid Date') {
        query.get(id)
        .then(
            elem => elem.set( key, newVal[key] ).save().catch((err) => console.error('ERRORE: ', err.message)),
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
function cloneCommessa(id, newCommessa, successCallback, errorCallback) {
    const c = {
        'commessaId': id,
        'nome': newCommessa.nome,
        'numero': newCommessa.numero,
        'data_offerta': new Date(newCommessa.data_offerta),
        'data_consegna': new Date(newCommessa.data_consegna),
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
};

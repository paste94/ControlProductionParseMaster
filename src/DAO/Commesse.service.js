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
                    preventivo: elem.get('preventivo') != undefined ? elem.get('preventivo') : '',
                    archiviata: elem.get('archiviata') != undefined ? elem.get('archiviata') : '',
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
 */
function addCommessa(newCommessa) {
    const commessa = new Parse.Object(commesse)
    Object
        .keys(newCommessa)
        .forEach( key => commessa.set(key, newCommessa[key]) )
    commessa.save().catch(err => console.err('ERROR: ', err))
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 */
function deleteCommessa(id) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => elem.set('eliminato', true).save(),
            error => console.error('ERRORE:', error.message),
        )
}

/**
 * Archivia la commessa con ID selezionato.
 * L'elemento viene archiviato impostando un flag 'archiviato' a true
 * @param {int} id identificativo della macchina
 */
 function archiveCommessa(id) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => elem.set('archiviata', true).save(),
            error => console.error('ERRORE:', error.message),
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

export {
    addCommessa,
    deleteCommessa,
    updateCommessa,
    subscribeCommesse,
    unsubscribeCommesse,
    archiveCommessa,
};

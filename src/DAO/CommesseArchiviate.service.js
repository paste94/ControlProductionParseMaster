import { deleteCommessa } from './Commesse.service';
import {commesse, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription alle commesse
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function subscribeCommesseArchiviate(callback, callbackError) {
    const query = new Parse.Query(commesse);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('commesse opened');
        getAllCommesseArchiviate(callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('commesse created: ', object);
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('commesse updated', object);
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('commesse entered', object);
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('commesse left', object);
        getAllCommesseArchiviate(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('commesse deleted', object);
        getAllCommesseArchiviate(callback, callbackError);
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
async function unsubscribeCommesseArchiviate() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutte le commesse dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function getAllCommesseArchiviate(callback, callbackError) {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .equalTo('archiviata', true)
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
                    archiviata: elem.get('archiviata') != undefined ? elem.get('archiviata') : false,
                })
            })
           callback(data)
        }, (error) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })
}

/**
 * Disarchivia la commessa con ID selezionato.
 * L'elemento viene archiviato impostando un flag 'archiviato' a true
 * @param {int} id identificativo della macchina
 */
 function unarchiveCommessa(id) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => elem.set('archiviata', false).save(),
            error => console.error('ERRORE:', error.message),
        )
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 */
function deleteCommessaArchiviata(id) {
    deleteCommessa(id)
}

export {
    deleteCommessaArchiviata,
    subscribeCommesseArchiviate,
    unsubscribeCommesseArchiviate,
    unarchiveCommessa,
};

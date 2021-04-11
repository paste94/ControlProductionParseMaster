import {commesse, Parse} from './http-common';

/**
 * Ottiene tutte le commesse dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function getAllCommesse(callback, callbackError) {
    new Parse.Query(commesse)
        .notEqualTo('eliminato', true)
        .find()
        .then((result) => {
            const data = []
            result.forEach(elem => {
                data.push({
                    id: elem.id,
                    nome: elem.get('nome'),
                    numero: elem.get('numero'),
                    data_offerta: elem.get('data_offerta').toISOString(),
                    data_consegna: elem.get('data_consegna').toISOString(),
                    chiusa: elem.get('chiusa'),
                    preventivo: elem.get('preventivo'),
                })
            })
           callback(data)
        }, (error) => {
            console.log('ERRORE:', error)
            callbackError(error.message)
        })
}

/**
 * Aggiunge una commesssa al database
 * @param {Commessa} newCommessa la commessa da aggiungere,
 *                      campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} callback callback per successo
 */
async function addCommessa(newCommessa, callback) {
    const commessa = new Parse.Object(commesse)
    Object
        .keys(newCommessa)
        .forEach( key => commessa.set(key, newCommessa[key]) )
    await commessa.save()
            .then(
                () => callback(),
                (error) => console.error('ERRORE:', error.message) )
}

/**
 * Elimina la commessa con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 * @param {function} callback callback per successo
 */
function deleteCommessa(id, callback) {
    new Parse.Query(commesse)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true)
                elem.save()
                callback()
            },
            error => console.error('ERRORE:', error.message) )
}

/**
 * Aggiorna un campi della commessa
 * @param {int} id id dell'elemento da modificare
 * @param {Object} newVal Oggetto {key: value} dove
 *                 key_ è il campo da modificare e _value_ è il nuovo valore
 * @param {function} callback callback per successo
 */
function updateCommessa(id, newVal, callback) {
    const [key] = Object.keys(newVal)
    const query = new Parse.Query(commesse)
    newVal[key] = (key === 'data_offerta' || key === 'data_consegna') ?
        new Date(newVal[key]) :
        newVal[key]
    query.get(id)
        .then(
            elem => elem
                .set( key, newVal[key] )
                .save()
                .then( () => callback() ),
            error => console.error('ERRORE:', error.message) )
}

export {
    getAllCommesse,
    addCommessa,
    deleteCommessa,
    updateCommessa,
};

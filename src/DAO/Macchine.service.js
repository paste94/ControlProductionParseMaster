import { macchine, Parse} from './http-common';

/**
 * Ottiene tutte le macchine dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function getAllMacchine(callback, callbackError) {
    new Parse.Query(macchine)
        .notEqualTo('eliminato', true)
        .find()
        .then( result => {
            const data = []
            result.forEach(elem => {
                data.push({
                    id: elem.id,
                    ...elem.attributes,
                })
            })
            callback(data)
        }, (error) => {
            console.log('ERRORE:', error)
            callbackError(error.message)
        })
}

/** Aggiunge una nuova macchina al database
 *
 * @param {Macchina} newMacchina la macchina da aggiungere
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 function addMacchina(newMacchina, callback, callbackError) {
    const macchina = new Parse.Object(macchine)
    Object.keys(newMacchina).forEach(
        key => macchina.set(key, newMacchina[key]))
    macchina
        .save()
        .then(
            callback,
            error => {
                console.error(error)
                callbackError('Database irraggiungibile')
            })
}

/**
 * Elimina la macchina con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 * @param {function} callback callback per successo
 * @param {function} errorCallback callback per errore
 */
function deleteMacchina(id, callback, errorCallback) {
    new Parse.Query(macchine)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true)
                    .save()
                    .then(callback)
            },
            error => {
                console.error('ERRORE:', error.message)
                errorCallback(error.message)
            })
}

export {getAllMacchine, addMacchina, deleteMacchina};

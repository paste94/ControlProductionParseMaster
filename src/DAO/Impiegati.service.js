import { impiegati, Parse} from './http-common';

/** Ottiene tutti gli impiegati dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function getAllImpiegati(callback, callbackError) {
    new Parse.Query(impiegati)
        .notEqualTo('eliminato', true)
        .find()
        .then(
            result => {
                const data = []
                result.forEach(elem => {
                    data.push({
                        id: elem.id,
                        ...elem.attributes,
                    })
                })
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
function addImpiegato(newImpiegato, callback, callbackError) {
    const impiegato = new Parse.Object(impiegati)
    Object.keys(newImpiegato).forEach(
        key => impiegato.set(key, newImpiegato[key]))
    impiegato.set('lavoriInCorso', [])
        .save()
        .then(
            callback,
            error => {
                console.error(error)
                callbackError(error.message)
            })
}

/** Elimina l'impiegato selezionato
 *
 * @param {String} id ID dell'impiegato da eliminare.
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function deleteImpiegato(id, callback, callbackError) {
    new Parse.Query(impiegati)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true)
                    .save()
                    .then(callback)
            },
            error => {
                console.error(error)
                callbackError(error.message)
            })
}

/** Modifica un campo dell'impiegato
 *
 * @param {String} id ID dell'impiegato da modificare
 * @param {Impiegato} newVal Oggetto che indica {nome_parametro : nuovo_valore}
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function updateImpiegato(id, newVal, callback, callbackError) {
    const [key] = Object.keys(newVal)
    new Parse.Query(impiegati)
        .get(id)
        .then(
            elem => elem.set( key, newVal[key] ).save().then( callback ),
            error => {
                console.error(error)
                callbackError(error.message)
            })
}

export {getAllImpiegati, addImpiegato, deleteImpiegato, updateImpiegato};

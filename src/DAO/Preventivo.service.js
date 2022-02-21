import {preventivo, Parse} from './http-common';

/**
 * Ottiene la subscription ai preventivi
 * @param {Integer} commessaId L'ID della commessa. 
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function subdcribePreventivo(commessaId, callback, callbackError) {
    const query = new Parse.Query(commesse);
    const subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('commesse opened');
        getAllPreventivi(commessaId, callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('object created: ', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('object updated', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('object entered', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('object left', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('object deleted', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('close', () => {
        console.log('subscription closed', object);
    });
}

/**
 * Aggiunge un preventivo al database
 * @param {Object} newPreventivo il nuovo preventivo da aggiungere
 * @param {String} commessaId ID della commessa parent
 * @param {function} callback callback per successo
 */
async function addPreventivo(newPreventivo, commessaId, callback) {
    const prev = new Parse.Object(preventivo)
    Object
        .keys(newPreventivo)
        .forEach( key => prev.set(key, newPreventivo[key]) )
    prev.set('parent', commessaId)
    await prev.save()
            .then(
                () => callback(),
                (error) => console.error('ERRORE:', error.message) )
}

/**
 * Ottiene tutti i preventivi presenti nel DB associati ad una commessa
 * @param {int} commessaId ID della commessa da cercare
 * @param {function} callback Funzione claabak
 * @param {function} callbackError Funzione di callback per l'errore
 */
async function getAllPreventivi(commessaId, callback, callbackError) {
    new Parse.Query(preventivo)
        .notEqualTo('eliminato', true)
        .equalTo('parent', commessaId)
        .find()
        .then((result) => {
            const data = []
            result.forEach(elem => {
                const attr = elem.attributes
                data.push({
                    id: elem.id,
                    ...attr,
                })
            })
            callback(data)
        }, (error) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })

    /*
    const query = new Parse.Query(preventivo)
    const result = await query
                        .notEqualTo('eliminato', true)
                        .equalTo('parent', commessaId)
                        .find()
    const data = []
    result.forEach(elem => {
        const attr = elem.attributes
        data.push({
            id: elem.id,
            ...attr,
        })
    })
    callback(data)
    */
}

/**
 * Elimina un elemento dal DB
 * @param {String} id L'id dell'elemento da eliminare
 * @param {Function} callback La funzione di callback per il successo dell'eliminazione
 */
function deletePreventivo(id, callback) {
    new Parse.Query(preventivo)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true)
                    .save()
                    .then(callback)
            },
            error => console.error('ERRORE:', error.message),
        )
}

/**
 * Modifica il preventivo
 * @param {*} prevId ID del preventivo
 * @param {*} newPreventivo Preventivo modificato
 * @param {*} callback Callback
 */
async function editPreventivo(prevId, newPreventivo, callback) {
    const query = new Parse.Query(preventivo)
    query.get(prevId)
        .then(
            elem => {
                Object.keys(newPreventivo).forEach( key => elem.set(key, newPreventivo[key]) )
                elem.save().then(() => callback())
            },
            error => console.error('ERRORE:', error.message),
        )
}

export {
    addPreventivo,
    getAllPreventivi,
    deletePreventivo,
    editPreventivo,
}

import {preventivo, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription ai preventivi
 * @param {int} commessaId ID della commessa parent
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribePreventivo(commessaId, callback, callbackError) {
    const query = new Parse.Query(preventivo);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('Preventivo opened');
        getAllPreventivi(commessaId, callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('Preventivo created: ', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('Preventivo updated', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('Preventivo entered', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('Preventivo left', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('Preventivo deleted', object);
        getAllPreventivi(commessaId, callback, callbackError);
    });

    subscription.on('close', () => {
        console.log('subscription Preventivo closed');
    });

    subscription.on('error', () => {
        console.log('ERROR');
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
 async function unsubscribePreventivo() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Aggiunge un preventivo al database
 * @param {Object} newPreventivo il nuovo preventivo da aggiungere
 * @param {String} commessaId ID della commessa parent
 * @param {function} callback callback per successo
 */
function addPreventivo(newPreventivo, commessaId, callback) {
    newPreventivo['parent'] = commessaId;
    const prev = new Parse.Object(preventivo);
    Object
        .keys(newPreventivo)
        .forEach(
            key => {
                console.log(key, '->', newPreventivo[key])
                prev.set(key, newPreventivo[key])
            },
        )
    prev.save()
            .then(callback)
            .catch( error => console.error('ERRORE:', error.message) )
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
        .catch(() => console.log('CATCH'))
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
function editPreventivo(prevId, newPreventivo, callback) {
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
    subscribePreventivo,
    unsubscribePreventivo,
}

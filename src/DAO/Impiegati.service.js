import { impiegati, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription agli impiegati
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribeImpiegati(callback, callbackError) {
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
function addImpiegato(newImpiegato) {
    const impiegato = new Parse.Object(impiegati)
    Object.keys(newImpiegato).forEach(
        key => impiegato.set(key, newImpiegato[key]))
    impiegato.set('lavoriInCorso', [])
        .save()
}

/** Elimina l'impiegato selezionato
 *
 * @param {String} id ID dell'impiegato da eliminare.
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function deleteImpiegato(id, successCallback, errorCallback) {
    new Parse.Query(impiegati)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true)
                    .save().then(
                        (elem) => successCallback(`Impiegato ${elem.attributes.nome} rimosso con successo`),
                        (err) => errorCallback(err.message))
            })
}

/** Modifica un campo dell'impiegato
 *
 * @param {String} id ID dell'impiegato da modificare
 * @param {Impiegato} newVal Oggetto che indica {nome_parametro : nuovo_valore}
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
function updateImpiegato(id, newVal) {
    const [key] = Object.keys(newVal)
    new Parse.Query(impiegati)
        .get(id)
        .then( elem => elem.set( key, newVal[key] ).save() )
}

export {
    getAllImpiegati,
    addImpiegato,
    deleteImpiegato,
    updateImpiegato,
    subscribeImpiegati,
    unsubscribeImpiegati,
};

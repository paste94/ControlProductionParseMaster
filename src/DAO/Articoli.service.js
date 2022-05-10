import {articoli, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription agli articoli
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
async function subscribeArticoli(callback, callbackError) {
    const query = new Parse.Query(articoli);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('articoli opened');
        getAllArticoli(callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('Articoli created: ', object);
        getAllArticoli(callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('Articoli updated', object);
        getAllArticoli(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('Articoli entered', object);
        getAllArticoli(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('Articoli left', object);
        getAllArticoli(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('Articoli deleted', object);
        getAllArticoli(callback, callbackError);
    });

    subscription.on('close', () => {
        console.log('subscription Articoli closed');
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
async function unsubscribeArticoli() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutti gli articoli dal DB
 * @param {function} callback Cosa eseguire quando i dati sono stati ottenuti
 * @param {function} callbackError Funzione di callback per l'errore
 */
function getAllArticoli(callback, callbackError) {
    new Parse.Query(articoli)
        .notEqualTo('eliminato', true)
        .find()
        .then(result => {
            const data = []
            result.forEach(elem => {
                const attr = elem.attributes
                data.push({
                    id: elem.id,
                    ...attr,
                })
            })
            callback(data)
        })
        .catch(error => {
            console.error('ERRORE: ', error)
            callbackError(error.message)
        })
}

/**
 * Aggiunge un articolo al DB
 * @param {Articolo} newArticolo L'articolo da aggiungere al DB
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function addArticolo(newArticolo, successCallback, errorCallback) {
    const art = new Parse.Object(articoli)
    Object.keys(newArticolo).forEach( key => art.set(key, newArticolo[key]) )
    art.save()
            .then(
                elem => callbackSuccess(`Commessa ${elem.attributes.numDisegno} salvata con successo`),
                (error) => callbackSuccess(error.message),
            )
}

/**
 * Elimina un articolo dato l'ID
 * @param {String} id L'ID dell'articolo
 */
function deleteArticolo(id) {
    new Parse.Query(articoli)
        .get(id)
        .then(
            elem => {
                elem
                    .set('eliminato', true)
                    .save()
            })
        .catch(error => console.error('ERRORE:', error.message))
}

/**
 * Modifica l'articolo dato l'ID
 * @param {String} artId L'ID dell'articolo da modificare
 * @param {Articolo} newArticolo L'articolo nuovo
 * @param {function} callback funzione di callback di successo
 */
function editArticolo(artId, newArticolo, callback) {
    new Parse.Query(articoli)
        .get(artId)
        .then(
            elem => {
                Object
                    .keys(newArticolo)
                    .forEach( key => elem.set(key, newArticolo[key]) )
                elem.save().then(callback)
            })
        .catch(error => console.error('ERRORE:', error.message))
}

export {
    addArticolo,
    deleteArticolo,
    editArticolo,
    getAllArticoli,
    subscribeArticoli,
    unsubscribeArticoli,
}

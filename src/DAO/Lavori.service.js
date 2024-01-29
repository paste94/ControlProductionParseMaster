import { element } from 'prop-types';
import { Parse, lavori } from './http-common';
import { getAllImpiegati} from './Impiegati.service';

let subscription;

/**
 * Ottiene la subscription alle macchine
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribeLavori(callback, callbackError) {
    const query = new Parse.Query(lavori);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        // console.log('lavori opened');
        getAllLavori(callback, callbackError)
    })

    subscription.on('create', (object) => {
        // console.log('lavoro created: ', object);
        getAllLavori(callback, callbackError);
    });

    subscription.on('update', (object) => {
        // console.log('lavoro updated', object);
        getAllLavori(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        // console.log('lavoro entered', object);
        getAllLavori(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        // console.log('lavoro left', object);
        getAllLavori(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        // console.log('lavoro deleted', object);
        getAllLavori(callback, callbackError);
    });

    subscription.on('close', () => {
        // console.log('subscription lavoro closed');
    });

    Parse.LiveQuery.on('error', (error) => {
        console.error(error);
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
 async function unsubscribeLavori() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}

/**
 * Ottiene tutte le lavori dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function getAllLavori(callback, callbackError) {
    let impiegati = await getAllImpiegati((res) => impiegati = res, () => {})
    new Parse.Query(lavori)
        .notEqualTo('eliminato', true)
        .notEqualTo('archiviato', true)
        .find()
        .then( result => {
            const data = []
            result.forEach(elem => {
                const obj = {
                    id: elem.id,
                    ...elem.attributes,
                }
                if (obj.impiegatoNome == undefined) {
                    try {
                        const nome = impiegati.filter((elem) => elem.id == obj.impiegatoId)[0].nome
                        obj.impiegatoNome = nome
                    } catch (error) {}
                }
                data.push(obj)
            })
            callback(data)
        }, (error) => {
            console.error('ERRORE:', error)
            callbackError(error.message)
        })
}

/**
 * Ottiene l'elenco di macchine presente nella tabella
 * @param {Function} callback funzione di callback di successo
 */
function getMacchineLavori(callback) {
    new Parse.Query(lavori).
        find().
        then( res => {
            const data = []
            res.forEach( elem => {
                data.push(elem.attributes.macchina)
            })
            callback(data)
        })
}

/**
 *
 * @param {*} macchina
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} includeInProgress
 * @param {*} callback
 * @param {*} errorCallback
 */
function getLavori(
    macchina,
    startDate,
    endDate,
    includeInProgress,
    callback,
    errorCallback,
) {
    const query = new Parse.Query(lavori)

    if (macchina !== 'Tutte') {
        query.equalTo('macchina', macchina)
    }
    if (startDate != undefined) {
        query.greaterThanOrEqualTo('inizio', new Date(startDate+'T00:00:00'))
    }
    if (endDate != undefined) {
        query.lessThanOrEqualTo('fine', new Date(endDate+'T23:59:59'))
    }
    query.find()
        .then((res) => {
            const data = []
            res.forEach(elem =>
                data.push({
                    id: elem.id,
                    ...elem.attributes,
                }),
            )
            callback(data)
        })
        .catch((error) => {
            errorCallback({
                title: 'Errore di connessione',
                message: error.message,
            })
        })
}


export {
    getLavori,
    getMacchineLavori,
    subscribeLavori,
    unsubscribeLavori,
}

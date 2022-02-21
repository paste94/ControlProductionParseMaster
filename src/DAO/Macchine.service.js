import { macchine, Parse} from './http-common';

let subscription;

/**
 * Ottiene la subscription alle macchine
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 async function subscribeMacchine(callback, callbackError) {
    const query = new Parse.Query(macchine);
    subscription = await query.subscribe();

    subscription.on('open', () => {
        console.log('Macchine opened');
        getAllMacchine(callback, callbackError)
    })

    subscription.on('create', (object) => {
        console.log('macchina created: ', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('update', (object) => {
        console.log('macchina updated', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('enter', (object) => {
        console.log('macchina entered', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('leave', (object) => {
        console.log('macchina left', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('delete', (object) => {
        console.log('macchina deleted', object);
        getAllMacchine(callback, callbackError);
    });

    subscription.on('close', () => {
        console.log('subscription macchina closed');
    });
}

/**
 * Rimuove la sottoscrizione al DB
 */
 async function unsubscribeMacchine() {
    if (subscription != undefined) {
        subscription.unsubscribe();
    }
}


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
 */
 function addMacchina(newMacchina, callback) {
    const macchina = new Parse.Object(macchine);

    Object
        .keys(newMacchina)
        .forEach( key => macchina.set(key, newMacchina[key]))

    macchina
        .save()
        .then(callback)
        .catch(err => console.error('ERROR: ', err))
}

/**
 * Elimina la macchina con ID selezionato.
 * L'elemento viene eliminato impostando un flag 'eliminato' a true
 * @param {int} id identificativo della macchina
 */
function deleteMacchina(id) {
    new Parse.Query(macchine)
        .get(id)
        .then(
            elem => elem.set('eliminato', true).save(),
            error => console.error('ERRORE:', error.message)
        )
}

// TODO: Function update macchina (se fattibile)

export {subscribeMacchine, getAllMacchine, addMacchina, deleteMacchina, unsubscribeMacchine};

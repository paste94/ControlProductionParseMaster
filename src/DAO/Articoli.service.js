import {articoli, Parse} from './http-common';

/**
 * Ottiene tutti gli articoli dal DB
 * @param {function} callback Cosa eseguire quando i dati sono stati ottenuti
 */
async function getAllArticoli(callback) {
    const query = new Parse.Query(articoli)
    const result = await query
                        .notEqualTo('eliminato', true)
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
}

/**
 * Aggiunge un articolo al DB
 * @param {Articolo} newArticolo L'articolo da aggiungere al DB
 * @param {function} callback Callback di successo
 */
async function addArticolo(newArticolo, callback) {
    const art = new Parse.Object(articoli)
    Object.keys(newArticolo).forEach( key => art.set(key, newArticolo[key]) )
    await art.save()
            .then(
                () => callback(),
                (error) => console.error('ERRORE:', error.message) )
}

/**
 * Elimina un articolo dato l'ID
 * @param {String} id L'ID dell'articolo
 * @param {function} callback Funzione di callback per successo
 */
function deleteArticolo(id, callback) {
    new Parse.Query(articoli)
        .get(id)
        .then(
            elem => {
                elem.set('eliminato', true).save()
                callback()
            },
            error => console.error('ERRORE:', error.message) )
}

/**
 * Modifica l'articolo dato l'ID
 * @param {String} artId L'ID dell'articolo da modificare
 * @param {Articolo} newArticolo L'articolo nuovo
 * @param {function} callback La funzione di callback per successo
 */
async function editArticolo(artId, newArticolo, callback) {
    new Parse.Query(articoli)
        .get(artId)
        .then(
            elem => {
                Object
                    .keys(newArticolo)
                    .forEach( key => elem.set(key, newArticolo[key]) )
                elem.save().then(callback)
            },
            error => console.error('ERRORE:', error.message) )
}

export { addArticolo, deleteArticolo, editArticolo, getAllArticoli }

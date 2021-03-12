import {preventivo, Parse} from './http-common';

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

async function getAllPreventivi(commessaId, callback){
    let query = new Parse.Query(preventivo)
    let result = await query
                        .notEqualTo('eliminato', true)
                        .equalTo('parent', commessaId)
                        .find()
    let data = []
    result.forEach(elem => {
        let attr = elem.attributes
        data.push({
            id: elem.id,
            ...attr
        })
    })
    callback(data)
}

function deletePreventivo(id, callback){
    let query = new Parse.Query(preventivo)
    query.get(id)
        .then( 
            elem => {
                elem.set('eliminato', true)
                elem.save()
                callback()
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

async function editPreventivo(prevId, newPreventivo, callback){
    let query = new Parse.Query(preventivo)
    query.get(prevId)
        .then( 
            elem => {
                Object.keys(newPreventivo).forEach( key => elem.set(key, newPreventivo[key]) )
                elem.save().then(() => callback())
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

export {
    addPreventivo,
    getAllPreventivi,
    deletePreventivo,
    editPreventivo
}

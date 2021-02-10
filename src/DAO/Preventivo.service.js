import { FaNotEqual } from 'react-icons/fa';
import db, {preventivo, Parse} from './http-common';

/**Aggiunge una commesssa al database
 * 
 * @param {Object} newPreventivo il nuovo preventivo da aggiungere
 * @param {String} commessaId ID della commessa parent
 * @param {function} responseCallback callback per successo
 * @param {function} errorCallback callback per errore
 */
async function addPreventivo(newPreventivo, commessaId, callback){
    const commessa = new Parse.Object(preventivo)
    Object.keys(newPreventivo).forEach( key => commessa.set(key, newPreventivo[key]) )
    commessa.set('parent', commessaId)
    await commessa.save()
            .then( 
                () => callback(), 
                (error) => console.error('ERRORE:', error.message)
            )
}

async function getAllPreventivi(commessaId, callback){
    let query = new Parse.Query(preventivo)
    console.log('ID:',commessaId)
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
    console.log(data)
    callback(data)
}

function deletePreventivo(id, callback){
    let query = new Parse.Query(preventivo)
    query.get(id)
        .then( 
            elem => {
                console.log(elem)
                elem.set('eliminato', true)
                elem.save()
                callback()
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

async function editPreventivo(prevId, newPreventivo, callback){
    let query = new Parse.Query(preventivo)

    console.log('EDIT', prevId, newPreventivo)

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

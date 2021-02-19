import { impiegati, Parse} from './http-common';

/**Ottiene tutti gli impiegati dal database
 * 
 * @param {*} responseCallback callback per successo.
 */
async function getAllImpiegati(callback){
    let query = new Parse.Query(impiegati)
    query.notEqualTo('eliminato', true)
    let result = await query.find()
    let data = []
    result.forEach(elem => {
        data.push({
            id: elem.id,
            ...elem.attributes
        })
    })
    callback(data)
}

function addImpiegato(newImpiegato, callback){
    const impiegato = new Parse.Object(impiegati)
    Object.keys(newImpiegato).forEach( key => impiegato.set(key, newImpiegato[key]) )
    impiegato.set('lavoriInCorso', [])
    impiegato.save()
        .then( callback )
        .catch( (error) => console.error('ERRORE:', error.message) )
}

function deleteImpiegato(id, callback){
    let query = new Parse.Query(impiegati)
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

function updateImpiegato(id, newVal, callback){
    const [key] = Object.keys(newVal)
    let query = new Parse.Query(impiegati)
    query.get(id)
        .then( 
            elem => elem.set( key, newVal[key] ).save().then( () => callback() ), 
            error => console.error('ERRORE:', error.message)
        )
}

export {getAllImpiegati, addImpiegato, deleteImpiegato, updateImpiegato};

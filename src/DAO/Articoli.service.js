import db, {articoli, Parse} from './http-common';

async function getAllArticoli(callback){
    let query = new Parse.Query(articoli)
    let result = await query
                        .notEqualTo('eliminato', true)
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

async function addArticolo(newArticolo, callback) {
    const art = new Parse.Object(articoli)
    Object.keys(newArticolo).forEach( key => art.set(key, newArticolo[key]) )
    await art.save()
            .then( 
                () => callback(), 
                (error) => console.error('ERRORE:', error.message)
            )
}

function deleteArticolo(id, callback){
    let query = new Parse.Query(articoli)
    query.get(id)
        .then( 
            elem => {
                elem.set('eliminato', true).save()
                callback()
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

async function editArticolo(artId, newArticolo, callback){
    let query = new Parse.Query(articoli)
    query.get(artId)
        .then( 
            elem => {
                Object.keys(newArticolo).forEach( key => elem.set(key, newArticolo[key]) )
                elem.save().then(() => callback())
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

export { addArticolo, deleteArticolo, editArticolo, getAllArticoli }

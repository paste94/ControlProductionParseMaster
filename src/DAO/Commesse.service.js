import {commesse, Parse} from './http-common';

/**Ottiene tutte le commesse dal database
 * 
 * @param {*} responseCallback callback per successo.
 */
async function getAllCommesse(callback){
    let query = new Parse.Query(commesse)
    query.notEqualTo('eliminato', true)
    let result = await query.find()
    let data = []
    result.forEach(elem => {
        data.push({
            id: elem.id,
            nome: elem.get('nome'),
            numero: elem.get('numero'),
            data_offerta: elem.get('data_offerta').toISOString(),
            data_consegna: elem.get('data_consegna').toISOString(),
            chiusa: elem.get('chiusa'),
            preventivo: elem.get('preventivo')
        })
    })
    callback(data)
}

/**Aggiunge una commesssa al database
 * 
 * @param {Object} commessa la commessa da aggiungere, campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} callback callback per successo
 */
async function addCommessa(newCommessa, callback){
    const commessa = new Parse.Object(commesse)
    Object.keys(newCommessa).forEach( key => commessa.set(key, newCommessa[key]) )
    await commessa.save()
            .then( 
                () => callback(), 
                (error) => console.error('ERRORE:', error.message)
            )
}

/**Elimina la macchina con ID selezionato. L'elemento viene eliminato impostando un flag 'eliminato' a true
 * 
 * @param {int} id identificativo della macchina
 * @param {function} callback callback per successo
 */
function deleteCommessa(id, callback){
    let query = new Parse.Query(commesse)
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

/**Aggiorna un campi della commessa 
 * 
 * @param {int} id id dell'elemento da modificare
 * @param {Object} newVal Oggetto {key: value} dove _key_ è il campo da modificare e _value_ è il nuovo valore
 * @param {function} callback callback per successo
 */
function updateCommessa(id, newVal, callback){
    const [key] = Object.keys(newVal)
    let query = new Parse.Query(commesse)
    newVal[key] = (key === 'data_offerta' || key === 'data_consegna') ? new Date(newVal[key]) : newVal[key]
    console.log('EDIT', id, newVal)
    query.get(id)
        .then( 
            elem => {
                console.log('THEN in GET')
                elem.set( key, newVal[key] ).save().then( () => {
                    console.log('THEN in SET')
                    callback()
                })
            }, 
            error => console.error('ERRORE:', error.message)
        )
}

export {getAllCommesse, 
    addCommessa, 
    deleteCommessa, 
    updateCommessa, 
};

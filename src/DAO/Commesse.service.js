import db, {commesse, Parse} from './http-common';

/**Ottiene tutte le commesse dal database
 * 
 * @param {*} responseCallback callback per successo. Deve restituire un array di oggetti:
 *                              {
 *                                  id
 *                                  nome
 *                                  numero
 *                                  data_offerta (isostring)
 *                                  data_consegna (isostring)
 *                              }
 * @param {*} errorCallback callback per errore
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

async function preventivoListener(commessaId, callback){
    /*
    const unsubscribe = db.collection(commesse).doc(commessaId)
        .onSnapshot(
            snapshot => {
                callback(snapshot.data())
    })
    return unsubscribe
    */
}

async function commesseListener(callback){     
    /*
    const unsubscribe = db.collection(commesse)
        .onSnapshot(
            snapshot => {
                let tempData = []
                snapshot.forEach(doc => {
                    tempData.push({
                        id: doc.id,
                        nome: doc.data().name,
                        numero: doc.data().number,
                        data_offerta: strToDate(doc.data().offDate),
                        data_consegna: strToDate(doc.data().consDate),
                        chiusa: doc.data().closed,
                        preventivo: doc.data().preventivo
                    })
                });
                callback(tempData)
    })
    return unsubscribe
    */
}

function getCommessa(id, responseCallback, errorCallback){
    /*
    const doc = db.collection(commesse).doc(id)
    doc.onSnapshot(
        docSnapshot => {
            responseCallback(docSnapshot.data().preventivo)
        }, err => {
            errorCallback(`Encountered error: ${err}`);
        }
    )
    */
}

function deletePreventivo(commessaId, numDisegno, callback){
    /*
    const prevName = 'preventivo.' + numDisegno
    const FieldValue = firebase.firestore.FieldValue
    const obj = {}
    obj[prevName] = FieldValue.delete()

    console.log(commessaId, numDisegno)

    db.collection(commesse).doc(commessaId)
        .update(obj)
        .then( () => callback() )
        .catch( (err) => console.warn(err) );
    */
}

/**Aggiunge una commesssa al database
 * 
 * @param {Object} commessa la commessa da aggiungere, campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} responseCallback callback per successo
 * @param {function} errorCallback callback per errore
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

function editCommessaLavoro(idCommessa, lavoro, callback){

    /*
    let path = 'preventivo.' + lavoro.numDisegno.replace(/\./g, '%2E');
    let obj = {};

    obj[path] = lavoro;

    console.log(idCommessa)

    db.collection(commesse)
        .doc(idCommessa)
        .update(obj)
    */
}

export {getAllCommesse, 
    addCommessa, 
    deleteCommessa, 
    updateCommessa, 
    editCommessaLavoro, 
    getCommessa, 
    commesseListener, 
    preventivoListener,
    deletePreventivo};

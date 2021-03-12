import db, {commesse, strToDate, dateToStr} from '../http-common';
import firebase from 'firebase'

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
function getAllCommesse(responseCallback, errorCallback){
    const doc = db.collection(commesse)
    doc.onSnapshot(
        docSnapshot => {
            let data = []
            docSnapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    nome: doc.data().name,
                    numero: doc.data().number,
                    data_offerta: strToDate(doc.data().offDate),
                    data_consegna: strToDate(doc.data().consDate),
                    chiusa: doc.data().closed,
                    preventivo: doc.data().preventivo
                })
            });
            responseCallback(data)
        }, err => {
            errorCallback(`Encountered error: ${err}`);
        }
    )
}

function preventivoListener(commessaId, callback){
    const unsubscribe = db.collection(commesse).doc(commessaId)
        .onSnapshot(
            snapshot => {
                callback(snapshot.data())
    })
    return unsubscribe
}

function commesseListener(callback){
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
}

function getCommessa(id, responseCallback, errorCallback){
    const doc = db.collection(commesse).doc(id)
    doc.onSnapshot(
        docSnapshot => {
            responseCallback(docSnapshot.data().preventivo)
        }, err => {
            errorCallback(`Encountered error: ${err}`);
        }
    )
}

function deletePreventivo(commessaId, numDisegno, callback){
    const prevName = 'preventivo.' + numDisegno
    const FieldValue = firebase.firestore.FieldValue
    const obj = {}
    obj[prevName] = FieldValue.delete()

    db.collection(commesse).doc(commessaId)
        .update(obj)
        .then( () => callback() )
        .catch( (err) => console.warn(err) );
}

/**Aggiunge una commesssa al database
 * 
 * @param {Object} commessa la commessa da aggiungere, campi: {nome, numero, dataOfferta, dataConsegna}
 * @param {function} responseCallback callback per successo
 * @param {function} errorCallback callback per errore
 */
function addCommessa(commessa){
    db.collection(commesse)
        .add({
            name: commessa.nome,
            number: commessa.numero,
            offDate: dateToStr(commessa.data_offerta),
            consDate: dateToStr(commessa.data_consegna),
            preventivo: commessa.preventivo
        })
}

/**Elimina la macchina con ID selezionato
 * 
 * @param {int} id identificativo della macchina
 * @param {function} responseCallback callback per successo
 * @param {function} errorCallback callback per errore
 */
function deleteCommessa(id){
    db.collection(commesse)
        .doc(id)
        .delete()
}

/**Aggiorna un campi della commessa 
 * 
 * @param {int} id id dell'elemento da modificare
 * @param {Object} newVal Oggetto {key: value} dove _key_ è il campo da modificare e _value_ è il nuovo valore
 * @param {function} responseCallback callback per successo
 * @param {function} errorCallback callback per errore
 */
function updateCommessa(id, newVal){
    const [key] = Object.keys(newVal)

    let obj = {}

    switch(key){
        case 'numero': 
            obj={number:newVal.numero}
            break
        case 'nome': 
            obj={name:newVal.nome}
            break
        case 'chiusa': 
            obj={closed:newVal.chiusa}
            break
        case 'data_offerta': 
            obj={offDate:dateToStr(newVal.data_offerta)}
            break
        case 'data_consegna': 
            obj={consDate:dateToStr(newVal.data_consegna)}
            break
        default: break
    }

    db.collection(commesse)
        .doc(id)
        .update(obj)
}

function editCommessaLavoro(idCommessa, lavoro){
    let path = 'preventivo.' + lavoro.numDisegno.replace(/\./g, '%2E');
    let obj = {};

    obj[path] = lavoro;

    db.collection(commesse)
        .doc(idCommessa)
        .update(obj)
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

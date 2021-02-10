import db, {articoli, strToDate, dateToStr} from './http-common';
import firebase from 'firebase'

function articoliListener(callback){
    const unsubscribe = db.collection(articoli)
        .onSnapshot( snapshot => {
            let tempData = []
            snapshot.forEach( doc => {
                tempData.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            callback(tempData)
        })
    return unsubscribe
}

function addArticolo(articolo) {
    db.collection(articoli).add(articolo)
}

function deleteArticolo(id){
    db.collection(articoli)
        .doc(id)
        .delete()
}

function editArticolo(id, articolo){
    db.collection(articoli)
        .doc(id)
        .set(articolo)
}

function getAllArticoli(callback) {
    db.collection(articoli).get().then( snapshot => {
        let tempData = []
        snapshot.forEach( doc => {
            tempData.push({
                id: doc.id,
                ...doc.data()
            })
        })
        callback(tempData)
    })
}

export { articoliListener, addArticolo, deleteArticolo, editArticolo, getAllArticoli }

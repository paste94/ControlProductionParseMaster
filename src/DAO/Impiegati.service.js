import db, {employee} from './http-common';


function impiegatiListener(callback){
    const unsubscribe = db.collection(employee)
        .onSnapshot(
            snapshot => {
                let data = []
                snapshot.forEach(doc => {
                    let obj = {...doc.data()}
                    obj['id'] = doc.id
                    data.push(obj)
                })
                callback(data)
            }
        )
    return unsubscribe
}

function addImpiegato(impiegato){
    db.collection(employee)
        .add({
            name: impiegato.nome,
            chip: impiegato.chip,
            runningJobs: []
        })
}

function deleteImpiegato(id){
    db.collection(employee)
        .doc(id)
        .delete()
}

function updateImpiegato(id, newVal){
    if(newVal.nome !== undefined){
        newVal = {name:newVal.nome}
    }
    db.collection(employee)
        .doc(id)
        .update(newVal)
}

export {impiegatiListener, addImpiegato, deleteImpiegato, updateImpiegato};

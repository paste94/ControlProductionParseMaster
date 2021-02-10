import db, { jobs } from './http-common';

function lavoriListener(callback){
    const unsubscribe = db.collection(jobs)
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

function getLavori(callback){
    db.collection(jobs)
        .get()
        .then( snapshot => {
            let data = []
            snapshot.forEach( doc => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            callback(data)
        })
}

export { lavoriListener, getLavori }

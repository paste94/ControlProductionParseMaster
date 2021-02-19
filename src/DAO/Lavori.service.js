import { Parse, lavori } from './http-common';

function getLavori(macchina, startDate, endDate, callback, errorCallback){
    const query = new Parse.Query(lavori)

    console.log(macchina, startDate, endDate)

    if(macchina !== 'Tutte')
        query.equalTo('macchina', macchina)
    // TODO Aggiungi la data alla query
    //query.greaterThanOrEqualTo('inizio', startDate)
    //    .lessThanOrEqualTo('fine', endDate)
        query.find()
        .then((res) => {
            let data = []
            res.forEach(elem => 
                data.push({
                    id: elem.id,
                    ...elem.attributes
                })
            )
            console.log(data)
            callback(data)
        })
        .catch((error) => {
            errorCallback({
                title: 'Errore di connessione',
                message: error.message
            })
        })
}


export { getLavori }

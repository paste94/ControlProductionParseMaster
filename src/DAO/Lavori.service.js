import { Parse, lavori } from './http-common';

/**
 * 
 * @param {*} macchina 
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} includeInProgress 
 * @param {*} callback 
 * @param {*} errorCallback 
 */
function getLavori(macchina, startDate, endDate, includeInProgress, callback, errorCallback) {
    const query = new Parse.Query(lavori)

    if(macchina !== 'Tutte')
        query.equalTo('macchina', macchina)
    // TODO Aggiungi la data alla query
    query.greaterThanOrEqualTo('inizio', new Date(startDate+'T00:00:00'))
        .lessThanOrEqualTo('fine', new Date(endDate+'T23:59:59'))
        .find()
        .then((res) => {
            let data = []
            res.forEach(elem => 
                data.push({
                    id: elem.id,
                    ...elem.attributes,
                })
            )
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

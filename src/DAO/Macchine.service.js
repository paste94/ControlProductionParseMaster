import macchine from '../macchine.json'

function getAllMacchine(){
    return macchine
}

function addMacchina(macchina, errorCallback){
    if(macchina.nome === ''){
        errorCallback('Errore: Impostare un nome macchina valido');
        return;
    }
    http
        .post("/macchina", macchina)
        .catch(function(error) {
            console.log(error)
            errorCallback(error.message);
        });
}

function deleteMacchina(id, errorCallback){
    if(id === ''){
        errorCallback('Errore: Impostare un ID macchina valido');
        return;
    }
    http
        .delete(`/macchina/${id}`)
        .catch(function(error) {
            console.log(error)
            errorCallback(error.message);
        });
}

function updateMacchina(id, newVal, errorCallback){
    console.log(id, newVal)
    if(id === ''){
        errorCallback('Errore: Impostare un ID macchina valido');
        return;
    }
    http
        .put(`/macchina/${id}`, newVal)
        .catch(function(error) {
            console.log(error)
            errorCallback(error.message);
        });
}

export {getAllMacchine, addMacchina, deleteMacchina, updateMacchina};

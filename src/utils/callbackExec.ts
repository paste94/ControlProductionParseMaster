/**
 * Funzione helper che serve a fare un controllo sulla presenza o meno del callback
 * ed eventualmente eseguirlo. 
 * 
 * @param message il messaggio da mostrare nel callback
 * @param callback Callback per la notifica da controllare
 * @returns la funzione corretta con controllo effettuato
 */
function callbackExec(message: string, callback?: Function): Function {
    return callback != undefined ? callback(message) : console.error(message)
}

export default callbackExec
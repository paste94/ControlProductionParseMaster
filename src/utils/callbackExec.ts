/**
 * Funzione helper che serve a fare un controllo sulla presenza o meno del callback
 * ed eventualmente eseguirlo.
 *
 * @param {string} message il messaggio da mostrare nel callback
 * @param {Function} callback Callback per la notifica da controllare
 *
 * @return {void} La funzione da richiamare
 */
function callbackExec(message: string, callback?: (message: string) => void): void {
    return callback != undefined ? callback(message) : console.error(message)
}

export default callbackExec

/**
 * Formatta la data per la visualizzazione nella cella passata come parametro
 * @param {Object} cell la cella da formattare
 * @return {Object} la cella formattata
 */
function dateFormatter(cell) {
    if (cell == null || cell === '') {
        return '-/-/-'
    }
    const [y, m, d] = cell.split('T')[0].split('-')
    return d + '/' + m + '/' + y
}

/**
 * Formatta il tempo per la visualizzazione nella cella passata come parametro
 * @param {Object} cell la cella da formattare
 * @return {Object} la cella formattata
 */
function timeFormatter(cell) {
    console.log(cell)
    const h = Math.floor(cell/60)
    const min = Math.floor(cell-(h*60))
    return h + 'h ' + min + 'm'
}

export {dateFormatter, timeFormatter}
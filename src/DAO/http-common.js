import Parse from 'parse'

Parse.initialize('ControlProductionServer', 'CP_m4st3r_k3y');
Parse.serverURL = localStorage.getItem('ServerUrl') + '/parse'

const commesse = 'commesse'
const impiegati = 'impiegati'
const articoli = 'articoli'
const preventivo = 'preventivo'
const lavori = 'lavori'
const macchine = 'macchine'

/**
 * Converte una stringa in data
 * @param {String} date la stringa da convertire in data
 * @return {Date} la data
 */
function strToDate(date) {
  if (date === '') {
      return ''
  }
  const [dd, mm, yyyy] = date.split('/')
  const str = mm + '/' + (parseInt(dd)+1) + '/' + yyyy
  return new Date(str).toISOString()
}

/**
 * Converte una data in stringa
 * @param {Date} date la data da convertire in stringa
 * @return {String} la data
 */
function dateToStr(date) {
  if (date === '') {
      return ''
  }
  const arr = date.split('T')
  const [yyyy, mm, dd] = arr[0].split('-')
  return dd + '/' + mm + '/' + yyyy
}

export {
  commesse,
  impiegati,
  articoli,
  lavori,
  preventivo,
  strToDate,
  dateToStr,
  macchine,
  Parse,
}

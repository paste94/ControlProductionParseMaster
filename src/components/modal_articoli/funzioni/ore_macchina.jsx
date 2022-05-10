import React from 'react';
import OreMacchina from '../component/OreMacchina';
import { getAllMacchine } from '../../../DAO/Macchine.service';

// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

/**
 * Restituisce l'elenco di macchine con l'aggiunta di un campo "ore"
 *
 * @param {function} callback callback per l'elenco di macchine
 */
function getOreMacchina(callback) {
    getAllMacchine(macchine => {
        const oreMacchina = macchine.map( m => ({...m, ore: 0}) )
        callback(oreMacchina)
    },
    (err) => console.log('ore_macchina.jsx ERROR:', err))
}

/**
 * Renderizza un elenco di component OreMacchina.
 *
 * @param {array} oreMacchina Lista di oggetti macchina da renderizzare
 * @param {function} setOreMacchina funzione di change per la macchina
 * @param {function} callback callback per il component renderizzato
 */
function renderMacchine(oreMacchina, setOreMacchina, callback) {
    const renderer = oreMacchina.map( (m, i) =>
        <div key={i}>
            <OreMacchina
                value={m.ore}
                onChange={ (e) => {
                    const newArr = [...oreMacchina]
                    newArr[i].ore = parseFloat(e.target.value)
                    setOreMacchina(newArr)
                } }
                nomeMacchina={m.nome}
            />
            <br/>
        </div>,
    )

    callback(renderer)
}

export {
    renderMacchine,
    getOreMacchina,
};

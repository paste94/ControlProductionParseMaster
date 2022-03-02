import { Dropdown } from 'react-bootstrap';
import { getAllArticoli } from '../../../../DAO/Articoli.service';
import React from 'react';

/**
 * 
 * @param {function} onArticoloClick Cosa fare al click dell'articolo? (Impostare tutti i valori al posto giusto)
 * @param {function} callback Funzione di callback (che serve a impostare l'articolo in una variabile di stato  del component)
 */
function renderArticoli(onArticoloClick, callback) {
    getAllArticoli( articoli => {
        const AR = articoli.map( art =>
            <Dropdown.Item
                key={art.id}
                onClick={ () => onArticoloClick(art) } >
                {
                    art.numDisegno
                }
            </Dropdown.Item> )
        callback(AR)
    })
}

export {renderArticoli};

import { Dropdown } from 'react-bootstrap';
import { getAllArticoli } from '../../../DAO/Articoli.service';
import React from 'react';
import Articolo from '../../../classes/Articolo';

/**
 * @param onArticoloClick Cosa fare al click dell'articolo? (Impostare tutti i valori al posto giusto)
 * @param callback Funzione di callback (che serve a impostare l'articolo in una variabile di stato  del component)
 */
function renderArticoli(onArticoloClick: (articolo: Articolo) => void, callback: (render: JSX.Element[]) => void) {
    getAllArticoli(
        (articoli: Articolo[]) => {
            const AR: JSX.Element[] = articoli.map( art =>
                <Dropdown.Item
                    key={art.id}
                    onClick={ () => onArticoloClick(art) } >
                    {
                        art.numDisegno
                    }
                </Dropdown.Item> )
            callback(AR)
        },
        () => {},
    )
}

export {renderArticoli};

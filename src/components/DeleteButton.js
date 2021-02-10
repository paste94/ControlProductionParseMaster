import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import ModalConfirm from './ModalConfirm';

/**Definisce il bottone dell'eliminazione di un elemento dalla tabella, con modal di conferma
 * 
 * @param {Object}  props properties
 *                  - title (string) il titolo del bottone
*                   - children (Component) Cosa mostrare nel corpo del confirm
 *                  - handleConfirm (function) Cosa eseguire nel caso sia clickata la conferma
 */
function DeleteButton(props){
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleConfirm = () => {
        props.handleConfirm()
        handleClose()
    }

    return(
        <div>

            <Button
                variant='link'
                onClick={handleShow}
                title={props.title}
                size='sm' >
                <FaTrash style={{color: '#b71c1c'}}/>
            </Button>

            <ModalConfirm
                show={show}
                title={props.title}
                children={props.children}
                handleConfirm={ handleConfirm }
                handleClose={ handleClose } />
        </div>

    )
}

export default DeleteButton

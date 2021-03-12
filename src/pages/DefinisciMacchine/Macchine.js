import React, { useEffect, useState } from 'react';
import { getAllMacchine } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import { updateMacchina, deleteMacchina } from '../../DAO/Macchine.service';
import ModalNewMacchina from './ModalNewMacchina';
import ModalConfirm from '../../components/ModalConfirm';
import PropTypes from 'prop-types'

/**
 *
 * @param {Object}  props Properties
 *                  - handleShowAlert (function) handler
 *                      che mostra l'alert per gli errori
 * @return {Component} il componente
 */
function Macchine({handleShowAlert}) {
    // Macchine
    const [macchine, setMacchine] = useState([])
    const [deleteId, setDeleteId] = useState(null)

    // Modals
    const [modalState, setModalState] = useState({confirm: false});

    /** ************* HANDLERS ***************/

    // MODIFICA MACCHINA
    const handleEdit = (id, newMacchina) => {
        updateMacchina(
            id,
            newMacchina,
            (error) => handleShowAlert(error),
        )
    }

    const handleRefresh = () => {
        getAllMacchine(
            result => setMacchine(result),
            error => handleShowAlert(error),
        )
    }

    // MOSTRA modal CONFERMA
    const handleShowConfirm = () =>
        setModalState({...modalState, confirm: true})

    // CHIUDI modal CONFERMA
    const handleCloseConfirm = () => {
        setModalState({...modalState, confirm: false})
        setDeleteId(null)
    }

    // RICHIEDI CONFERMA ELIMINAZIONE
    const handleDelete = (id) => {
        setDeleteId(id)
        handleShowConfirm()
    };

    // ELIMINA MACCHINA
    const handleDeleteConfirm = () => {
        const id = deleteId;
        setDeleteId(null);
        deleteMacchina(
            id,
            (error) => handleShowAlert(error),
        )
        handleRefresh()
        handleCloseConfirm()
    }

    /** ************* EFFECT ***************/

    // Il secondo parametro [] serve per farlo
    // eseguire una volta sola quando avvii la pagina
    useEffect(handleRefresh, []);


    return (
        <div className='page'>

            <div className='container' style={{ marginBottom: 10 }}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <h1>Macchine</h1>
                    </div>
                    <div className='col'>
                        <ModalNewMacchina
                            handleRefresh={ handleRefresh }
                            handleShowAlert={ handleShowAlert } />
                    </div>
                </div>
            </div>

            <MacchineTable
                data={macchine}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />

            <ModalConfirm
                show={modalState.confirm}
                title={'Conferma eliminazione'}
                handleConfirm={handleDeleteConfirm}
                handleClose={handleCloseConfirm} >
                    <p>Confermare l`&apos;`eliminazione? ATTENZIONE!
                        Questa operazione non è reversibile</p>
            </ModalConfirm>
        </div>
    )
}

Macchine.propTypes = {
    handleShowAlert: PropTypes.func.isRequired,
}

export default Macchine;

import React, { useEffect, useState } from 'react';
import '../../css/Pages.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { Button, Col, Row } from 'react-bootstrap'
import { addImpiegato, deleteImpiegato, updateImpiegato, getAllImpiegati} from '../../DAO/Impiegati.service';
import ModalChip from './ModalChip';
import ModalNewImpiegato from './ModalNewImpiegato';
import ImpiegatiTable from './ImpiegatiTable';
import ModalConfirm from '../../components/ModalConfirm';
import { MdRefresh } from 'react-icons/md';
import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError';

/** Pagina degli impiegati
 *
 * @param {object}  props properties
 *                  - handleShowAlert (function) handler che mostra l'alert
 * @return {Component} il component creato
 */
function Impiegati({handleShowAlert}) {
    /* STATE */

    // Elenco degli impiegati
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const refresh = () => getAllImpiegati( (result) => setData(result), () => {} )

    // Stato dei modal, quando sono true sono visibili.
    const [modalState, setModalState] = useState({
        newImp: false,
        chip: false,
        confirm: false,
    })

    // Il nuovo impiegato che deve essere creato.
    const [newImp, setNewImp] = useState({
        nome: '',
        chip: '',
    });

    // L'id dell'elemento da eliminare
    const [deleteId, setDeleteId] = useState('');

    /* HANDLERS */

    // Quando chiudi il modal del nuovo impiegato
    const handleCloseNewImpiegato = () => {
        setModalState({...modalState, newImp: false});
        setNewImp({nome: '', chip: ''});
    };

    // Quando mostri il modal del nuovo impiegato
    const handleShowNewImpiegato = () => setModalState({...modalState, newImp: true});

    // Quando chiudi il modal del chip
    const handleCloseChip = () => setModalState({...modalState, chip: false});

    // Quando mostri il modal del chip
    const handleShowChip = () => setModalState({...modalState, chip: true});

    // Quando chiudi il modal confirm
    const handleCloseConfirm = () => setModalState({...modalState, confirm: false});

    // Quando mostri il modal confirm
    const handleShowConfirm = () => setModalState({...modalState, confirm: true});

    // Quando modifico il nome del nuovo utente
    const handleChangeNome = (event) => setNewImp({...newImp, nome: event.target.value});

    // Quando modifico il chip del nuovo utente
    const handleChangeChip = (event) => setNewImp({...newImp, chip: event.target.value});

    // Quando inserisco un nuovo carattere nel form del chip
    const handleSetChip = (event) => {
        if (event.charCode === 13) {
            setNewImp({...newImp, chip: event.target.value});
            handleCloseChip();
        }
    };

    // newVal può essere un oggetto {nome: newName} oppure {chip: newChip}
    const handleEdit = (id, newVal) => {
        updateImpiegato(id, newVal, refresh)
    }

    // Quando creo il nuovo impiegato
    const handleAddImpiegato = (e) => {
        e.preventDefault()
        addImpiegato(newImp, refresh)
        handleCloseNewImpiegato()
    };

    // Quando faccio click sul bottone di eliminazione
    const handleDelete = (id) => {
        setDeleteId(id)
        handleShowConfirm();
    };

    // Quando confermo l'eliminazione
    const handleDeleteConfirm = () => {
        const id = deleteId;
        setDeleteId('');
        deleteImpiegato(id, refresh)
        handleCloseConfirm()
    }

    /* EFFECT */

    // Il secondo parametro [] serve per farlo eseguire una
    // volta sola quando avvii la pagina
    useEffect(refresh, []);


    /* RENDER */
    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Impiegati</h1>
                    </Row>
                </Col>
                <Col>
                    <Button
                        className='float-right vertical-center'
                        onClick={ handleShowNewImpiegato }>
                        Aggiungi impiegato
                    </Button>
                </Col>
            </Row>

            <ImpiegatiTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleShowAlert={ handleShowAlert } />

            <ModalNewImpiegato
                show={modalState.newImp}
                handleClose={handleCloseNewImpiegato}
                handleChangeNome={handleChangeNome}
                handleChangeChip={handleChangeChip}
                handleShowChip={handleShowChip}
                handleAddImpiegato={handleAddImpiegato}
                newImp={newImp} />

            <ModalChip
                show={modalState.chip}
                handleClose={handleCloseChip}
                handleSetChip={handleSetChip} />

            <ModalConfirm
                show={modalState.confirm}
                title='Conferma eliminazione'
                handleConfirm={handleDeleteConfirm}
                handleClose={handleCloseConfirm} >
                    <p>
                        Confermare l`&apos;`eliminazione?
                        ATTENZIONE! Questa operazione non è reversibile
                    </p>
            </ModalConfirm>
        </div>
    );
}

Impiegati.propTypes = {
    handleShowAlert: PropTypes.func.isRequired,
}

export default Impiegati;

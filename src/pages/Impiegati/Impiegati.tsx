import React, { ReactElement, useEffect, useState } from 'react';
import '../../css/Pages.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { Button, Col, Row } from 'react-bootstrap'
import { addImpiegato, deleteImpiegato, subscribeImpiegati, unsubscribeImpiegati} from '../../DAO/Impiegati.service';
import ModalChip from './ModalChip';
import ModalNewImpiegato from './ModalNewImpiegato';
import ImpiegatiTable from './ImpiegatiTable';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';
import Impiegato from '../../classes/Impiegato';

/** Pagina degli impiegati
 *
 * @param {object}  props properties
 *                  - handleShowAlert (function) handler che mostra l'alert
 * @return {Component} il component creato
 */
function Impiegati(): ReactElement {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const alerts = <>
        <AlertError
            show={error !== ''}
            message={error}
            handleClose={() => setError('')} />
        <AlertSuccess
            show={success !== ''}
            message={success}
            handleClose={() => setSuccess('')} />
    </>

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
    // const [deleteId, setDeleteId] = useState('');

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
    // Quando modifico il nome del nuovo utente
    const handleChangeNome = (event:any) => setNewImp({...newImp, nome: event.target.value});

    // Quando modifico il chip del nuovo utente
    const handleChangeChip = (event:any) => setNewImp({...newImp, chip: event.target.value});

    // Quando inserisco un nuovo carattere nel form del chip
    const handleSetChip = (event:any) => {
        if (event.charCode === 13) {
            console.log(data.map(el => el['chip']))
            let chipsList: Array<string> = data.map(el => el['chip'])
            let newChip: string = event.target.value
            if(chipsList.includes(newChip)){
                setError(`Chip "${newChip}" già associato ad unaltro impiegato, rimuoverlo o scegliere un altro chip.`)
            } else {
                setNewImp({...newImp, chip: newChip});
                handleCloseChip();
            }
        }
    };

    // Quando creo il nuovo impiegato
    const handleAddImpiegato = (e:any) => {
        e.preventDefault()
        addImpiegato(new Impiegato(newImp.nome, newImp.chip), setSuccess, setError)
        handleCloseNewImpiegato()
    };
    
    useEffect(() => {
        subscribeImpiegati(setData, setError)
        return () => {
            unsubscribeImpiegati()
        }
    }, []);

    return (
        <div className='page'>
            {alerts}
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
                setSuccess={setSuccess}
                setError={setError} />

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

        </div>
    );
}

export default Impiegati;

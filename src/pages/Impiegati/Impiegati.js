import React, { useEffect, useState } from 'react';
import '../../css/Pages.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'react-bootstrap';
import {impiegatiListener, addImpiegato, deleteImpiegato, updateImpiegato} from '../../DAO/Impiegati.service';
import ModalChip from './ModalChip';
import ModalNewImpiegato from './ModalNewImpiegato';
import ImpiegatiTable from './ImpiegatiTable';
import ModalConfirm from '../../components/ModalConfirm';

/**Pagina degli impiegati
 * 
 * @param {object}  props properties
 *                  - handleShowAlert (function) handler che mostra l'alert
 *                  
 */
function Impiegati(props) {
    /*************** STATE ***************/

    // Elenco degli impiegati 
    const [data, setData] = useState([]); 

    // Stato dei modal, quando sono true sono visibili. 
    const [modalState, setModalState] = useState({
        newImp: false,
        chip: false,
        confirm: false
    });

    // Il nuovo impiegato che deve essere creato.
    const [newImp, setNewImp] = useState({
        nome: '', 
        chip: ''
    });

    // L'id dell'elemento da eliminare
    const [deleteId, setDeleteId] = useState('');

    /*************** HANDLERS ***************/

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
        updateImpiegato(id, newVal)
    }

    // Quando creo il nuovo impiegato
    const handleAddImpiegato = () => {
        addImpiegato(newImp)
        handleCloseNewImpiegato();
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
        deleteImpiegato(id)
        handleCloseConfirm()
    }

    /*************** EFFECT ***************/

    // Il secondo parametro [] serve per farlo eseguire una volta sola quando avvii la pagina
    useEffect(() => {
        const unsubscribe = impiegatiListener( result => setData(result) )
        return () => unsubscribe()
    }, []);
    

    /*************** RENDER ***************/
    
    return (
        <div className='page'>

            <div className='container' style={{marginBottom: 10}}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <h1>Impiegati</h1>
                    </div>
                    <div className='col'>
                        <Button 
                            className='float-right vertical-center' 
                            onClick={handleShowNewImpiegato}>
                                Aggiungi impiegato
                        </Button>
                    </div>
                </div>
            </div>          

            <ImpiegatiTable 
                data={data} 
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleShowAlert={props.handleShowAlert} />

            <ModalNewImpiegato 
                show={modalState.newImp} 
                handleClose={handleCloseNewImpiegato} 
                handleChangeNome={handleChangeNome}
                handleChangeChip={handleChangeChip}
                handleShowChip={handleShowChip}
                handleAddImpiegato={handleAddImpiegato}
                newImp={newImp}/>

            <ModalChip 
                show={modalState.chip} 
                handleClose={handleCloseChip} 
                handleSetChip={handleSetChip}/>

            <ModalConfirm
                show={modalState.confirm} 
                title='Conferma eliminazione'  
                handleConfirm={handleDeleteConfirm} 
                handleClose={handleCloseConfirm} 
                >
                    <p>Confermare l'eliminazione? ATTENZIONE! Questa operazione non è reversibile</p>
            </ModalConfirm>

            <p>nome: {newImp.nome}, chip: {newImp.chip}</p>
        </div>
    );
}

export default Impiegati;

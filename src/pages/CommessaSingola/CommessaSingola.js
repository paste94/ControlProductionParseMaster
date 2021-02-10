import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import CommessaSingolaTable from './CommessaSingolaTable'
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from "react-router-dom";
import { editCommessaLavoro } from '../../DAO/Commesse.service'
import { addPreventivo, getAllPreventivi, deletePreventivo, editPreventivo } from '../../DAO/Preventivo.service';


/**
 * 
 * @param {object}  props properties
 *                  - commessa (object) la commessa da visualizzare, direttamente dal DB
 */
function CommessaSingola(props){
    /**
     * Componenti usate per la gestione del bottone indietro nella navigazione
     */
    let history = useHistory()

    const [update, setUpdate] = useState(true)
    const [data, setData] = useState([])

    const refresh = () => setUpdate(!update)
    const handleClickBack = () => history.goBack()
    const handleAdd = (newPreventivo) => addPreventivo(newPreventivo, props.commessa.id, refresh)
    const handleDelete = (id) => deletePreventivo(id, refresh)
    const handleEdit = (prevId, newPreventivo) => editPreventivo(prevId, newPreventivo, refresh)

        /**
         * Aggiunta o modifica di un articolo alla commessa. Si usa LA STESSA FUNZIONE 
         * 
         * @param {object} newJob l'articolo da aggiungere alla commessa
         */
        const handleAddEdit = (newJob) => {
            editCommessaLavoro(props.commessa.id, newJob, refresh)
        }

    useEffect(() => {
        getAllPreventivi(props.commessa.id, (data) => setData(data))
    }, [update, props.commessa.id])

    return (
        <div>
            {console.log(props.commessa)}
            <Row className='align-items-center'>
                <Col lg='1'>
                    <Button 
                        variant='transparent'
                        onClick={handleClickBack}><FaArrowLeft/></Button>
                </Col>
                <Col lg='8'>
                    <h1>Commessa {props.commessa.nome} {props.commessa.chiusa && '(chiusa)'}</h1>
                    {console.log(props.commessa)}
                </Col>
                <Col>
                    <ModalCommessaSingola
                        data={{
                            numPezzi:1,
                            costMat:0,
                            costoOrario:42,
                            numDisegno:'',
                            stozz:0,
                            squadr:0,
                            fresa:0,
                            tornio:0,
                            CN:0,
                            rettifica:0,
                            banco:0
                        }}
                        type='add'
                        fromPage='commessaSingola'
                        handleConfirm={ handleAdd }
                        confirmButtonText={'Aggiungi'} />
                </Col>
            </Row> 
            <Row>
                <Col>
                    <CommessaSingolaTable 
                        handleConfirm = { handleEdit }
                        handleDelete = { handleDelete }
                        data = { data }
                        id={ props.commessa.id }/>
                </Col>
            </Row>
        </div>

    )
}

export default CommessaSingola

import React, { useEffect, useState } from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import {deleteCommessa, getAllCommesse, updateCommessa, addCommessa} from '../../DAO/Commesse.service'
import { Col, Row, Button } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';

/**Pagina delle commesse
 * 
 * @param {object}  props properties
 *                  - handleShowAlert (function) handler che mostra l'alert
 *                  
 */
function Commesse(props){
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(true)

    const refresh = () => setUpdate(!update)
    const handleDelete = id => deleteCommessa(id, refresh)
    const handleEdit = (id, newVal) => updateCommessa(id, newVal, refresh)
    const handleAdd = (newCommessa) => {
        addCommessa(
            {
                nome: newCommessa.nome,
                numero: newCommessa.numero,
                data_offerta: new Date(newCommessa.data_offerta),
                data_consegna: new Date(newCommessa.data_consegna),
                preventivo: [],
                chiusa: false
            },
            refresh
        )  
    }

    // Il secondo parametro [] serve per farlo eseguire una volta sola quando avvii la pagina
    useEffect(() => {
        getAllCommesse( result => setData(result) )
    }, [update]);


    return (    
        <div className='page'>

            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse</h1>
                        <Button 
                            variant="link" 
                            size="lg" 
                            onClick={() => refresh()}> 
                                <MdRefresh color='grey' /> 
                            </Button>
                    </Row>
                </Col>
                <Col>
                    <ModalNewCommessa
                        handleShowAlert={props.handleShowAlert}
                        handleAdd={handleAdd}/>
                </Col>
            </Row>

            <CommesseTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleShowAlert={props.handleShowAlert} />

        </div>
    )
}

export default Commesse;

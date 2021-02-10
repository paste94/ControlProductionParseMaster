import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import DeleteButton from '../../components/DeleteButton';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Row, Col, Button } from 'react-bootstrap';
import { FaCheck, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

/**Definisce la tabella degli impiegati
 * 
 * @param {Object}  props Definisce le propertyes della tabella 
 *                  - data (array) elenco degli elementi
 *                  - handleDelete (function) Gestisce l'eliminazione dell'elemento
 *                  - handleEdit (function) Gestisce la modifica dell'elemento
 */
function CommesseTable(props){

    const handleDelete = (id) => {
        props.handleDelete(id)
    }

    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell, row, rowIndex, formatExtraData) => {
        const commessa = props.data[rowIndex]
        return (
            <Row>
                <Col lg='4' md='4' sm='4'>
                    <NavLink 
                        to={{
                            pathname: '/commessasingola',
                            state: {commessa: commessa}
                        }}>
                        <Button
                            variant='link'
                            title='Visualizza dettagli'
                            size='sm' >
                                <FaEye style={{color:'black'}}/>
                        </Button>
                    </NavLink>
                    
                </Col>
                <Col lg='4' md='4' sm='4'>
                    <Button 
                        variant='link'
                        title='Apri/chiudi commessa'
                        size='sm'
                        onClick={()=>{
                            if('chiusa' in row)
                                handleEdit(row.id, {chiusa: !row.chiusa})
                            else
                                handleEdit(row.id, {chiusa: true})
                        }} >
                            <FaCheck style={{color: 'black'}}/>
                    </Button>
                </Col>
                <Col lg='4' md='4' sm='4'>
                    <DeleteButton 
                        title={'Elimina commessa'}
                        handleConfirm={() => handleDelete(row.id)} >
                            <p>Eliminare definitivamente la commessa?</p>
                    </DeleteButton>
                </Col>
            </Row>
        );
    };

    const handleEdit = (id, newValue) => {
        if('data_offerta' in newValue){
            newValue.data_offerta = new Date(newValue.data_offerta)
        }else if('data_consegna' in newValue){
            newValue.data_consegna = new Date(newValue.data_consegna)
        }
        console.log('EDIT')
        props.handleEdit(id, newValue)
    }

    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden:true
    }, {
        dataField: 'nome',
        text: 'Nome'
    }, {
        dataField: 'numero',
        text: 'Numero'
    }, {
        dataField: 'data_offerta',
        text: 'Data Offerta',
        formatter: (cell) => {
            if(cell == null || cell === ''){
                return '-/-/-'
            }
            const [y, m, d] = cell.split('T')[0].split('-')
            return d + '/' + m + '/' + y
        },
        editor: {type: Type.DATE}
    }, {
        dataField: 'data_consegna',
        text: 'Data Consegna',
        formatter: (cell) => {
            if(cell == null || cell === ''){
                return '-/-/-'
            }
            const [y, m, d] = cell.split('T')[0].split('-')
            return d + '/' + m + '/' + y
        },
        editor: {type: Type.DATE}
    }, {
        dataField: 'chiusa',
        text: 'Chiusa',
        hidden:true
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        headerStyle: (colum, colIndex) => {
            return { width: '150px', textAlign: 'center' };
        },
        editable: false
    }];

    const rowStyle = (row, index) => {
        let style = {}
        if(row.chiusa){
            style.backgroundColor='#00e676'
        }
        return style
    }

    return (
        <div>
            <BootstrapTable 
                keyField='id' 
                data={ props.data } 
                columns={ columns } 
                pagination={ paginationFactory() }
                rowStyle={rowStyle}
                cellEdit={ cellEditFactory({ 
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => { 
                        let newVal = {}
                        newVal[column.dataField] = newValue
                        handleEdit(row.id, newVal)
                    }
                })} 
                />
        </div>
    )
}

export default CommesseTable

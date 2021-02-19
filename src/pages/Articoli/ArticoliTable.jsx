import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import DeleteButton from '../../components/DeleteButton';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

/**
 * Definisce la tabella per visualizzare e gestire gli articoli
 */
function ArticoliTable(props){
    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella 
     * 
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     */
    const defineButtons = (cell, row, rowIndex, formatExtraData) => (
        <Row>
            <Col lg='6' md='6' sm='6'>
                <ModalCommessaSingola
                    data={row}
                    handleConfirm={ (articolo) => props.handleEditArticolo(row.id, articolo) }
                    confirmButtonText={'Modifica'}
                    type={'edit'} />
            </Col>
            <Col lg='6' md='6' sm='6'>
                <DeleteButton 
                    title='Elimina'
                    handleConfirm={() => props.handleDeleteArticolo(row.id)} >
                        <p>Eliminare definitivamente l'articolo?</p>
                </DeleteButton>
            </Col>
        </Row>
    )
    
    // Definizione delle colonne
    const columns = [
        {
            dataField: 'numDisegno',
            text: 'Numero Disegno'
        }, {
            dataField: 'totOre',
            text: 'Tot Ore'
        }, {
            dataField: 'totPreventivo',
            text: 'Preventivo (€)'
        }, {
            dataField: 'azioni',
            text: 'Azioni',
            formatter: defineButtons,
        }
    ];

    // Definisce cosa mostrare quando la riga nella tabella viene espansa
    const expandRow = {
        renderer: row => {
            const firstElements = ['numPezzi', 'costMat', 'costoOrario']
            let sortedArr = Object.keys(row).sort()
            sortedArr = sortedArr.filter( item => 
                item !== firstElements[0] &&
                item !== firstElements[1] && 
                item !== firstElements[2] &&
                item !== 'numDisegno' &&
                item !== 'totOre' &&
                item !== 'totPreventivo' &&
                item !== 'id' &&
                item !== 'parent' &&
                item !== 'updatedAt' && 
                item !== 'eliminato' && 
                item !== 'createdAt'
            )
            sortedArr = firstElements.concat(sortedArr)
            sortedArr = sortedArr.filter(item => item !== 'id')

            const listItems = sortedArr.map((keyname) => 
                <Row>
                    <Col md='4'>{keyname}:</Col> 
                    <Col>{row[keyname]}</Col>
                    <hr style={
                        {
                            background:'#cfd8dc',
                            width:'97%',
                            marginTop:'0px', 
                            marginBottom:'0px'
                        }
                    }/>
                </Row>
            )
            return listItems
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands)   
                return <FaCaretDown/>;
            else
                return <FaCaretRight/>;
          },
          expandColumnRenderer: ({ expanded }) => {
            if (expanded) 
              return <FaCaretDown color='grey'/>;
            else
                return <FaCaretRight color='grey'/>;
          }
    };

    return (
        <div>
            <BootstrapTable 
                keyField='id' 
                data={ props.data } 
                columns={ columns } 
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

export default ArticoliTable

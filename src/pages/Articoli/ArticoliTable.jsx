import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Row, Col } from 'react-bootstrap'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ModalCommessaSingola from '../../components/ModalCommessaSingola'
import DeleteButton from '../../components/DeleteButton'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'
import PropTypes from 'prop-types'

/**
 * Definisce la tabella per visualizzare e gestire gli articoli
 * @param {*} props le properties del component
 * @return {Component} il component creato
 */
function ArticoliTable({data, handleEditArticolo, handleDeleteArticolo}) {
    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     * @return {Component} il component creato
     */
    const defineButtons = (cell, row, rowIndex, formatExtraData) => (
        <Row>
            <Col lg='6' md='6' sm='6'>
                <ModalCommessaSingola
                    data={row}
                    handleConfirm={
                        articolo => handleEditArticolo(row.id, articolo)
                    }
                    confirmButtonText='Modifica'
                    modalFrom='editArticolo' />
            </Col>
            <Col lg='6' md='6' sm='6'>
                <DeleteButton
                    title='Elimina'
                    handleConfirm={() => handleDeleteArticolo(row.id)} >
                        <p>Eliminare definitivamente l`&apos;`articolo?</p>
                </DeleteButton>
            </Col>
        </Row>
    )

    // Definizione delle colonne
    const columns = [
        {
            dataField: 'numDisegno',
            text: 'Numero Disegno',
        }, {
            dataField: 'totOre',
            text: 'Tot Ore',
        }, {
            dataField: 'totPreventivo',
            text: 'Preventivo (€)',
        }, {
            dataField: 'azioni',
            text: 'Azioni',
            formatter: defineButtons,
        },
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
                item !== 'createdAt' )
            sortedArr = firstElements.concat(sortedArr)
            sortedArr = sortedArr.filter(item => item !== 'id')

            const listItems = sortedArr.map( key =>
                <Row key={key}>
                    <Col md='4'>{key}:</Col>
                    <Col>{row[key]}</Col>
                    <hr style={
                        {
                            background: '#cfd8dc',
                            width: '97%',
                            marginTop: '0px',
                            marginBottom: '0px',
                        }
                    }/>
                </Row> )
            return listItems
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => { // TODO Snellisci
            if (isAnyExpands) return <FaCaretDown/>;
            else return <FaCaretRight/>;
        },
            expandColumnRenderer: ({ expanded }) => {
            if (expanded) return <FaCaretDown color='grey'/>;
            else return <FaCaretRight color='grey'/>;
        },
    }

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

ArticoliTable.propTypes = {
    data: PropTypes.array.isRequired,
    handleEditArticolo: PropTypes.func.isRequired,
    handleDeleteArticolo: PropTypes.func.isRequired,
}

export default ArticoliTable

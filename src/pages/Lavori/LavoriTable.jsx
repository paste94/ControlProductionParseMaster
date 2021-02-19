import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function LavoriTable(props){
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden:true
    },{
        dataField: 'commessaNome',
        text: 'Numero commessa'
    },{
        dataField: 'preventivoNome',
        text: 'Numero Disegno'
    },{
        dataField: 'macchina',
        text: 'Macchina'
    },{
        dataField: 'inizio',
        text: 'Data inizio',
        formatter: (cell) => {
            if(cell === undefined){
                return '-'
            }
            const dd = cell.getDate()
            const mm = cell.getMonth()+1
            const yy = cell.getFullYear()
            const hh = cell.getHours()
            const min = cell.getMinutes()
            return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min
        }
    },{
        dataField: 'fine',
        text: 'Data fine',
        formatter: (cell) => {
            if(cell === undefined){
                return '-'
            }
            const dd = cell.getDate()
            const mm = cell.getMonth()+1
            const yy = cell.getFullYear()
            const hh = cell.getHours()
            const min = cell.getMinutes()
            return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min
        }
    }];
    return (
        <div>
            <BootstrapTable 
                keyField='id'
                data={props.data}
                columns={ columns } 
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota" />
        </div>
    )
}

export default LavoriTable

import React from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import ButtonPrimary from './MUI-Button';

const ExportExcel = ({ excelData, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (<ButtonPrimary sx={{marginLeft:1, background:'#28A464', color:'white', "&:hover": { background: "#107C41" }}} label={"Guardar en Excel"} onClick={()=>exportToExcel(fileName)}/>)
}

export default ExportExcel;

export function compareSort (low, high, detail) {
    return low[detail].localeCompare(high[detail])
}

export function capitalizeFirstLowerCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
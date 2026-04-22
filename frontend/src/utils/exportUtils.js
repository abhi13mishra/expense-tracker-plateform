import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = "transactions") => {
    if (!data || data.length === 0) {
        alert("Empty data");
        return;
    }

    try {
        const worksheet = XLSX.utils.json_to_sheet(data);

        //for create woorkbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'transactions');

        //to generate a excel file and trigger download
        XLSX.writeFile(workbook, `${fileName}.xlsx`, {
            bookType: 'xlsx',
            type: 'array'
        });
    } catch (err) {
        console.error("export error: ", err);
        alert("Error exporting data. please try again.");
    }
}
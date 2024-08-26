function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function sortTable(columnIndex, id) {
    const table = document.getElementById(id);
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText;
        const bText = b.cells[columnIndex].innerText;

        if (columnIndex === 2) { // Assuming date column is the second column
            const aDate = parseDate(aText);
            const bDate = parseDate(bText);
            return bDate - aDate;
        }

        if (!isNaN(aText) && !isNaN(bText)) {
            return bText - aText;
        }

        return bText.localeCompare(aText);
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    sortedRows.forEach(row => tbody.appendChild(row));
}
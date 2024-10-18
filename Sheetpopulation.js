async function loadGoogleSheetData() {
    const apiKey = 'AIzaSyAaHKBRfGUfgtBdxGnlxEGEgamDOfxObqI';
    const sheetId = '1V-hZxykI0hHOLQpaZfTpsqBXXoioC6CdbAT7dsX6hxk';
    const range = 'Sheet1!A1:I20';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Google Sheets API Response:', data);

        if (data && data.values && data.values.length > 0) {
            const table = document.querySelector('#approval-process-table tbody');
            table.innerHTML = ''; // Clear existing table content

            data.values.slice(1).forEach(row => {
                const newRow = document.createElement('tr');
                row.forEach(cell => {
                    const newCell = document.createElement('td');
                    newCell.textContent = cell || 'N/A';
                    newRow.appendChild(newCell);
                });
                table.appendChild(newRow);
            });
        } else {
            throw new Error('No data found in the sheet');
        }
    } catch (error) {
        console.error('Error loading Google Sheet data:', error);
        const table = document.querySelector('#approval-process-table tbody');
        table.innerHTML = `<tr><td colspan="9" style="color: red;">Error loading data: ${error.message}</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', loadGoogleSheetData);

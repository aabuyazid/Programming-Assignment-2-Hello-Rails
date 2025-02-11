//= require rails-ujs
//= require_tree .
document.addEventListener('DOMContentLoaded', function () {

  const table = document.getElementById('movies-table');

  const headers = table.querySelectorAll('th[data-sortable]');

  // Flag to ensure event listeners are only attached once
  if (!table.dataset.listenersAttached) {
    headers.forEach(header => {
      header.addEventListener('click', () => {
        console.log('Header clicked:', header.textContent); 

        const column = header.getAttribute('data-sortable');
        const direction = header.getAttribute('data-direction') || 'asc';
        sortTable(column, direction, header);
        header.setAttribute('data-direction', direction === 'asc' ? 'desc' : 'asc');
      });
    });

    // Mark the table as having event listeners attached
    table.dataset.listenersAttached = true;
  }
});

function sortTable(column, direction, header) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const headerIndex = Array.from(headers).indexOf(header) + 1;

  rows.sort((a, b) => {
    const aValue = a.querySelector(`td:nth-child(${headerIndex})`).textContent.trim();
    const bValue = b.querySelector(`td:nth-child(${headerIndex})`).textContent.trim();

    if (column === 'release_date') {
      return direction === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
    } else {
      return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // Clear and re-append sorted rows
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
}

//= require rails-ujs
//= require_tree .
console.log('movies.js loaded'); // Debugging: Check if script is executed

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded'); // Debugging: Check if DOM is ready

  const table = document.getElementById('movies-table');
  console.log('Table found:', table); // Debugging: Check if table is found

  const headers = table.querySelectorAll('th[data-sortable]');
  console.log('Headers found:', headers.length); // Debugging: Check if headers are found

  headers.forEach(header => {
    header.addEventListener('click', () => {
      console.log('Header clicked:', header.textContent); // Debugging: Check if click event is triggered

      const column = header.getAttribute('data-sortable');
      const direction = header.getAttribute('data-direction') || 'asc';
      sortTable(column, direction, header);
      header.setAttribute('data-direction', direction === 'asc' ? 'desc' : 'asc');
    });
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
});

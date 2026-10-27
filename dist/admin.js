const money = minor => Number.isSafeInteger(minor) ? new Intl.NumberFormat('en-PH', { style:'currency', currency:'PHP' }).format(minor / 100) : '—';
function cell(row, value) {
  const td = document.createElement('td');
  td.textContent = String(value ?? '—');
  row.append(td);
}
try {
  const response = await fetch('/api/admin/report', { cache:'no-store' });
  if (!response.ok) throw new Error('Staff report unavailable.');
  const data = await response.json();
  const summary = document.querySelector('#admin-summary');
  for (const project of data.summary) {
    const card = document.createElement('article');
    card.className = 'admin-metric';
    const name = document.createElement('h2'), value = document.createElement('strong'), count = document.createElement('p');
    name.textContent = project.project_id.replaceAll('-', ' ');
    value.textContent = money(project.gross_minor);
    count.textContent = `${project.gifts} verified gifts · Net ${money(project.net_minor)}`;
    card.append(name, value, count); summary.append(card);
  }
  if (!data.summary.length) summary.textContent = 'No donations recorded yet.';
  const body = document.querySelector('#admin-donations');
  for (const item of data.donations) {
    const row = document.createElement('tr');
    [item.reference, item.project_id, money(item.amount_minor), money(item.fee_minor), money(item.net_minor),
      item.status, item.anonymous ? 'Anonymous' : item.donor_name, item.created_at].forEach(value => cell(row, value));
    body.append(row);
  }
} catch (error) { document.querySelector('#admin-error').textContent = error.message; }

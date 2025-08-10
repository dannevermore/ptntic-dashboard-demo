// Chart.js initialization for Observatoire and Dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lineChart')) {
    // Observatoire : courbe des indicateurs
    new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Connexion Internet (%)',
            data: [12, 15, 20, 28, 35],
            borderColor: '#22d3ee',
            fill: false
          },
          {
            label: 'Taux d’inclusion numérique (%)',
            data: [5, 8, 11, 18, 25],
            borderColor: '#38bdf8',
            fill: false
          }
        ]
      },
      options: { responsive: true }
    });
  }

  if (document.getElementById('barChart')) {
    // Dashboard : répartition projets par secteur
    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: ['Éducation', 'Santé', 'Agri.', 'Infra.', 'Autres'],
        datasets: [{
          label: 'Nombre de projets',
          data: [8, 5, 4, 6, 3],
          backgroundColor: '#22d3ee'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  // Leaflet map for dashboard & cybersecurité
  if (document.getElementById('map')) {
    const map = L.map('map').setView([-2.8, 23.7], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    fetch('projets.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(p => {
          L.marker([p.lat, p.lon])
            .addTo(map)
            .bindPopup(`<strong>${p.nom}</strong><br>${p.province}`);
        });
      });
  }
});

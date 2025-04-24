function updateChart() {
    const ctx = document.getElementById("habitChart").getContext("2d");
  
    const dates = [];
    const counts = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - 6 + i);
      const dateStr = formatDate(date);
      dates.push(dateStr);
  
      const status = habitStatusByDate[dateStr] || {};
      const doneCount = Object.values(status).filter(v => v).length;
      counts.push(doneCount);
    }
  
    if (window.habitChartInstance) {
      window.habitChartInstance.data.labels = dates;
      window.habitChartInstance.data.datasets[0].data = counts;
      window.habitChartInstance.update();
    } else {
      window.habitChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [{
            label: "Habits Done",
            data: counts,
            borderColor: "#7c3aed",
            backgroundColor: "#c4b5fd",
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
  
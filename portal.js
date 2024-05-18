document.addEventListener("DOMContentLoaded", () => {
    const getDataButton = document.getElementById("getData");
    const countrySelect = document.getElementById("country");
    const countryName = document.getElementById("countryName");
    const cases = document.getElementById("cases");
    const deaths = document.getElementById("deaths");
    const recovered = document.getElementById("recovered");
    const ctx = document.getElementById('covidChart').getContext('2d');
    let covidChart;

    // Fetch list of countries and populate the dropdown
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.country;
                option.textContent = country.country;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));

    function fetchData(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                countryName.textContent = `Country: ${data.country}`;
                cases.textContent = `Cases: ${data.cases}`;
                deaths.textContent = `Deaths: ${data.deaths}`;
                recovered.textContent = `Recovered: ${data.recovered}`;

                updateChart(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                countryName.textContent = 'Country: Not Found';
                cases.textContent = 'Cases: N/A';
                deaths.textContent = 'Deaths: N/A';
                recovered.textContent = 'Recovered: N/A';
            });
    }

    function updateChart(data) {
        if (covidChart) {
            covidChart.destroy();
        }

        fetch(`https://disease.sh/v3/covid-19/historical/${data.country}?lastdays=30`)
            .then(response => response.json())
            .then(historicalData => {
                const dates = Object.keys(historicalData.timeline.cases);
                const casesData = Object.values(historicalData.timeline.cases);
                const deathsData = Object.values(historicalData.timeline.deaths);
                const recoveredData = Object.values(historicalData.timeline.recovered);

                covidChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'Cases',
                                data: casesData,
                                borderColor: 'rgba(0, 123, 255, 1)',
                                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                                fill: true
                            },
                            {
                                label: 'Deaths',
                                data: deathsData,
                                borderColor: 'rgba(255, 0, 0, 1)',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                fill: true
                            },
                            {
                                label: 'Recovered',
                                data: recoveredData,
                                borderColor: 'rgba(0, 255, 0, 1)',
                                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching historical data:', error));
    }

    getDataButton.addEventListener("click", () => {
        const country = countrySelect.value;
        if (country) {
            fetchData(country);
        } else {
            alert("Please select a country");
        }
    });
});

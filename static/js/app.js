function init() {
    // Initial call of the functions
    generatePieChartTypes();
    generateLineGrapCityPerYearPrice();
    generateBarChartAveragePriceByCity();
    generateBarChartAveragePriceByYear();
    generatePieChartCities();
}

function generatePieChartTypes() {
    d3.json("http://127.0.0.1:5000/api/v1.0/Socio-Economic-types").then(function(data) {
        console.log(data);
        console.log(data);
        let labels = Object.keys(data);
        let values = Object.values(data);
        // Here we can specify the colors for each bar. If we have more socio-economic types, we have to add more colors.
        let colors = ['#80CED7', '#DD2D4A', '#C874D9', '#F7B801', '#F18701']; 

        let trace = {
            type: 'pie',
            labels: labels,
            values: values,
            marker: {
                colors: colors
            }
        };
        let layout = {
            title: 'Socio-Economic Types'
        };
        Plotly.newPlot('piePlotTypes', [trace], layout);
    });
}

function generateBarChartAveragePriceByYear() {
    d3.json("http://127.0.0.1:5000/api/v1.0/Average-Price-per-year").then(function(data) {
        let trace = {
            x: Object.keys(data),
            y: Object.values(data),
            type: 'bar',
            // Here we can specify the colors for each bar. If we add more cities, we have to add more colors.
            marker: {
                color: ['#800080', '#0000FF', '#9DACFF', '#76E5FC', '#4BC0D9']
            }
        };
        let layout = {
            title: 'Average Prices by Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Average Price',
                range: [0, 10000000]
            }
        };
        Plotly.newPlot('bar-chart-price-by-year', [trace], layout);
    });
}

function generateBarChartAveragePriceByCity() {
    d3.json("http://127.0.0.1:5000/api/v1.0/Average-per-city").then(function(data) {
        let trace = {
            x: Object.keys(data),
            y: Object.values(data),
            type: 'bar',
            // Here we can specify the colors for each bar. If we add more cities, we have to add more colors.
            marker: {
                color: ['#800080', '#0000FF', '#C874D9', '#E1BBC9', '#8AC6D0']
            }
        };
        let layout = {
            title: 'Average Prices by City',
            xaxis: {
                title: 'City'
            },
            yaxis: {
                title: 'Average Price',
                range: [0, 10000000]
            }
        };
        Plotly.newPlot('bar-chart-price-by-city', [trace], layout);
    });
}

function generatePieChartCities() {
    d3.json("http://127.0.0.1:5000/api/v1.0/Cities").then(function(data) {
        console.log(data);
        console.log(data);
        console.log(data);
        let labels = Object.keys(data);
        let values = Object.values(data);
        // Here we can specify the colors for each bar. If we have more socio-economic types, we have to add more colors.
        let colors = ['#80CED7', '#DD2D4A', '#C874D9', '#F7B801', '#F18701']; 

        let trace = {
            type: 'pie',
            labels: labels,
            values: values,
            marker: {
                colors: colors
            }
        };
        let layout = {
            title: 'Cities'
        };
        Plotly.newPlot('piePlotCities', [trace], layout);
    });
}

function generateLineGrapCityPerYearPrice(city = 'Cancun') {
    d3.json("http://127.0.0.1:5000/api/v1.0/Average-price-city-per-year").then(function(data) {
    
        let transformedData = {};
        for (let key in data) {
            let [city,year] = key.split('_');
            if(!transformedData[city]) {
                transformedData[city] = {};
            }
            transformedData[city][year] = data[key];
        }

        let city = 'Cancun';
        let cityData = transformedData[city];
        console.log('data', data);
        console.log('city', city);
        console.log('cityData', cityData);

        let trace = {
            type: 'scatter',
            mode: 'lines+markers',
            x: cityData ? Object.keys(cityData) : [],
            y: cityData ? Object.values(cityData) : [],
            name: `Average Price - ${city}`
        };
        let layout = {
            title : `Average Price - ${city}`,
            xaxis: {title: 'Year'},
            yaxis: {title: 'Average price',
            range: [0, 10000000]},
            //paper_bgcolor: '#00000', // background color
            //plot_bgcolor: '#B5D3E4' // graph color
        }
        Plotly.newPlot('linePlot', [trace], layout);
        window.updatePlot = function(newCity) {
            let newCityData = transformedData[newCity];

            if(!newCityData) {
                console.error('No data for city', newCity);
                return;
            }
            let update = {
                x: [newCityData ? Object.keys(newCityData) : []],
                y: [newCityData ? Object.values(newCityData) : []]
            };

            let newLayout = {
                title: `Average Price - ${newCity}`
            };

            Plotly.update('linePlot', update, newLayout);
        }
    })
}

document.addEventListener('DOMContentLoaded', init);
d3.json("http://127.0.0.1:5000/api/v1.0/Socio-Economic-types").then(function(data) {
  console.log(data);
});

d3.json("http://127.0.0.1:5000/api/v1.0/Average-Price-per-year").then(function(data) {
    console.log(data);
});

d3.json("http://127.0.0.1:5000/api/v1.0/Average-per-city").then(function(data) {
    console.log(data);
});

d3.json("http://127.0.0.1:5000/api/v1.0/Cities").then(function(data) {
    console.log(data);
});

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
        xaxis: {title: 'Year' },
        yaxis: {title: 'Average price'}

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
});
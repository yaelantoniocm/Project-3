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
    console.log(data);
});
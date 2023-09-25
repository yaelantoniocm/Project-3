import numpy as np
import pandas as pd

# Imports of the SQLAlchemy toolkit
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect
from sqlalchemy import MetaData

# Imports of the Flask framework
from flask import Flask, jsonify
from flask_cors import CORS

# Crear un motor de base de datos que sabe cómo conectarse a tu base de datos SQLite.
engine = create_engine('sqlite:///assets/info_houses.sqlite')

# Reflect the metadata of the database linked to the engine. This loads the information from all the tables in the database.
metadata = MetaData()
metadata.reflect(bind=engine)

# Create an inspector object to inspect the database connected to the engine.
inspector = inspect(engine)

# Print the names of all tables in the database.
print(inspector.get_table_names())

# Access the 'all_info_houses' table through the metadata object and store it in the Price_houses variable.
Price_houses = metadata.tables['all_info_houses']

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Enable CORS for the Flask app, can accept requests from all origins.
CORS(app)

#################################################
# Flask Routes
#################################################


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:!!!!!!<br/>"
        f"/api/v1.0/Socio-Economic-types<br/>"
        f"/api/v1.0/Average-Price-per-year<br/>"
        f"/api/v1.0/Cities<br/>"
        f"/api/v1.0/Average-per-city<br/>"
        f"/api/v1.0/Average-price-city-per-year<br/>"
    )


@app.route("/index")
def serve_index():
    return app.send_static_file('index.html')


@app.route("/api/v1.0/Socio-Economic-types")
def Socio_Economic_type():
    # Create a session
    session = Session(engine)

    query = "SELECT * FROM all_info_houses"
    df = pd.read_sql(query, engine)

    # Obtener los tipos únicos en 'Socioeconomic_category' y su frecuencia
    socio_economic_types = df['Socioeconomic_category'].value_counts(
    ).to_dict()

    session.close()

    return jsonify(socio_economic_types)


@app.route("/api/v1.0/Average-Price-per-year")
def Average_Price_per_year():
    # Create a session
    session = Session(engine)

    query = "SELECT * FROM all_info_houses"
    df = pd.read_sql(query, engine)

    df['year'] = pd.to_datetime(
        df['Date_of_registration'], format='%d/%m/%Y').dt.year
    avg_price_per_year = df.groupby('year')['Avg_price'].mean().to_dict()

    return jsonify(avg_price_per_year)


@app.route("/api/v1.0/Average-per-city")
def Avereg_per_city():
    # Create a session
    session = Session(engine)

    query = "SELECT * FROM all_info_houses"
    df = pd.read_sql(query, engine)

    avg_price_per_city = df.groupby('City')['Avg_price'].mean().to_dict()

    return jsonify(avg_price_per_city)


@app.route("/api/v1.0/Cities")
def Cities():
    # Create a session
    session = Session(engine)

    query = "SELECT * FROM all_info_houses"
    df = pd.read_sql(query, engine)

    # Convert list of tuples into normal list
    cities = df['City'].value_counts().to_dict()

    session.close()

    return jsonify(cities)


@app.route("/api/v1.0/Average-price-city-per-year")
def Average_price_city_per_year():
    # Create a session
    session = Session(engine)

    query = "SELECT * FROM all_info_houses"
    df = pd.read_sql(query, engine)

    df['year'] = pd.to_datetime(
        df['Date_of_registration'], format='%d/%m/%Y').dt.year
    avg_price_per_city_per_year = df.groupby(['City', 'year'])[
        'Avg_price'].mean().reset_index()

    # Convert list of tuples into normal list
    json_ready_dict = {f"{row['City']}_{row['year']}": row['Avg_price']
                       for index, row in avg_price_per_city_per_year.iterrows()}

    return jsonify(json_ready_dict)


if __name__ == '__main__':
    app.run(debug=True)

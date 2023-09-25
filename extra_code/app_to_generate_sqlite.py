import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

# Load the houses info dataset into a pandas DataFrame from a CSV file
df_info = pd.read_csv(
    './assets/info_house.csv', low_memory=False, encoding='ISO-8859-1')

engine = create_engine('sqlite:///assets/info_houses.sqlite')

# Escribir el DataFrame a la base de datos SQLite
df_info.to_sql('all_info_houses', engine, index=False,
               if_exists='replace')

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)
print(Base.classes.keys())

# Save reference to the table
if 'all_info_houses' in Base.classes.keys():
    Price_houses = Base.classes.all_info_houses

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create a SQLAlchemy instance
db = SQLAlchemy()

# SQLite database URI (change this if needed)
DATABASE_URI = 'sqlite:///journal.db'

def init_app(app):
    app.config['JWT_SECRET_KEY'] = 'your_secret_key'
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    migrate = Migrate(app, db)
    db.init_app(app)

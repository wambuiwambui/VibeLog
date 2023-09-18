from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy import Text
from config import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    # Define the one-to-many relationship with the JournalEntry model
    journal_entries = relationship('JournalEntry', backref='author', lazy=True)

    # set pass in hashed value
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    # check if pass matches hashed pass

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Define the SQLAlchemy model for journal entries


class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(Text)

    # Define a foreign key relationship to the User model
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Define the relationship between JournalEntry and User
    user = relationship('User', backref='entries')

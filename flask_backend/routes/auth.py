from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from config import db  # Import db from extensions.py
from models.models import User


# Create Blueprint for authentication
auth = Blueprint('auth', __name__)


# Login to generate access token
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({"message": "invalid"}), 401

    # Create access token/refresh tokens
    access_token = create_access_token(identity=username)
    #specify the token is fresh
    refresh_token = create_access_token(identity=username, fresh=True)

    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

# Protected route that requires jwt authentication
@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

#signup route
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email=data.get('email')
    password = data.get('password')

    
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"message": "User exists"})
    
    #add user to database
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User successfully created"}), 201

#generate access token using refresh token
@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200










                        





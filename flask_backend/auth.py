from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

#Create Blueprint for authentication
auth = Blueprint('auth', __name__)

#user dictionary(store username-passwords pairs)
users = []

# Login to generate access token
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    #check if username exists
    for user in users:
        if not user[username] or user[password] != password:
            return jsonify({"message": "Invalid credentials"}), 401

    # Create access token/refresh tokens
    access_token = create_access_token(identity=username)
    #specify the token is fresh
    refresh_token = create_access_token(identity=username, fresh=True)

    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

# Protected route that requires authentication
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

    for user in users:
        if user.get(username) == username:
            return jsonify({"message": "Username exists"}), 400
    
    #add user to database
    users.append({
        username: username,
        email: email,
        password: password
    })

    return jsonify({"message": "User successfully created"}), 201

#generate access token using refresh token
@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200










                        





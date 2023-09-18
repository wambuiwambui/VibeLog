from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth import auth
from routes.journals import journals
from config import init_app

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///journal.db'
jwt = JWTManager(app)

init_app(app=app)

# Register your blueprints
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(journals, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True, port=5001)


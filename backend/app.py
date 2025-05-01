from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt
from functools import wraps


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration
app.config['SECRET_KEY'] = 'votre_cle_secrete_super_securisee'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mi-pass.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modèles
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class PasswordEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    website = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120))
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# Décorateur pour vérifier le token JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

# Routes d'authentification
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    
    new_user = User(
        email=data['email'],
        password=hashed_password
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully!'}), 201
    except:
        return jsonify({'message': 'User already exists!'}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'message': 'User not found!'}), 404
    
    if check_password_hash(user.password, data['password']):
        token = jwt.encode({
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        
        return jsonify({'token': token}), 200
    
    return jsonify({'message': 'Wrong password!'}), 401

# Routes pour les mots de passe
@app.route('/passwords', methods=['GET'])
@token_required
def get_passwords(current_user):
    passwords = PasswordEntry.query.filter_by(user_id=current_user.id).all()
    
    output = []
    for password in passwords:
        password_data = {}
        password_data['id'] = password.id
        password_data['website'] = password.website
        password_data['username'] = password.username
        password_data['password'] = password.password
        output.append(password_data)
    
    return jsonify({'passwords': output}), 200

@app.route('/passwords', methods=['POST'])
@token_required
def add_password(current_user):
    data = request.get_json()
    
    new_password = PasswordEntry(
        website=data['website'],
        username=data['username'],
        password=data['password'],
        user_id=current_user.id
    )
    
    db.session.add(new_password)
    db.session.commit()
    
    return jsonify({'message': 'Password added successfully!'}), 201

@app.route('/passwords/<int:password_id>', methods=['DELETE'])
@token_required
def delete_password(current_user, password_id):
    password = PasswordEntry.query.filter_by(id=password_id, user_id=current_user.id).first()
    
    if not password:
        return jsonify({'message': 'Password not found!'}), 404
    
    db.session.delete(password)
    db.session.commit()
    
    return jsonify({'message': 'Password deleted successfully!'}), 200

# Génération de mot de passe sécurisé
@app.route('/generate-password', methods=['GET'])
@token_required
def generate_password(current_user):
    import random
    import string
    
    length = 12
    characters = string.ascii_letters + string.digits + string.punctuation
    secure_password = ''.join(random.choice(characters) for i in range(length))
    
    return jsonify({'password': secure_password}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
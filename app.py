from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os

app = Flask(__name__)

RESERVATIONS_FILE = 'reservations.json'

def load_reservations():
    if os.path.exists(RESERVATIONS_FILE):
        with open(RESERVATIONS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_reservations(reservations):
    with open(RESERVATIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(reservations, f, ensure_ascii=False, indent=2)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/reservation')
def reservation():
    return render_template('reservation.html')

@app.route('/bungalows')
def bungalows():
    return render_template('bungalows.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/api/reservation', methods=['POST'])
def create_reservation():
    try:
        data = request.get_json()
        
        required_fields = ['name', 'email', 'phone', 'checkIn', 'checkOut', 'guests', 'bungalow']
        if not all(field in data for field in required_fields):
            return jsonify({'message': 'Tüm gerekli alanlar doldurulmalıdır.'}), 400
        
        try:
            check_in = datetime.strptime(data['checkIn'], '%Y-%m-%d')
            check_out = datetime.strptime(data['checkOut'], '%Y-%m-%d')
            
            if check_out <= check_in:
                return jsonify({'message': 'Çıkış tarihi giriş tarihinden sonra olmalıdır.'}), 400
        except ValueError:
            return jsonify({'message': 'Tarih formatı hatalı.'}), 400
        
        data['timestamp'] = datetime.now().isoformat()
        
        reservations = load_reservations()
        
        reservations.append(data)
        
        save_reservations(reservations)
        
        # TODO: Send email notification to admin and customer
        # TODO: Add database integration instead of JSON file
        
        return jsonify({
            'message': 'Rezervasyon başarıyla kaydedildi!',
            'reservation_id': len(reservations)
        }), 201
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'message': 'Bir hata oluştu. Lütfen tekrar deneyiniz.'}), 500

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        reservations = load_reservations()
        return jsonify(reservations), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'message': 'Bir hata oluştu.'}), 500

if __name__ == '__main__':
    app.run(debug=True)

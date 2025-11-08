from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

branches = [
    {
        "id": 1,
        "branch": "Kukatpally",
        "water_check": True,
        "nutrient_check": True,
        "temp_check": True,
        "issues": "",
        "solution": "",
        "last_updated": "2025-10-21"
    },
    {
        "id": 2,
        "branch": "Miyapur",
        "water_check": True,
        "nutrient_check": False,
        "temp_check": True,
        "issues": "pH low",
        "solution": "Add pH+",
        "last_updated": "2025-10-21"
    },
    {
        "id": 3,
        "branch": "Gachibowli",
        "water_check": False,
        "nutrient_check": True,
        "temp_check": True,
        "issues": "No water",
        "solution": "Fill tank",
        "last_updated": "2025-10-21"
    },
    {
        "id": 4,
        "branch": "Bahadurpally",
        "water_check": True,
        "nutrient_check": True,
        "temp_check": False,
        "issues": "Sensor issue",
        "solution": "Restart system",
        "last_updated": "2025-10-21"
    },
]

@app.route('/api/branches', methods=['GET'])
def get_branches():
    return jsonify(branches)

@app.route('/api/branches/<int:branch_id>', methods=['PUT'])
def update_branch(branch_id):
    data = request.json
    for branch in branches:
        if branch["id"] == branch_id:
            branch.update(data)
            branch["last_updated"] = datetime.date.today().isoformat()
            return jsonify(branch)
    return jsonify({"error": "Branch not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)


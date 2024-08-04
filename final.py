from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Load data from CSV
# Make sure your CSV file has columns: course_id, course_name, career_path, rating
df = pd.read_csv('NEW.csv')


@app.route('/get_resources', methods=['POST'])
def get_resources():
    try:
        request_data = request.json
        career_path = request_data['career_path']
        print(f"Career Path: {career_path}")

        # Filter courses based on selected career path
        filtered_courses = df[df['career_path'] == career_path]
        sorted_courses = filtered_courses.sort_values(by='rating', ascending=False)

        # Convert to dictionary and return as JSON
        recommendations = sorted_courses.to_dict(orient='records')
        return jsonify({'resources': recommendations})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

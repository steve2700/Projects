from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Define a sample dataset of songs
songs = [
    {
        "title": "Song 1",
        "artist": "Artist 1",
        "genre": "Genre 1"
    },
    {
        "title": "Song 2",
        "artist": "Artist 2",
        "genre": "Genre 2"
    },
    # Add more songs to the dataset
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    # Get the 'liked' songs from the user's input
    liked_songs = request.json['liked_songs']

    # Implement your recommendation logic here
    # You can use the 'liked_songs' to generate recommendations

    # Return the recommended songs as a JSON response
    recommended_songs = songs[:3]  # Placeholder, return the first 3 songs for demonstration
    return jsonify({'recommended_songs': recommended_songs})

if __name__ == '__main__':
    app.run(debug=True, port=8000)


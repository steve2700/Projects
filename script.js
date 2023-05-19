document.getElementById('liked-songs-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var likedSongsInput = document.getElementById('liked-songs');
    var likedSongs = likedSongsInput.value.trim();

    // Send a POST request to the backend API
    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'liked_songs': likedSongs
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display the recommended songs on the web page
        var recommendedSongsDiv = document.getElementById('recommended-songs');
        recommendedSongsDiv.innerHTML = '';

        data.recommended_songs.forEach(function(song) {
            var songElement = document.createElement('p');
            songElement.innerText = song.title + ' - ' + song.artist;
            recommendedSongsDiv.appendChild(songElement);
        });
    });

    likedSongsInput.value = '';
});


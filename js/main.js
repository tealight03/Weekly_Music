//오늘의 음악 플레이리스트
const postTodayPlaylist = async () => {
    const response = await fetch('/api/getTodayMusic')
    .then(response => response.json())
    .then(data => {
        const item = document.querySelector(".wrapper-swip");
        data.forEach((row) => {
            const div = document.createElement('div');
            div.id = "item";
            (function(index) {
                div.addEventListener('click', function() {
                    location.href = '/track?data=' + index;
                });
            })(row["idmusic"]);
        
            const cover = document.createElement('img');
            cover.id = "cover";
            cover.src = "/images/"+row["idmusic"]+".jpg";
            const title = document.createElement('span');
            title.id = "title";
            title.textContent = row["music_name"];
            const artist = document.createElement('span');
            artist.id = "artist";
            artist.textContent = row["music_singer"];
        
            div.appendChild(cover);
            div.appendChild(title);
            div.appendChild(artist);
        
            item.appendChild(div);
        })     
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    postTodayPlaylist();
});
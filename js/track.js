//트랙 번호 
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataStr = urlParams.get('data');
var dataNum = parseInt(dataStr);

//플레이리스트(회원)
if(document.cookie.indexOf('user=') !== -1){
    const playList = document.querySelector(".play-list");
    const list = document.createElement('div');
    list.className = "list-item";
    playList.append(list);
}

//트랙
const playMusic = async () => {
    const response = await fetch('/api/getMusic')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.list-item');
        data.forEach((row) => {
            if(row["idmusic"] === dataNum){
                const coverSection = document.querySelector(".cover-img");
                const cover = document.createElement("img");
                cover.src = "/images/"+row["idmusic"]+".jpg";
                coverSection.append(cover);
                
                const detailSection = document.querySelector(".song-details");
                
                const title = document.createElement("p");
                title.className = "name";
                title.textContent = row["music_name"];
                detailSection.append(title);
                
                const artist = document.createElement("p");
                artist.className = "artist";
                artist.textContent = row["music_signer"];
                detailSection.append(artist);
                
                const audio = document.querySelector("#main-audio");
                audio.src = "/music/"+row["idmusic"]+".mp3";
            }
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    playMusic();
});
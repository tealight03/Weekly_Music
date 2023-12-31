//플레이리스트
const postPlaylist = async () => {
    const response = await fetch('/api/getPlaylist')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.list-item');
        data.forEach((row) => {
            if(document.cookie === "user="+row["user_userid"]){
                const item = document.createElement("div");
                item.className = "container p-3 my-3 border";

                const wrapper = document.createElement("div");
                wrapper.className = "track"; 
                (function(index) {
                    wrapper.addEventListener('click', function() {
                        location.href = '/track?data='+index;
                    });
                })(row["music_idmusic"]);

                const cover = document.createElement("img");
                cover.id = "cover";
                cover.src = "../images/"+row["music_idmusic"]+".jpg";

                const musicInfo = document.createElement("div");
                musicInfo.className = "music-info";

                const title = document.createElement("div");
                title.id = "title";
                title.textContent = row["music_name"];

                const artist = document.createElement("div");
                artist.id = "artist";
                artist.textContent = row["music_singer"];

                const hambugerImg = document.createElement("img");
                hambugerImg.id = "hambuger";
                hambugerImg.src = "/images/hamburgerbtn.png";

                musicInfo.appendChild(title);
                musicInfo.appendChild(artist);

                wrapper.appendChild(cover);
                wrapper.appendChild(musicInfo);
                wrapper.appendChild(hambugerImg);

                item.appendChild(wrapper);

                list.append(item);
            }
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    postPlaylist();
});
//전체 음악 리스트
const postMusiclist = async () => {
    const response = await fetch('/api/getMusic')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.list-item');
        data.forEach((row) => {
            const item = document.createElement("div");
            item.className = "container p-3 my-3 border";

            const wrapper = document.createElement("div");
            wrapper.className = "track"; 
            (function(index) {
                wrapper.addEventListener('click', function() {
                    location.href = '/track?data='+index;
                });
            })(row["idmusic"]);

            const cover = document.createElement("img");
            cover.id = "cover";
            cover.src = "../images/"+row["idmusic"]+".jpg";

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
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    postMusiclist();
});

//검색 리스트
const searchMusic = async (word) => {
    try {
        const response = await fetch('/api/searchMusic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word: word })
        });

        if (response.ok) {
            const data = await response.json();
            const list = document.querySelector('.list-item');
            list.innerHTML = "";

            data.forEach((row) => {
                const item = document.createElement("div");
                item.className = "container p-3 my-3 border";

                const wrapper = document.createElement("div");
                wrapper.className = "track"; 
                (function(index) {
                    wrapper.addEventListener('click', function() {
                        location.href = '/track?data=' + index;
                    });
                })(row["idmusic"]);

                const cover = document.createElement("img");
                cover.id = "cover";
                cover.src = "../images/" + row["idmusic"] + ".jpg";

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

                list.appendChild(item);
            });
        } else {
            console.error("서버 응답 에러");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const searchbtn = document.querySelector("#serchbutton");
searchbtn.addEventListener('click', () => {
    const removeList = document.querySelector('.list-item');
    removeList.innerHTML = "";
    const word = document.querySelector('#inputbox'); 
    searchMusic(word.value);
})
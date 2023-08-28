//플레이리스트 추가
const addPlayList = async (user, index) => {
    try {
        const response = await fetch('/api/addPlayList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user, index: index })
        });

        if (response.ok) {
            alert("음원이 플레이리스트에 추가되었습니다.")
        } else {
            console.error("서버 응답 에러");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

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

            const cover = document.createElement("img");
            cover.id = "cover";
            cover.src = "../images/"+row["idmusic"]+".jpg";

            const musicInfo = document.createElement("div");
            musicInfo.className = "music-info";
            (function(index) {
                musicInfo.addEventListener('click', function() {
                    location.href = '/track?data='+index;
                });
            })(row["idmusic"]);

            const title = document.createElement("div");
            title.id = "title";
            title.textContent = row["music_name"];

            const artist = document.createElement("div");
            artist.id = "artist";
            artist.textContent = row["music_singer"];

            const hambugerImg = document.createElement("img");
            hambugerImg.id = "hambuger";
            hambugerImg.src = "/images/plusbutton.png";
            (function(index) {
                if(document.cookie.indexOf('user=') === -1){
                    hambugerImg.addEventListener('click', function() {
                        alert("로그인 후 이용 가능합니다.");
                        window.location.href = '/login';
                    });
                }else{
                    const cookie = document.cookie;
                    const user = cookie.split('=')[1];
                    hambugerImg.addEventListener('click', function() {
                        addPlayList(user, index);
                    });
                }
            })(row["idmusic"]);

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
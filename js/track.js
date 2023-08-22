//트랙 번호 
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataStr = urlParams.get('data');
var dataNum = parseInt(dataStr);


//트랙 불러오기
const postTrack = async () => {
    const response = await fetch('/api/getMusic')
    .then(response => response.json())
    .then(data => {
        data.forEach((row) => {
            if(row["idmusic"] === dataNum){
                const coverSection = document.querySelector(".img-area");
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
                artist.textContent = row["music_singer"];
                detailSection.append(artist);
                
                const audio = document.querySelector("#main-audio");
                audio.src = "/music/"+row["idmusic"]+".mp3";
            }
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    postTrack();
});


//플레이리스트(회원)
const showPlayList = async () => {
    if(document.cookie.indexOf('user=') !== -1){
        const playList = document.querySelector(".play-list");
        const list = document.createElement('div');
        list.className = "list-item";
        playList.append(list);
    }else{
        alert("로그인 후 이용 가능합니다.");
        window.location.href = '/login';
    }
}

const postPlaylist = async () => {
    const response = await fetch('/api/getPlaylist')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.list-item');
        data.forEach((row) => {
            //if(document.cookie.indexOf('user=') === row["user_userid"]){
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

                musicInfo.appendChild(title);
                musicInfo.appendChild(artist);

                wrapper.appendChild(cover);
                wrapper.appendChild(musicInfo);

                item.appendChild(wrapper);

                list.append(item);
            //}
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

const playListbtn = document.getElementById("playlist");
playListbtn.addEventListener("click", () => {
    showPlayList();
    postPlaylist();
});


// 트랙 전환 (prev, next)
function prevlink(){
    if(dataNum == 1) dataNum = 40;
    else dataNum -= 1;
    window.location.href = '/track?data=' + dataNum;
}

const prevbtn = document.getElementById("prev");
prevbtn.addEventListener("click", () => {
    prevlink();
});

function nextlink(){
    if(dataNum == 40) dataNum = 1;
    else dataNum += 1;
    window.location.href = '/track?data=' + dataNum;
}

const nextbtn = document.getElementById("next");
nextbtn.addEventListener("click", () => {
    nextlink();
});
 

//음악 검색 
function searchlink(){
    window.location.href = "/search";
}

const searchbtn = document.getElementById("search");
searchbtn.addEventListener("click", () => {
    searchlink();
})

//음악 재생, 일시정지
const wrapper = document.querySelector(".wrapper");
const playPauseBtn = document.querySelector(".play-pause");
const mainAudio = document.querySelector("#main-audio");

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("img").src = "/images/stopbutton.png";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("img").src = "/images/playbutton.png";
    mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    if (isMusicPlay == true) {
        pauseMusic();
    }else {
        playMusic();
    }
})

//음악 진행 시간 업데이트
const progressArea = document.querySelector(".progress-area");
const progressBar = progressArea.querySelector(".progress-bar");

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;


    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", () => {
        let maindDuration = mainAudio.duration;
        let totalMin = Math.floor(maindDuration / 60);
        let totalSec = Math.floor(maindDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})

//음악 진행 바 이동 시 시간 업데이트
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
})
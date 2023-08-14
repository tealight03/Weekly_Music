//title, artist, cover
var track= [
    ["Moon", "방탄소년단", "../images/MapOfTheSoul.png"],
    ["golden hour (Ruel Remix)", "JVKE", "../images/goldenhour.jpg"],
    ["Bad Life", "Sigird & Bring Me The Horizon", "../images/badlife.jpg"], 
    ["Thirsty", "aespa", "../images/spicy.jpg"], 
    ["Butterfly (Prologue Mix)", "방탄소년단", "../images/butterfly.jpg"]
]


const list = document.querySelector('.list-item');

for(var i = 0; i < track.length; i++){
    const item = document.createElement("div");
    item.className = "container p-3 my-3 border";

    const wrapper = document.createElement("div");
    wrapper.className = "track"; 
    (function(index) {
        wrapper.addEventListener('click', function() {
            location.href = '/track?data=' + index;
        });
    })(i);

    const cover = document.createElement("img");
    cover.id = "cover";
    cover.src = track[i][2];

    const musicInfo = document.createElement("div");
    musicInfo.className = "music-info";

    const title = document.createElement("div");
    title.id = "title";
    title.textContent = track[i][0];

    const artist = document.createElement("div");
    artist.id = "artist";
    artist.textContent = track[i][1];

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
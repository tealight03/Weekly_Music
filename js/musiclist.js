// for search.html 
// JS code for brousing music data

var track= [
    ["Pretty Savage", "BLACKPINK", "../images/PrettySavage.jpg"],
    ["Butterfly (Prologue Mix)", "방탄소년단", "../images/butterfly.jpg"],
    ["Levitating(Feat. DaBaby)", "Dua Lipa", "../images/Levitating.jpg"], 
    ["LOCO", "ITZY(있지)", "../images/LOCO.jpg"], 
    ["우리의 새벽은 낮보다 뜨겁다", "SEVENTEEN", "../images/SEVENTEEN.jpg"]
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

    musicInfo.appendChild(title);
    musicInfo.appendChild(artist);

    wrapper.appendChild(cover);
    wrapper.appendChild(musicInfo);

    item.appendChild(wrapper);

    list.append(item);
}
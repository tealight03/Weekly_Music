//title, artist, cover
var track= [
    ["Moon", "방탄소년단", "../images/MapOfTheSoul.png"],
    ["golden hour (Ruel Remix)", "JVKE", "../images/goldenhour.jpg"],
    ["Bad Life", "Sigird & Bring Me The Horizon", "../images/badlife.jpg"], 
    ["Thirsty", "aespa", "../images/spicy.jpg"], 
    ["Butterfly (Prologue Mix)", "방탄소년단", "../images/butterfly.jpg"]
]

const item = document.querySelector(".wrapper-swip");

for(var i = 0; i < 5; i++){
    const div = document.createElement('div');
    div.id = "item";
    (function(index) {
        div.addEventListener('click', function() {
            location.href = '/track?data=' + index;
        });
    })(i);

    const cover = document.createElement('img');
    cover.id = "cover";
    cover.src = track[i][2];
    const title = document.createElement('span');
    title.id = "title";
    title.textContent = track[i][0];
    const artist = document.createElement('span');
    artist.id = "artist";
    artist.textContent = track[i][1];

    div.appendChild(cover);
    div.appendChild(title);
    div.appendChild(artist);

    item.appendChild(div);
}
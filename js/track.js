//title, artist, cover
var track= [
    ["Moon", "방탄소년단", "../images/MapOfTheSoul.png"],
    ["golden hour (Ruel Remix)", "JVKE", "../images/goldenhour.jpg"],
    ["Bad Life", "Sigird & Bring Me The Horizon", "../images/badlife.jpg"], 
    ["Thirsty", "aespa", "../images/spicy.jpg"], 
    ["Butterfly (Prologue Mix)", "방탄소년단", "../images/butterfly.jpg"]
]

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataStr = urlParams.get('data');
var dataNum = parseInt(dataStr);

const coverSection = document.querySelector(".cover-img");
const cover = document.createElement("img");
cover.src = track[dataNum][2];
coverSection.append(cover);

const detailSection = document.querySelector(".song-details");

const title = document.createElement("p");
title.className = "name";
title.textContent = track[dataNum][0];
detailSection.append(title);

const artist = document.createElement("p");
artist.className = "artist";
artist.textContent = track[dataNum][1];
detailSection.append(artist);

if(document.cookie.indexOf('user=') !== -1){
    const playList = document.querySelector(".play-list");
    const list = document.createElement('div');
    list.className = "list-item";
    playList.append(list);
}
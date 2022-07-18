const audio = document.querySelector('#audio');
const musicContainer = document.querySelector('.music-player');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const progressBar = document.querySelector('.seek-bar');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');


let songIndex = 0;

setSong(songs[songIndex])

function setSong(song) {
    songName.innerText = song.name;
    audio.src = song.path;
    artistName.innerText = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerText = '00:00';
    setTimeout(() => {
        progressBar.max = audio.duration;
        totalTime.innerText = setTime(audio.duration);
    }, 300);
}

function setTime(time) {
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(() => {
    progressBar.value = audio.currentTime;
    currentTime.innerText = setTime(audio.currentTime);
    if(Math.floor(audio.currentTime) == Math.floor(progressBar.max)) {
        nextSong();
    }
}, 500)

progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value;
})

function playSong() {
    musicContainer.classList.add('play');
    disk.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play()
}


function pauseSong() {
    musicContainer.classList.remove('play');
    disk.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    setSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    setSong(songs[songIndex]);
    playSong();
}


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    // disk.classList.toggle('play');
    if(isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
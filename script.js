/* =========================================
   PLAYLIST
========================================= */

const songs = [

    {
        title: "Música 1",
        artist: "Artista 1",
        cover: "assets/images/cover1.png",
        audio: "assets/audio/Cartoon, Jéja - Why We Lose (feat. Coleman Trapp) DnB NCS - Copyright Free Music"
    },

    {
        title: "Música 2",
        artist: "Artista 2",
        cover: "assets/images/cover2.png",
        audio: "assets/audio/Ship Wrek & Zookeepers - Ark Future Bass - Copyright Free Music"
    },

    {
        title: "Música 3",
        artist: "Artista 3",
        cover: "assets/images/cover3.png",
        audio: "assets/audio/Silver Bullet, Jess Cullity - Watching You  House  NCS - Copyright Free Music"
    }

];


/* =========================================
   ELEMENTOS HTML
========================================= */

const audio = document.querySelector("#audio");

const playButton = document.querySelector("#play");

const previousButton =
    document.querySelector("#previous");

const nextButton =
    document.querySelector("#next");

const cover =
    document.querySelector("#cover");

const songTitle =
    document.querySelector("#song-title");

const songArtist =
    document.querySelector("#song-artist");

const progress =
    document.querySelector("#progress");

const currentTime =
    document.querySelector("#current-time");

const duration =
    document.querySelector("#duration");

const volume =
    document.querySelector("#volume");

const playlist =
    document.querySelector("#playlist");


/* =========================================
   ESTADO DO PLAYER
========================================= */

let currentSongIndex = 0;


/* =========================================
   CARREGAR MÚSICA
========================================= */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    audio.load();

    updatePlaylist();

}


/* =========================================
   TOCAR MÚSICA
========================================= */

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


/* =========================================
   PAUSAR MÚSICA
========================================= */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================================
   PRÓXIMA MÚSICA
========================================= */

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

}


nextButton.addEventListener(
    "click",
    nextSong
);


/* =========================================
   MÚSICA ANTERIOR
========================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

}


previousButton.addEventListener(
    "click",
    previousSong
);


/* =========================================
   ATUALIZAR PROGRESSO
========================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {

            return;

        }

        const percentage =
            (audio.currentTime /
                audio.duration) *
            100;

        progress.value =
            percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* =========================================
   DURAÇÃO DA MÚSICA
========================================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* =========================================
   ALTERAR POSIÇÃO DA MÚSICA
========================================= */

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {

            return;

        }

        const newTime =
            (progress.value / 100) *
            audio.duration;

        audio.currentTime =
            newTime;

    }
);


/* =========================================
   FORMATAR TEMPO
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(remainingSeconds)
            .padStart(2, "0")
    );

}


/* =========================================
   VOLUME
========================================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


/* =========================================
   QUANDO A MÚSICA TERMINAR
========================================= */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =========================================
   CRIAR PLAYLIST
========================================= */

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(
        (song, index) => {

            const item =
                document.createElement("div");

            item.classList.add(
                "playlist-item"
            );


            const image =
                document.createElement("img");

            image.src =
                song.cover;

            image.alt =
                `Capa de ${song.title}`;


            const info =
                document.createElement("div");

            info.classList.add(
                "playlist-info"
            );


            const title =
                document.createElement("div");

            title.classList.add(
                "playlist-title"
            );

            title.textContent =
                song.title;


            const artist =
                document.createElement("div");

            artist.classList.add(
                "playlist-artist"
            );

            artist.textContent =
                song.artist;


            info.appendChild(title);

            info.appendChild(artist);


            item.appendChild(image);

            item.appendChild(info);


            item.addEventListener(
                "click",
                () => {

                    currentSongIndex =
                        index;

                    loadSong(
                        currentSongIndex
                    );

                    playSong();

                }
            );


            playlist.appendChild(item);

        }
    );

}


/* =========================================
   ATUALIZAR ITEM ATIVO DA PLAYLIST
========================================= */

function updatePlaylist() {

    const items =
        document.querySelectorAll(
            ".playlist-item"
        );


    items.forEach(
        (item, index) => {

            if (
                index ===
                currentSongIndex
            ) {

                item.classList.add(
                    "active"
                );

            } else {

                item.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.code === "Space") {

            event.preventDefault();

            if (audio.paused) {

                playSong();

            } else {

                pauseSong();

            }

        }


        if (event.code === "ArrowRight") {

            nextSong();

        }


        if (event.code === "ArrowLeft") {

            previousSong();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

loadSong(currentSongIndex);

createPlaylist();

audio.volume =
    volume.value;
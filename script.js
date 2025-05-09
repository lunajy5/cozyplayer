const tracks = [
  "If I Am With You.mp3",
  "The Marsh House.mp3",
  "One Summer Day.mp3",
  "Day of the River.mp3",
  "Bygone Days.mp3",
  "A Journey.mp3",
  "A Very Busy Kiki.mp3",
  "A Hilly Town.mp3",
  "Rendezvous on the Push Broom.mp3",
  "Merry Go Round of Life.mp3",
  "A Town with an Ocean View.mp3",
  "Mothers Broom.mp3",
  "Vague Reason.mp3",
  "Elegant Time.mp3",
  "Trip Itinerary.mp3",
  "You Better Get Strong.mp3",
  "Memories.mp3",
  "It wasn't bad.mp3"
];

let currentIndex = 0;
let shuffledPlaylist = shuffle(tracks);
let audioPlayer;
let playPauseBtn;

document.addEventListener("DOMContentLoaded", () => {
  audioPlayer = document.getElementById("audioPlayer");
  playPauseBtn = document.getElementById("playPauseBtn");

  // 초기 음원 준비
  audioPlayer.src = shuffledPlaylist[currentIndex];

  // 다음 곡 자동 재생
  audioPlayer.addEventListener("ended", playNext);
});

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function playTrack(index) {
  audioPlayer.src = shuffledPlaylist[index];
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
}

function togglePlay() {
  if (!audioPlayer.src || audioPlayer.src === window.location.href) {
    playTrack(currentIndex);
    return;
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function playNext() {
  currentIndex = (currentIndex + 1) % shuffledPlaylist.length;
  playTrack(currentIndex);
}

function playPrevious() {
  currentIndex = (currentIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length;
  playTrack(currentIndex);
}


// 폰트 설정

const trackTitle = document.getElementById("track-title");

function updateTrackTitle(src) {
  const title = src.replace(".mp3", "").replace(/[-_]/g, " ");
  trackTitle.textContent = title;
}

function playTrack(index) {
  const trackPath = shuffledPlaylist[index];
  audioPlayer.src = trackPath;
  updateTrackTitle(trackPath); // ✅ 제목 갱신
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
}

// 처음 로딩 시 제목 설정
document.addEventListener("DOMContentLoaded", () => {
  audioPlayer = document.getElementById("audioPlayer");
  playPauseBtn = document.getElementById("playPauseBtn");

  audioPlayer.src = shuffledPlaylist[currentIndex];
  updateTrackTitle(shuffledPlaylist[currentIndex]); // ✅ 처음 제목 표시
  audioPlayer.addEventListener("ended", playNext);
});

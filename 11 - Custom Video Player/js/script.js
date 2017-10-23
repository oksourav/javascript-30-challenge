const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const toggleBtn = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
const rangeButtons = document.querySelectorAll('input[type="range"]');
const fullscreenButtons = document.querySelector('.fullscreen');

function playVideo() {
  const method = viewer.paused ? 'play' : 'pause';
  viewer[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggleBtn.textContent = icon;
}

function skipTime() {
	viewer.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	viewer[this.name] = this.value;
}

function handleProgress() {
	const percent = (viewer.currentTime / viewer.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function handleDurationClick(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
	viewer.currentTime = scrubTime;
}

function launchIntoFullscreen(element) {
	let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (!fullscreenElement) {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}else{
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

function moveToFullscreen() {
	launchIntoFullscreen(player); // any individual element
}

viewer.addEventListener('click', playVideo);
toggleBtn.addEventListener('click', playVideo);
viewer.addEventListener('play',updateButton);
viewer.addEventListener('pause',updateButton);
viewer.addEventListener('timeupdate',handleProgress);
fullscreenButtons.addEventListener('click',moveToFullscreen);

skipButtons.forEach( (button) => button.addEventListener('click',skipTime));
rangeButtons.forEach( (range) => range.addEventListener('mousemove',handleRangeUpdate));
rangeButtons.forEach( (range) => range.addEventListener('click',handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click',handleDurationClick);
progress.addEventListener('mousemove',(e) => mouseDown && handleDurationClick(e));
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mouseup',() => mouseDown = false);
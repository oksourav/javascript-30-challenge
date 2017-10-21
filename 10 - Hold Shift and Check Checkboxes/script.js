window.addEventListener('load',function() {
	const selector = document.querySelector('.wrapper');
	let hue = 10;
	setInterval(() =>{
		let colorValue = `hsl(${hue},100%,50%)`;
		selector.style.background = colorValue;
		hue += 10;
	},400);

	const checkBoxes = document.querySelectorAll('input');

	let inBetween =false;
	let previous;

	function handleMultiple(e) {
		if (e.shiftKey && this.checked) {
			checkBoxes.forEach( (checkbox) => {
				if (checkbox == this || checkbox == previous) {
					inBetween = !inBetween;
				}

				if (inBetween) {
					checkbox.checked = true;
				}
			});
		}
		previous = this;
	}

	checkBoxes.forEach( checkbox => checkbox.addEventListener('click',handleMultiple) );
});
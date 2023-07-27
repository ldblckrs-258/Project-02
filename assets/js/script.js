let imagesAreaImages = document.querySelectorAll('.images-area img'),
	imagesAreaFirstImage = document.querySelector('.images-area .firstImage'),
	previousBtn = document.querySelector('.previous-btn'),
	nextBtn = document.querySelector('.next-btn'),
	paginationArea = document.querySelector('.pagination-area'),
	currentImageCount = 1,
	sliderController,
	createPaginationSpans;

previousBtn.addEventListener('click', previousImage);
nextBtn.addEventListener('click', nextImage);


function previousImage() {
	if (currentImageCount === 1) {
		return false;
	} else {
		currentImageCount--;
		sliderController();
	};
};

function nextImage() {
	if (currentImageCount === imagesAreaImages.length) {
		return false;
	} else {
		currentImageCount++;
		sliderController();
	};
};

(function createPaginationSpans() {
	for (var i = 0; i < imagesAreaImages.length; i++) {
		let paginationSpan = document.createElement('span');
		paginationArea.appendChild(paginationSpan)
	};
})();

(sliderController = function() {
	let paginationCircls = document.querySelectorAll('.pagination-area span');

	removeAllActive(paginationCircls);
	activeButton();

	let currentImageMinusOne = currentImageCount - 1;

	paginationCircls[currentImageMinusOne].classList.add('active');
	imagesAreaFirstImage.style.marginLeft = `-${558.28 * currentImageMinusOne}px`;
})();

function removeAllActive(targetElement) {
	for (var i = 0; i < targetElement.length; i++) {
		targetElement[i].classList.remove('active');
	};
};

function activeButton() {
	currentImageCount === 1 ?
		previousBtn.classList.add('disabled') :
		previousBtn.classList.remove('disabled');
	currentImageCount === imagesAreaImages.length ?
		nextBtn.classList.add('disabled') :
		nextBtn.classList.remove('disabled');
};

setInterval(() => {
	if (currentImageCount != imagesAreaImages.length) {
		currentImageCount++;
		sliderController();
	} else {
		currentImageCount = 1;
		sliderController();
	};
}, 4000);


function CDtimer(options){
	var box = document.querySelector(options.container);
	var container = box.querySelector('.countdown-ctn');
	var listClass = ['days', 'hours', 'minutes', 'seconds', 'cd__number', 'colon'];
	let j = 0;
	for (let i=0; i<7; i++){
		var newspan = document.createElement('span');
		if (i%2==0) {
			newspan.classList.add(listClass[4], listClass[j]);
			j++;
			newspan.textContent = '00';
		}
		else {
			newspan.classList.add(listClass[5]);
			newspan.textContent = ':';
		}
		container.appendChild(newspan);
	}
	container.setAttribute('date-value', options.targetTime);
}
function updateCD(boxSN, dateValue) {
	var box = document.querySelector(boxSN);
	var container = box.querySelector('.countdown-ctn');
	var target = new Date(dateValue);
	target.setHours(target.getHours() - 7);
	
	function updateCountdown() {
		const allspans = container.querySelectorAll('.cd__number');
		const now = new Date();
		const timeRemaining = target - now;
		var newTime = [
            Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
            Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
            Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
            Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, '0'),
		];
		for (let i=0; i<allspans.length; ++i) {                
			if (allspans[i].textContent != newTime[i]){
				allspans[i].textContent = newTime[i];
			}
		}
	}
	setInterval(updateCountdown, 1000);
}

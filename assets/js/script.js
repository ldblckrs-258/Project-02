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
	imagesAreaFirstImage.style.marginLeft = `-${840 * currentImageMinusOne}px`;
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


function CDtimer(boxSelector){
	var box = document.querySelector(boxSelector);
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

// CATEGORIES SCRIPT

var ahItems = document.querySelectorAll('.a-h-item');

for (let i=0; i<ahItems.length; ++i){
	ahItems[i].addEventListener("click", function() {
		for (let j=0; j<ahItems.length; ++j) {
			ahItems[j].classList.remove('active');
		}
		ahItems[i].classList.add('active');
	})
}

// CREATE ITEM OF CATEGORIES

function createItem(input) {
    // Tạo các element và gán các thuộc tính và nội dung tương ứng
    const listItemDiv = document.createElement('div');
    listItemDiv.className = 'list-item';

    const itemTopDiv = document.createElement('div');
    itemTopDiv.className = 'item__top';

    const imgElement = document.createElement('img');
    imgElement.src = input.img;
    imgElement.alt = '';

    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';


    const tagIcon = document.createElement('i');
	tagIcon.className = 'fa-solid';
	switch (input.check) {
		case 'official':
			tagIcon.classList.add('fa-circle-check');
			break;
		case 'certificate':
			tagIcon.classList.add('fa-certificate');
			break;
		default: 
			tagIcon.classList.add('fa-lock');
			break;
	}

    const tagText = document.createElement('span');
    tagText.textContent = input.check;

    tagSpan.appendChild(tagIcon);
    tagSpan.appendChild(tagText);

    const nameParagraph = document.createElement('p');
    nameParagraph.className = 'item__name';
    nameParagraph.textContent = input.name;

    const checkDiv = document.createElement('div');
    checkDiv.className = 'check';

    const checkStarDiv = document.createElement('div');
    checkStarDiv.className = 'check__star';
    checkStarDiv.setAttribute('star-rate', '5');

    for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star fa-2xs rate';
        if (i < input.star) {
            checkStarDiv.appendChild(starIcon);
        } else {
            checkStarDiv.appendChild(starIcon);
            starIcon.classList.remove('rate');
        }
    }

    const trueCostSpan = document.createElement('span');
    trueCostSpan.className = 'true-cost';
    trueCostSpan.textContent = 'Sold : ' + input.sold;

    checkDiv.appendChild(checkStarDiv);
    checkDiv.appendChild(trueCostSpan);

    itemTopDiv.appendChild(imgElement);
    itemTopDiv.appendChild(tagSpan);
    itemTopDiv.appendChild(nameParagraph);
    itemTopDiv.appendChild(checkDiv);

    const itemBotDiv = document.createElement('div');
    itemBotDiv.className = 'item__bot';

    const costDiv = document.createElement('div');
    costDiv.className = 'cost';

    const mainCostSpan = document.createElement('span');
    mainCostSpan.className = 'main-cost';
    mainCostSpan.textContent = input.cost;

    const discountSpan = document.createElement('span');
    discountSpan.className = 'discount';
    discountSpan.textContent = input.discount;

    costDiv.appendChild(mainCostSpan);
    costDiv.appendChild(discountSpan);

    const refundSpan = document.createElement('span');
    refundSpan.className = 'refund';
    refundSpan.textContent = 'Refund ' + input.refund + ' points';

    const footerDiv = document.createElement('div');
    footerDiv.className = 'footer';
    footerDiv.textContent = input.footer;

    itemBotDiv.appendChild(costDiv);
    itemBotDiv.appendChild(refundSpan);
    itemBotDiv.appendChild(footerDiv);

    listItemDiv.appendChild(itemTopDiv);
    listItemDiv.appendChild(itemBotDiv);

    return listItemDiv;
}

var list_obj = [
	{    
		img : 'https://salt.tikicdn.com/cache/280x280/ts/product/e8/94/8e/1b1bccb7fe7b8189611d67c6f757a9e1.jpg',
		check : 'official',
		name : 'Điện Thoại Oppo A54 (4GB/128GB) - Hàng Chính Hãng',
		star : '3',
		sold : '1.2K',
		cost : '3.990.000₫',
		discount : '-20%',
		refund : '20',
		footer : 'Freeship on Monday'
	},
	{    
		img : 'https://salt.tikicdn.com/cache/280x280/ts/product/f5/52/80/675e31a670afc560e7b0e46c0b65fb4f.png',
		check : 'certificate',
		name : 'Apple iPhone 14 Pro Max',
		star : '4',
		sold : '3.8K',
		cost : '9.990.000₫',
		discount : '-30%',
		refund : '50',
		footer : 'Freeship on Sunday'
	},
	{    
		img : 'https://salt.tikicdn.com/cache/280x280/ts/product/a8/c2/45/1bd766dcdd1ae7cb2bdfee8b7f3d8fb7.jpg',
		check : 'official',
		name : 'Điện Thoại Xiaomi Redmi Note 12 4GB/128GB - Hàng Chính Hãng',
		star : '5',
		sold : '1.8K',
		cost : '6.990.000₫',
		discount : '-10%',
		refund : '10',
		footer : 'Freeship on Sunday'
	},
]



function insertItem(object){
	console.log(object);
	var allList = document.querySelector('.all-list');
	var newItem = createItem(object);
	allList.appendChild(newItem);
}
list_obj.forEach(element => {
	insertItem(element);
});
list_obj.forEach(element => {
	insertItem(element);
});
list_obj.forEach(element => {
	insertItem(element);
});
list_obj.forEach(element => {
	insertItem(element);
});
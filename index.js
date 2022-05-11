const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imagesReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let arrayOfPhotos = [];

// Check if all images were loaded
const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		imagesReady = true;
		loader.hidden = true;
	}
};

// Set attributes for elements
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

//  Create Elements for links & photos, add to DOM
const displayPhotos = () => {
	imagesLoaded = 0;
	totalImages = arrayOfPhotos.length;
	//  run function for each item in photos Array
	arrayOfPhotos.forEach(({ alt_description, links, urls }) => {
		// Create <a> to link to unsplash
		const link = document.createElement('a');
		setAttributes(link, {
			href: links.html,
			target: '_blank',
		});

		// Create image tag for photos
		const img = document.createElement('img');
		setAttributes(img, {
			src: urls.regular,
			alt: alt_description,
			title: alt_description,
		});

		img.addEventListener('load', imageLoaded);

		// Put <img> inside <a>
		link.append(img);
		imageContainer.append(link);
	});
};

// Get photos from Unsplash API
const getPhotos = async () => {
	const APIKEY = 'Qss3Sttkn129Lmlq1SryAa4-UdQg2Siti7wYArlB0xc';
	const amountOfPhotos = 30;
	const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${amountOfPhotos}`;

	try {
		const response = await fetch(apiUrl);
		arrayOfPhotos = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch error here
	}
};

// Check to see if scrolling near bottom of page, will load more photos
window.addEventListener('scroll', () => {
	const { innerHeight, scrollY } = window;

	if (
		innerHeight + scrollY >= document.body.offsetHeight - 1000 &&
		imagesReady
	) {
		imagesReady = false;
		getPhotos();
	}
});

// DOM load
getPhotos();

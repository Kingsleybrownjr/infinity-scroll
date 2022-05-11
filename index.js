const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let arrayOfPhotos = [];

const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

//  Create Elements for links & photos, add to DOM
const displayPhotos = () => {
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

		// Put <img> inside <a>
		link.append(img);
		imageContainer.append(link);
	});
};

// Get photos from Unsplash API
const getPhotos = async () => {
	const APIKEY = 'S-BZDRvOUnIUjbaWwgfLJ2cGVFFDbZPFcx7IrX3nrb4';
	const amountOfPhotos = 10;
	const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${amountOfPhotos}`;

	try {
		const response = await fetch(apiUrl);
		arrayOfPhotos = await response.json();
		console.log(arrayOfPhotos);
		displayPhotos();
	} catch (error) {
		// Catch error here
	}
};

// DOm load
getPhotos();

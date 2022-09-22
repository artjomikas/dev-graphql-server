const getMetaData = require('metadata-scraper')

async function scraper(url) {
	const result = await getMetaData(url)
	let data = {
		title: result.title,
		description: result.description,
		url: result.url,
		image: result.image,
	};
	return data
}

module.exports = scraper
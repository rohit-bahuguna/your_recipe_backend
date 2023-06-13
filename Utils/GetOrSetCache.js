const { client } = require('../Config/Config');

exports.getOrSetCache = async (key, callback) => {
	const cachedData = await client.get(key);

	if (cachedData != null) {
		console.log('hit');
		return JSON.parse(cachedData);
	}
	console.log('miss');
	const freshData = await callback();
	await client.setEx(key, 300, JSON.stringify(freshData));
	return freshData;
};

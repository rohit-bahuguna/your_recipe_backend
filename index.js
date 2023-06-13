const app = require('./app');
const { connectToDB, cloudinaryConfig, client } = require('./Config/Config');
const cluster = require('cluster');
const os = require('os');
const numberOfCpu = os.cpus().length;
const PORT = process.env.PORT || 4000;

try {
	connectToDB();
	cloudinaryConfig();
	// client.connect().then(() => console.log('redis connected'));
} catch (error) {
	console.log(error);
}

// if (cluster.isMaster) {
// 	for (let i = 0; i < numberOfCpu; i++) {
// 		cluster.fork();
// 	}

// 	cluster.on('exit', (Worker, code, signal) => {
// 		cluster.fork();
// 	});
// } else {
// 	app.listen(PORT, () => {
// 		console.log('server is runing at', PORT);
// 	});
// }
app.listen(PORT, () => {
	console.log('server is runing at', PORT);
});

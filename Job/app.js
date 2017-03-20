import Studio from 'studio';
// import StatsD from 'hot-shots';
import studioCluster from 'studio-cluster';
import mongodb from './config/db';
// import centralLogger from './config/central-logger';
import config from './config/config';
// import RabbitQueueHandler from './handler/RabbitQueueHandler';
import {stopMicroservices} from './handler/StopComponentHandler';

Studio.use(Studio.plugin.retry({
    max: 1
}));

Studio.use(Studio.plugin.timer(function(res) {

    console.info('The receiver %s took %d ms to execute', res.receiver, res.time);

}));


config.loadClusterConfig();


mongodb.connecToMongo();

const gracefulShutdown = () => {
    mongodb.closeConnection()
        .then(value => closeApp(0))
        .catch(err => closeApp(1))

    function closeApp(status) {
        stopMicroservices();
        console.log("killing");
        setTimeout(function() {
            // console.log("chao");
            process.exit(status);
        }, 1000);
    }
};

process
    .on('SIGINT', gracefulShutdown)
    .on('SIGTERM', gracefulShutdown);

//Load the Microservices
require("./components");

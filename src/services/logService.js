//import Raven from "raven-js";

function init () {
    // Raven.config("https://83f515cb5e2e402eb9e368aca973b25f@o4505334701948928.ingest.sentry.io/4505334708043776", {
    //     release: "1-0-0",
    //     environment: "development-test"
    // }).install();
}

function log(error) {
    // Raven.captureException(error);
    console.log(error);
}

export default {
    init,
    log
}
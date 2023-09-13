const { Translate } = require("@google-cloud/translate").v2;

// TODO: fix .env code
const key = process.env.CREDENTIALS;

const translate = new Translate({
    credentials: key,
    projectId: "prospectiveprogramming"
});

const detectLanguage = async(t) => {
    try {
        let [detections] = await translate.detect(t);
        detections = Array.isArray(detections) ? detections : [detections];
        console.log('Detections:');
        detections.forEach(detection => {
          console.log(`${detection.input} => ${detection.language}`);
        });
    } catch (e) {
        throw new Error("An error occured in relation to Translate:", e);
    }
}

detectLanguage("O le aso o se aso lelei!")
    .then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(e);
    }
);
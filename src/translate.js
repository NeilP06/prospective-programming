const { Translate } = require("@google-cloud/translate").v2;
// TODO: fix .env code
console.log(process.env.CREDENTIALS);
const key = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: key,
    projectId: key.project_id
});

const detectLanguage = async(t) => {
    try {
        let response = await translate.detect(t);
        return response[0].language;
    } catch (e) {
        throw new Error("An error occured in relation to Translate", e);
        return 0;
    }
}

detectLanguage("O le aso o se aso lelei!")
    .then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(e);
    }
);
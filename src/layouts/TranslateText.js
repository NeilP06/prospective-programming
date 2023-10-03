import React from "react";
const { Translate } = require('@google-cloud/translate').v2;
// TODO: find a way to hide this effectively...
const cred = {
    "type": "service_account",
    "project_id": "prospectiveprogramming",
    "private_key_id": "b42459f2c16fbbf9de1506384a349b60c10824d4",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDcJ5zknXTEORjf\nald5r9PPcDgE7tMSCYUv1Akm82apT0KsqMHo7tmacZSWSjvNYU+5z3qOC/dHMYRs\n0haQujsq0Dkb54HCP0AAj1YIEd1ZI2XdQFzpxr/QL6B4eypDCvzzoCDismmWnp3C\n44Be0apDhvTe5bMsVUm6sXISfQlMA3iA29gA9lTk7UUdfI8cYiRJ1JlCGsddRjr3\n5MNSRo5eBcnMXxI2utHEMV3P7rSRB8rcbdrHUWwUjG5NI323c9Tg4Z1diSZtR8Rn\nVmsZKzxq6fBKCQhrekpmI3orEZTXcnBmgH/5gx0Qoa+4b6PyHTdEjzT//feaNddc\n8AnxBlnlAgMBAAECggEACt2Poj7dLPQOdLRYZeKWJxZIRYIN+8Vpg99Ipln79p45\nUbEwhNEI/1TcuwAl7HCBkU+aolkX1rUsbnx97Z2rXuUQ9H4cCty5SW3JlrNfA8+5\n7s4G5+jNvbYkCt41S0LHEjUUemvIx0zDx4MX6lYZu6R1AG1Axw7ciTDJyvzN0SkB\nQGsa/FNS8pO4S2+cD1CaZ0sHLP0UlbImDgaRPxaHnGsMkmPrxY2kV3j3CjGsjqln\nZKrQhj7/a5rXcA81ZsaesToO2+sRYMBQMORwsppSW9sQ2Ginh+bN8J+hnrNu1Fud\nGw5BrNHgSanTnaUy3b/N4MrQIv24l6qouvxNzflMPwKBgQDy6B4dz6lRgR+kIN1r\nLgW6nbvqoAklRACOxdkp/B2eXUb5QCgkb12LJxqlO/ewNVDxN1H3uP7GCWbCC+23\nosQDoKkbHY+0MBrXLH+oB/xPhqVmpwejAEDeiOOW43oXJ8ykY26Ho1muzEg9dcrp\n5XRR9xjHofQ2KWDK6hPP+q88ewKBgQDoBYohmmw3CnkSHVs7mhivfOQNVK7F7iiG\n3TC8n6pTnPfhVOQ/TUmTnUMpMO96ayaj+lVfMVfwMiVQNwcy8sVO6IvDqqFfQhFE\n/Lzp2Hkg4IOkJyQRM8uJ5/fidj6bV9bAhbZ1TZwlNiIuCcBtXESRM5soK0bZqyS3\nyjIoIdzlHwKBgH61ChCu5Dm5y1GIOzfPd/mSkhWfiWXBBTF0jwVRl/ml2oHmL4ph\n9T/DFCkhEOD/zssk+kLoYy3WdZ2/Ly9dXjYuNkgIsY9ikH2xnp1+HOU27UyQ0HD8\njtoGOgHZgzRU9HDD1UI3uW5u7TfyG/jKUlT3OhvYpVUjXHQ8ij0xHPvFAoGAN2Yb\nNSrJ69p0Tf70aabBfiUzznsJv/i9dHYbzO3SnWQ9S3AZj4PErZo/DvbAN1qeP0jm\nWXROqutOPXjmHyQYOF8OAAodvcDonrA56xvk0BTLWcZ+thzH3IWmikvxZuXyQMWs\naxW80qW6Q4PQjkwZkxHfWhf7Mr3KZpfAohRzycECgYAMTLSaWzZs3UJH/9JWty5w\nWctfmbY61QfCeopcL3MZZ7L5CTk3OeMAPNcABg25l35xZKOPEEeypvzde9igXXQc\n5/gihKksngir2csgzmeYukD5/n+T9QFfkO4fmT5WcKHgoS8ikDrwyH192HxPCLAe\nf2VJn7NZmexZHjGP++VUrQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "prospectiveprogramming@prospectiveprogramming.iam.gserviceaccount.com",
    "client_id": "101004552897787289326",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/prospectiveprogramming%40prospectiveprogramming.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

const translate = new Translate({
    credentials: cred,
    projectId: cred.project_id
});

export default function TranslateText(props) {
    let text = props.text;
    let language = props.originalLanguage;
    let newLanguage = props.toTranslateTo;
    if (confirmLanguage(text) !== language) {
        throw new Error("An error occured in relation to TranslateText() function: an error occured in the parameters.");
    }
    const translateLanguage = async(t, targetLanguage) => {
        try {
            let [ response ] = await translate.translate(t, targetLanguage);
            return response;
        } catch (e) {
            throw new Error("An error occured to Google Translate: translateLanguage() function does not work.");
        }
    };
    return translateLanguage(text, newLanguage);
}

function confirmLanguage(props) {
   const detectLanguage = async(text) => {
        try {
            let response = await translate.detect(text);
            return response[0].language;
        } catch (e) {
            throw new Error("An error occured in relation to Google Translate: detectLanguage() function does not work.");
        }
   } 
   return detectLanguage(props.text);
}
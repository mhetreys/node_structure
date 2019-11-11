const request = require("request");

module.exports.curlCall = (method, url, headers ,form)=> {
    // tobe used
    let defaultCurlTimeOut = 8000;

    let options = { method: method, url: url, headers: headers, form: form , timeout: defaultCurlTimeOut};

    return new Promise((resolve, reject)=>{
        request(options, function (error, response, body) {
            if (error) reject(error);
            resolve(body);
        });
    })


}   
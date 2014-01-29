/**
 * Fake info builder
 */
var fakeInfo = {};
(function (fakeInfo) {

    fakeInfo.fields = {
        "Full": "full_name"
    };

    fakeInfo.request = {

    };

    fakeInfo.fetch = function (url, callback) {
        var fn = 'JSONPCallback';
        window[fn] = fakeInfo.evalJSONP(callback);
        url = url.replace('=JSONPCallback', '=' + fn);
        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = url;
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    };

    fakeInfo.evalJSONP = function (callback) {
        return function (data) {
            var validJSON = false;
            if (typeof data === "string") {
                validJSON = JSON.parse(data);
            } else {
                validJSON = JSON.parse(JSON.stringify(data));
            }
            if (validJSON) {
                callback(validJSON);
            } else {
                throw ("JSONP call returned invalid or empty JSON");
            }
        };
    };


    //example
    fakeInfo.fetch('http://fakecontact.info/api?callback=JSONPCallback', function (data) {
        console.log(data);
        console.log(fakeInfo.fields);
        console.log(fakeInfo.request);

    });

}(window.fakeInfo = window.fakeInfo || {}));


fakeInfo.fields = {
    // match form name to field names
    "Full": "name",
    "Sex": "gender",
    "Email": "email"
};
fakeInfo.request = {
    // request what info you would like
    "name": "name"
};

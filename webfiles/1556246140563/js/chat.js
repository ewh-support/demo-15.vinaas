<!-- Start of Async Drift Code -->
"use strict";

!function() {
    var t = window.driftt = window.drift = window.driftt || [];
    if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
            t.factory = function(e) {
                return function() {
                    var n = Array.prototype.slice.call(arguments);
                    return n.unshift(e), t.push(n), t;
                };
            }, t.methods.forEach(function(e) {
            t[e] = t.factory(e);
        }), t.load = function(t) {
            var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
            o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(o, i);
        };
    }

    var userEmail = "";
    window.drift.on("conversation:buttonClicked", function(data) {
        if((data.buttonBody).toLowerCase() === "download now!"){
            var OSName="unknown";
            if (navigator.appVersion.indexOf("Win")!==-1) OSName="windows";
            if (navigator.appVersion.indexOf("Mac")!==-1) OSName="osx";
            if (navigator.appVersion.indexOf("X11")!==-1) OSName="unix";
            if (navigator.appVersion.indexOf("Linux")!==-1) OSName="linux";
            if (navigator.appVersion.indexOf("Android")!==-1) OSName="android";
            if (navigator.userAgent.indexOf("like Mac") !== -1) OSName = "ios";

            var downloadUrl = "/downloads/enterprise/current/server";

            var cName = "couchbase-download";
            var cVals = getUserCookie(cName);
            /* If there's already a cookie..*/
            if (cVals !== null) {
                try{
                    var vals = decodeURIComponent(cVals).split('|');
                    if((typeof vals[1] === 'undefined') || vals.length < 13){
                        // COOKIE NOT VALID

                        //Cookie did not meet required length
                        writeChatBotCookie(cName, userEmail);
                    }else{
                        // SEND USER TO THANK YOU PAGE
                        window.location.href = downloadUrl;
                    }
                }catch(e){
                }
            }else{
                writeChatBotCookie(cName, userEmail);
            }

            // send user to get download
            window.location.href = downloadUrl;
        }
    });
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('bgw65uxsycae');


// custom methods
function getUserCookie(cname) {
    var cnameEq = cname+'=';
    var ca = document.cookie.split(';');
    for (var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(cnameEq) !== -1) {
            return c.substring(cnameEq.length, c.length);
        }
    }
}

function writeCookie (cName, vals) {
    var cVal = vals.FirstName+'|' +
        vals.LastName +'|' +
        vals.Email    +'|' +
        vals.Company  +'|' +
        vals.Role__c    +'|' +
        vals.Phone  +'|' +
        vals.Country  +'|' +
        vals.State  +'|' +
        vals.City;

    cVal += '|' + 'termsandConditions' + '|'  + "true" + '|' + 'doubleOptinCompliantEnglish' + '|'  + "true";

    var expire = new Date();
    expire.setDate(expire.getDate() + 30);
    document.cookie = cName + "=" + encodeURIComponent(cVal) + ";expires=" + expire.toString() + "; path=/";
    console.log("writing cookie: " + cName);
}

function writeChatBotCookie(cName, userEmail){
    var formVals = {
        "FirstName" : "userFromChatBotFname",
        "LastName" : "userFromChatBotLname",
        "Email" : "chatbot@couchbase.com",
        "Company" : "userFromChatBotCompany",
        "Role__c" : "userFromChatBotRole",
        "Phone" : "0000000000",
        "Country" : "United States",
        "State" : "CA",
        "City" : "usersFromChatBotCity",
    };

    writeCookie(cName, formVals);
}
<!-- End of Async Drift Code -->
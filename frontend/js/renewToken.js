(function() {
    var getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    var setCookie = function(cname, cvalue, exdays) {
        var expires = "expires="+exdays.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    var token = getCookie("token");
    var username = getCookie("username");
    if(token !== "") {
        var expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 30);
        setCookie("token", token, expiryDate);
        setCookie("username", token, expiryDate);
    };
})();

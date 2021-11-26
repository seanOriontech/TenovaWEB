$(function() {

    // var myWindow = window.open("PopupEntry.html", "vb", "dialog=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=1000,height=500,top=100,left=400");
    popupwindow("PopupEntry.html?dateTime=" + getUrlParameter("dateTime"), "Trip Info", 1920, 600);

    function popupwindow(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    close();



});
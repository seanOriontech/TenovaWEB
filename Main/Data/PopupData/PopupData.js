var popupPullData = [];
var popupAreaData = [];
var popupItemsData = [];


function getPullDown() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetPullDown",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                popupPullData = data;
                console.log(popupPullData);
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}

function getAreaDown() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetPullDownArea",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                popupAreaData = data;

                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}

function getItemsDown(areaId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetPullDownItem/" + areaId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                popupItemsData = data;

                resolve(popupItemsData);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}

function getItems1Down(itemId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetPullDownEquip1/" + itemId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}


function getItems2Down(itemId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetPullDownEquip2/" + itemId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}


function getDefect() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/GetDefect",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })

}



function insertReport(dataReport) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/SaveReport",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',

            data: dataReport,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function pollData() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Popup/Poll",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                resolve(data);

            },
            error: function(xhr, status, error) {
                reject(error);
            },
        })
    })


}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function getPeriod(date) {
    var datePrev = new Date(date);
    var dateNow = new Date();
    //
    var dateDiff = dateNow.getTime() - datePrev.getTime();

    var delta = Math.abs(dateNow.getTime() - datePrev.getTime()) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;

    return "days:" + days + " hours:" + hours + " min:" + minutes;

}
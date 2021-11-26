var fluxAnalysis = [];

function getFluxes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Flux/GetFluxes",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                fluxAnalysis = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertFlux(flux) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Flux/PostFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: flux,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateFlux(flux) {
    flux.newData = $.extend({}, flux.oldData, flux.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/flux/PutFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: flux.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteFlux(flux) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Flux/DeleteFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: flux,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
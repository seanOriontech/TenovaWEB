var redAnalysis = [];

function getReductants() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Reductant/GetReductants",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                redAnalysis = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertReductant(Reductant) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Reductant/PostReductants",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: Reductant,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateReductant(Reductant) {
    Reductant.newData = $.extend({}, Reductant.oldData, Reductant.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Reductant/PutReductant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: Reductant.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteReductant(Reductant) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Reductant/DeleteReductant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Delete',
            dataType: 'json',

            data: Reductant,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
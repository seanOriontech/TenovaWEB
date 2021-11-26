var BatchFluxData = [];

function getFluxBatches(batch) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchFlux/GetBatchFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: batch,
            success: function(data) {

                BatchFluxData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertBatchFlux(BatchFlux) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchFlux/PostBatchFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Post',
            dataType: 'json',

            data: BatchFlux,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateBatchFlux(BatchFlux) {
    BatchFlux.newData = $.extend({}, BatchFlux.oldData, BatchFlux.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchFlux/PutBatchFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: BatchFlux.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteBatchFlux(BatchFlux) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchFlux/DeleteBatchFlux",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: BatchFlux,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
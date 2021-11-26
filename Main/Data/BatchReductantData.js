var BatchReductData = [];

function getReductantBatches(batch) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchReductant/GetBatchReduct",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: batch,
            success: function(data) {

                BatchReductData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })


}

function insertBatchReduct(BatchReduct) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchReduct/PostBatchReduct",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',

            data: BatchReduct,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateBatchReduct(BatchReduct) {
    BatchReduct.newData = $.extend({}, BatchReduct.oldData, BatchReduct.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchReduct/PutBatchReduct",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: BatchReduct.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteBatchReduct(BatchReduct) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchReduct/DeleteBatchReduct",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: BatchReduct,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
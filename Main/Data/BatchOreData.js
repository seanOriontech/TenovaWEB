var BatchOreData = [];

function getOreBatches(batch) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchOre/GetBatchOres",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: batch,
            success: function(data) {

                BatchOreData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertBatchOre(BatchOre) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchOre/PostBatchOre",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Post',
            dataType: 'json',

            data: BatchOre,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateBatchOre(BatchOre) {
    BatchOre.newData = $.extend({}, BatchOre.oldData, BatchOre.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchOre/PutBatchOre",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: BatchOre.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteBatchOre(BatchOre) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchOre/DeleteBatchOre",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: BatchOre,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
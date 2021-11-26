var batchData = [];


function getBatches() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Batch/GetBatches",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                batchData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertBatch(Batch) {

    createBatchConstant(Batch);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Batch/PostBatch",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: Batch,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateBatch(Batch) {
    Batch.newData = $.extend({}, Batch.oldData, Batch.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Batch/PutBatch",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: Batch.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function updateBatchTotals(Batch) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Batch/PutBatch",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: Batch,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteBatch(Batch) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Batch/DeleteBatch",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Delete',
            dataType: 'json',

            data: Batch,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function createBatchConstant(batch) {
    batch.batch_Constants = {
        "batch_id": batch.id,
        "si": 0.0,
        "fe": 0.0,
        "cr": 0.0,
        "pb": 0.0,
        "ni": 0.0,
        "zn": 0.0,
        "mo": 0.0,
        "ti": 0.0,
        "mn": 0.0,
        "v": 0.0,
        "s": 0.0,
        "al": 0.0,
        "p": 0.0,
        "ca": 0.0,
        "na_k_ck_f_rec": 0.0,
        "pbo_to_dust": 0.0,
        "zno_to_dust": 0.0,
        "si2o_to_dust": 0.0,
        "other_elements": 0.0,
        "furnace_process_gas": 0.0,
        "furnace_off_gas": 0.0,
        "carbon_efficiency": 0.0
    }


}
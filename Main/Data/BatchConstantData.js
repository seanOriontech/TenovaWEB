var BatchConstantData = [];

function getConstantBatches(batch) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchConstant/GetBatchConstant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: batch,
            success: function(data) {

                BatchConstantData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })


}

function insertBatchConstant(BatchConstant) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchConstant/PostBatchConstant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',

            data: BatchConstant,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateBatchConstant(BatchConstant) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchConstant/PutBatchConstant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: BatchConstant,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteBatchConstant(BatchConstant) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/BatchConstant/DeleteBatchConstant",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: BatchConstant,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
var OreAnalysis = [];

function getOres() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Ore/GetOres",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                OreAnalysis = data;
                console.log(OreAnalysis);
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertOre(ore) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Ore/PostOres",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Post',
            dataType: 'json',

            data: ore,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateOre(ore) {
    ore.newData = $.extend({}, ore.oldData, ore.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Ore/PutOres",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: ore.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteOre(ore) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Ore/DeleteOres",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Delete',
            dataType: 'json',
            data: ore,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
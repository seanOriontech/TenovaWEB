var results = {};

function getResults(recipeId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/MEB/GetResults/" + recipeId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                results = data;
                console.log(results);
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function getResultsLive() {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/MEB/GetResultsLive/",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                results = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}


function SetLiveRecipe(recipeId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "Recipe/SetLiveRecipe/" + recipeId,
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
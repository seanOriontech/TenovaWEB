var recipeData = [];

var RecipeAnalysis = [];

function getRecipe() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Recipe/GetRecipe",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Get',
            dataType: 'json',
            success: function(data) {
                recipeData = data;
                resolve(data);

            },
            error: function(xhr, status, error) {
                console.log(error);
                reject(error);

            },
        })
    })


}

function insertRecipe(Recipe) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Recipe/PostRecipe",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'Post',
            dataType: 'json',
            data: Recipe,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}


function updateRecipe(Recipe) {
    Recipe.newData = $.extend({}, Recipe.oldData, Recipe.newData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Recipe/PutRecipe",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Put',
            dataType: 'json',

            data: Recipe.newData,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}

function deleteRecipe(Recipe) {


    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUrl + "/Recipe/DeleteRecipe",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'


            },
            type: 'Delete',
            dataType: 'json',

            data: Recipe,
            success: function(data) {

                resolve(data);

            },
            error: function(xhr, status, error) {

                reject(error);

            },
        })
    })

}
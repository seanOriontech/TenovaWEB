var typeSelected;
var areaSelected;
var itemSelected;
var itemSelected1;
var itemSelected2;

var defectSelected;
var reason;

$(function() {


    setInterval(myFunction, 10000);
    pollData();


    $('#timeText').text("   " + getUrlParameter("dateTime"));
    $('#period').text("   " + getPeriod(getUrlParameter("dateTime")));

    $('#completeButton').hide();

    $("#Equipment1").hide();
    $("#Equipment2").hide();


    var dropDown = $("#typeDropDown").dxSelectBox({

        onInitialized: function(e) {


            getPullDown()
                .then((data) => {

                    dropDown.dxSelectBox("instance").option("items", data);
                })
                .catch((error) => {

                    DevExpress.ui.notify("Failed", "error", 600);

                });
        },
        width: 300,
        items: popupPullData,
        displayExpr: "description",
        valueExpr: "typeId",
        onSelectionChanged: function(e) {

            typeSelected = e.selectedItem.typeId;
            getAreaDown()
                .then((data) => {

                    areaDrop.dxSelectBox("instance").option("items", data);
                })
                .catch((error) => {

                    DevExpress.ui.notify("Failed", "error", 600);

                });
            console.log(e);

        }

    });


    var areaDrop = $("#areaDropDown").dxSelectBox({

        width: 300,
        displayExpr: "description",
        valueExpr: "areaId",
        onSelectionChanged: function(e) {


            areaSelected = e.selectedItem.areaId;
            itemDrop.dxSelectBox("instance").reset();
            getItemsDown(areaSelected)
                .then((data) => {
                    $("#Equipment1").hide();
                    $("#Equipment2").hide();
                    itemDrop.dxSelectBox("instance").option("items", data);
                })
                .catch((error) => {

                    DevExpress.ui.notify("Failed", "error", 600);

                });


        }

    });

    var itemDrop = $("#itemDropDown").dxSelectBox({

        width: 300,
        displayExpr: "description",
        valueExpr: "itemId",
        onSelectionChanged: function(e) {

            if (e.selectedItem == null)
                return;

            itemSelected = e.selectedItem.itemId;
            itemDrop1.dxSelectBox("instance").reset();
            getItems1Down(e.selectedItem.equipId)
                .then((data) => {
                    if (data.length != 0) {

                        $("#Equipment1").show();

                        itemDrop1.dxSelectBox("instance").option("items", data);
                    }

                })
                .catch((error) => {
                    getDefectData();
                    //  DevExpress.ui.notify("Failed", "error", 600);

                });
        }



    });


    var itemDrop1 = $("#item1DropDown").dxSelectBox({

        width: 300,
        displayExpr: "description",
        valueExpr: "equipId",
        onSelectionChanged: function(e) {

            if (e.selectedItem == null)
                return;

            itemSelected1 = e.selectedItem.itemId;
            itemDrop2.dxSelectBox("instance").reset();
            getItems2Down(e.selectedItem.equipId2)
                .then((data) => {

                    if (data.length > 0) {
                        $("#Equipment2").show();
                        itemDrop2.dxSelectBox("instance").option("items", data);
                    } else {
                        getDefectData();
                    }

                })
                .catch((error) => {

                    getDefectData();

                });
        }



    });

    var itemDrop2 = $("#item2DropDown").dxSelectBox({

        width: 300,
        displayExpr: "description",
        valueExpr: "equipId",
        onSelectionChanged: function(e) {

            if (e.selectedItem == null)
                return;

            itemSelected2 = e.selectedItem.itemId;
            getDefectData();

        }



    });


    var defectDrop = $("#defectDropDown").dxSelectBox({

        width: 300,
        displayExpr: "description",
        valueExpr: "defectId",
        onSelectionChanged: function(e) {

            defectSelected = e.selectedItem.itemId;
            $('#completeButton').show();
        }



    });

    $("#reasonText").dxTextArea({
        onValueChanged: function(data) {
            reason = data.value
        },
        width: 300,

    });

    function getDefectData() {

        getDefect()
            .then((data) => {

                defectDrop.dxSelectBox("instance").option("items", data);


            })
            .catch((error) => {

                DevExpress.ui.notify("Failed", "error", 600);

            });

    }

    $("#completeButton").dxButton({


        stylingMode: "contained",
        text: "Save",
        type: "normal",
        width: 120,
        onClick: function(e) {

            var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
            result.done(function(dialogResult) {

                if (dialogResult == "Canceled")
                    return;

                var report = {
                    dateTime: getUrlParameter("dateTime"),
                    comments: reason,
                    typeId: typeSelected,
                    areaId: areaSelected,
                    itemId: itemSelected,
                    itemId1: itemSelected1,
                    itemId2: itemSelected2,
                    defectId: defectSelected
                };

                insertReport(report)
                    .then((data) => {


                        window.close();
                    })
                    .catch((error) => {

                        window.close();
                        // DevExpress.ui.notify("Failed", "error", 600);

                    });

                e.cancel = deferred.promise();


            });


        }

    });



    function myFunction() {
        pollData();
    }



});
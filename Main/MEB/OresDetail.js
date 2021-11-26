function createOresTemplate(masterDetailOptions) {

    return function() {
        let orderHistoryDataGrid;


        function onDataGridInitialized(e) {
            orderHistoryDataGrid = e.component;
            //    orderHistoryDataGrid.option("dataSource", [{ "oreid": "1" }]);
        }
        return $("<div>").addClass("form-container").dxForm({
            labelLocation: "top",
            items: [{
                // label: { text: "Product" },
                template: createTotalOreTexboxTemplate(masterDetailOptions)
            }, {
                //label: { text: "Order History" },
                template: createOreBatchGrid(masterDetailOptions)
            }]
        });
    };


}



function createTotalOreTexboxTemplate(masterDetailData) {
    var maxValue = 10000;
    return function() {

        return $("<div style='font-size: 15px;'>")
            .addClass("centerGrid").dxForm({
                formData: masterDetailData.data,
                colCount: 2,
                items: [{
                    dataField: "oresTotal",
                    label: { text: "Total Ores" },
                    width: 200,
                    editorType: "dxNumberBox",
                    editorOptions: {
                        format: "#0.## kg",
                        //  max: 10000,

                    },
                    validationRules: [{
                        type: "range",
                        min: 0,
                        max: maxValue,
                        message: "Must range between 0 and " + maxValue + " kg"
                    }],


                }, {
                    itemType: "button",
                    horizontalAlignment: "left",
                    buttonOptions: {
                        text: "Update",
                        type: "success",
                        onClick: function(e) {

                            if (masterDetailData.data.oresTotal >= maxValue)
                                return;
                            var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
                            result.done(function(dialogResult) {
                                masterDetailData.data.batch_Ore.forEach(element => {

                                    element.mass = masterDetailData.data.oresTotal * element.perc / 100;
                                    oreGrid.option("dataSource", masterDetailData.data.batch_Ore);
                                });

                                updateBatchTotals(masterDetailData.data)
                                    .then((data) => {

                                        deferred.resolve(false);
                                    })
                                    .catch((error) => {
                                        deferred.resolve(true);

                                        DevExpress.ui.notify("Failed", "error", 600);

                                    });
                            });

                        },
                        useSubmitBehavior: true
                    }
                }]


            });




    }


}



var oreGrid;

function createOreBatchGrid(masterDetailData) {

    return function() {


        var ore = $("<div style='font-size: 15px;'>").addClass("masterDetail")
            .dxDataGrid({
                dataSource: masterDetailData.data.batch_Ore,
                onRowInserting: function(e) {
                    const deferred = $.Deferred();

                    this.beginCustomLoading();
                    e.data.batch_id = masterDetailData.data.id;

                    insertBatchOre(e.data)
                        .then((data) => {
                            this.endCustomLoading();
                            e.data = data;
                            deferred.resolve(false);
                        })
                        .catch((error) => {
                            deferred.resolve(true);
                            this.endCustomLoading();
                            DevExpress.ui.notify("Failed", "error", 600);

                        });

                    e.cancel = deferred.promise();

                },
                onRowUpdating: function(e) {

                    const deferred = $.Deferred();

                    this.beginCustomLoading();

                    updateBatchOre(e)
                        .then((data) => {
                            this.endCustomLoading();
                            deferred.resolve(false);
                        })
                        .catch((error) => {
                            deferred.resolve(true);
                            this.endCustomLoading();
                            DevExpress.ui.notify("Failed", "error", 600);

                        });

                    e.cancel = deferred.promise();

                },
                onRowRemoving: function(e) {
                    const deferred = $.Deferred();

                    this.beginCustomLoading();

                    deleteBatchOre(e.data)
                        .then((data) => {
                            this.endCustomLoading();
                            deferred.resolve(false);
                        })
                        .catch((error) => {
                            deferred.resolve(true);
                            this.endCustomLoading();
                            DevExpress.ui.notify("Failed", "error", 600);

                        });

                    e.cancel = deferred.promise();

                },

                //  onInitialized: onDataGridInitialized,
                editing: {
                    mode: "row",
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true
                },
                summary: {
                    totalItems: [{
                        column: "perc",
                        summaryType: "sum",
                        customizeText: function(data) {
                            return "Total: " + data.value + "%";
                        }
                    }]
                },
                onCellPrepared: function(e) {
                    if (e.rowType == "header") {
                        e.cellElement.css("text-align", "center");
                    }
                    if (e.rowType == "data")
                        e.cellElement.css("text-align", "center");

                },
                columns: [{
                        caption: "Name",
                        dataField: "ore_id",
                        lookup: {
                            dataSource: OreAnalysis,
                            valueExpr: "id",
                            displayExpr: "name"
                        },
                        setCellValue: function(newData, value, currentRowData) {
                            newData.ore_id = value;
                        }


                    },
                    {
                        caption: "Lab ID",
                        dataField: "lab_id",

                        calculateCellValue: function(rowData) {


                            for (var i = 0; i < OreAnalysis.length; i++) {
                                if (OreAnalysis[i].id == rowData.ore_id) {

                                    rowData.lab_id = OreAnalysis[i].labId;
                                    return OreAnalysis[i].labId;
                                }

                            }

                        }

                    },
                    {
                        caption: "Percentage (%)",
                        dataField: "perc",
                        dataType: "number",

                        validationRules: [{
                            type: "range",
                            max: 102,
                            message: "Cannot be over 102%"
                        }],

                        setCellValue: function(newData, value, currentRowData) {
                            newData.perc = value;
                        },
                        calculateCellValue: function(rowData) {

                            rowData.mass = masterDetailData.data.oresTotal * rowData.perc / 100;
                            return rowData.perc;

                        }
                    },
                    {
                        caption: "Kg",
                        dataField: "mass",
                        dataType: "number",
                        allowEditing: false,
                        setCellValue: function(newData, value, currentRowData) {
                            newData.mass = value;
                        }
                    }
                ],


            });

        oreGrid = ore.dxDataGrid('instance');
        return ore;
    }



}
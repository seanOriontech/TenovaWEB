function createFluxTemplate(masterDetailOptions) {

    return function() {
        let fluxDataGrid;


        function onDataGridInitialized(e) {
            fluxDataGrid = e.component;
            //    orderHistoryDataGrid.option("dataSource", [{ "oreid": "1" }]);
        }
        return $("<div  style='font-size: 15px;'>").addClass("form-container").dxForm({
            labelLocation: "top",
            items: [{
                // label: { text: "Product" },
                template: createTotalFluxTexboxTemplate(masterDetailOptions)
            }, {
                //label: { text: "Order History" },
                template: createFluxBatchGrid(masterDetailOptions)
            }]
        });
    };


}


function createTotalFluxTexboxTemplate(masterDetailData) {

    var maxValue = 1000;

    return function() {

        return $("<div  style='font-size: 15px;'>")
            .addClass("masterDetail").dxForm({
                formData: masterDetailData.data,
                colCount: 2,
                items: [{
                    dataField: "totalFlux",
                    label: { text: "Total Flux" },
                    width: 200,
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

                            if (masterDetailData.data.totalFlux >= maxValue)
                                return;

                            var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
                            result.done(function(dialogResult) {
                                masterDetailData.data.batch_Flux.forEach(element => {

                                    element.mass = masterDetailData.data.totalFlux * element.perc / 100;
                                    fluxGrid.option("dataSource", masterDetailData.data.flux);
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
var fluxGrid;

function createFluxBatchGrid(masterDetailData) {

    return function() {


        var flux = $("<div>").addClass("masterDetail")
            .dxDataGrid({
                dataSource: masterDetailData.data.batch_Flux,
                onRowInserting: function(e) {
                    const deferred = $.Deferred();

                    this.beginCustomLoading();
                    e.data.batch_id = masterDetailData.data.id;

                    insertBatchFlux(e.data)
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

                    updateBatchFlux(e)
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

                    deleteBatchFlux(e.data)
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
                        dataField: "flux_id",
                        lookup: {
                            dataSource: fluxAnalysis,
                            valueExpr: "id",
                            displayExpr: "name"
                        },
                        setCellValue: function(newData, value, currentRowData) {
                            newData.flux_id = value;
                        }


                    },
                    {
                        caption: "Lab Id",
                        dataField: "flux_id",


                        calculateCellValue: function(rowData) {


                            for (var i = 0; i < fluxAnalysis.length; i++) {
                                if (fluxAnalysis[i].id == rowData.flux_id) {

                                    rowData.lab_id = fluxAnalysis[i].labId;
                                    return fluxAnalysis[i].labId;
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

                            rowData.mass = masterDetailData.data.totalFlux * rowData.perc / 100;
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

        fluxGrid = flux.dxDataGrid('instance');
        return flux;

    }
}
function createRedTemplate(masterDetailOptions) {

    return function() {
        let redDataGrid;


        function onDataGridInitialized(e) {
            fluxDataGrid = e.component;
            //    orderHistoryDataGrid.option("dataSource", [{ "oreid": "1" }]);
        }
        return $("<div>").addClass("form-container").dxForm({
            labelLocation: "top",
            items: [{
                // label: { text: "Product" },
                //  template: createTotalRedTexboxTemplate(masterDetailOptions)
            }, {
                //label: { text: "Order History" },
                template: createRedBatchGrid(masterDetailOptions)
            }]
        });
    };


}


function createTotalRedTexboxTemplate(masterDetailData) {
    return function() {

        return $("<div  style='font-size: 15px;'>")
            .addClass("masterDetail").dxForm({
                formData: masterDetailData.data,
                colCount: 2,
                items: [{
                    dataField: "totalRed",
                    label: { text: "Total Reductant (%)" },
                    width: 200,

                }, {
                    itemType: "button",
                    horizontalAlignment: "left",
                    buttonOptions: {
                        text: "Update",
                        type: "success",

                        useSubmitBehavior: true
                    }
                }]
            });
    }

}


function createRedBatchGrid(masterDetailData) {

    return function() {


        return $("<div  style='font-size: 15px;'>").addClass("masterDetail")
            .dxDataGrid({
                dataSource: masterDetailData.data.batch_Reduc,
                onRowInserting: function(e) {
                    const deferred = $.Deferred();

                    this.beginCustomLoading();
                    e.data.batch_id = masterDetailData.data.id;

                    insertBatchReduct(e.data)
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

                    updateBatchReduct(e)
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

                    deleteBatchReduct(e.data)
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
                        dataField: "red_id",
                        lookup: {
                            dataSource: redAnalysis,
                            valueExpr: "id",
                            displayExpr: "name"
                        },
                        setCellValue: function(newData, value, currentRowData) {
                            newData.red_id = value;
                        }


                    },
                    {
                        caption: "Lab Id",
                        dataField: "lab_id",
                        calculateCellValue: function(rowData) {


                            for (var i = 0; i < redAnalysis.length; i++) {
                                if (redAnalysis[i].id == rowData.red_id) {

                                    rowData.lab_id = redAnalysis[i].labId;
                                    return redAnalysis[i].labId;
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
                            min: 0,
                            max: 100,

                            message: "Must range between 0 and 100"
                        }],


                    }
                ],


            });

    }



}
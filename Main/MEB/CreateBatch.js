$(function() {
    var batchGrid = $("#gridContainer").dxDataGrid({

        keyExpr: "id",
        onInitialized: function(e) {
            this.beginCustomLoading();

            getOres();
            getReductants();
            getFluxes();
            getBatches()
                .then((data) => {
                    this.endCustomLoading();
                    batchGrid.dxDataGrid("instance").option("dataSource", data);
                })
                .catch((error) => {
                    this.endCustomLoading();
                    DevExpress.ui.notify("Failed", "error", 600);

                });
        },
        onRowInserting: function(e) {
            const deferred = $.Deferred();

            this.beginCustomLoading();

            insertBatch(e.data)
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

            updateBatch(e)
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

            deleteBatch(e.data)
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
        columns: [{
                caption: "Batch Name",
                dataField: "name",
                width: 500,
                validationRules: [{ type: "required" }]
            },

            {
                caption: "Furnace Open/Closed",
                dataField: "openedClosed",
                dataType: "string",
                lookup: {
                    dataSource: openClosed,
                    valueExpr: "id",
                    displayExpr: "name"
                },
            }
        ],
        masterDetail: {
            enabled: true,
            template: masterDetailTemplate
        },


        onCellPrepared: function(e) {
            if (e.rowType == "header") {
                e.cellElement.css("text-align", "center");
            }
            if (e.rowType == "data")
                e.cellElement.css("text-align", "center");

            if (e.rowType === "data" && e.column.dataField === "total") {
                console.log(e.data)
                e.cellElement.css("color", e.data.total <= 103 ? "green" : "red");

            }
        },

    });



});


function masterDetailTemplate(_, masterDetailOptions) {



    return $("<div style='font-size: 30px;'>").dxTabPanel({
        items: [{
                title: "Ores",
                template: createOresTemplate(masterDetailOptions)
            }, {
                title: "Flux",
                template: createFluxTemplate(masterDetailOptions)
            },
            {
                title: "Reductants",
                template: createRedTemplate(masterDetailOptions)
            },
            {
                title: "Constants",
                template: createConstantsTemplate(masterDetailOptions)
            }
        ]
    });



}
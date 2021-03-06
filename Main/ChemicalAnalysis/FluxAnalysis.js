$(function() {

    $("#MenuPage").dxButton({
        stylingMode: "contained",

        type: "normal",
        icon: "back",
        width: 50,
        onClick: function() {
            window.open("../Menu/OFRMenu.html", "_self")
        }
    });


    var fluxataGrid = $("#gridContainer").dxDataGrid({
        onInitialized: function(e) {
            this.beginCustomLoading();

            getFluxes()
                .then((data) => {
                    this.endCustomLoading();
                    fluxataGrid.dxDataGrid("instance").option("dataSource", data);
                })
                .catch((error) => {
                    this.endCustomLoading();
                    DevExpress.ui.notify("Failed", "error", 600);

                });
        },
        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        pager: {
            visible: true,
            allowedPageSizes: [5, 10, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true
        },
        onRowInserting: function(e) {
            const deferred = $.Deferred();

            this.beginCustomLoading();

            insertFlux(e.data)
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
            console.log(e);
            const deferred = $.Deferred();

            this.beginCustomLoading();

            updateFlux(e)
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

            deleteFlux(e.data)
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
        columns: [{
                caption: "Name",
                dataField: "name",
                width: 125,
                validationRules: [{ type: "required" }]
            },
            {
                caption: "Lab ID",
                dataField: "labId",
                width: 125,
                validationRules: [{ type: "required" }]
            },
            {
                caption: "CaO",
                dataField: "cao",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.cao = value;
                }
            },
            {
                caption: "MgO",
                dataField: "mgo",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.mgo = value;
                }
            },
            {
                caption: "SiO???",
                dataField: "sio2",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.sio2 = value;
                }
            },
            {
                caption: "Fe???O???",
                dataField: "fe2o3",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.fe2o3 = value;
                }
            },
            {
                caption: "FeO",
                dataField: "feo",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.feo = value;
                }
            },
            {
                caption: "Al???O???",
                dataField: "al2o3",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.al2o3 = value;
                }
            },
            {
                caption: "P",
                dataField: "p",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.p = value;
                }
            },
            {
                caption: "S",
                dataField: "s",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.s = value;
                }
            },

            {
                caption: "LOI/CO???",
                dataField: "loi_co2",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.loi_co2 = value;
                }
            },
            {
                caption: "Other",
                dataField: "other",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.other = value;
                }
            },
            {
                caption: "H???O",
                dataField: "h2o",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.vols = value;
                }
            },
            {
                caption: "Total",
                dataField: "total",
                allowEditing: false,
                validationRules: [{
                    type: "range",
                    min: 98,
                    max: 102,

                    message: "Must range between 98 and 102"
                }],

                calculateCellValue: function(rowData) {
                    if (rowData.hasOwnProperty('name')) {
                        var keys = Object.keys(rowData);
                        var total = 0;
                        keys.forEach(element => {
                            if (element != "labId" && element != "total" && element != "name" && element != "id" && element != "__KEY__") {
                                total += isNaN(parseFloat(rowData[element])) ? 0 : parseFloat(rowData[element]);

                            }
                        });
                        if (keys.length > 3) {
                            rowData.total = total;

                            return parseFloat(total).toFixed(1);
                        }
                    }
                }
            }

        ],

        onCellPrepared: function(e) {
            if (e.rowType == "header") {
                e.cellElement.css("text-align", "center");
            }
            if (e.rowType == "data")
                e.cellElement.css("text-align", "center");

            if (e.rowType === "data" && e.column.dataField === "total") {
                e.cellElement.css("color", e.data.total <= 103 && e.data.total >= 97 ? "green" : "red");

            }
        },

    });
});
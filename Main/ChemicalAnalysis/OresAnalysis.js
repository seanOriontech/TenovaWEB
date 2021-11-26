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


    var oreDataGrid = $("#gridContainer").dxDataGrid({
        onInitialized: function(e) {
            this.beginCustomLoading();

            getOres()
                .then((data) => {
                    this.endCustomLoading();
                    oreDataGrid.dxDataGrid("instance").option("dataSource", data);
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

            insertOre(e.data)
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

            updateOre(e)
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

            deleteOre(e.data)
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
            }, {
                caption: "Cr",
                dataField: "cr",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.cr = value;
                }
            },
            {
                caption: "Fe",
                dataField: "fe",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.fe = value;
                }
            },
            {
                caption: "Si",
                dataField: "si",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.si = value;
                }
            },
            {
                caption: "Ni",
                dataField: "ni",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.ni = value;
                }
            },
            {
                caption: "MnO",
                dataField: "mno",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.mno = value;
                }
            },
            {
                caption: "ZnO",
                dataField: "zno",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.zno = value;
                }
            },
            {
                caption: "Cr₂O₃",
                dataField: "cr2o3",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.cr2o3 = value;
                }
            },
            {
                caption: "NiO",
                dataField: "nio",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.nio = value;
                }
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
                caption: "SiO₂",
                dataField: "sio2",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.sio2 = value;
                }
            },
            {
                caption: "MoO₃",
                dataField: "moo3",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.moo3 = value;
                }
            },
            {
                caption: "Fe₂O₃",
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
                caption: "Al₂O₃",
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
                caption: "C",
                dataField: "c",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.c = value;
                }
            },
            {
                caption: "TiO₂",
                dataField: "tio2",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.tio2 = value;
                }
            },
            {
                caption: "V₂O₅",
                dataField: "v2o5",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.v2o5 = value;
                }
            },
            {
                caption: "Na/K/Cl/F",
                dataField: "nakclf",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.nakclf = value;
                }
            },
            {
                caption: "Vols",
                dataField: "vols",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.vols = value;
                }
            },
            {
                caption: "H₂O",
                dataField: "h2o",
                dataType: "number",
                setCellValue: function(newData, value, currentRowData) {
                    newData.h2o = value;
                }
            },
            {
                caption: "Total",
                dataField: "total",
                dataType: "number",
                allowEditing: false,
                validationRules: [{
                    type: "range",
                    min: 98,
                    max: 103,
                    reevaluate: true,
                    message: "Must range between 98 and 103"
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
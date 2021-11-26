var oreGrid;
var fluxGrid;
var redGrid;
var constGrid;


getBatches();
getOres().then(() => {

    $(function() {


        var myDialog = DevExpress.ui.dialog.custom({
            title: "MEB",
            messageHtml: "<b>MEB Completed</b>",
            buttons: [{
                    text: "Accept",
                    onClick: function(e) {
                        //  return { buttonText: e.component.option("text") }
                    }
                },
                // ...
            ]
        });

        $("#runMEB").dxButton({
            stylingMode: "contained",
            text: "Online MEB",
            type: "normal",
            width: 200,
            onClick: function() {
                var recipe = recipeGrid.dxDataGrid("instance").getSelectedRowsData();
                if (recipe.length == 0) {
                    DevExpress.ui.notify("Please Select Recipe");
                } else {
                    recipeGrid.dxDataGrid("instance").beginCustomLoading();
                    getResults(recipe[0].id)
                        .then((data) => {
                            recipeGrid.dxDataGrid("instance").endCustomLoading();
                            myDialog.show();

                            localStorage.setItem("MEBStatic", JSON.stringify(data));


                        })
                        .catch((error) => {
                            recipeGrid.dxDataGrid("instance").endCustomLoading();
                            DevExpress.ui.notify("Failed", "error", 600);

                        });

                }


            }
        });

        $("#selectMEB").dxButton({
            stylingMode: "contained",
            text: "Live MEB",
            type: "normal",
            width: 200,
            onClick: function() {

                var recipe = recipeGrid.dxDataGrid("instance").getSelectedRowsData();
                if (recipe.length == 0) {
                    DevExpress.ui.notify("Please Select Recipe");
                } else {

                    var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
                    result.done(function(dialogResult) {

                        SetLiveRecipe(recipe[0].id)
                            .then((data) => {
                                recipeGrid.dxDataGrid("instance").endCustomLoading();
                                myDialog.show();
                                recipeGrid.dxDataGrid("instance").option("dataSource", data);

                            })
                            .catch((error) => {
                                recipeGrid.dxDataGrid("instance").endCustomLoading();
                                DevExpress.ui.notify("Failed", "error", 600);

                            });

                    });

                }


            }
        });

        var recipeIndex = 0;
        var recipeGrid = $("#gridContainer").dxDataGrid({


            onInitialized: function(e) {
                this.beginCustomLoading();

                getOres();
                getReductants();
                getFluxes();

                getRecipe()
                    .then((data) => {
                        this.endCustomLoading();
                        recipeGrid.dxDataGrid("instance").option("dataSource", data);
                    })
                    .catch((error) => {
                        this.endCustomLoading();
                        DevExpress.ui.notify("Failed", "error", 600);

                    });
            },
            keyExpr: "id",
            selection: {
                mode: "single"
            },
            onRowInserting: function(e) {
                const deferred = $.Deferred();

                this.beginCustomLoading();


                insertRecipe(e.data)
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

                updateRecipe(e)
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

                deleteRecipe(e.data)
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
            onCellPrepared: function(e) {

                if (e.rowType == "header") {
                    e.cellElement.css("text-align", "center");
                }
                if (e.rowType == "data") {
                    e.cellElement.css("text-align", "center");
                }

            },
            onRowPrepared: function(e) {
                if (e.rowType == 'data') {

                    if (e.data["liveRecipe"] == true)
                        e.rowElement.css('backgroundColor', '#0A959B');

                }
            },

            onContentReady: function(e) {

                e.component.selectRowsByIndexes(recipeIndex);
            },
            columns: [{
                    caption: "Recipe Name",
                    dataField: "name",
                    width: 300,
                    validationRules: [{ type: "required" }]
                },
                {
                    caption: "Batch Name",
                    dataField: "batch_Id",
                    width: 300,
                    lookup: {
                        dataSource: batchData,
                        valueExpr: "id",
                        displayExpr: "name"
                    },
                    validationRules: [{ type: "required" }]
                },
                {
                    caption: "Furnace Power",
                    dataField: "furnacePower",
                    dataType: "number",
                    width: 125,
                    validationRules: [{ type: "required" }]
                }
            ],

            onSelectionChanged: function(selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                getBatchData(data);
            },





        });



        function getBatchData(data) {
            for (let index = 0; index < batchData.length; index++) {
                if (batchData[index].id == data.batch_Id) {
                    console.log(fluxAnalysis);
                    oreGrid.option("dataSource", batchData[index].batch_Ore);
                    oreGrid.columnOption('ore_id', 'lookup.dataSource', OreAnalysis);
                    oreGrid.columnOption('labids', 'lookup.dataSource', OreAnalysis);
                    fluxGrid.option("dataSource", batchData[index].batch_Flux);
                    fluxGrid.columnOption('flux_id', 'lookup.dataSource', fluxAnalysis);
                    fluxGrid.columnOption('labid', 'lookup.dataSource', fluxAnalysis);
                    redGrid.option("dataSource", batchData[index].batch_Reduc);
                    redGrid.columnOption('red_id', 'lookup.dataSource', redAnalysis);
                    redGrid.columnOption('labid', 'lookup.dataSource', redAnalysis);

                    showConstants(batchData[index].batch_Constants);

                }

            }


        }

        oreGrid = $("#gridContainerOre").dxDataGrid({
            dataSource: recipeData,
            keyExpr: "id",
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


                },
                {
                    caption: "Lab Id",
                    dataField: "ore_id",
                    name: "labids",
                    lookup: {
                        dataSource: OreAnalysis,
                        valueExpr: "id",
                        displayExpr: "labId"
                    },


                },
                {
                    caption: "Percentage (%)",
                    dataField: "perc",
                    dataType: "number"
                },
                {
                    caption: "Kg",
                    dataField: "mass",
                    dataType: "number"
                }
            ]

        }).dxDataGrid('instance');


        fluxGrid = $("#gridContainerFlux").dxDataGrid({
            dataSource: recipeData,
            keyExpr: "id",
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


                },
                {
                    caption: "Lab Id",
                    dataField: "flux_id",
                    name: "labid",
                    lookup: {
                        dataSource: fluxAnalysis,
                        valueExpr: "id",
                        displayExpr: "labId"
                    },


                },
                {
                    caption: "Percentage (%)",
                    dataField: "perc",
                    dataType: "number"
                },
                {
                    caption: "Kg",
                    dataField: "mass",
                    dataType: "number"
                }
            ]

        }).dxDataGrid('instance');


        redGrid = $("#gridContainerRed").dxDataGrid({
            dataSource: recipeData,
            keyExpr: "id",
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


                },
                {
                    caption: "Lab Id",
                    dataField: "red_id",
                    name: "labid",
                    lookup: {
                        dataSource: redAnalysis,
                        valueExpr: "id",
                        displayExpr: "labId"
                    },


                },
                {
                    caption: "Percentage (%)",
                    dataField: "perc",
                    dataType: "number"
                }
            ]

        }).dxDataGrid('instance');


        function showConstants(contants) {


            $("#Recipe").addClass("masterDetail").dxForm({
                formData: contants,
                colCount: 2,

                alignItemLabelsInAllGroups: false,
                items: [{
                        itemType: "group",
                        colCount: 2,

                        caption: "Oxide Conversion",

                        items: [{
                                dataField: "si",
                                dataType: "number",
                                labelLocation: "left",

                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    width: 100,
                                    text: "Si (%)"
                                },
                            },
                            {
                                dataField: "fe",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,


                                },
                                label: {
                                    text: "Fe (%)"
                                },
                            },
                            {
                                dataField: "cr",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Cr (%)"
                                },
                            },

                            /*  {
                                  dataField: "mo",
                                  dataType: "number",
                                  editorOptions: {
                                      width: 100,
                                      visible: false,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Mo (%)"
                                  },
                              },*/
                            {
                                dataField: "ti",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Ti (%)"
                                },
                            },
                            {
                                dataField: "mn",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Mn (%)"
                                },
                            },
                            {
                                dataField: "v",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "V (%)"
                                },
                            },
                            {
                                dataField: "s",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "S (%)"
                                },
                            },
                            {
                                dataField: "p",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "P (%)"
                                },
                            },

                            /*  {
                                  dataField: "al",
                                  dataType: "number",
                                  editorOptions: {
                                      width: 100,
                                      visible: false,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Al (%)"
                                  },
                              },
                              {
                                  dataField: "ca",
                                  dataType: "number",
                                  editorOptions: {
                                      width: 100,
                                      visible: false,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Ca (%)"
                                  },
                              }, {
                                  dataField: "pb",
                                  dataType: "number",
                                  editorOptions: {
                                      visible: false,
                                      width: 100,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Pb (%)"
                                  },
                              },
                              {
                                  dataField: "ni",
                                  dataType: "number",
                                  editorOptions: {
                                      width: 100,
                                      visible: false,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Ni (%)",
                                      alignment: "right"
                                  },
                              },
                              {
                                  dataField: "zn",
                                  dataType: "number",
                                  editorOptions: {
                                      width: 100,
                                      visible: false,
                                  },
                                  label: {
                                      visible: false,
                                      text: "Zn (%)"
                                  },
                              },*/
                        ]

                    }, {
                        itemType: "group",
                        colCount: 1,


                        //   dataField: "totalRed",
                        caption: "Dust Analysis",
                        items: [{
                                dataField: "na_k_ck_f_rec",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Na/K/Cl/F recovery to dust (%)"
                                },
                            },
                            {
                                dataField: "pbo_to_dust",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "PbO to dust  (%)"
                                },
                            },
                            {
                                dataField: "zno_to_dust",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "ZnO to dust (%)"
                                },
                            },
                            {
                                dataField: "si2o_to_dust",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "SiO₂ lost to SiO (%)"
                                },
                            },
                            {
                                dataField: "other_elements",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Other elements lost to dust (%)"
                                },
                            }
                        ]

                    }, {
                        itemType: "group",
                        colCount: 1,
                        //   dataField: "totalRed",
                        caption: "Gas Temperatures",
                        items: [{
                                dataField: "furnace_process_gas",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Furnace Process Gas (°C)"
                                },
                            },
                            {
                                dataField: "furnace_off_gas",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    text: "Furance Off Gas (°C)"
                                },
                            }
                        ]

                    },
                    {
                        itemType: "group",
                        colCount: 1,
                        //   dataField: "totalRed",
                        caption: "Carbon Efficiency",
                        items: [{
                            dataField: "carbon_efficiency",
                            dataType: "number",
                            editorOptions: {
                                width: 100,
                            },
                            label: {
                                text: "Carbon Efficiency (%)"
                            },
                        }]

                    }
                ]
            })


            /* $("#const_Si").text(contants.si.toFixed(2) + "%");
             $("#const_Fe").text(contants.fe.toFixed(2) + "%");
             $("#const_Cr").text(contants.cr.toFixed(2) + "%");
             $("#const_Pb").text(contants.pb.toFixed(2) + "%");
             $("#const_Ni").text(contants.ni.toFixed(2) + "%");
             $("#const_Zn").text(contants.zn.toFixed(2) + "%");
             $("#const_Mo").text(contants.mo.toFixed(2) + "%");
             $("#const_Ti").text(contants.ti.toFixed(2) + "%");
             $("#const_Mn").text(contants.mn.toFixed(2) + "%");
             $("#const_V").text(contants.v.toFixed(2) + "%");
             $("#const_S").text(contants.s.toFixed(2) + "%");
             $("#const_Al").text(contants.al.toFixed(2) + "%");
             $("#const_P").text(contants.p.toFixed(2) + "%");
             $("#const_Ca").text(contants.ca.toFixed(2) + "%");
             $("#const_Zn").text(contants.zn.toFixed(2) + "%");
             $("#const_dustna").text(contants.na_k_ck_f_rec.toFixed(2) + "%");
             $("#const_dustpbo").text(contants.pbo_to_dust.toFixed(2) + "%");
             $("#const_dustsio2").text(contants.si2o_to_dust.toFixed(2) + "%");
             $("#const_dustother").text(contants.other_elements.toFixed(2) + "%");
             $("#const_dustprocessgas").text(contants.furnace_process_gas.toFixed(2) + "%");
             $("#const_dustfurnaceoff").text(contants.furnace_off_gas.toFixed(2) + "%");
             $("#const_dustcarboneff").text(contants.carbon_efficiency.toFixed(2) + "%");*/
        }










    });
})
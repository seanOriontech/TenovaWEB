function createConstantsTemplate(masterDetailOptions) {

    return function() {
        let redDataGrid;


        function onDataGridInitialized(e) {
            fluxDataGrid = e.component;
            //    orderHistoryDataGrid.option("dataSource", [{ "oreid": "1" }]);

        }
        return $("<div>").addClass("form-container").dxForm({

            //  width: 1000,
            items: [{
                template: createTotalConstantTexboxTemplate(masterDetailOptions)
            }]
        });
    };


}


function createTotalConstantTexboxTemplate(masterDetailData) {;
    return function() {

        return $("<div style='width:100%' id='constants'>")
            .addClass("masterDetail").dxForm({
                formData: masterDetailData.data.batch_Constants,
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
                                    alignment: "right",
                                    text: "Si (%)"
                                },
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
                            },
                            {
                                dataField: "cr",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    alignment: "right",
                                    text: "Cr (%)"
                                },
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
                            },
                            {
                                dataField: "mn",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    alignment: "right",
                                    text: "Mn (%)"
                                },
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
                            },
                            {
                                dataField: "s",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                },
                                label: {
                                    alignment: "right",
                                    text: "S (%)"
                                },
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],
                            },
                            {
                                dataField: "other_elements",
                                dataType: "number",
                                editorOptions: {
                                    width: 100,
                                    valueChangeEvent: "change",
                                    onValueChanged: function(e) {
                                        console.log(this.isValid);

                                    }
                                },
                                label: {
                                    text: "Other elements lost to dust (%)"
                                },
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 100,

                                    message: "Must range between 0 and 100"
                                }],

                            },

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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 2500,

                                    message: "Must range between 0 and 2500"
                                }],
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
                                validationRules: [{
                                    type: "range",
                                    min: 0,
                                    max: 2500,

                                    message: "Must range between 0 and 2500"
                                }],
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
                        }, {
                            itemType: "button",
                            horizontalAlignment: "right",
                            buttonOptions: {
                                text: "Save",
                                type: "success",
                                onClick: function(e) {

                                    var form = $("#constants").dxForm('instance');

                                    if (!(form.validate()).isValid)
                                        return;

                                    var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
                                    result.done(function(dialogResult) {

                                        console.log(masterDetailData);
                                        updateBatchConstant(masterDetailData.data.batch_Constants)
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

                    }
                ]
            });



    }

}
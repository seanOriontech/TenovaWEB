$(function() {

    getResultsLive().then((data) => {

        var Ores = data.Ores;
        var Reductants = data.Reductants;
        var Flux = data.Flux;
        var Alloy = [data.Alloy];
        var Slag = [data.Slag];

        var Dust = [data.Dust];
        var Gas = [data.Gas];

        var oreGrid = $("#OreGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Ores,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");

                    if (value == "t/t" || value == "t/h") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data") {
                    e.cellElement.css("text-align", "center");

                }

            }
        }).dxDataGrid("instance");




        var reducGrid = $("#ReducGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Reductants,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    if (value == "t/t" || value == "t/h") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var reducGrid = $("#FluxGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Flux,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    if (value == "t/t" || value == "t/h") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var alloyGrid = $("#AlloyGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Alloy,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    if (value == "tpd" || value == "tph" || value == "tpa") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else if (value == "TdegC") {
                        e.cellElement.css("backgroundColor", "#D50000");
                        e.cellElement.html("<div'>" + "T°C" + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var slagGrid = $("#SlagGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Slag,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    if (value == "tpd" || value == "tph" || value == "tpa") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else if (value == "TdegC") {
                        e.cellElement.css("backgroundColor", "#D50000");
                        e.cellElement.html("<div'>" + "T°C" + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var dustGrid = $("#DustGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Slag,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var gasGrid = $("#GasGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Gas,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    if (value == "Volume" || value == "tph" || value == "tpa") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else if (value == "TdegC") {
                        e.cellElement.css("backgroundColor", "#D50000");
                        e.cellElement.html("<div'>" + "T°C" + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");

        var dustGrid = $("#DustGrid").addClass("masterDetail").dxDataGrid({
            dataSource: Dust,
            columnAutoWidth: true,
            onCellPrepared: function(e) {
                if (e.rowType == "header") {

                    var value = e.column.dataField.replace(/(\d+)/g, "<sub>$1</sub>");
                    e.cellElement.css("text-align", "center");
                    e.cellElement.css("text-align", "center");
                    if (value == "tpd" || value == "tph" || value == "tpa") {
                        e.cellElement.css("backgroundColor", "#E43D00");
                        e.cellElement.html("<div'>" + value + "</div>");
                    } else if (value == "TdegC") {
                        e.cellElement.css("backgroundColor", "#D50000");
                        e.cellElement.html("<div'>" + "T°C" + "</div>");
                    } else
                        e.cellElement.html("<div>" + value + "</div>");
                }
                if (e.rowType == "data")
                    e.cellElement.css("text-align", "center");

            },
        }).dxDataGrid("instance");
    });

});
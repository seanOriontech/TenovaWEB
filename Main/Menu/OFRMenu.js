$(function() {

    $("#OrePage").dxButton({
        stylingMode: "contained",
        text: "Chemical Composition Ore",
        type: "normal",
        width: 400,
        onClick: function() {
            window.open("../ChemicalAnalysis/OresAnalysis.html", "_self")
        }
    });

    $("#FluxPage").dxButton({
        stylingMode: "contained",
        text: "Chemical Composition Flux",
        type: "normal",
        width: 400,
        onClick: function() {
            window.open("../ChemicalAnalysis/FluxAnalysis.html", "_self")
        }
    });

    $("#RedPage").dxButton({
        stylingMode: "contained",
        text: "Chemical Composition Reductants",
        type: "normal",
        width: 400,
        onClick: function() {
            window.open("../ChemicalAnalysis/ReductantAnalysis.html", "_self")
        }
    });

});
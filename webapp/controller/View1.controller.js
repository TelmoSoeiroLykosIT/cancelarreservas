sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	MessageToast,
	JSONModel,
    Fragment) {
        "use strict";

        return Controller.extend("formacao.demo.cancelarreservas.controller.View1", {
            onInit: function () {

                var oJsonModel = new JSONModel({
                    availableCancel: false
                });

                this.getView().setModel(oJsonModel, "viewModel");

            },

            onCancelBooking: function(oEvent){

                //items selecionados????
                var aSelectedIndex = this.getView().byId("smartTable").getTable().getSelectedIndices();

                for (var i=0; i < aSelectedIndex.length; i++){
                    var context = this.getView().byId("smartTable").getTable().getContextByIndex(aSelectedIndex[i]);
                    var oObject = context.getObject();
                    this.getView().getModel("modeloParaUserNoFunctionImport").setUseBatch(false);

                    //cancelar a reserva, function import
                    this.getView().getModel("modeloParaUserNoFunctionImport").callFunction("/CancelBookings",
                        {
                            method: "POST",
                            urlParameters: {"CustomerId":  oObject.Id},

                            success: function(oResult){
                                MessageToast.show(oResult.results[0].Message);
                            },

                            error: function(oResult){
                                MessageToast.show("Erro");
                            }
                        }
                    );
                }
            },

            onRowSelectionChange: function(oEvent){
                var aSelectedIndex = this.getView().byId("smartTable").getTable().getSelectedIndices();

                if (aSelectedIndex.length == 0){
                    this.getView().getModel("viewModel").setProperty("/availableCancel", false);
                }else{
                    this.getView().getModel("viewModel").setProperty("/availableCancel", true);
                }
            },

            onPressOpenFragment: function(oEvent){
                var that = this;

                if (this.getView().byId("idDialog")){
                    //abrir dialog
                    this.getView().byId("idDialog").open();
                }else{
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "formacao.demo.cancelarreservas.view.CaixaDialogo",
                        controller: that
                    }).then( function (oDialog){
                        oDialog.open();
                    });
                }
            },

            onDialogClose: function(oEvent){
                var oFragment = this.getView().byId("idDialog");
                oFragment.close();
            }
        });
    });

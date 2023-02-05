sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                //Colchete indica que variavel é uma tabela interna
                let ImageList = {
                    Imagens : [ ] 

                };

                // Criação do modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");


            },

            onPressBuscar: function(){
                //Instancia objeto input na variavel
                let inputBusca = this.byId("inpBusca");
                //Coleta o valor digitado no input
                let query = inputBusca.getValue();
                //exibe na tela
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate

                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                            + query
                            + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "ea5c08e105msh520fb8fdf27366dp14161cjsn8ed7f10b455f",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                //callback: uma função executada no final de outra função
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    //Clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela em outra (Os dados da tabela response estao dentro de value)
                    let listaResultados = response.value;
                    let newItem;

                    //Vamos ao loop = for

                    for ( var i = 0; i < listaResultados.length; i++) {
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);

                    }

                        oImageModel.refresh();

                }.bind(this)
                );


            }
        });
    });

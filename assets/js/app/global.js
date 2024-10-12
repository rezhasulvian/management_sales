"use strict";

var MSApp = function() {

	var generalSearch = function(comp, table) {
        comp.keyup(function(){
            table.search($(this).val()).draw() ;
        });
    }

}
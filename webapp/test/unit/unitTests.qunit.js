/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"formacaodemo/cancelarreservas/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

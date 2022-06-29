/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["formacao/demo/cancelarreservas/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});

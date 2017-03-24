/*
 * branding.js can be used for overloading Swagger Editor behaviors
 * You can add new controllers to Swagger Editor with following syntax:
 *
 * SwaggerEditor.controller('BrandingController', function($scope) { ... });
 *
 * You can use the controller you created in branding HTML pieces.
 */

SwaggerEditor.controller('BrandingController', function ($scope, $rootScope, YAML, Storage) {
    let swaggerEditorFacade = {
        getDocument: function (callback) {
            YAML.load($rootScope.editorValue, function (error, swaggerObject) {
                callback(swaggerObject, error);
            });
        },
        setDocument: function (swaggerObject) {
            try {
                YAML.dump(swaggerObject, function (error, result) {
                    Storage.save('yaml', result);
                    $rootScope.editorValue = result;
                    $rootScope.$apply();
                });
            } catch (error) {
                // do nothing
            }
        }
    }

    document.swaggerEditorFacade = swaggerEditorFacade;
    var customEvent = document.createEvent("CustomEvent");
    customEvent.initCustomEvent("swaggerFacadeReady", true, true, swaggerEditorFacade);
    document.dispatchEvent(customEvent);
})
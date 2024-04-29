// ./workspaceFeatures/templatesCallback.js

function registerTemplateCallbacks(workspace) {
    workspace.registerButtonCallback("myButtonCallback", function() {
        const template = {
            "blocks": {
                "languageVersion": 0,
                "blocks": [
                    {
                        "type": "automation_init",
                        "id": "GnBZhXKeRPJ-Rho;_?5-",
                        "x": 330,
                        "y": 90,
                        "next": {
                            "block": {
                                "type": "automation_close",
                                "id": "J=r!hQNT(yw7:N5}]%qs"
                            }
                        }
                    }
                ]
            }
        };

        workspace.clear();
        Blockly.serialization.workspaces.load(template, workspace);
    });

    workspace.registerButtonCallback("loadAnotherTemplate", function() {
        const template = {
            "blocks": {
                "languageVersion": 0,
                "blocks": [
                    {
                        "type": "automation_init",
                        "id": "GnBZhXKeRPJ-Rho;_?5-",
                        "x": 330,
                        "y": 90,
                        "next": {
                            "block": {
                                "type": "automation_close",
                                "id": "J=r!hQNT(yw7:N5}]%qs"
                            }
                        }
                    }
                ]
            }
        };

        workspace.clear();
        Blockly.serialization.workspaces.load(template, workspace);
    });
}
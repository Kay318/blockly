// ./workspaceFeatures/pythonCodeUpdate.js

function updatePythonCode(workspace) {
    workspace.addChangeListener((event) => {
        // if (event.type === Blockly.Events.CHANGE) {
            // const code = Blockly.Python.workspaceToCode(workspace);
            // const codeArea = document.getElementById('codeArea');
        //     if (codeArea) {
        //         codeArea.textContent = code;
        //     }
        // }

        const code = Blockly.Python.workspaceToCode(workspace);
        document.getElementById('codeArea').textContent = code;
        // console.log(code);
    });
}

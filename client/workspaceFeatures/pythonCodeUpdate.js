// ./workspaceFeatures/pythonCodeUpdate.js

function updatePythonCode(workspace) {
    workspace.addChangeListener((event) => {

        const code = Blockly.Python.workspaceToCode(workspace);
        document.getElementById('codeArea').textContent = code;
    });
}

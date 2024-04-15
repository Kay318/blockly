// returnedPython.js


let workspace;

document.addEventListener("DOMContentLoaded", function() {
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        scrollbars: false,
    });
    workspace.addChangeListener(updateCode); // 블록 변경 시 코드 업데이트

    fetchCustomBlocks();
});

function updateCode(event) {
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeArea').textContent = code;
    console.log(code);
}

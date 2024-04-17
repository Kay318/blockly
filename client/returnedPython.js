// returnedPython.js

let workspace;

document.addEventListener("DOMContentLoaded", function() {
    const options = {
        toolbox: toolbox,
        scrollbars: true,
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        plugins: { 'blockDragger': MultiselectBlockDragger },
        bumpNeighbours: false,
        multiFieldUpdate: true,
        workspaceAutoFocus: true,
        multiselectIcon: {
            hideIcon: false,
            weight: 3,
            enabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/select.svg',
            disabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/unselect.svg'
        },
        multiselectCopyPaste: {
            crossTab: true,
            menu: true
        },
    };
  
    workspace = Blockly.inject('blocklyDiv', options);
    workspace.addChangeListener(updateCode);

    const multiselectPlugin = new Multiselect(workspace);
    multiselectPlugin.init(options);

    fetchCustomBlocks();
});

function updateCode(event) {
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeArea').textContent = code;
    console.log(code);
}

// workspaceInitialization.js

let workspace;

document.addEventListener("DOMContentLoaded", function () {
    const options = {
        toolbox: toolbox,
        // theme: DarkTheme,
        scrollbars: true,
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        plugins: { 'blockDragger': MultiselectBlockDragger },
        bumpNeighbours: false,
        multiFieldUpdate: true,
        workspaceAutoFocus: true,
    };

    workspace = Blockly.inject('blocklyDiv', options);

    registerTemplateCallbacks(workspace); // 여기에서 함수 호출

    // 각 모듈 호출
    sortBlocksOnDoubleClick(workspace);
    updatePythonCode(workspace);
    initializeMultiselect(workspace);

    fetchCustomBlocks();
});
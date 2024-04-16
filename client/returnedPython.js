// returnedPython.js

let workspace;

document.addEventListener("DOMContentLoaded", function() {
    const options = {
        toolbox: toolbox,  // 정의되어야 합니다.
        scrollbars: false,
        grid:
         {spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true},
        plugins: {
            'blockDragger': MultiselectBlockDragger, // Required to work
          },
        
          // // For integration with other plugins that also
          // // need to change the blockDragger above (such as
          // // scroll-options).
          // baseBlockDragger: ScrollBlockDragger
        
          // Double click the blocks to collapse/expand
          // them (A feature from MIT App Inventor).
          // Bump neighbours after dragging to avoid overlapping.
          bumpNeighbours: false,
        
          // Keep the fields of multiple selected same-type blocks with the same value
          multiFieldUpdate: true,
        
          // Auto focus the workspace when the mouse enters.
          workspaceAutoFocus: true,
        
          // Use custom icon for the multi select controls.
          multiselectIcon: {
            hideIcon: false,
            weight: 3,
            enabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/select.svg',
            disabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/unselect.svg'
          },
        
          multiselectCopyPaste: {
            // Enable the copy/paste accross tabs feature (true by default).
            crossTab: true,
            // Show the copy/paste menu entries (true by default).
            menu: true
          },
        };
      
    workspace = Blockly.inject('blocklyDiv', options);
    workspace.addChangeListener(updateCode); // 블록 변경 시 코드 업데이트

    const multiselectPlugin = new Multiselect(workspace);
    multiselectPlugin.init(options);

    fetchCustomBlocks();
});

function updateCode(event) {
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeArea').textContent = code;
    console.log(code);
}

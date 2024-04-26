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

    const fixedXPos = 500; // 고정된 x좌표

    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_CREATE) {
            const block = workspace.getBlockById(event.blockId);

            if (block) {
                const allBlocks = workspace.getAllBlocks();
                let lastBlock = null;

                allBlocks.forEach((b) => {
                    if (b === block) return;

                    // xPos이 지정된 고정된 열에 위치한 블록만 정렬 대상으로 고려
                    const bPosX = b.getRelativeToSurfaceXY().x;
                    if (Math.abs(bPosX - fixedXPos) > 10) return; // xPos가 지정된 열에서 멀어지면 건너뛴다.

                    // 블록을 연결할 수 있으면 연결 시도
                    if (block.previousConnection && b.nextConnection) {
                        if (!block.previousConnection.isConnected() && !b.nextConnection.isConnected()) {
                            block.previousConnection.connect(b.nextConnection);
                        }
                    } else if (block.nextConnection && b.previousConnection) {
                        if (!block.nextConnection.isConnected() && !b.previousConnection.isConnected()) {
                            block.nextConnection.connect(b.previousConnection);
                        }
                    }

                    const blockPos = b.getRelativeToSurfaceXY();
                    if (!lastBlock || blockPos.y > lastBlock.getRelativeToSurfaceXY().y) {
                        lastBlock = b;
                    }
                });

                if (!block.previousConnection?.isConnected() && !block.nextConnection?.isConnected()) {
                    // 지정된 xPos 열에 자동 정렬
                    const yOffset = 30;
                    const yPos = lastBlock 
                        ? lastBlock.getRelativeToSurfaceXY().y + lastBlock.getHeightWidth().height + yOffset 
                        : 50;

                    block.moveBy(fixedXPos - block.getRelativeToSurfaceXY().x, yPos - block.getRelativeToSurfaceXY().y);
                }
            }
        }
    });

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

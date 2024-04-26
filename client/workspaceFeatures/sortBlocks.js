// ./workspaceFeatures/sortBlocks.js

const fixedXPos = 500; // 고정된 x좌표

function sortBlocksOnDoubleClick(workspace) {
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_CREATE) {
            const block = workspace.getBlockById(event.blockId);

            if (block) {
                block.svgGroup_.addEventListener('dblclick', () => {
                    const allBlocks = workspace.getAllBlocks();
                    let lastBlock = null;

                    allBlocks.forEach((b) => {
                        if (b === block) return;

                        const bPosX = b.getRelativeToSurfaceXY().x;
                        if (Math.abs(bPosX - fixedXPos) > 10) return; // 지정된 xPos 열에만 적용

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
                        const yOffset = 30;
                        const yPos = lastBlock 
                            ? lastBlock.getRelativeToSurfaceXY().y + lastBlock.getHeightWidth().height + yOffset 
                            : 50;

                        block.moveBy(fixedXPos - block.getRelativeToSurfaceXY().x, yPos - block.getRelativeToSurfaceXY().y);
                    }
                });
            }
        }
    });
}

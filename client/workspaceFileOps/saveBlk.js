// ./event/saveAsBlk.js

function saveToBlkFile(workspace) {
    const workspaceJson = Blockly.serialization.workspaces.save(workspace);
    const jsonString = JSON.stringify(workspaceJson, null, 2);

    // 저장하려는 파일명
    let filename = null;

    const blob = new Blob([jsonString], {type: "application/json"});
    
    if (currentFileName) {
        filename = currentFileName;
    }
    else {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        filename = `project_${year}${month}${day}_${hours}${minutes}${seconds}.blk`;
    }

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

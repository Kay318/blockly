// ./event/loadBlk.js

let currentFileName = null;

function loadFromBlkFile() {
    const input = document.getElementById('fileInput');
    if (!input.files.length) {
        alert("파일을 선택해 주세요.");
        return;
    }

    const file = input.files[0];
    currentFileName = file.name; // 파일 이름을 현재 파일 경로로 설정
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            // 파일 내용을 읽어서 JSON 객체로 파싱
            const json = JSON.parse(event.target.result);
            // 현재 워크스페이스를 클리어하고 JSON 데이터로 블록을 로드
            workspace.clear();
            Blockly.serialization.workspaces.load(json, workspace);
            console.log("파일이 성공적으로 로드되었습니다.");
        } catch (e) {
            console.error("파일 로드 에러:", e);
            alert("파일 로딩에 실패했습니다. 파일 형식을 확인해 주세요.");
        }

        // 파일 로드가 완료되면 입력 값을 초기화
        input.value = null;
    };

    reader.readAsText(file);
}

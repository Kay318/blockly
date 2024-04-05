// toolbox.js

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Loops",
        "colour": 10,
        "contents": [
          {
            "kind": "block",
            "type": "custom_repeat_basic"
          }
        ]
      },
    ]
  };


//   async function updateToolboxWithCustomBlocks() {
//     const response = await fetch('http://localhost:5000/api/blocks');
//     const customBlocks = await response.json();

//     // Automations 카테고리를 찾거나 새로 만듭니다.
//     let automationCategory = toolbox.contents.find(category => category.name === "Automations");
//     if (!automationCategory) {
//         automationCategory = { "kind": "category", "name": "Automations", "contents": [] };
//         toolbox.contents.push(automationCategory);
//     }

//     // 서버에서 받은 커스텀 블록을 Automations 카테고리에 추가합니다.
//     customBlocks.forEach(block => {
//         automationCategory.contents.push({
//             "kind": "block",
//             "type": block.func_name
//         });
//     });

//     // Blockly 툴박스를 업데이트합니다.
//     if (workspace) {
//         workspace.updateToolbox(toolbox);
//     }
// }

// // 서버로부터 커스텀 블록 데이터를 가져와 툴박스를 업데이트하는 함수 호출
// updateToolboxWithCustomBlocks();
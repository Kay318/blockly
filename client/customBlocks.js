// customBlocks.js


// 커스텀 파이썬 함수 호출 블록 정의
Blockly.defineBlocksWithJsonArray([
  {
    "type": "custom_repeat_basic", // 사용자 정의 블록의 고유 식별자
    "message0": "repeat %1 times", // 반복 횟수 설정
    "args0": [
      {
        "type": "field_number",
        "name": "TIMES",
        "value": 1,
        "min": 1,
        "max": 100,
        "precision": 1
      }
    ],
    "message1": "do %1", // 'do'와 연결된 실행 부분을 새로운 줄에 표시
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 10,
    "tooltip": "",
    "helpUrl": ""
  }
]);


Blockly.Python['custom_repeat_basic'] = function(block) {
  var repeats = block.getFieldValue('TIMES') || '0';
  var branch = Blockly.Python.statementToCode(block, 'DO') || '  pass\n';
  var code = 'for _ in range(' + repeats + '):\n' + branch;
  return code;
};


function updateToolboxWithCustomBlocks(customBlocks) {

  let newToolbox = JSON.parse(JSON.stringify(toolbox)); // 깊은 복사를 사용하여 기존 구조를 유지

  // Automations 카테고리를 찾거나 새로 만듭니다.
  let automationCategory = {
      "kind": "category",
      "name": "Automations",
      "colour": 160,
      "contents": []
  };

  // 서버에서 받은 커스텀 블록을 Automations 카테고리에 추가합니다.
  customBlocks.forEach(block => {
      automationCategory.contents.push({
          "kind": "block",
          "type": block.func_name
      });
  });

  // 새로운 툴박스 구조에 Automations 카테고리를 추가합니다.
  newToolbox.contents.push(automationCategory);

  // Blockly 툴박스를 새로운 구조로 업데이트합니다.
  // workspace.updateToolbox(newToolbox); 는 Blockly Workspace가 초기화된 후 호출되어야 합니다.
  if (workspace) {
      workspace.updateToolbox(newToolbox);
  }
}

// Blockly 블록을 서버로부터 받은 데이터로 동적으로 생성합니다.
function defineCustomBlocks(customBlocks) {
  customBlocks.forEach(block => {
    const blockDefinition = {
      type: block.func_name,
      message0: block.func_name,
      args0: [],
      colour: 160,
      tooltip: block.desc || "",
      previousStatement: null,
      nextStatement: null,
      helpUrl: ""
    };

    let messageIndex = 0;  // func_name은 message0

    // // 더미 입력으로 공백 라인 추가, 각각 %1을 참조해야 합니다.
    // messageIndex++;
    // blockDefinition[`message${messageIndex}`] = " %1"; // 첫 번째 더미
    // blockDefinition[`args${messageIndex}`] = [{ type: "input_dummy" }];

    for (let i = 1; i <= 5; i++) {
      const nameField = `args${i}_name`;
      const typeField = `args${i}_type`;
      const valueField = `args${i}_value`;

      if (block[nameField]) {
        messageIndex++;
        const name = block[nameField];
        const type = block[typeField];
        const defaultValue = block[valueField];
        let fieldType = type === "str" ? "field_input" : "field_number";

        blockDefinition[`message${messageIndex}`] = name + ": %1";
        blockDefinition[`args${messageIndex}`] = [{
          type: fieldType,
          name: name.toUpperCase(),
          value: type === "str" ? (defaultValue || "") : Number(defaultValue || 0)
        }];
      }
    }

    Blockly.Blocks[block.func_name] = {
      init: function() {
        this.jsonInit(blockDefinition);
      }
    };

    Blockly.Python[block.func_name] = function(b) {
      const params = [];
      for (let i = 1; i <= messageIndex; i++) { // 첫 2개 메시지는 더미이므로 3번째부터 시작
        const field = blockDefinition[`args${i}`][0];
        let argValue = b.getFieldValue(field.name);
        if (field.type === "field_number") {
          argValue = argValue || "0";
        } else if (field.type === "field_input") {
          argValue = Blockly.Python.quote_(argValue || "");
        }
        params.push(argValue);
      }
      return `${block.func_name}(${params.join(', ')})\n`;
    };
  });

  updateToolboxWithCustomBlocks(customBlocks);
}


// // 서버에서 블록 데이터를 비동기적으로 가져오는 함수
// async function fetchCustomBlocks() {
//   const response = await fetch('http://localhost:5000/api/blocks');
//   const customBlocks = await response.json();
//   defineCustomBlocks(customBlocks);
// }

function fetchCustomBlocks() {
  const customBlocks = [
    {
      "args1_name": "destination",
      "args1_type": "str",
      "args1_value": "",
      "args2_name": "delay",
      "args2_type": "int",
      "args2_value": "0",
      "args3_name": null,
      "args3_type": null,
      "args3_value": null,
      "args4_name": null,
      "args4_type": null,
      "args4_value": null,
      "args5_name": null,
      "args5_type": null,
      "args5_value": null,
      "desc": "\ubaa9\uc801\uc9c0\ub97c \uc124\uc815\ud558\ub294 \ud568\uc218\r\ndestination: \uc124\uc815\ud558\ub824\ub294 \ubaa9\uc801\uc9c0\r\ndelay: \ud568\uc218 \uc2e4\ud589 \uc644\ub8cc \ud6c4 \ub51c\ub808\uc774 \uc2dc\uac04",
      "func_name": "SetDestination"
    },
    {
      "args1_name": "screenName",
      "args1_type": "str",
      "args1_value": "",
      "args2_name": "delay",
      "args2_type": "int",
      "args2_value": "0",
      "args3_name": null,
      "args3_type": null,
      "args3_value": null,
      "args4_name": null,
      "args4_type": null,
      "args4_value": null,
      "args5_name": null,
      "args5_type": null,
      "args5_value": null,
      "desc": "\ud654\uba74 \uc774\ub3d9 \ud568\uc218",
      "func_name": "GotoScreen"
    }
  ]
  defineCustomBlocks(customBlocks);
}

// // 서버로부터 블록 데이터를 가져오는 함수 호출
// fetchCustomBlocks();
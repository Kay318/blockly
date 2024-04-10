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


// 서버에서 블록 데이터를 비동기적으로 가져오는 함수
async function fetchCustomBlocks() {
  const response = await fetch('http://localhost:5000/api/blocks');
  const customBlocks = await response.json();

  // 받은 블록 데이터를 바탕으로 Blockly 블록 정의 및 코드 생성기 구성
  customBlocks.forEach(block => {
    const args0 = [];
    const message0Parts = [];
    for (let i = 1; i <= 5; i++) {
      const type = block[`args${i}_type`];
      const value = block[`args${i}_value`];
      if (type) {
        args0.push({
          type: type === "str" ? "field_input" : "field_number",
          name: `ARG${i}`,
          text: value || "", // 디폴트 값이 null이면 빈 문자열로 처리
        });
        message0Parts.push(`%${i}`);
      }
    }

    const blockDefinition = {
      type: block.func_name,
      message0: `${block.func_name} ${message0Parts.join(' ')}`,
      args0,
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: 160,
      tooltip: block.desc,
      helpUrl: ""
    };

    Blockly.Blocks[block.func_name] = {
      init: function() {
        this.jsonInit(blockDefinition);
      }
    };

    Blockly.Python[block.func_name] = function(b) {
      const args = [];
      for (let i = 1; i <= 5; i++) {
        if (block[`args${i}_type`]) {
          const argValue = Blockly.Python.valueToCode(b, `ARG${i}`, Blockly.Python.ORDER_ATOMIC) || block[`args${i}_value`] || '""';
          args.push(argValue);
        }
      }
      return `${block.func_name}(${args.join(', ')});\n`;
    };
  });

  // 동적으로 툴박스 업데이트
  updateToolboxWithCustomBlocks(customBlocks);
}

// 서버로부터 블록 데이터를 가져오는 함수 호출
fetchCustomBlocks();
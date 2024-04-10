// customBlocks.js

// 커스텀 파이썬 함수 호출 블록 정의
Blockly.defineBlocksWithJsonArray([
  {
    "type": "automation_setdestination",
    "message0": "SetDestination %1",
    "args0": [
      {
        "type": "field_input",
        "name": "DESTINATION",
        "text": ""
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "목적지를 설정하는 함수를 호출합니다.",
    "helpUrl": ""
  },
  {
    "type": "automation_gotoscreen",
    "message0": "GotoScreen %1",
    "args0": [
      {
        "type": "field_input",
        "name": "SCREEN",
        "text": ""
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "특정 화면으로 이동하는 함수를 호출합니다.",
    "helpUrl": ""
  },
  {
    "type": "automation_delay", // 이 블록의 고유 식별자
    "message0": "Delay", // 블록에 표시될 텍스트
    "previousStatement": null, // 이전 블록과 연결 가능
    "nextStatement": null, // 다음 블록과 연결 가능
    "colour": 160, // 블록의 색상
    "tooltip": "지정된 시간만큼 대기합니다.", // 툴팁
    "helpUrl": "" // 도움말 URL (필요시)
  },
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


// 커스텀 파이썬 함수 호출 블록의 파이썬 코드 생성기
Blockly.Python['automation_setdestination'] = function(block) {
  var destination = block.getFieldValue('DESTINATION');
  var code = 'SetDestination("' + destination + '")\n';
  return code;
};

Blockly.Python['automation_gotoscreen'] = function(block) {
  var screenName = block.getFieldValue('SCREEN');
  var code = 'GotoScreen("' + screenName + '")\n';
  return code;
};

Blockly.Python['automation_delay'] = function(block) {
  // Delay 함수 호출 코드 생성
  var code = 'Delay()\n';
  return code;
};

Blockly.Python['custom_repeat_basic'] = function(block) {
  var repeats = block.getFieldValue('TIMES') || '0';
  var branch = Blockly.Python.statementToCode(block, 'DO') || '  pass\n';
  var code = 'for _ in range(' + repeats + '):\n' + branch;
  return code;
};
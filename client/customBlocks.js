// customBlocks.js


// repeat
Blockly.defineBlocksWithJsonArray([
    {
      "type": "custom_repeat_basic",
      "message0": "repeat %1 times",
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
      "message1": "do %1",
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
  return 'for _ in range(' + repeats + '):\n' + branch;
};


// init, close
Blockly.defineBlocksWithJsonArray([
  {
    "type": "automation_init",
    "message0": "Init",
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Initializes something.",
    "helpUrl": ""
  },
  {
    "type": "automation_close",
    "message0": "Close",
    "previousStatement": null,
    "colour": 160,
    "tooltip": "Closes the resource.",
    "helpUrl": ""
  }
]);

Blockly.Python['automation_init'] = function(block) {
  return 'Init()\n';
};

Blockly.Python['automation_close'] = function(block) {
  return 'Close()\n';
};
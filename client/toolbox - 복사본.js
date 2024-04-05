// toolbox.js

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Automations",
        "colour": 160,
        "contents": [
            {
            "kind": "block",
            "type": "automation_setdestination"
            },
            {
                "kind": "block",
                "type": "automation_gotoscreen"
            },
            {
                "kind": "block",
                "type": "automation_delay"
            },
            // 여기에 추가 커스텀 블록을 계속해서 추가할 수 있습니다.
        ]
      },
      {
        "kind": "category",
        "name": "Loops",
        "colour": 10,
        "contents": [
          {
            "kind": "block",
            "type": "custom_repeat_basic"
          },
          {
            "kind": "block",
            "type": "controls_repeat_ext"
          },
          {
            "kind": "block",
            "type": "controls_whileUntil"
          },
          {
            "kind": "block",
            "type": "controls_for"
          },
          {
            "kind": "block",
            "type": "controls_forEach"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Math",
        "contents": [
          {
            "kind": "block",
            "type": "math_number"
          },
          {
            "kind": "block",
            "type": "math_arithmetic"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Logic",
        "contents": [
          {
            "kind": "block",
            "type": "logic_compare"
          },
          {
            "kind": "block",
            "type": "logic_operation"
          },
          {
            "kind": "block",
            "type": "logic_negate"
          },
          {
            "kind": "block",
            "type": "logic_boolean"
          },
          {
            "kind": "block",
            "type": "logic_null"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Text",
        "contents": [
          {
            "kind": "block",
            "type": "text"
          },
          {
            "kind": "block",
            "type": "text_print"
          }
        ]
      }
    ]
  };
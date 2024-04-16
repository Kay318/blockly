// toolbox.js

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Automations",
        "colour": 160,
        "contents": []
      },
      {
        "kind": "category",
        "name": "Custom_Loops",
        "colour": 10,
        "contents": [
          {
            "kind": "block",
            "type": "custom_repeat_basic"
          }
        ]
      },
      {
        "kind": "sep", // 구분선을 시각적으로 표현할 더미 카테고리
        "name": "──────────", // CSS를 사용하여 이 이름을 스타일링할 수 있습니다.
        "colour": "#000000", // 구분선 색상 설정
        "contents": [] // 내용은 비워둠
      },
      {
        "kind": "category",
        "name": "Loops",
        "colour": 120,
        "contents": [
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
          },
          {
            "kind": "block",
            "type": "controls_flow_statements"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Logic",
        "colour": 210,
        "contents": [
          {
            "kind": "block",
            "type": "controls_if"
          },
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
          },
          {
            "kind": "block",
            "type": "logic_ternary"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Math",
        "colour": 230,
        "contents": [
          {
            "kind": "block",
            "type": "math_number"
          },
          {
            "kind": "block",
            "type": "math_arithmetic"
          },
          {
            "kind": "block",
            "type": "math_single"
          },
          {
            "kind": "block",
            "type": "math_trig"
          },
          {
            "kind": "block",
            "type": "math_constant"
          },
          {
            "kind": "block",
            "type": "math_number_property"
          },
          {
            "kind": "block",
            "type": "math_round"
          },
          {
            "kind": "block",
            "type": "math_on_list"
          },
          {
            "kind": "block",
            "type": "math_modulo"
          },
          {
            "kind": "block",
            "type": "math_random_int"
          },
          {
            "kind": "block",
            "type": "math_random_float"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Variables",
        "colour": 330,
        "custom": "VARIABLE"
      },
      {
        "kind": "category",
        "name": "Functions",
        "colour": 290,
        "custom": "PROCEDURE"
      }
    ]
  };
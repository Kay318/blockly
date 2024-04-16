// automationBlocks.js

function updateToolboxWithCustomBlocks(customBlocks) {
    let newToolbox = JSON.parse(JSON.stringify(toolbox));
    let automationCategory = newToolbox.contents.find(category => category.name === "Automations");
  
    if (automationCategory) {
      customBlocks.forEach(block => {
        automationCategory.contents.push({
          "kind": "block",
          "type": block.func_name
        });
      });
    }
    
    if (workspace) {
      workspace.updateToolbox(newToolbox);
    }
  }
  
function defineCustomBlocks(customBlocks) {
    customBlocks.forEach(block => {
        const blockDefinition = {
            type: block.func_name,
            message0: block.func_name,
            args0: [],
            colour: 50,
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
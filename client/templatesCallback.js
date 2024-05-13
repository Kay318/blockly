// ./templatesCallback.js

function generateTemplatesCallbacks(templates, workspace) {
  // 각 버튼에 대한 콜백 함수 생성
  templates.forEach(template => {
      const buttonKey = template.button.toLowerCase().replace(/\s/g, '');
      workspace.registerButtonCallback(buttonKey, function() {
          const contents = template.contents; // blocks 변수를 const로 선언
          workspace.clear();
          Blockly.serialization.workspaces.load(contents, workspace);
      });
  });
}

// 위의 두 함수를 활용하여 templatesCategory와 templatesCallback 생성
const templatesCategory = generateTemplatesCategory(templates);

function registerTemplateCallbacks(workspace) {
  const templatesCallbacks = generateTemplatesCallbacks(templates, workspace);
}


// function registerTemplateCallbacks(workspace) {
//     workspace.registerButtonCallback("initClose", function() {
//         const template = {
//             "blocks": {
//                 "languageVersion": 0,
//                 "blocks": [
//                     {
//                         "type": "automation_init",
//                         "id": "GnBZhXKeRPJ-Rho;_?5-",
//                         "x": 500,
//                         "y": 50,
//                         "next": {
//                             "block": {
//                                 "type": "automation_close",
//                                 "id": "J=r!hQNT(yw7:N5}]%qs"
//                             }
//                         }
//                     }
//                 ]
//             }
//         };

//         workspace.clear();
//         Blockly.serialization.workspaces.load(template, workspace);
//     });

//     workspace.registerButtonCallback("setDestination", function() {
//         const template = {
//             "blocks": {
//               "languageVersion": 0,
//               "blocks": [
//                 {
//                   "type": "automation_init",
//                   "id": "*)O0W0DXK6v$nzfGrF%+",
//                   "x": 500,
//                   "y": 50,
//                   "next": {
//                     "block": {
//                       "type": "SetDestination",
//                       "id": "X|,+i,Mr%%$aB*:K!8(#",
//                       "fields": {
//                         "DESTINATION": "서울역",
//                         "DELAY": 1
//                       },
//                       "next": {
//                         "block": {
//                           "type": "automation_close",
//                           "id": "2;4DYoE#bDAS)*{qPR~F"
//                         }
//                       }
//                     }
//                   }
//                 }
//               ]
//             }
//           };

//         workspace.clear();
//         Blockly.serialization.workspaces.load(template, workspace);
//     });
// }
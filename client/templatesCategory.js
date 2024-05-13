// ./templatesCategory.js

// templatesCategory를 동적으로 생성하는 함수
function generateTemplatesCategory(templates) {
    const category = {
        "kind": "category",
        "name": "Templates",
        "colour": 330,
        "contents": []
    };

    // templates에 따라 contents를 생성
    templates.forEach(template => {
        category.contents.push({
            "kind": "button",
            "text": template.button,
            "callbackKey": template.button.toLowerCase().replace(/\s/g, '')
        });
    });

    return category;
}



// const templatesCategory = {
//     "kind": "category",
//     "name": "Templates",
//     "colour": 330,
//     "contents": [
//         {
//             "kind": "button",
//             "text": "Init and Close",
//             "callbackKey": "initClose"
//         },
//         {
//             "kind": "button",
//             "text": "SetDestination",
//             "callbackKey": "setDestination"
//         }
//     ]
// };
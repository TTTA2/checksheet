
// export type CheckSheetSource = {
//     items: CheckSheetSourceItem[],
// }

export type CheckSheetSettings = {
    items: CheckSheetItem[],
}

export type CheckSheet = {
    values: CheckSheetItemValue[],
}

export type CheckSheetItem = {
    id: string,
    text: string,
    type: "text" | "input" | "checkbox" | "radio", 
    // children: CheckSheetItem[],
    parentId?: string,
    isRequired: boolean,
}

export type CheckSheetItemValue = {
    id: string,
    itemId: string,
    type: "text" | "input" | "checkbox" | "radio",
    value: string | Number | { text: string, checked: boolean }[],
}

export const getChildrenItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.parentId == targetParentId);
}


// type TextFormat = {
//     color: string,
//     bold: boolean,
//     text: string,
// }

// type CheckSheetSourceItem = {
//     id: string,
//     connections: string[],
//     text: TextFormat[],
// }   

// type CheckSheetItem = {
//     id: string,
//     type: "text" | "checklist" | "radio",
//     text: TextFormat[],
//     checkList?: string[],
// }

// type CheckSheetValue = {
//     id: string,
//     CheckSheetItemId: string,
//     value: string | Number | { text: string, checked: boolean }[]
// }

// export class CheckSheet {

//     values: CheckSheetValue[];

//     constructor(source: CheckSheetSource) {
//         this.values = [];
//     }

//     static generateCheckSheetItems(sourceItems: CheckSheetSourceItem[]): CheckSheetItem[] {

//         return sourceItems.map(sitem => {

//             return {
//                 id: sitem.id,
//                 type: "text",
//                 text: [

//                 ]
//             }

//         });
//     }

//     // static createItemTextFormat()

//     // getChildItems(parentId: string): CheckSheetItem[] {



//     //     return [];
//     // }

// }

export type CheckSheetSettings = {
    items: CheckSheetItem[],
}

export type CheckSheet = {
    items: { [key: string]: CheckSheetItemValue },
}

export type CheckSheetItem = {
    id: string,
    type: "text" | "input" | "checklist" | "radio", 
    text?: string,
    subItems?: string[],
    parentId?: string,
    isRequired?: boolean,
}

export type CheckSheetItemValue = {
    itemId: string,
    type: "text" | "input" | "checklist" | "radio",
    text?: string,
    states?: { text: string, checked: boolean }[],
    error?: string,
}

export const getChildrenItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.parentId == targetParentId);
}


// export type CheckSheetSource = {
//     items: CheckSheetSourceItem[],
// }


// export type CheckSheetItemValueContainer = {
//     id: string,
//     type: "text" | "input" | "checklist" | "radio", 
//     itemId: string,
//     values: CheckSheetItemValue[],
// }

// export type CheckSheetItemValue = {
//     itemId: string,
//     type: "text" | "input" | "checkbox" | "radio",
//     value: string | Number | { text: string, checked: boolean } ,
// }

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

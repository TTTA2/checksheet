export type CheckSheetSettings = {
    items: CheckSheetItem[],
}

export type CheckSheetValue = { [key: string]: CheckSheetItemValue };

// export class CheckSheetItemCollection extends Map<string, CheckSheetItem> {
    
// }

export type CheckSheetItem = {
    id: string,
    type: "text" | "input" | "container" | "checkbox" | "radio", 
    text?: string,
    parentId?: string,
    parentSubItemId?: string,
    isRequired?: boolean,
}

export type SubItem = {
    id: string,
    text: string,
}

export type CheckSheetItemValue = {
    itemId: string,
    type: "text" | "input" | "container" | "checkbox" | "radio",
    text?: string,
    toggle?: boolean,
    states?: { text: string, checked: boolean }[],
    error?: string,
    isCompleted: boolean,
    isVisible?: boolean,
}

export const getParentItem = (chidItem: CheckSheetItem, items: CheckSheetItem[]) => {
    return items.find(parent => parent.id == chidItem.parentId || parent.id == chidItem.parentSubItemId);
}

// export const getParentItemFromId = (itemId: string, items: CheckSheetItem[]) => {
//     console.log(getItem(itemId, items), items.find(item => item.parentId == itemId || item.parentSubItemId == itemId));
//     return items.find(item => item.parentId == itemId || item.parentSubItemId == itemId);
// }


export const getChildSubItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.parentId == targetParentId || item.parentSubItemId == targetParentId);
}


export const getChildrenItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.parentId == targetParentId);
}

export const getSubItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.parentSubItemId == targetParentId);
}

const getItem = (id: string, items: CheckSheetItem[]) => {
    return items.find(item => item.id == id);
}

type TreeItem = {
    id: string,
    text: string,
    type: "child" | "sub",
    children: TreeItem[]
}

const createTreeFromArray = (items: CheckSheetItem[], values: CheckSheetValue): TreeItem[] => {

    const topItems = items.filter(item => item.parentId == undefined && item.parentSubItemId == undefined);

    const createChildTree = (currentItem: CheckSheetItem, items: CheckSheetItem[], parentItem: CheckSheetItem | undefined): TreeItem[] => {

        const children = items.filter(_item => _item.parentId == currentItem.id || _item.parentSubItemId == currentItem.id);

        return children.map(item => (
            {
                id: item.id, 
                text: item.text ?? "", 
                type: item.parentId == currentItem.id ? "child" : "sub",
                children: createChildTree(item, items, currentItem),
        }));
    }

    return topItems.map(item => ({
        id: item.id,
        text: item.text ?? "",
        type: "child",
        children: createChildTree(item, items, undefined),
    }));
}

//表示されている項目を配列で返す
export const getEnabledChidlren = (items: CheckSheetItem[], values: CheckSheetValue) => {

    const visibleValue: { [key: string]: boolean } = {};
    const topItems = items.filter(item => item.parentId == undefined && item.parentSubItemId == undefined);

    const digItem = (item: CheckSheetItem) => {

        visibleValue[item.id] = true;

        const subItems = getSubItems(item.id, items);
        subItems.forEach(subItem => digItem(subItem));

        if (item.type == "text") {
            visibleValue[item.id] = true;
        }
        else if (isCompletedItem(item, items, values)) {
            const children = getChildrenItems(item.id, items);
            children.forEach(childItem => digItem(childItem));
        }
    }

    topItems.forEach(item => digItem(item));

    console.log(visibleValue);
    
    const a = items.filter(item => {
        
        //最初のアイテムなら表示
        if (item.parentId == undefined && item.parentSubItemId == undefined) return true;

        const parentItem = getParentItem(item, items);

        if (parentItem?.type == "container") {
            if (parentItem?.id == item.parentSubItemId) return true;   
        }

        if (parentItem) {
            const completed = isCompletedItem(parentItem, items, values);
            if (completed) return true;
        }

        return false;
    });

    // type _aa = {
    //     id: string, 
    //     children: _aa[],
    // }

    /*
    木構造
    表示されているかどうか
    コンテナ以外
    ->親が表示されているかどうか

    


    */

    const itemTree = createTreeFromArray(items, values);

    const getVisibleChildItem = (treeItem: TreeItem, currentItems: CheckSheetItem[]) => {

        const ditem = getItem(treeItem.id, items);            

        if (ditem) {

            const isCompleted = isCompletedItem(ditem, items, values);

            if (ditem.type == 'container' || isCompleted) {
                currentItems.push(ditem);
                treeItem.children.map(_i => getVisibleChildItem(_i, currentItems));
            }
            else if (!isCompleted) {
                
                const children = getChildSubItems(ditem.id, items);
                currentItems.push(...children);
            }
        }

        return currentItems;
    } 

    // const aaaa = itemTree.map(_item => {

    //     const aa = getVisibleChildItem(_item, []);

    //     console.log(aa);

    //     // console.log(_item);

    // });


    // console.log(itemTree);

    // const b = (tr: _aa[]) => {

    //     const showlist: CheckSheetItem[] = [];

    //     const aa = tr.map(item => {


            

    //     });
    // }
    

    // console.log(test);

    // console.log(test.map());

    // console.log(items.filter(item => item.parentId == undefined || item.parentSubItemId == undefined)
    // .map(i => cc(i, items)));

    // const b = items.map()

    // const a = items.filter(item => {

    //     const parentItem = item.parentId != undefined || item.parentSubItemId != undefined 
    //     ? getParentItem(item, items) 
    //     : undefined;

    //     // console.log()

    //     return parentItem ? isEnabledChildren(parentItem, items, values) : true;
    // });
    

    // console.log(items);
    // console.log(values);
    // console.log(a);

    return [];
}

export const isOutput = (items: CheckSheetItem[], values: CheckSheetValue) => {

    for (const item of items) {

        const value = values[item.id];


        // const isDone = (item.isRequired && value.isCompleted)
        // if (item.isRequired )


    }

}

export const isCompletedItem = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {

    const valueItem = values[item.id];

    if (!valueItem) return false;

    if (valueItem.type == "input" || valueItem.type == "radio") {
        return (valueItem.text?.length ?? 0) > 0;
    }

    if (valueItem.type == "checkbox") {
        return valueItem.toggle ?? false;
    }

    if (valueItem.type == "container") {

        //チェックボックスとラジオボタンを検索
        const subItems = getSubItems(item.id, items);
        
        let compRadio = false, compChecked = false

        //子要素にラジオボタンが存在する場合は、何かしら選択されていればtrue
        if (subItems.find(t => t.type == "radio") && valueItem.text) {
            compRadio = true;
        }
        else if (!subItems.find(t => t.type == "radio")) {
            compRadio = true;
        }

        //チェックボックスを検索
        const checkBoxItems = subItems.filter((subItem) => subItem.type == "checkbox");
        const checkedValues = subItems.filter((subItem) => (values[subItem.id] && values[subItem.id].type == "checkbox" && values[subItem.id].toggle));
        compChecked = checkBoxItems.length == checkedValues.length;

        

        return compChecked && compRadio;
    }

    return false;
};

export const isShowChildren = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {
    const firstChild = items.find(current => item.id == current.parentId);
    return (firstChild && isCompletedItem(item, items, values)) ?? false;
}

export const isEnabledChildren = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {
    return (isCompletedItem(item, items, values)) ?? false;
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

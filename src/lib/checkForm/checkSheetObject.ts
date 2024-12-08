import type { CheckSheetItem, CheckSheetValue, CheckSheetItemValue } from "./types/types";

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
export const getReadyChidlren = (items: CheckSheetItem[], values: CheckSheetValue) => {

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
    
    return items.filter(item => visibleValue[item.id]);
}

export const isOutput = (items: CheckSheetItem[], values: CheckSheetValue) => {

    for (const item of items) {
        const value = values[item.id];
    }
}

export const isCompletedItem = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {

    const valueItem = values[item.id];

    // console.log({...item});

    if (item.text == "テキスト1") {
        console.log({...valueItem});
    }

    if (!valueItem) return false;

    if (item.type == "input" || item.type == "radio") {
        return (valueItem.text?.length ?? 0) > 0;
    }

    if (item.type == "checkbox") {
        return valueItem.toggle ?? false;
    }

    if (item.type == "container") {

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
        const checkedValues = subItems.filter((subItem) => (values[subItem.id] && subItem.type == "checkbox" && values[subItem.id].toggle));
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

export const newValueItem = (item: CheckSheetItem): CheckSheetItemValue => {

    if (item.type == "input" || item.type == "radio") return { 
        itemId: item.id, 
        // type: item.type, 
        text: "", 
        isCompleted: false,
        isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
    };

    if (item.type == "checkbox") return { 
        itemId: item.id, 
        // type: item.type, 
        toggle: false, 
        isCompleted: false,
        isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
    };

    if (item.type == "container") return { 
        itemId: item.id, 
        // type: item.type, 
        states: [], 
        isCompleted: false,
        isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
    };
    
    return {
        itemId: item.id, 
        // type: item.type, 
        isCompleted: false,
        isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
    };
};

export const getState = (item: CheckSheetItem, sheetValues: CheckSheetValue, subItemIndex: number) => {
    const valueItem = sheetValues[item.id];
    if (valueItem?.toggle) return valueItem?.toggle;
    return false;
};

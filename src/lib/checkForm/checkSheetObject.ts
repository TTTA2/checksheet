import type { CheckSheetItem, CheckSheetValue, CheckSheetItemValue, ItemType } from "./types/types";

export const RandomParentId = crypto.randomUUID();

export const getParentItem = (chidItem: CheckSheetItem, items: CheckSheetItem[]) => {
    return items.find(parent => parent.id == chidItem.parentId);
}

// export const getParentItemFromId = (itemId: string, items: CheckSheetItem[]) => {
//     console.log(getItem(itemId, items), items.find(item => item.parentId == itemId || item.parentSubItemId == itemId));
//     return items.find(item => item.parentId == itemId || item.parentSubItemId == itemId);
// }

export const getChildSubItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.nodeType == "subItem" && item.parentId == targetParentId);
}

export const getChildrenItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => item.nodeType == "child" && item.parentId == targetParentId);
}

export const getSubItems = (targetParentId: string, items: CheckSheetItem[]) => {
    return items.filter(item => (item.nodeType == "subItem" && item.parentId == targetParentId));
}

export const getJoinedContainer = (targetItem: CheckSheetItem, items: CheckSheetItem[]) => {
    return items.find(item => (item.type == "container" && item.id == targetItem.parentId));
}

export const getSubItemIndex = (targetItem: CheckSheetItem, items: CheckSheetItem[]) => {

    const joinedContainer = getJoinedContainer(targetItem, items);
    
    if (joinedContainer) {        
        const subItems = getSubItems(joinedContainer.id, items);
        for (let i = 0; i < subItems.length; i++) {
            if (subItems[i].id == targetItem.id) return i;
        }
    }

    return 0;
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

    const topItems = items.filter(item => item.parentId == undefined);

    const createChildTree = (currentItem: CheckSheetItem, items: CheckSheetItem[], parentItem: CheckSheetItem | undefined): TreeItem[] => {

        const children = items.filter(_item => _item.parentId == currentItem.id);

        return children.map(item => (
            {
                id: item.id, 
                text: item.name ?? "", 
                type: item.parentId == currentItem.id ? "child" : "sub",
                children: createChildTree(item, items, currentItem),
        }));
    }

    return topItems.map(item => ({
        id: item.id,
        text: item.name ?? "",
        type: "child",
        children: createChildTree(item, items, undefined),
    }));
}

//表示されている項目を配列で返す
export const getReadyChidlren = (items: CheckSheetItem[], values: CheckSheetValue) => {

    const visibleValue: { [key: string]: boolean } = {};
    const topItems = items.filter(item => item.parentId == undefined);

    const digItem = (item: CheckSheetItem) => {

        visibleValue[item.id] = true;

        const subItems = getSubItems(item.id, items);
        subItems.forEach(subItem => digItem(subItem));

        if (item.type == "label") {
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

    if (!valueItem) return false;

    if (item.type == "textbox") {
        return (valueItem.text?.length ?? 0) > 0;
    }

    if (item.type == "checkbox" || item.type == "radioButton") {
        return valueItem.toggle ?? false;
    }

    if (item.type == "container") {

        //チェックボックスとラジオボタンを検索
        const subItems = getSubItems(item.id, items);
        const checkItems = subItems.filter(t => t.type == "checkbox");
        const radioItems = subItems.filter(t => t.type == "radioButton");
        
        let compRadio = false, compChecked = false;

        // //子要素にラジオボタンが存在する場合は、何かしら選択されていればtrue
        compRadio = radioItems.length == 0 || radioItems.find(t => values[t.id]?.toggle) != undefined;
        compChecked = checkItems.length == 0 || (checkItems.filter(t => values[t.id]?.toggle).length == checkItems.length);

        return compChecked && compRadio;
    }

    return false;
};

export const setChangeSelectState = (value: boolean, item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {   

    if (item.type == "checkbox") return setCheckState(value, item, items, values);
    if (item.type == "radioButton") return setRadioCheckState(value, item, items, values);

    return values;
}

const setRadioCheckState =  (value: boolean, item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {

    const newValues = {...values};

    let valueItem = newValues[item.id] ? { ...newValues[item.id] } : newValueItem(item);

    items.forEach(_item => {
        if (_item.type == "radioButton" && _item.parentId == item.parentId && values[_item.id]) {
            values[_item.id].toggle = false;
        }
    });

    newValues[item.id] = {
        ...valueItem,
        toggle: value, 
        isCompleted: isCompletedItem(item, items, values)
    };

    const joinedContainer = getJoinedContainer(item, items);

    if (joinedContainer) {

        if (!newValues[joinedContainer.id]) newValues[joinedContainer.id] = newValueItem(joinedContainer);

        let states = newValues[joinedContainer.id].states;

        if (states) {

            if (!states[getSubItemIndex(item, items)]) {
                states[getSubItemIndex(item, items)] = { text: item.name ?? "", checked: false, type: "radioButton" };
            }

            states.forEach(state => {
                if (state.type == "radioButton") {
                    state.type = item.type;
                    state.checked = false;
                }
            });

            states[getSubItemIndex(item, items)].checked = value;
        }
    }

    return newValues;
}

const setCheckState = (value: boolean, item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {

    const newValues = {...values};

    let valueItem = newValues[item.id] ? { ...newValues[item.id] } : newValueItem(item);

    newValues[item.id] = {
        ...valueItem,
        toggle: value, 
        isCompleted: isCompletedItem(item, items, values)
    };

    const joinedContainer = getJoinedContainer(item, items);

    if (joinedContainer) {

        if (!newValues[joinedContainer.id]) newValues[joinedContainer.id] = newValueItem(joinedContainer);

        let states = newValues[joinedContainer.id].states;

        if (states) {

            if (!states[getSubItemIndex(item, items)]) {
                states[getSubItemIndex(item, items)] = { text: item.name ?? "", checked: false, type: item.type };
            }

            states[getSubItemIndex(item, items)].type = item.type;
            states[getSubItemIndex(item, items)].checked = value;
        }
    }

    return newValues;
}

export const isShowChildren = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {

    return isCompletedItem(item, items, values) ?? false;

    const firstChild = items.find(current => item.id == current.parentId);
    return (firstChild && isCompletedItem(item, items, values)) ?? false;
}

export const isEnabledChildren = (item: CheckSheetItem, items: CheckSheetItem[], values: CheckSheetValue) => {
    return (isCompletedItem(item, items, values)) ?? false;
}

export const newValueItem = (item: CheckSheetItem): CheckSheetItemValue => {

    if (item.type == "textbox" || item.type == "radioButton") return { 
        itemId: item.id, 
        // type: item.type, 
        text: "", 
        isCompleted: false,
        isVisible: item.parentId == undefined,
    };

    if (item.type == "checkbox") return { 
        itemId: item.id, 
        // type: item.type, 
        toggle: false, 
        isCompleted: false,
        isVisible: item.parentId == undefined,
    };

    if (item.type == "container") return { 
        itemId: item.id, 
        // type: item.type, 
        states: [], 
        isCompleted: false,
        isVisible: item.parentId == undefined,
    };
    
    return {
        itemId: item.id, 
        // type: item.type, 
        isCompleted: false,
        isVisible: item.parentId == undefined,
    };
};

export const getState = (item: CheckSheetItem, sheetValues: CheckSheetValue) => {
    const valueItem = sheetValues[item.id];
    if (valueItem?.toggle) return valueItem?.toggle;
    return false;
};

export const createNewItem = (type: ItemType, items: CheckSheetItem[]): CheckSheetItem => {

    const itemNames: { [key: string]: string } = {
        "label": "新規ラベル",
        "textbox": "新規テキストボックス",
        "textarea": "新規テキストエリア",
        "checkbox": "新規チェックボックス",
        "radioButton": "新規ラジオボタン",
        "container": "新規コンテナ",
    }

    const n = (items.filter(item => item.type == type).length) + 1;

    return {
        id: crypto.randomUUID(),
        nodeType: "child",
        type,
        name: `${itemNames[type]}${n}`,
    }
}
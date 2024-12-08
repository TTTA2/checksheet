export type ItemType = "text" | "input" | "container" | "checkbox" | "radio";

export type CheckSheetSettings = { items: CheckSheetItem[], }

export type CheckSheetValue = { [key: string]: CheckSheetItemValue };

export type CheckSheetItem = {
    id: string,
    type: ItemType, 
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
    // type: ItemType,
    text?: string,
    toggle?: boolean,
    states?: { text: string, checked: boolean }[],
    error?: string,
    isCompleted: boolean,
    isVisible?: boolean,

    strStates?: string[],
}

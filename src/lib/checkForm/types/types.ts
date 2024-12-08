export type ItemType = "label" | "textbox" | "container" | "checkbox" | "radioButton" | "textarea";

export type CheckSheetSettings = { items: CheckSheetItem[], }

export type CheckSheetValue = { [key: string]: CheckSheetItemValue };

export type CheckSheetItem = {
    id: string,
    type: ItemType, 
    name?: string,
    parentId?: string,
    //child=入力が行われたときに表示される子要素 subItem=入力の状態にかかわらず常に表示される子要素
    nodeType: "child" | "subItem",

    //以下オプション
    //表示関連
    //キーとして扱う
    isKey?: boolean,
    //プレースホルダーを設定する
    placeHolder?: string,
    //キャプション非表示
    isHiddenCaption?: boolean,
    //高さ
    height?: Number,

    //バリデーション関連
    //必須にする
    isRequired?: boolean,
    //正規表現を指定する
    validateRegex?: string,
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
    states?: { text: string, checked: boolean, type: ItemType }[],
    error?: string,
    isCompleted: boolean,
    isVisible?: boolean,

    strStates?: string[],
}

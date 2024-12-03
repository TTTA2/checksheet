<script lang="ts">

import { getState, getSubItems, isCompletedItem, newValueItem, type CheckSheetItem, type CheckSheetValue } from "../../checkSheetObject";

let { item, parentItem, sheetItems, sheetValues = $bindable(), selecterIndex } : 
{
    item: CheckSheetItem,
    parentItem: CheckSheetItem | undefined,
    sheetItems: CheckSheetItem[],
    sheetValues: CheckSheetValue,
    selecterIndex: number,

} = $props();

const onSwitch = (_item: CheckSheetItem, value: string, container: CheckSheetItem | undefined, checkedIndex: number) => {

    let valueItem = sheetValues[_item.id] ? { ...sheetValues[_item.id] } : newValueItem(_item);
    sheetValues[_item.id] = { ...valueItem, text: value, isCompleted: isCompletedItem(_item, sheetItems, sheetValues) };

    if (_item.type == 'radio') {
        if (container) setContainerValue(container, _item, value, checkedIndex);
    }
};

const setContainerValue = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: string, subItemIndex: number ) => {
    let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

    sheetValues[containerItem.id] = {
        ...valueItem,
        text: newValue,
        isCompleted: isCompletedItem(containerItem, sheetItems, sheetValues),
    };
};

</script>

<label class="label">
    <input
    type="radio"
    name={parentItem?.id}
    onchange={(e) => onSwitch(item, item.text ?? "", parentItem, selecterIndex)} />
    {item.text}
</label>
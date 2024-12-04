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

const onChangeChecked = (_item: CheckSheetItem, value: boolean, container: CheckSheetItem | undefined, checkedIndex: number ) => {

    let valueItem = sheetValues[_item.id] ? { ...sheetValues[_item.id] } : newValueItem(_item);

    sheetValues[_item.id] = {
        ...valueItem, 
        toggle: value, 
        isCompleted: isCompletedItem(_item, sheetItems, sheetValues)
    };

    if (container) setContainerStates(container, _item, value, checkedIndex);
};

const setContainerStates = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: boolean, subItemIndex: number ) => {

    let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

    const { states } = valueItem;
    if (states)
        states[subItemIndex] = {
            text: subItem.text ?? "",
            checked: newValue,
        };

    sheetValues[containerItem.id] = {
        ...valueItem,
        states,
        isCompleted: isCompletedItem(containerItem, sheetItems, sheetValues)
    };
};


</script>

<label class="label">
    <input 
    type="checkbox" 
    checked={getState(item, sheetValues, selecterIndex)} 
    onchange={(e) => onChangeChecked(item, e.currentTarget.checked, parentItem, selecterIndex)}/>
    {item.text}
</label>

<style>    
    .label {
        user-select: none;
    }
</style>
<script lang="ts">

    import { getState, getSubItems, isCompletedItem, newValueItem, type CheckSheetItem, type CheckSheetValue } from "../../checkSheetObject";

    let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
    {
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,

     } = $props();

     const getValue = (item: CheckSheetItem) => {
        const valueItem = sheetValues[item.id];
        return valueItem?.text;
    };

    const onInputText = (item: CheckSheetItem, value: string) => {

        let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);

        sheetValues[item.id] = {
            ...valueItem, 
            text: value, 
            isCompleted: isCompletedItem(item, sheetItems, sheetValues),
        };
    };

</script>

<input value={getValue(item)} oninput={(e) => onInputText(item, e.currentTarget.value)}/>

<style>



</style>
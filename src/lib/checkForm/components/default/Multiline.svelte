<script lang="ts">

    import { isCompletedItem, newValueItem } from "../../checkSheetObject";
    import type { CheckSheetItem, CheckSheetValue } from "../../types/types";

    let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
    {
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,

     } = $props();

     const getValue = (item: CheckSheetItem) => {
        const valueItem = sheetValues[item.id];
        return valueItem?.text ?? "";
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

<textarea placeholder={item.placeHolder ?? ""} value={getValue(item)} oninput={(e) => onInputText(item, e.currentTarget.value)}></textarea>

<style>

    .linenumber {
        counter-reset: none;
    }

    textarea {
        padding: 8px;
        resize: vertical;
    }

</style>
<script lang="ts">

import { getState, getSubItems, isCompletedItem, newValueItem, RandomParentId, setChangeSelectState } from "../../checkSheetObject";
import type { CheckSheetItem, CheckSheetValue } from "../../types/types";

let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
{
    item: CheckSheetItem,
    parentItem: CheckSheetItem | undefined,
    sheetItems: CheckSheetItem[],
    sheetValues: CheckSheetValue,
} = $props();

let aa: string[] = $state([]);

const onSwitch = (_item: CheckSheetItem, value: string) => {
    sheetValues = setChangeSelectState(true, _item, sheetItems, sheetValues);
};

$effect(() => {
    if (Object.keys(sheetValues).length == 0) {
        aa = [];
    }
});

</script>

<label class="label">
    <input
    type="radio"
    name={parentItem?.id ?? RandomParentId}
    bind:group={aa}
    onchange={(e) => onSwitch(item, item.name ?? "")} />
    {item.name}
    {item.parentId}
</label>

<style>
    
    .label {
        user-select: none;
    }

</style>
<script lang="ts">

import { getState, setChangeSelectState } from "../../checkSheetObject";
import type { CheckSheetItem, CheckSheetValue } from "../../types/types";

let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
{
    item: CheckSheetItem,
    parentItem: CheckSheetItem | undefined,
    sheetItems: CheckSheetItem[],
    sheetValues: CheckSheetValue,
} = $props();

const onChangeChecked = (_item: CheckSheetItem, value: boolean) => {
    sheetValues = setChangeSelectState(value, _item, sheetItems, sheetValues);
};

</script>

<label class="label">
    <input 
    type="checkbox" 
    checked={getState(item, sheetValues)} 
    onchange={(e) => onChangeChecked(item, e.currentTarget.checked)}/>
    {item.name}
</label>

<style>    
    .label {
        user-select: none;
    }
</style>
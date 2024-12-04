<script lang="ts">

    import { getSubItems, isCompletedItem, newValueItem, type CheckSheetItem, type CheckSheetValue } from "../../checkSheetObject";
    import CheckFormComponentBase from "./CheckFormComponent.svelte";

    let {
        isFullOpen = false,
        item,
        parentItem,
        sheetItems,
        sheetValues = $bindable(),
        onClickComponent,
        selectedComponentId,
    } : {
        isFullOpen?: boolean,
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,        
        onClickComponent?: ((target: CheckSheetItem) => void),
        selectedComponentId?: string,
     } = $props();

     const handleComponentClick = (_item: CheckSheetItem) => {
        onClickComponent?.call(undefined, _item);
     }

</script>

{#each getSubItems(item.id, sheetItems) as child }
    <CheckFormComponentBase
        selectedComponentId={selectedComponentId}
        onClickComponent={(_item) => handleComponentClick(_item)}
        isFullOpen={isFullOpen}
        item={child}
        parentItem={item}
        bind:sheetItems={sheetItems}
        bind:sheetValues={sheetValues}></CheckFormComponentBase>
{/each}

<style>



</style>
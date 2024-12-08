<script lang="ts">

    import { getState, getSubItems, isCompletedItem, newValueItem } from "../../checkSheetObject";
    import type { CheckSheetItem, CheckSheetValue } from "../../types/types";
    import CheckBox from "./CheckBox.svelte";
    import RadioButton from "./RadioButton.svelte";

    let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
    {
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,        

     } = $props();

</script>

{#each getSubItems(item.id, sheetItems) as subItem, index }

    {#if subItem.type == "checkbox"}
        <CheckBox item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues selecterIndex={index}></CheckBox>
    {/if}

    {#if subItem.type == "radio"}
        <RadioButton item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues selecterIndex={index}></RadioButton>
    {/if}

{/each}

<style>

</style>
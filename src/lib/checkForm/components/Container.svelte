<script lang="ts">

    import { getSubItems, isCompletedItem, newValueItem, type CheckSheetItem, type CheckSheetValue } from "../../checkSheetObject";
    import CheckFormComponentBase from "./CheckFormComponentBase.svelte";

    let { item, parentItem, sheetItems, sheetValues = $bindable() } : 
    {
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,        

     } = $props();

</script>

{#each getSubItems(item.id, sheetItems) as child }
        <CheckFormComponentBase item={child} parentItem={item} bind:sheetItems={sheetItems} bind:sheetValues={sheetValues}></CheckFormComponentBase>
        <!-- {@render fields(getChildrenItems(item.id, sheetItems), item)} -->
{/each}

<!-- <CheckFormComponentBase></CheckFormComponentBase> -->

<!-- <ToggleGroup item={item} parentItem={item} sheetItems={sheetItems} bind:sheetValues></ToggleGroup> -->

<!-- <CheckBoxGroup item={item} parentItem={item} sheetItems={sheetItems} bind:sheetValues></CheckBoxGroup> -->
<!-- <RadioButtonGroup item={item} parentItem={item} sheetItems={sheetItems} bind:sheetValues></RadioButtonGroup> -->

<!-- {#each getSubItems(item.id, sheetItems) as subItem, index }
    {subItem.type}
    <label class="label">
        {#if subItem.type == "checkbox"}
            <CheckBoxGroup item={subItem} parentItem={item} sheetItems={sheetItems} bind:sheetValues></CheckBoxGroup>
            {@render checkBoxField(subItem, item, index)}
        {/if}

        {#if subItem.type == "radio"}
            <RadioButtonGroup item={subItem} parentItem={item} sheetItems={sheetItems} bind:sheetValues></RadioButtonGroup>
            {@render radioButtonField(subItem, item, index)}
        {/if}
    </label>

{/each} -->


<style>



</style>
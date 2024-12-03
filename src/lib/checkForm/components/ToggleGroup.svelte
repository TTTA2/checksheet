<script lang="ts">

    import { getState, getSubItems, isCompletedItem, newValueItem, type CheckSheetItem, type CheckSheetValue } from "../../checkSheetObject";
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


<!-- 
    <label class="label">
        {#if subItem.type == "checkbox"}
            <input 
            type="checkbox" 
            checked={getState(subItem, sheetValues, index)} 
            onchange={(e) => onChangeChecked(subItem, e.currentTarget.checked, parentItem, index)}/>
        {/if}

        {#if subItem.type == "radio"}
            <input
            type="radio"
            name={parentItem?.id}
            onchange={(e) => onSwitch(subItem, subItem.text ?? "", parentItem, index)} />
        {/if}

        {subItem.text}
    </label> -->

{/each}


<style>



</style>
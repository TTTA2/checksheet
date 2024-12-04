<script lang="ts">
    import CheckFormComponentBase from "./CheckFormComponentBase.svelte";
    import CheckFormComponent from "../../CheckFormComponent.svelte";

    import {
        getChildrenItems,
        type CheckSheetValue,
        type CheckSheetItem,
        type CheckSheetItemValue,
        isCompletedItem as _isCompletedItem,
        isEnabledChildren as _isEnabledChildren,
        isShowChildren as _isShowChildren,
        getSubItems,
        getReadyChidlren,
    } from "../../checkSheetObject";
    import Container from "./Container.svelte";
    import RadioButtonGroup from "./ToggleGroup.svelte";
    import ToggleGroup from "./ToggleGroup.svelte";
    import Input from "./Input.svelte";
    import RadioButton from "./RadioButton.svelte";
    import CheckBox from "./CheckBox.svelte";

    // fields: CheckSheetItem[], parentItem: CheckSheetItem | undefined

    let {
        item,
        parentItem,
        sheetItems = $bindable(), 
        sheetValues = $bindable(),
    }
    : { item: CheckSheetItem, parentItem: CheckSheetItem | undefined, sheetItems: CheckSheetItem[], sheetValues: CheckSheetValue } = $props();
    
    const getValue = (item: CheckSheetItem) => {
        const valueItem = sheetValues[item.id];
        return valueItem?.text;
    };

    const getState = (item: CheckSheetItem, subItemIndex: number) => {
        const valueItem = sheetValues[item.id];
        if (valueItem?.toggle) return valueItem?.toggle;
        return false;
    };

    const isShowChildren = (item: CheckSheetItem) => {
        const isShowChild = _isShowChildren(item, sheetItems, sheetValues);
        return isShowChild;
    }

</script>

{#snippet caption(item: CheckSheetItem)}
    {#if item.text}
        <div class="caption label">
            {item.text}
            {@render requiredLabel(item.isRequired)}
        </div>
    {/if}
{/snippet}

{#snippet requiredLabel(state: boolean | undefined)}
    {#if state}
        <span style:color="red">【必須】</span>
    {/if}
{/snippet}

<field-content>

    {#if item.type == "container" || item.type == "text" || item.type == "input"}
        {@render caption(item)}
    {/if}

    <field-subitem-container>

        {#if item.type == "container"}
            <Container item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></Container>
        {/if}

        {#if item.type == "radio"}
            <RadioButton item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues selecterIndex={0}></RadioButton>
        {/if}

        {#if item.type == "checkbox"}
            <CheckBox item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues selecterIndex={0}></CheckBox>
        {/if}

        {#if item.type == "input"}
            <Input item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues />
        {/if}

        <!-- {#if item.type == "checkbox"}
            <CheckBoxGroup item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></CheckBoxGroup>
        {/if}

        {#if item.type == "radio"}
            <RadioButtonGroup item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></RadioButtonGroup>
        {/if} -->

        <!-- <input
            value={getValue(item)}
            oninput={(e) => onInputText(item, e.currentTarget.value)}
        /> -->

    </field-subitem-container>

    {#if isShowChildren(item)}
        {#each getChildrenItems(item.id, sheetItems) as child }
            <child-contents>
                <CheckFormComponentBase item={child} parentItem={item} bind:sheetItems={sheetItems} bind:sheetValues={sheetValues}></CheckFormComponentBase>
                <!-- {@render fields(getChildrenItems(item.id, sheetItems), item)} -->
            </child-contents>
        {/each}
    {/if}

</field-content>

<style>

    .caption {
        font-weight: bold;
        padding: 4px 0px;
    }
    
    .label {
        user-select: none;
    }
    
    field-content {
        padding: 2px 12px;
    
        display: flex;
        flex-direction: column;
        
        /* gap: 4px; */
    }
    
    child-contents {
        /* margin: 4px 0px; */
        margin-left: 24px;
    }
    
    field-subitem-container {
        /* margin-left: 8px; */
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    </style>
<script lang="ts">

    import { getChildrenItems, type CheckSheetSettings, type CheckSheetItem, type CheckSheet } from './checkSheetObject';

    let { sheet, sheetValue }: { sheet: CheckSheetSettings, sheetValue: CheckSheet } = $props();
    const { items } = sheet;

    let sh: CheckSheet = $state({...sheetValue});

    const topItems = $derived(items.filter(item => !item.parentId));

    const onInputText = (item: CheckSheetItem, value: string) => {

        if (!sh.items[item.id]) {
            sh.items[item.id] = { itemId: item.id, type: item.type, text: "" };
        }
       
        sh.items[item.id].text = value;
    }

    $inspect(sh);

    const onChangeChecked = (item: CheckSheetItem, value: boolean, checkedIndex: number) => {

        if (!sh.items[item.id]) sh.items[item.id] = { itemId: item.id, type: item.type, states: [] };

        const { states } = sh.items[item.id];
        if (states) states[checkedIndex] = { text: (item.subItems?.[checkedIndex]) ?? "", checked: value };                        
    }

    const getValue = (item: CheckSheetItem) => {
        const valueItem = sh.items[item.id];
        return valueItem?.text;
    }

    const getState = (item: CheckSheetItem, subItemIndex: number) => {
        const valueItem = sh.items[item.id];
        if (valueItem?.states?.[subItemIndex]) return valueItem.states[subItemIndex].checked;
        return false;
    }

    const errorCheck = () => {

        items.forEach(item => {

            if (item.isRequired || isCompletedItem(item)) {
                // sh.items[item.id]
            }

        })
    }

    const handleComplete = () => {


    }
    
    const isShowChildren = (item: CheckSheetItem) => {
        const parent = items.find(t => item.id == t.parentId);
        return parent && isCompletedItem(item);
    }

    const isCompletedItem = (item: CheckSheetItem) => {

        const valueItem = sh.items[item.id];

        if (!valueItem) return false;

        if (valueItem.type == 'input' || valueItem.type == 'radio') { 
            return (valueItem.text?.length ?? 0) > 0;
        }

        if (valueItem.type == 'checklist') {
            if (!item.subItems) return true;
            if (valueItem.states == undefined) return false;
            if (valueItem.states.length == item.subItems.length) {
                return valueItem.states.filter(t => t && t.checked).length == item.subItems.length;
            }

            return false;
        }
    }

</script>

<!-- <div>
    {JSON.stringify(sh)}
</div> -->

{#snippet text(item: CheckSheetItem)}
<field-content>
    {@render caption(item)}
    <child-contents>
        {@render fields(getChildrenItems(item.id, items))}
    </child-contents>
</field-content>
{/snippet}

{#snippet inputField(item: CheckSheetItem)}
<field-content>

    {@render caption(item)}
    
    <field-subitem-container>
        <input value={getValue(item)} oninput={(e) => onInputText(item, e.currentTarget.value)}>
    </field-subitem-container>

    {#if isShowChildren(item)}
        <child-contents>
                {@render fields(getChildrenItems(item.id, items))}
        </child-contents>
    {/if}
    
</field-content>
{/snippet}

{#snippet checkBoxField(item: CheckSheetItem)}
<field-content>

    {@render caption(item)}

    <field-subitem-container>
        {#each item.subItems ?? [] as subItem, index}
            <label>
                <input type="checkbox" 
                    checked={getState(item, index)} 
                    onchange={(e) => onChangeChecked(item, e.currentTarget.checked, index)}>
                {subItem}
            </label>
        {/each}
    </field-subitem-container>

    {#if isShowChildren(item)}
        <child-contents>
                {@render fields(getChildrenItems(item.id, items))}
        </child-contents>
    {/if}


</field-content>
{/snippet}

{#snippet radioButtonField(item: CheckSheetItem)}
<field-content>

    {@render caption(item)}

    <field-subitem-container>
        {#each item.subItems ?? [] as subItem, index}
            <label>
                <input type="radio"
                    name={item.id} 
                    value={ getValue(item) == subItem } 
                    onchange={(e) => onInputText(item, subItem)}>
                {subItem}
            </label>
        {/each}
    </field-subitem-container>
 
    {#if isShowChildren(item)}
        <child-contents>
                {@render fields(getChildrenItems(item.id, items))}
        </child-contents>
    {/if}

</field-content>
{/snippet}

{#snippet caption(item: CheckSheetItem)} 

    {#if item.text}
        <div style:font-weight="bold">{item.text} {@render requiredLabel(item.isRequired)}</div>
    {/if}

{/snippet}


{#snippet requiredLabel(state: boolean | undefined)} 
    {#if state}
        <span style:color="red">*</span>
    {/if}
{/snippet}

{#snippet fields(fields: CheckSheetItem[])}

        {#each fields as field}
                    
            {#if field.type == "text"}
                {@render text(field)}
            {/if}

            {#if field.type == "input"}
                {@render inputField(field)}
            {/if}

            {#if field.type == "checklist"}
                {@render checkBoxField(field)}
            {/if}

            {#if field.type == "radio"}
                {@render radioButtonField(field)}
            {/if}

        {/each}

{/snippet}

<div class={"wh"}>
    
    <flex-box>
        {@render fields(topItems)}
    </flex-box>

    <div>
        <button class="complete">完了</button>
    </div>

</div>

<style>

    flex-box {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        /* gap: 4px; */
    }

    field-content {
        display: flex;
        flex-direction: column;
        
        /* gap: 4px; */
    }

    child-contents {
        /* margin: 4px 0px; */
        margin-left: 15px;
    }

    field-subitem-container {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .wh {
        overflow: auto;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
        /* background-color: gray; */
    }

    .complete {
        width: 100%;
        padding: 16px;
    }

</style>
<script lang="ts">
    import { getChildrenItems, type CheckSheetSettings, type CheckSheetItem, type CheckSheet } from './checkSheetObject';

    let { sheet, sheetValue }: { sheet: CheckSheetSettings, sheetValue: CheckSheet } = $props();
    const { items } = sheet;

    let sh: CheckSheet = $state({...sheetValue});

    const topItems = $derived(items.filter(item => !item.parentId));

    const onInputText = (item: CheckSheetItem, value: string) => {
        const valueItem = sh.values.find(vitem => vitem.itemId == item.id);
        if (valueItem) valueItem.value = value;
    }

    const onChangeChecked = (item: CheckSheetItem, value: boolean) => {

        const parentItem = items.find(_item => _item.id == item.parentId);

        if (parentItem) {
            const valueItem = sh.values.find(vitem => vitem.itemId == parentItem.id);
            // $inspect(valueItem);
            console.log({...valueItem});

        
        }
    }

</script>

<!-- <div>
    {JSON.stringify(sh)}
</div> -->

{#snippet text(item: CheckSheetItem)}
<field-content>
    <div>{item.text}</div>
    <child-contents>
        {@render fields(getChildrenItems(item.id, items))}
    </child-contents>
</field-content>
{/snippet}

{#snippet inputField(item: CheckSheetItem)}
<field-content>
    <input oninput={(e) => onInputText(item, e.currentTarget.value)}>
    <child-contents>
        {@render fields(getChildrenItems(item.id, items))}
    </child-contents>
</field-content>
{/snippet}

{#snippet checkBoxField(item: CheckSheetItem)}
<field-content>
    <label>
        <input type="checkbox" onchange={(e) => onChangeChecked(item, e.currentTarget.checked)}>
        {item.text}
    </label>
    <child-contents>
        {@render fields(getChildrenItems(item.id, items))}
    </child-contents>
</field-content>
{/snippet}

{#snippet radioButtonField(item: CheckSheetItem)}
<field-content>
    <label>
        <input type="radio" name={item.parentId}>
        {item.text}
    </label>
    <child-contents>
        {@render fields(getChildrenItems(item.id, items))}
    </child-contents>
</field-content>
{/snippet}

{#snippet fields(fields: CheckSheetItem[])}

        {#each fields as field}
                    
            {#if field.type == "text"}
                {@render text(field)}
            {/if}

            {#if field.type == "input"}
                {@render inputField(field)}
            {/if}

            {#if field.type == "checkbox"}
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

</div>

<style>

    flex-box {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    field-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    child-contents {
        margin-left: 32px;
    }

    .wh {
        background-color: gray;
    }

</style>
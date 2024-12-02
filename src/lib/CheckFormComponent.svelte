<script lang="ts">
    import {  unmount } from "svelte";
    import {
        getChildrenItems,
        type CheckSheetValue,
        type CheckSheetItem,
        type CheckSheetItemValue,
        isCompletedItem as _isCompletedItem,
        isEnabledChildren as _isEnabledChildren,
        isShowChildren as _isShowChildren,
        getSubItems,
        getEnabledChidlren,
    } from "./checkSheetObject";

    let { 
        sheetItems = $bindable(),
        sheetValues = $bindable(),
        visibleIds = $bindable(), 
    }: { sheetItems: CheckSheetItem[], sheetValues: CheckSheetValue, visibleIds: string[] } = $props();

    const topItems = $derived(sheetItems.filter(item => !item.parentId && !item.parentSubItemId));

    const getValue = (item: CheckSheetItem) => {
        const valueItem = sheetValues[item.id];
        return valueItem?.text;
    };

    const getState = (item: CheckSheetItem, subItemIndex: number) => {
        const valueItem = sheetValues[item.id];
        if (valueItem?.toggle) return valueItem?.toggle;
        return false;
    };

    const newValueItem = (item: CheckSheetItem): CheckSheetItemValue => {

        if (item.type == "input" || item.type == "radio") return { 
            itemId: item.id, 
            type: item.type, 
            text: "", 
            isCompleted: false,
            isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
        };

        if (item.type == "checkbox") return { 
            itemId: item.id, 
            type: item.type, 
            toggle: false, 
            isCompleted: false,
            isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
        };

        if (item.type == "container") return { 
            itemId: item.id, 
            type: item.type, 
            states: [], 
            isCompleted: false,
            isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
        };
        
        return {
            itemId: item.id, 
            type: item.type, 
            isCompleted: false,
            isVisible: item.parentId == undefined && item.parentSubItemId == undefined,
        };
    };

    const onInputText = (item: CheckSheetItem, value: string) => {

        let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);

        sheetValues[item.id] = {
            ...valueItem, 
            text: value, 
            isCompleted: isCompletedItem(item), 
        };

        onToggleShowChildren(item);
    };

    const onChangeChecked = (item: CheckSheetItem, value: boolean, container: CheckSheetItem | undefined, checkedIndex: number ) => {

        let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);
        
        sheetValues[item.id] = {
            ...valueItem, 
            toggle: value, 
            isCompleted: isCompletedItem(item)
        };

        if (container) setContainerStates(container, item, value, checkedIndex);

        onToggleShowChildren(item);
    };

    const onSwitch = (item: CheckSheetItem, value: string, container: CheckSheetItem | undefined, checkedIndex: number) => {

        let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);
        sheetValues[item.id] = { ...valueItem, text: value, isCompleted: isCompletedItem(item) };

        if (item.type == 'radio') {
            if (container) setContainerValue(container, item, value, checkedIndex);
        }

        onToggleShowChildren(item);
    };

    const setContainerValue = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: string, subItemIndex: number ) => {

        let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

        sheetValues[containerItem.id] = {
            ...valueItem,
            text: newValue,
            isCompleted: isCompletedItem(containerItem),
        };
    };

    const setContainerStates = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: boolean, subItemIndex: number ) => {

        let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

        const { states } = valueItem;
        if (states)
            states[subItemIndex] = {
                text: subItem.text ?? "",
                checked: newValue,
            };

        sheetValues[containerItem.id] = {
            ...valueItem,
            states,
            isCompleted: isCompletedItem(containerItem),
        };
    };

    const onToggleShowChildren = (item: CheckSheetItem) => {

        const currentVisible = sheetValues[item.id].text || sheetValues[item.id].toggle;

        const getAllChild = () =>{

            const ch = getChildrenItems(item.id, sheetItems);

            

        }

        getEnabledChidlren(sheetItems, sheetValues);

        // const allch = 

        // sheetValues[item.id].isVisible = 

        // sheetValues[item.id].isVisible = false;

        // getEnabledChidlren(sheetItems, sheetValues);
    }

    // const isShowChildren = (item: CheckSheetItem) => {
    //     return isEnabledChildren(item);
    // }

    const isEnabledChildren = (item: CheckSheetItem) => _isEnabledChildren(item, sheetItems, sheetValues);
    const isCompletedItem = (item: CheckSheetItem) => _isCompletedItem(item, sheetItems, sheetValues);

    const isShowChildren = (item: CheckSheetItem) => {

        // const currentVisible = sheetValues[item.id]?.isVisible;
        const isShowChild = _isShowChildren(item, sheetItems, sheetValues);

        // if (isShowChild && !visibleIds.includes(item.id)) visibleIds.push(item.id);
        // if (!isShowChild && visibleIds.includes(item.id)) visibleIds = visibleIds.filter(id => id != item.id);

        // if (currentVisible != undefined && currentVisible != isShowChild) {
        //     onToggleShowChildren(item, isShowChild);
        // }

        return isShowChild;
    }

    const mount = () => {
        console.log("mount");
    }

    const dest = () => {
        console.log("dest");
    }

    $effect(() => {
        console.log("teta");
    });

</script>

{#snippet fields(fields: CheckSheetItem[], parentItem: CheckSheetItem | undefined )}
    {#each fields as field}
        {#if field.type == "text"}
            {@render text(field, parentItem)}
        {/if}

        {#if field.type == "input"}
            {@render inputField(field, parentItem)}
        {/if}

        {#if field.type == "container"}
            {@render containerField(field, parentItem)}
        {/if}

        {#if field.type == "checkbox"}
            {@render checkBoxField(field, parentItem, 0)}
        {/if}

        {#if field.type == "radio"}
            {@render radioButtonField(field, parentItem, 0)}
        {/if}

    {/each}
{/snippet}

{#snippet text(item: CheckSheetItem, parnetItem: CheckSheetItem | undefined)}
    <field-content>
        {@render caption(item)}
        <child-contents>
            {@render fields(getChildrenItems(item.id, sheetItems), item)}
        </child-contents>
    </field-content>
{/snippet}

{#snippet inputField(item: CheckSheetItem, parnetItem: CheckSheetItem | undefined )}
    <field-content>
        {@render caption(item)}

        <field-subitem-container>
            <input
                value={getValue(item)}
                oninput={(e) => onInputText(item, e.currentTarget.value)}
            />
        </field-subitem-container>

        {#if isShowChildren(item)}
            <child-contents>
                {@render fields(getChildrenItems(item.id, sheetItems), item)}
            </child-contents>
        {/if}
    </field-content>
{/snippet}

{#snippet containerField(item: CheckSheetItem, parnetItem: CheckSheetItem | undefined )}
    <field-content>
        {@render caption(item)}

        <field-subitem-container>
            {#each getSubItems(item.id, sheetItems) ?? [] as subItem, index}
                {#if subItem.type == "checkbox"}
                    {@render checkBoxField(subItem, item, index)}
                {/if}

                {#if subItem.type == "radio"}
                    {@render radioButtonField(subItem, item, index)}
                {/if}
            {/each}
        </field-subitem-container>

        {#if isShowChildren(item)}
            <child-contents>
                {@render fields(getChildrenItems(item.id, sheetItems), item)}
            </child-contents>
        {/if}
    </field-content>
{/snippet}

{#snippet checkBoxField(item: CheckSheetItem, parentItem: CheckSheetItem | undefined, subIndex: number )}
    <field-content>
        <!-- {@render caption(item)} -->

        <field-subitem-container >
            <label>
                <input
                    type="checkbox"
                    checked={getState(item, subIndex)}
                    onchange={(e) =>
                        onChangeChecked(
                            item,
                            e.currentTarget.checked,
                            parentItem,
                            subIndex,
                        )}
                />
                {item.text}
            </label>
        </field-subitem-container>

        {#if isShowChildren(item)}
            <child-contents>
                {@render fields(getChildrenItems(item.id, sheetItems), item)}
            </child-contents>
        {/if}
    </field-content>
{/snippet}

{#snippet radioButtonField(item: CheckSheetItem, parentItem: CheckSheetItem | undefined, subIndex: number )}
    <field-content>
        <!-- {@render caption(item)} -->

        <field-subitem-container>
            <label>
                <input
                    type="radio"
                    name={parentItem?.id}
                    value={parentItem?.text == item.text}
                    onchange={(e) => onSwitch(item, item.text ?? "", parentItem, subIndex)}
                />
                {item.text}
                {parentItem ? isCompletedItem(parentItem) : ""}
            </label>
        </field-subitem-container>

        {#if isShowChildren(item)}
            <child-contents>
                {@render fields(getChildrenItems(item.id, sheetItems), item)}
            </child-contents>
        {/if}
    </field-content>
{/snippet}

{#snippet caption(item: CheckSheetItem)}
    {#if item.text}
        <div style:font-weight="bold">
            {item.text}
            {@render requiredLabel(item.isRequired)}
        </div>
    {/if}
{/snippet}

{#snippet requiredLabel(state: boolean | undefined)}
    {#if state}
        <span style:color="red">*</span>
    {/if}
{/snippet}

{@render fields(topItems, undefined)}

<style>


field-content {
        display: flex;
        flex-direction: column;
        
        /* gap: 4px; */
    }

    child-contents {
        /* margin: 4px 0px; */
        margin-left: 24px;
    }

    field-subitem-container {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

</style>
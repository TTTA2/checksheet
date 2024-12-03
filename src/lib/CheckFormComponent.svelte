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
        getReadyChidlren,
    } from "./checkSheetObject";
    
    import CheckFormComponentBase from "./checkForm/components/CheckFormComponentBase.svelte";

    let { 
        sheetItems = $bindable(),
        sheetValues = $bindable(),
    }: { sheetItems: CheckSheetItem[], sheetValues: CheckSheetValue } = $props();

    const topItems = $derived(sheetItems.filter(item => !item.parentId && !item.parentSubItemId));



    // const onInputText = (item: CheckSheetItem, value: string) => {

    //     let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);

    //     sheetValues[item.id] = {
    //         ...valueItem, 
    //         text: value, 
    //         isCompleted: isCompletedItem(item), 
    //     };
    // };

    // const onChangeChecked = (item: CheckSheetItem, value: boolean, container: CheckSheetItem | undefined, checkedIndex: number ) => {

    //     let valueItem = sheetValues[item.id] ? { ...sheetValues[item.id] } : newValueItem(item);
        
    //     sheetValues[item.id] = {
    //         ...valueItem, 
    //         toggle: value, 
    //         isCompleted: isCompletedItem(item)
    //     };

    //     if (container) setContainerStates(container, item, value, checkedIndex);
    // };



    // const setContainerValue = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: string, subItemIndex: number ) => {

    //     let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

    //     sheetValues[containerItem.id] = {
    //         ...valueItem,
    //         text: newValue,
    //         isCompleted: isCompletedItem(containerItem),
    //     };
    // };

    // const setContainerStates = (containerItem: CheckSheetItem, subItem: CheckSheetItem, newValue: boolean, subItemIndex: number ) => {

    //     let valueItem = sheetValues[containerItem.id] ? { ...sheetValues[containerItem.id] } : newValueItem(containerItem);

    //     const { states } = valueItem;
    //     if (states)
    //         states[subItemIndex] = {
    //             text: subItem.text ?? "",
    //             checked: newValue,
    //         };

    //     sheetValues[containerItem.id] = {
    //         ...valueItem,
    //         states,
    //         isCompleted: isCompletedItem(containerItem),
    //     };
    // };

    const st = (item: CheckSheetItem) => {
        return sheetValues[item.id];
    }

    const onToggleShowChildren = (item: CheckSheetItem) => {

        const currentVisible = sheetValues[item.id].text || sheetValues[item.id].toggle;

        const getAllChild = () =>{

            const ch = getChildrenItems(item.id, sheetItems);

            

        }

        getReadyChidlren(sheetItems, sheetValues);

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

{#snippet fields(fields: CheckSheetItem[], parentItem: CheckSheetItem | undefined, sheetValues: CheckSheetValue )}

    {#each fields as field}

        <!-- {#if field.type == "text"}
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
        {/if} -->




    {/each}
{/snippet}



{#snippet radioButtonField(item: CheckSheetItem, parentItem: CheckSheetItem | undefined, subIndex: number, it: CheckSheetValue )}

{/snippet}

{#each topItems as item }
    <CheckFormComponentBase item={item} parentItem={undefined} sheetItems={sheetItems} bind:sheetValues></CheckFormComponentBase>
{/each}

<!-- {@render fields(topItems, undefined, sheetValues)} -->

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
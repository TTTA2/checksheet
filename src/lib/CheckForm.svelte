<script lang="ts">
    import CheckFormComponentBase from './checkForm/components/CheckFormComponent.svelte';
    import { getChildrenItems, type CheckSheetSettings, type CheckSheetItem, type CheckSheetValue, getSubItems, type CheckSheetItemValue, isCompletedItem, getReadyChidlren } from './checkSheetObject';

    let {
        isFullOpen = false,
        sheet, 
        sheetValue,
        onClickComponent,
        selectedComponentId,
    }: 
    {
        isFullOpen?: boolean,
        sheet: CheckSheetSettings, 
        sheetValue: CheckSheetValue,
        selectedComponentId?: string,
        onClickComponent?: ((target: CheckSheetItem) => void),
        
    } = $props();

    let sheetItems = sheet.items;
    let sheetValues: CheckSheetValue = $state({...sheetValue});

    const topItems = $derived(sheetItems.filter(item => !item.parentId && !item.parentSubItemId));

    const handleClick = () => {

        const aa = getReadyChidlren(sheetItems, sheetValues);
        console.log(aa, {...sheetValues});
        sheetValues = {};
    }

</script>

<div class={"wh"}>
    
    <flex-box>
        {#each topItems as item }
            <CheckFormComponentBase 
                onClickComponent={onClickComponent}
                selectedComponentId={selectedComponentId}
                isFullOpen={isFullOpen} 
                item={item}
                parentItem={undefined}
                sheetItems={sheetItems}
                bind:sheetValues></CheckFormComponentBase>
        {/each}
    </flex-box>

    <div>
        <button class="complete" onclick={handleClick}>完了</button>
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
<script lang="ts">

    import CheckFormComponent from './CheckFormComponent.svelte';
    import { getChildrenItems, type CheckSheetSettings, type CheckSheetItem, type CheckSheetValue, getSubItems, type CheckSheetItemValue, isCompletedItem, getReadyChidlren } from './checkSheetObject';

    let { sheet, sheetValue }: { sheet: CheckSheetSettings, sheetValue: CheckSheetValue } = $props();
    let { items } = sheet;

    let sh: CheckSheetValue = $state({...sheetValue});


    
    // $inspect({...sh});
    // $inspect({...sh});

    // $inspect(visibleIds);


    // const errorCheck = () => {

    //     items.forEach(item => {

    //         if (item.isRequired || isCompletedItem(item, items, sheet)) {
    //             // sh.items[item.id]
    //         }

    //     })
    // }

    // const handleComplete = () => {


    // }

    const handleClick = () => {
        // console.log(visibleIds);

        const aa = getReadyChidlren(items, sh);

        console.log(aa);

        sh = {};
    }


</script>

<div class={"wh"}>
    
    <flex-box>
        <CheckFormComponent bind:sheetItems={items} bind:sheetValues={sh}></CheckFormComponent>
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
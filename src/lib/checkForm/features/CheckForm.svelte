<script lang="ts">
    import type { Snippet } from 'svelte';
    import CheckFormComponentBase, { type OverrideComponent, type WrapperComponent } from './CheckFormComponent.svelte';
    import { getReadyChidlren, isShowChildren } from '../checkSheetObject';
    import type { CheckSheetSettings, CheckSheetValue, CheckSheetItem } from '../types/types';

    let {
        sheet, 
        sheetValue,
        itemComponentWrapper,
        overrideItemBody,
    }: 
    {
        sheet: CheckSheetSettings, 
        sheetValue: CheckSheetValue,
        itemComponentWrapper?: Snippet<[WrapperComponent]>,
        overrideItemBody?: Snippet<[OverrideComponent]>,
    } = $props();

    let sheetItems = $derived(sheet.items);
    //一番上の項目だけを取得する
    const topItems = $derived(sheetItems.filter(item => !item.parentId && !item.parentSubItemId));

    let sheetValues: CheckSheetValue = $state({...sheetValue});

    const handleClick = () => {
        const aa = getReadyChidlren(sheetItems, sheetValues);
        console.log(aa, {...sheetValues});
        sheetValues = {};
    }

    const isExpand = (currentItem: CheckSheetItem) => isShowChildren(currentItem, sheetItems, sheetValues);

</script>


<div class={"wh"}>
    
    <flex-box>
        {#each topItems as item }
            <CheckFormComponentBase 
                itemProperty={{ item, parentItem: undefined, isExpand }}
                overrideBody={overrideItemBody}
                wrapper={itemComponentWrapper}
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


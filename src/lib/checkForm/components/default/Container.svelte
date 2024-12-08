<script lang="ts">
    import type { Snippet } from "svelte";
    import type { CheckSheetItem, CheckSheetValue } from "../../types/types";
    import { getSubItems } from "../../checkSheetObject";
    import CheckFormComponentBase, { type OverrideComponent, type WrapperComponent } from "../../features/CheckFormComponent.svelte";
 
    let { item, parentItem, sheetItems, sheetValues = $bindable(), isExpand, wrapper, overrideItemBody } : 
    {
        item: CheckSheetItem,
        parentItem: CheckSheetItem | undefined,
        sheetItems: CheckSheetItem[],
        sheetValues: CheckSheetValue,
        isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean,
        wrapper?: Snippet<[WrapperComponent]>
        overrideItemBody?: Snippet<[OverrideComponent]>,

     } = $props();

</script>

<!-- {#each getSubItems(item.id, sheetItems) as child }
    <CheckFormComponentBase
        itemProperty={{item: child, parentItem: item, isExpand}}
        overrideBody={overrideItemBody}
        wrapper={wrapper}
        sheetItems={sheetItems}
        bind:sheetValues={sheetValues}></CheckFormComponentBase>
{/each} -->

<style></style>
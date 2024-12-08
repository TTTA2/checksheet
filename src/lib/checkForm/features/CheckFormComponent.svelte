<script lang="ts">
    import CheckFormComponentBase from "./CheckFormComponent.svelte";
    import { getChildrenItems, getChildSubItems } from "../checkSheetObject";

    import Container from "../components/default/Container.svelte";
    import Input from "../components/default/Input.svelte";
    import RadioButton from "../components/default/RadioButton.svelte";
    import CheckBox from "../components/default/CheckBox.svelte";
    import type { Snippet } from "svelte";
    import type { CheckSheetItem, CheckSheetValue } from "../types/types";
    import Multiline from "../components/default/Multiline.svelte";

    export type ItemProperty = {
        isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean,
        item: CheckSheetItem, 
        parentItem: CheckSheetItem | undefined, 
    }

    export type WrapperComponent = { content: Snippet<[ItemProperty]>, item: CheckSheetItem, property: ItemProperty };
    export type OverrideComponent = { property: ItemProperty };

    let {
        itemProperty,
        sheetItems = $bindable(),
        sheetValues = $bindable(),
        wrapper,
        overrideBody,
    } : {
        itemProperty: ItemProperty, 
        sheetItems: CheckSheetItem[], 
        sheetValues: CheckSheetValue,
        wrapper?: Snippet<[WrapperComponent]> 
        overrideBody?: Snippet<[OverrideComponent]>,
    }  = $props();

</script>

{#snippet caption(item: CheckSheetItem)}
    {#if item.name}
        <div class="flex_colmun caption label">
            <div>{item.name}</div>
            {@render requiredLabel(item.isRequired)}
        </div>
    {/if}
{/snippet}

{#snippet requiredLabel(state: boolean | undefined)}
    {#if state}
        <div class="badge">必須</div>
    {/if}
{/snippet}

<!-- キャプションなどヘッダー部分のスニペット -->
{#snippet head(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean, parentItem?: CheckSheetItem)}
    {#if item.type == "container" || item.type == "label" || item.type == "textbox"}
        {@render caption(item)}
    {/if}
{/snippet}

<!-- チェック項目本体のスニペット -->
{#snippet body(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean, parentItem?: CheckSheetItem)}
    
    <field-subitem-container>
        {#if item.type == "container"}
            <Container isExpand={isExpand} wrapper={wrapper} item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></Container>
        {/if}

        {#if item.type == "radioButton"}
            <RadioButton item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></RadioButton>
        {/if}

        {#if item.type == "checkbox"}
            <CheckBox item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></CheckBox>
        {/if}

        {#if item.type == "textbox"}
            <Input item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues />
        {/if}

        {#if item.type == "textarea"}
            <Multiline item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues />
        {/if}

    </field-subitem-container>

{/snippet}

<!-- 単一項目のチェックが完了した際に展開する子のコンポーネントのスニペット -->
{#snippet subItemsComponent(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean)}
    <!-- <child-wrapper class:open={typeof(isExpand) == "boolean" ? isExpand : isExpand(item)}></child-wrapper> -->
        {#each getChildSubItems(item.id, sheetItems) as subItem }
            <child-contents>
                <CheckFormComponentBase 
                    itemProperty={{item: subItem, parentItem: item, isExpand}}
                    bind:sheetItems={sheetItems} 
                    bind:sheetValues={sheetValues} 
                    wrapper={wrapper}
                    overrideBody={overrideBody}
                    ></CheckFormComponentBase>
            </child-contents>
        {/each}
    <!-- </child-wrapper> -->
{/snippet}

<!-- 単一項目のチェックが完了した際に展開する子のコンポーネントのスニペット -->
{#snippet childrenComponent(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean)}
    <child-wrapper class:open={typeof(isExpand) == "boolean" ? isExpand : isExpand(item)}>
        {#each getChildrenItems(item.id, sheetItems) as child }
            <child-contents>
                <CheckFormComponentBase 
                    itemProperty={{item: child, parentItem: item, isExpand}}
                    bind:sheetItems={sheetItems} 
                    bind:sheetValues={sheetValues} 
                    wrapper={wrapper}
                    overrideBody={overrideBody}
                    ></CheckFormComponentBase>
            </child-contents>
        {/each}
    </child-wrapper>
{/snippet}

<!-- 単一チェック項目全体のスニペット -->
{#snippet content(prop: ItemProperty)}
    <field-content class:shift={!prop.item.isHiddenCaption}>

        {#if !prop.item.isHiddenCaption} 
            {@render head(prop.item, prop.isExpand, prop.parentItem)}
        {/if}

        {#if overrideBody}
            <field-subitem-container>
                {@render overrideBody({property: prop})}
            </field-subitem-container>
        {:else}
            {@render body(prop.item, prop.isExpand, prop.parentItem)}
        {/if}

        {@render subItemsComponent(prop.item, prop.isExpand)}
        {@render childrenComponent(prop.item, prop.isExpand)}

    </field-content>
{/snippet}

<!-- ラッパーの指定があれば単一項目を指定されたスニペットに包んだ項目を描画 -->
{#if wrapper}
    {@render wrapper({ content, item: itemProperty.item, property: itemProperty })}
{:else}
<!-- そうじゃなければ普通に描画 -->
    {@render content(itemProperty)}
{/if}

<style>

    .flex_colmun {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .badge {
        display: flex;
        border-radius: 6px;
        background-color: pink;
        color: darkred;
        font-size: 70%;
        vertical-align: middle;
        text-align: center;
        padding: 0 8px 0 8px;
        height: fit-content;
    }

    .caption {
        font-weight: bold;
        padding: 4px 0px;
        border-left: solid 4px skyblue;
        padding-left: 6px;
        margin-top: 4px;
        margin-bottom: 4px;
    }
    
    .label {
        user-select: none;
    }

    field-content {
        padding: 2px 0px;
        display: flex;
        flex-direction: column;
    }

    field-content.shift {
        padding-left: 12px;
    }

    child-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        opacity: 0;
        background-color: transparent;
        transition: 0.2s ease-out;
        transition-property: grid-template-rows, opacity;
    }

    child-wrapper.open {
        grid-template-rows: 1fr;
        opacity: 1;
    }

    child-contents {
        overflow: hidden;
    }

    field-subitem-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }


</style>
<script lang="ts">
    import CheckFormComponentBase from "./CheckFormComponent.svelte";
    import { getChildrenItems } from "../checkSheetObject";

    import Container from "./Container.svelte";
    import Input from "../components/default/Input.svelte";
    import RadioButton from "../components/default/RadioButton.svelte";
    import CheckBox from "../components/default/CheckBox.svelte";
    import type { Snippet } from "svelte";
    import type { CheckSheetItem, CheckSheetValue } from "../types/types";

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
    {#if item.text}
        <div class="flex_colmun caption label">
            <div>{item.text}</div>
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
    {#if item.type == "container" || item.type == "text" || item.type == "input"}
        {@render caption(item)}
    {/if}
{/snippet}

<!-- チェック項目本体のスニペット -->
{#snippet body(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean, parentItem?: CheckSheetItem)}
    
    <field-subitem-container>
        {#if item.type == "container"}
            <Container isExpand={isExpand} wrapper={wrapper} item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></Container>
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
    </field-subitem-container>

{/snippet}

<!-- 単一項目のチェックが完了した際に展開する子のコンポーネントのスニペット -->
{#snippet cihldrenComponent(item: CheckSheetItem, isExpand: ((currentItem: CheckSheetItem) => boolean) | boolean, parentItem?: CheckSheetItem)}
    <child-wrapper class:open={typeof(isExpand) == "boolean" ? isExpand : isExpand(item)}>
        {#each getChildrenItems(item.id, sheetItems) as child }
            <child-contents>
                <CheckFormComponentBase 
                    itemProperty={{item: child, parentItem, isExpand}}
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
    <field-content>

        {@render head(prop.item, prop.isExpand, prop.parentItem)}
        
        {#if overrideBody}
            <field-subitem-container>

                <!-- コンテナだけはオーバーライドしても通常の描画を行う -->
                {#if prop.item.type == "container"}

                    <Container
                        isExpand={prop.isExpand}
                        wrapper={wrapper} 
                        overrideItemBody={overrideBody}
                        item={prop.item}
                        parentItem={prop.parentItem}
                        sheetItems={sheetItems}
                        bind:sheetValues></Container>

                {:else}
                    {@render overrideBody({property: prop})}
                {/if}

            </field-subitem-container>
        {:else}
            {@render body(prop.item, prop.isExpand, prop.parentItem)}
        {/if}

        {@render cihldrenComponent(prop.item, prop.isExpand, prop.parentItem)}

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
        padding: 2px 12px;
        display: flex;
        flex-direction: column;
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
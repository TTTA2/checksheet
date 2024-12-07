<script lang="ts">
    import CheckFormComponentBase from "./CheckFormComponent.svelte";

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
    } from "../../checkSheetObject";
    import Container from "./Container.svelte";
    import Input from "./Input.svelte";
    import RadioButton from "./RadioButton.svelte";
    import CheckBox from "./CheckBox.svelte";
    import DummyComponent from "./dummy/DummyComponent.svelte";

    let {
        hoverable = false,
        isFullOpen = false,
        item,
        parentItem,
        sheetItems = $bindable(), 
        sheetValues = $bindable(),
        dummyMode = false,
        onClickComponent = undefined,
        selectedComponentId,
    }
    : {
        hoverable?: boolean,
        isFullOpen?: boolean,
        item: CheckSheetItem, 
        parentItem: CheckSheetItem | undefined, 
        sheetItems: CheckSheetItem[], 
        sheetValues: CheckSheetValue,

        dummyMode?: boolean,
        selectedComponentId?: string,
        onClickComponent?: ((target: CheckSheetItem) => void),
        
    } = $props();

    const isShowChildren = (item: CheckSheetItem) => {
        const isShowChild = _isShowChildren(item, sheetItems, sheetValues);
        return isShowChild;
    }

    $effect(() => {
        console.log(selectedComponentId == item.id);
    });

    let isExpandChild = $derived(isShowChildren(item) || isFullOpen);
    let hoverd = $state(false);

    const onHover = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e);

        hoverd = true;
    }

    const handleLeave = (e: MouseEvent) => {
        // e.preventDefault();
        // e.stopPropagation();
        hoverd = false;
    }

    const handleComponentClick = (e: MouseEvent) => {

        if (dummyMode) {
            e.preventDefault();
            e.stopPropagation();    
            onClickComponent?.call(undefined, item);
        }
    }

    const handleSubComponentClick = (_item: CheckSheetItem) => {
        onClickComponent?.call(undefined, _item);
    }


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

<field-content 
onclick={handleComponentClick} 
onmouseenter={onHover} 
onmousemove={onHover} 
onmouseout={handleLeave} 
class:active={selectedComponentId == item.id}
class:hoverableTarget={hoverd}>

    {#if item.type == "container" || item.type == "text" || item.type == "input"}
        {@render caption(item)}
    {/if}

    {#if !isFullOpen} 
        <field-subitem-container>

            {#if item.type == "container"}
                <Container item={item} parentItem={parentItem} sheetItems={sheetItems} bind:sheetValues></Container>
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
    {/if}

    {#if isFullOpen} 
        <field-subitem-container>

            {#if item.type == "container"}
                <Container 
                    ele={requiredLabel}
                    selectedComponentId={selectedComponentId}
                    onClickComponent={(_item) => handleSubComponentClick(_item)}
                    isFullOpen={isFullOpen} 
                    item={item} 
                    parentItem={parentItem}
                    sheetItems={sheetItems}
                    bind:sheetValues></Container>
            {/if}

            {#if item.type != "container"}
                <DummyComponent targetItem={item}></DummyComponent>
            {/if}

        </field-subitem-container>
    {/if}


    <child-wrapper class:open={isExpandChild}>
        <!-- {#if isExpandChild} -->
                {#each getChildrenItems(item.id, sheetItems) as child }
                    <child-contents>
                        <CheckFormComponentBase 
                            onClickComponent={(_item) => handleSubComponentClick(_item)} 
                            item={child} 
                            parentItem={item} 
                            bind:sheetItems={sheetItems} 
                            bind:sheetValues={sheetValues} 
                            isFullOpen={isFullOpen}
                            selectedComponentId={selectedComponentId}
                            ></CheckFormComponentBase>
                    </child-contents>
                {/each}
        <!-- {/if} -->
    </child-wrapper>


</field-content>

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
        /* gap: 8px; */
    }

    child-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        opacity: 0;
        background-color: transparent;
        /* transition: grid-template-rows 0.2s ease-out; */
        transition: 0.2s ease-out;
        transition-property: grid-template-rows, opacity;

        /* border-left: 4px solid gray; */
    }

    child-wrapper.open {
        grid-template-rows: 1fr;
        opacity: 1;
        /* margin-top: 0; */
        /* max-height: auto; */
    }

    child-contents {
        overflow: hidden;
        /* margin: 4px 0px; */
        /* margin-left: 24px; */
    }

    field-subitem-container {

        /* border-left: 4px solid gray; */
        
        /* margin-left: 8px; */
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .hoverableTarget {
        cursor: pointer !important;
        /* pointer-events: fill; */
        background-color: rgba(50, 205, 50, 0.144);
    }

    .hoverableTargetTopNode {
        cursor: pointer !important;
        /* pointer-events: fill; */
        background-color: rgba(255, 156, 27, 0.349);
    }

    .active {
        border: 2px gray dashed;
    }

</style>
<script lang="ts">
    import type { ItemProperty, OverrideComponent, WrapperComponent } from "./CheckFormComponent.svelte";
    import type { CheckSheetItem, CheckSheetSettings, CheckSheetValue } from "../types/types";
    import CheckForm from "./CheckForm.svelte";
    import DummyComponent from "../components/default/dummy/DummyComponent.svelte";
    
    let { checkSheetSetting = $bindable(), sheetValue }: {
        checkSheetSetting: CheckSheetSettings,
        sheetValue: CheckSheetValue,
    } = $props();

    // let selectedComponentId = $state("");
    let editComponent: CheckSheetItem | undefined = $state();
    
    const testClick = (e: MouseEvent, item: CheckSheetItem, property: ItemProperty) => {

        e.preventDefault();
        e.stopPropagation();

        editComponent = {...item};

        // editComponent = {...item};

        // selectedComponentId = item.id;
    }

    $inspect(checkSheetSetting);

    const apply = () => {

        console.log({...editComponent});

        checkSheetSetting = {
            ...checkSheetSetting,
            items: checkSheetSetting.items.map(item => item.id == editComponent?.id ? {...editComponent} : item)
        } 
    }

</script>

{#snippet test(obj: WrapperComponent)}
    <div class:active={obj.item.id == editComponent?.id}
    class="itemWrapper editTarget" onclick={(e) => testClick(e, obj.item, obj.property)}>
        {@render obj?.content?.({...obj.property, isExpand: true})}
    </div>
{/snippet}

{#snippet dummyBody(obj: OverrideComponent)}
    <DummyComponent targetItem={obj.property.item}></DummyComponent>
    <!-- <div>□{obj.property.item.text}</div> -->
{/snippet}

<column-grid>

    <CheckForm sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    <CheckForm overrideItemBody={dummyBody} itemComponentWrapper={test} sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    <editor-itemlist>
        
        {#if editComponent}
            <div>キャプション</div>
            <input bind:value={editComponent.text} > 

            <div>種類</div>
            <select bind:value={editComponent.type}>
                <option value="text">文字列</option>
                <option value="input">入力欄</option>
                <option value="checkbox">チェックボックス</option>
                <option value="radio">ラジオボタン</option>
                <option value="container">コンテナ</option>
            </select>

            <button onclick={() => apply()}>hannei</button>
        {/if}
    </editor-itemlist>

</column-grid>

<style>

editor-itemlist {
    display: flex;
    flex-direction: column;
}

column-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.35fr 0.35fr 0.35fr;
}

.itemWrapper {
    border: 2px transparent solid;
}

.editTarget {
    cursor: pointer !important;
}

.editTarget:hover {
    background-color: rgba(50, 205, 50, 0.144);
}

.active {
    /* outline: 2px green dashed; */
    border: 2px green dashed;
}

</style>
<script lang="ts">
    import type { ItemProperty, OverrideComponent, WrapperComponent } from "../CheckFormComponent.svelte";
    import type { CheckSheetItem, CheckSheetSettings, CheckSheetValue, ItemType } from "../../types/types";
    import CheckForm from "../CheckForm.svelte";
    import DummyComponent from "./components/dummy/DummyComponent.svelte";
    import ToolBox from "./components/toolbox/ToolBox.svelte";
    import { createNewItem } from "../../checkSheetObject";
    
    let { checkSheetSetting = $bindable(), sheetValue }: {
        checkSheetSetting: CheckSheetSettings,
        sheetValue: CheckSheetValue,
    } = $props();

    // let selectedComponentId = $state("");
    let editComponent: CheckSheetItem | undefined = $state();

    const description = {
        "input":  "テキストを1行だけ入力できる",
        "textarea":  "テキストを複数行入力できる",
        "checkbox":  "チェックのオン/オフを設定できる",
        "radio":  "同じコンテナの中から一つだけ選択できる",
        
    }
    
    const testClick = (e: MouseEvent, item: CheckSheetItem, property: ItemProperty) => {

        e.preventDefault();
        e.stopPropagation();

        editComponent = {...item};

        // editComponent = {...item};

        // selectedComponentId = item.id;
    }

    const apply = () => {

        console.log({...editComponent});

        checkSheetSetting = {
            ...checkSheetSetting,
            items: checkSheetSetting.items.map(item => item.id == editComponent?.id ? {...editComponent} : item)
        } 
    }
    
    const handleDrag = (e: any) => {
        e.stopPropagation();
        // console.log(e);
        // e.dataTransfer.setData("text/plain", "このテキストはドラッグができます");

        // e.dataTransfer.effectAllowed = "move";
    }

    const handleDragEnter = (e: any) => {
        // console.log(e);

    }

    const handleDragEnter2 = (e: DragEvent) => {

        const data = e.dataTransfer?.getData("text/plain");

        if (data) {
            const newItem = JSON.parse(data);

            if (!newItem.id) {
                createItem(newItem.itemType);
            }
        }
    }

    const createItem = (type: ItemType) => {

        const newItem = createNewItem(type, checkSheetSetting.items);

        checkSheetSetting = {
            ...checkSheetSetting,
            items: [...checkSheetSetting.items, newItem]
        };
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    }

</script>

{#snippet test(obj: WrapperComponent)}
    <div 
    draggable={true} 
    ondragstart={handleDrag}
    ondragenter={handleDragEnter}
    ondragover={handleDragOver}
    class:active={obj.item.id == editComponent?.id}
    class="itemWrapper editTarget" onclick={(e) => testClick(e, obj.item, obj.property)}>
        {@render obj?.content?.({...obj.property, isExpand: true})}
    </div>
{/snippet}

{#snippet dummyBody(obj: OverrideComponent)}
    <DummyComponent targetItem={obj.property.item}></DummyComponent>
{/snippet}

<column-grid>

    <CheckForm sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>

    <ToolBox></ToolBox>

    <div style:overflow="auto" ondrop={handleDragEnter2} ondragover={handleDragOver}>
        <CheckForm overrideItemBody={dummyBody} itemComponentWrapper={test} sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    </div>

    <editor-itemlist>
        
        {#if editComponent}

            <edit-item>
                <div>名前</div>
                <input bind:value={editComponent.name} > 
            </edit-item>

            <edit-item>
                <label>
                    <input type="checkbox" bind:checked={(editComponent.isHiddenCaption)} > 
                    名前を表示しない
                </label>
            </edit-item>

            <edit-item>
                <div>項目種別</div>
                <select bind:value={editComponent.type}>
                    <option value="text">キャプション</option>
                    <option value="input">テキスト入力欄</option>
                    <option value="multiline">複数行テキスト入力欄</option>
                    <option value="checkbox">チェックボックス</option>
                    <option value="radio">ラジオボタン</option>
                    <option value="container">コンテナ</option>
    
                </select>
            </edit-item>




            <button onclick={() => apply()}>適用</button>
        {/if}
    </editor-itemlist>

</column-grid>

<style>

edit-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
}

editor-itemlist {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

column-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.25fr 0.20fr 0.275fr 0.275fr;
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
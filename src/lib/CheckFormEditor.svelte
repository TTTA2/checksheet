<script lang="ts">

    import CheckForm from "./CheckForm.svelte";
    import type { CheckSheetValue, CheckSheetSettings, CheckSheetItem } from "./checkSheetObject";
    
    const {
        checkSheetSetting, sheetValue
    }: {
            checkSheetSetting: CheckSheetSettings 
            sheetValue: CheckSheetValue,
    } = $props();

    let selectedComponentId = $state("");
    
    const handleComponentClick = (target: CheckSheetItem) => {
        selectedComponentId = target.id;
        console.log(selectedComponentId, target);
    }

</script>

<column-grid>

    <CheckForm sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    <CheckForm selectedComponentId={selectedComponentId} onClickComponent={handleComponentClick} isFullOpen={true} sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    <div>aa</div>

</column-grid>

<style>

column-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.35fr 0.35fr 0.35fr;
}

/* item-editor {
    width: 100%;
    height: 100%;
    background-color: gray;
} */

</style>
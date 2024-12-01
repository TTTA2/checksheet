<script lang="ts">

    import CheckForm from "./CheckForm.svelte";
    import type { CheckSheetValue, CheckSheetSettings } from "./checkSheetObject";
    
    const {
        checkSheetSetting, sheetValue
    }: {
            checkSheetSetting: CheckSheetSettings 
            sheetValue: CheckSheetValue,
    } = $props();
    
</script>

<column-grid>

    <CheckForm sheetValue={sheetValue} sheet={checkSheetSetting}></CheckForm>
    <div>aa</div>

</column-grid>

<style>

column-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
}

/* item-editor {
    width: 100%;
    height: 100%;
    background-color: gray;
} */

</style>
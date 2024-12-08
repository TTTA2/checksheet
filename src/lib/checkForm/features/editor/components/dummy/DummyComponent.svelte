<script lang="ts">
    import type { CheckSheetItem } from '../../../../types/types';

    let {
        targetItem,
    }: {
        targetItem: CheckSheetItem,
    } = $props();


</script>

{#snippet input()}
    <div class="dummy input">テキスト入力</div>
{/snippet}

{#snippet multiline()}
    <div class="dummy input">複数行入力</div>
{/snippet}

{#snippet checkbox()}
    <div class="flexc">
        <span class="checkboxcontrol"></span>
        <label>{targetItem.name}</label>
    </div>
{/snippet}

{#snippet radio()}
    <div class="flexc">
        <span class="radiocontrol"></span>
        <label>{targetItem.name}</label>
    </div>
{/snippet}

<div>
    {#if targetItem.type == "textbox"}
        {@render input()}
    {/if}

    {#if targetItem.type == "textarea"}
        {@render multiline()}
    {/if}

    {#if targetItem.type == "checkbox"}
        {@render checkbox()}
    {/if}

    {#if targetItem.type == "radioButton"}
        {@render radio()}
    {/if}
</div>

<style>

    .flexc {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .dummy.input {
        border-radius: 2px;
        border: 1px gray solid;
        /* width: 100%; */
        padding: 8px;
        user-select: none;
    }

    .checkboxcontrol {
        display: inline-block;
        border: 1px gray solid;
        width: 12px;
        height: 12px;
    }

    .radiocontrol {
        display: inline-block;
        border: 1px gray solid;
        width: 12px;
        height: 12px;
        border-radius: 12px;
    }
    
    label {
        user-select: none;
    }
    
</style>
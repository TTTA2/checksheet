<script lang="ts">
    import type { CheckSheetItem } from '../../../checkSheetObject';

    let {
        targetItem,
    }: {
        targetItem: CheckSheetItem,
    } = $props();

</script>

{#snippet input()}
    <div class="dummy input">テキスト入力</div>
{/snippet}

{#snippet checkbox()}
    <div class="flexc">
        <span class="checkboxcontrol"></span>
        <label>{targetItem.text}</label>
    </div>
{/snippet}

{#snippet radio()}
    <div class="flexc">
        <span class="radiocontrol"></span>
        <label>{targetItem.text}</label>
    </div>
{/snippet}

<div>
{#if targetItem.type == "input"}
    {@render input()}
{/if}

{#if targetItem.type == "checkbox"}
    {@render checkbox()}
{/if}

{#if targetItem.type == "radio"}
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

    .active {
        border: 2px gray dashed;
    }

</style>
<script lang="ts">
    import type { ItemType } from "../../../../types/types";

// "text" | "input" | "container" | "checkbox" | "radio" | "multiline";

    type ToolItem = {
        name: string,
        type: ItemType,
    }

    const toolItems: ToolItem[]= [

        {
            name: "ラベル",
            type: "label",
        },

        {
            name: "テキストボックス",
            type: "textbox",
        },

        {
            name: "テキストエリア",
            type: "textarea",
        },

        {
            name: "チェックボックス",
            type: "checkbox",
        },

        {
            name: "ラジオボタン",
            type: "radioButton",
        },

        {
            name: "コンテナ",
            type: "container"
        }
    ];

    const handleDragStart = (e: DragEvent, itemType: ItemType) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", JSON.stringify({ id: undefined, itemType }));
        }
    }

    const handleDragOver = (e: DragEvent) => {
        // e.preventDefault();
    }

</script>

<div>
    <tool-box>
        {#each toolItems as item}
            <tool-item ondragstart={(e: DragEvent) => handleDragStart(e, item.type)} ondragover={handleDragOver} draggable={true}>
                {item.name}
            </tool-item>
        {/each}
    </tool-box>
</div>

<style>

    tool-box {
        display: flex;
        flex-direction: column;
    }

    tool-item {
        display: block;
        padding: 8px;
        user-select: none;
        cursor: pointer;
        border-radius: 6px;
    }

    tool-item:hover {
        background-color: gray;
    }


</style>
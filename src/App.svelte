<script lang="ts">
    import CheckFormEditor from "./lib/CheckFormEditor.svelte";
    import type { CheckSheet, CheckSheetSettings } from "./lib/checkSheetObject";


    const sheet: CheckSheetSettings = {
      items: [

        {
          id: "test1",
          type: "text",
          text: "test",
          isRequired: false,
        },

        {
          id: "test2",
          type: "text",
          text: "test2",
          isRequired: false,
        },

        {
          id: "test3",
          parentId: "test2",
          type: "input",
          text: "test2",
          isRequired: false,
        },

        {
          id: "c1",
          parentId: "test1",
          type: "checkbox",
          text: "test2",
          isRequired: false,
        },

        {
          id: "c2",
          parentId: "test1",
          type: "checkbox",
          text: "test2",
          isRequired: false,
        },

        {
          id: "c3",
          parentId: "test1",
          type: "checkbox",
          text: "test2",
          isRequired: false,
        },

        {
          id: "r1",
          parentId: "test1",
          type: "radio",
          text: "test2",
          isRequired: false,
        },

        {
          id: "r2",
          parentId: "test1",
          type: "radio",
          text: "test2",
          isRequired: false,
        },

        {
          id: "r3",
          parentId: "test1",
          type: "radio",
          text: "test2",
          isRequired: false,
        }


      ]
    };

    const sheetValues: CheckSheet = { 
      values: sheet.items.map(item => (
        {
          id: crypto.randomUUID(), 
          itemId: item.id,
          type: item.type,
          value: "",
        }))
    };

</script>

<main>
  <div class="wh">
    <CheckFormEditor sheetValue={sheetValues} checkSheetSetting={sheet}></CheckFormEditor>
  </div>
</main>

<style>

  .wh {
    width: 100vw;
    height: 100vh;
  }

</style>
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
          subItems: [ "チェック1", "チェック2", "チェック3" ],
          type: "checklist",
          text: "test2",
          isRequired: false,
        },

        {
          id: "c1-1",
          parentId: "c1",
          type: "input",
          text: "こんばんは",
          isRequired: false,
        },

        {
          id: "r1",
          parentId: "test1",
          subItems: [ "チェック1", "チェック2", "チェック3" ],
          type: "radio",
          text: "test2",
          isRequired: true,
        },

        {
          id: "test4",
          // parentId: "test2",
          type: "input",
          text: "こんにちは",
          isRequired: false,
        },

        {
          id: "r100",
          parentId: "test1",
          subItems: [ "チェック1"],
          type: "checklist",
          text: "一戸だけ",
          isRequired: true,
        },

        {
          id: "r100-100",
          parentId: "r100",
          type: "input",
          text: "こんにちはテスト",
          isRequired: false,
        },
       
        {
          id: "r100-100-100",
          parentId: "r100-100",
          subItems: [ "チェック1"],
          type: "checklist",
          text: "一戸だけ",
          isRequired: true,
        },

        {
          id: "r100-100-100-100",
          parentId: "r100-100-100",
          subItems: [ "チェック1"],
          type: "checklist",
          text: "一戸だけ",
          isRequired: true,
        },

        {
          id: "r23",
          parentId: "test4",
          subItems: [ "チェック1", "チェック2", "チェック3" ],
          type: "radio",
          text: "test2",
          isRequired: true,
        },


      ]
    };

    const sheetValues: CheckSheet = { 
      items: { },
    };

    // const sheetValues: CheckSheet = { 
    //   values: sheet.items.map(item => (
    //     {
    //       id: crypto.randomUUID(), 
    //       itemId: item.id,
    //       type: item.type,
    //       value: item.type == "" [],
    //     }))
    // };

    

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
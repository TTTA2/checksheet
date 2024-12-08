<script lang="ts">
	import CheckFormEditor from "./lib/checkForm/features/CheckFormEditor.svelte";
    import type { CheckSheetItem, CheckSheetSettings, CheckSheetValue } from "./lib/checkForm/types/types";

	let items: CheckSheetItem[] = [
		{
			id: "test1",
			type: "text",
			text: "test",
			isRequired: false,
		},

		{
			id: "container1",
			type: "container",
			text: "チェックボックスリスト",
			isRequired: true,
		},

		{
			id: "container1_checkbox1",
			type: "checkbox",
			parentSubItemId: "container1",
			text: "チェックボックス1",
			isRequired: false,
		},

		{
			id: "container1_checkbox2",
			type: "checkbox",
			parentSubItemId: "container1",
			text: "チェックボックス2",
			isRequired: false,
		},

		{
			id: "container1_checkbox3",
			type: "checkbox",
			parentSubItemId: "container1",
			text: "チェックボックス3",
			isRequired: false,
		},

		{
			id: "container1_radio1",
			type: "radio",
			parentSubItemId: "container1",
			text: "ラジオ1",
			isRequired: false,
		},

		{
			id: "container1_radio2",
			type: "radio",
			parentSubItemId: "container1",
			text: "ラジオ2",
			isRequired: false,
		},

		{
			id: "container1_input",
			type: "input",
			parentId: "container1",
			// parentSubItemId: "container1",
			text: "テキスト入力可能",
			isRequired: false,
		},

		{
			id: "container1_checkbox1_input1",
			type: "input",
			parentId: "container1_checkbox1",
			text: "テキスト1",
			isRequired: true,
		},

		{
			id: "container1_checkbox1_input1_input1",
			type: "radio",
			parentSubItemId: "container1_checkbox1_input1",
			// parentId: "container1_checkbox1_input1",
			// parentSubItemId: "container1",
			text: "テキスト2",
			isRequired: false,
		},

		{
			id: "container1_checkbox1_input1_input2",
			type: "radio",
			parentSubItemId: "container1_checkbox1_input1",
			// parentId: "container1_checkbox1_input1",
			// parentSubItemId: "container1",
			text: "テキスト3",
			isRequired: false,
		},

		{
			id: "checkbox1",
			type: "checkbox",
			// parentSubItemId: "container1",
			text: "チェックボックスリスト",
			isRequired: false,
		},

		{
			id: "checkbox1_input1",
			type: "input",
			parentId: "checkbox1",
			// parentSubItemId: "container1",
			text: "入力欄",
			isRequired: false,
		},

		{
			id: "container2",
			type: "container",
			parentId: "container1_checkbox2",
			text: "チェックボックスリスト2",
			isRequired: true,
		},

		{
			id: "container2_checkbox1",
			type: "checkbox",
			parentSubItemId: "container2",
			text: "チェックボックス2_1",
			isRequired: false,
		},

		{
			id: "checkbox2_checkbox1_input1",
			type: "input",
			parentId: "container2_checkbox1",
			// parentSubItemId: "container1",
			text: "入力欄",
			isRequired: false,
		},
	];

	// const sheet: CheckSheetSettings = {
	// 	items: new CheckSheetItemCollection(
	// 		items.map((item) => [item.id, item]),
	// 	),
	// };

	let sheet: CheckSheetSettings = $state({items});

	const sheetValues: CheckSheetValue = {};

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
		<CheckFormEditor sheetValue={sheetValues} bind:checkSheetSetting={sheet}></CheckFormEditor>
	</div>
</main>

<style>
	.wh {
		width: 100vw;
		height: 100vh;
	}
</style>

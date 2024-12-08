<script lang="ts">
	import CheckFormEditor from "./lib/checkForm/features/editor/CheckFormEditor.svelte";
    import type { CheckSheetItem, CheckSheetSettings, CheckSheetValue } from "./lib/checkForm/types/types";

	let items: CheckSheetItem[] = [
		{
			id: "test1",
			type: "label",
			name: "test",
			isRequired: false,
			nodeType: "child",
		},

		{
			id: "test1_checkbox1",
			type: "checkbox",
			// parentId: "test1",
			nodeType: "child",
			name: "チェックボックス1",
			isRequired: false,
		},

		{
			id: "test1_checkbox2",
			type: "checkbox",
			// parentId: "test1",
			nodeType: "child",
			name: "チェックボックス2",
			isRequired: false,
		},

		{
			id: "test1_checkbox3",
			type: "textbox",
			placeHolder: "テストですよー",
			parentId: "test1_checkbox2",
			nodeType: "child",
			name: "チェックボックス3",
			isRequired: false,
		},

		{
			id: "test1_container1",
			type: "container",
			// parentId: "test1",
			nodeType: "child",
			name: "コンテナ",
			isHiddenCaption: true,
			isRequired: false,
		},

		{
			id: "c1_checkbox1",
			type: "checkbox",
			parentId: "test1_container1",
			nodeType: "subItem",
			name: "チェックボックスC1",
			isRequired: true,
		},

		{
			id: "c1_checkbox2",
			type: "checkbox",
			parentId: "test1_container1",
			nodeType: "subItem",
			name: "チェックボックスC2",
			isRequired: false,
		},

		{
			id: "c1_childInput1",
			type: "textarea",
			placeHolder: "テストですよー",
			parentId: "c1_checkbox2",
			nodeType: "child",
			name: "入力欄",
			isRequired: false,
		},

		{
			id: "test1_container2",
			type: "container",
			// parentId: "test1",
			nodeType: "child",
			name: "コンテナ2",
			isRequired: true,
		},

		{
			id: "c2_checkbox1",
			type: "checkbox",
			parentId: "test1_container2",
			nodeType: "subItem",
			name: "チェックボックスC21",
			isRequired: false,
		},

		{
			id: "c2_checkbox2",
			type: "checkbox",
			parentId: "test1_container2",
			nodeType: "subItem",
			name: "チェックボックスC22",
			isRequired: false,
		},

		{
			id: "c2_childInput1",
			type: "textbox",
			parentId: "c2_checkbox2",
			nodeType: "child",
			name: "入力欄",
			isRequired: false,
		},

		{
			id: "c2_radio1",
			type: "radioButton",
			parentId: "test1_container2",
			nodeType: "child",
			name: "ラジオ1",
			isRequired: false,
		},

		{
			id: "c2_radio2",
			type: "radioButton",
			parentId: "test1_container2",
			nodeType: "child",
			name: "ラジオ2",
			isRequired: false,
		},

		// {
		// 	id: "container1",
		// 	type: "container",
		// 	text: "チェックボックスリスト",
		// 	isRequired: true,
		// 	nodeType: "child",
		// },

		// {
		// 	id: "container1_checkbox1",
		// 	type: "checkbox",
		// 	parentId: "container1",
		// 	nodeType: "subItem",
		// 	text: "チェックボックス1",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_checkbox2",
		// 	type: "checkbox",
		// 	parentId: "container1",
		// 	nodeType: "subItem",
		// 	text: "チェックボックス2",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_checkbox3",
		// 	type: "checkbox",
		// 	parentId: "container1",
		// 	nodeType: "subItem",
		// 	text: "チェックボックス3",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_radio1",
		// 	type: "radio",
		// 	parentId: "container1",
		// 	nodeType: "subItem",
		// 	text: "ラジオ1",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_radio2",
		// 	type: "radio",
		// 	parentId: "container1",
		// 	nodeType: "subItem",
		// 	text: "ラジオ2",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_input",
		// 	type: "input",
		// 	parentId: "container1",
		// 	nodeType: "child",
		// 	// parentSubItemId: "container1",
		// 	text: "テキスト入力可能",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_checkbox1_input1",
		// 	type: "input",
		// 	parentId: "container1_checkbox1",
		// 	nodeType: "child",
		// 	text: "テキスト1",
		// 	isRequired: true,
		// },

		// {
		// 	id: "container1_checkbox1_input1_input1",
		// 	type: "radio",
		// 	parentId: "container1_checkbox1_input1",
		// 	nodeType: "subItem",
		// 	// parentId: "container1_checkbox1_input1",
		// 	// parentSubItemId: "container1",
		// 	text: "テキスト2",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container1_checkbox1_input1_input2",
		// 	type: "radio",
		// 	parentId: "container1_checkbox1_input1",
		// 	nodeType: "subItem",	
		// 	// parentId: "container1_checkbox1_input1",
		// 	// parentSubItemId: "container1",
		// 	text: "テキスト3",
		// 	isRequired: false,
		// },

		// {
		// 	id: "checkbox1",
		// 	type: "checkbox",
		// 	parentId: "container1",
		// 	nodeType: "subItem",	
		// 	text: "チェックボックスリスト",
		// 	isRequired: false,
		// },

		// {
		// 	id: "checkbox1_input1",
		// 	type: "input",
		// 	parentId: "checkbox1",
		// 	nodeType: "subItem",	
		// 	text: "入力欄",
		// 	isRequired: false,
		// },

		// {
		// 	id: "container2",
		// 	type: "container",
		// 	parentId: "container1_checkbox2",
		// 	nodeType: "child",	
		// 	text: "チェックボックスリスト2",
		// 	isRequired: true,
		// },

		// {
		// 	id: "container2_checkbox1",
		// 	type: "checkbox",
		// 	parentId: "container2",
		// 	nodeType: "subItem",	
		// 	text: "チェックボックス2_1",
		// 	isRequired: false,
		// },

		// {
		// 	id: "checkbox2_checkbox1_input1",
		// 	type: "input",
		// 	parentId: "container2_checkbox1",
		// 	nodeType: "child",
		// 	// parentSubItemId: "container1",
		// 	text: "入力欄",
		// 	isRequired: false,
		// },
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

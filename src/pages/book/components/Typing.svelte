<script lang="ts">
  import Toolbar from "carbon-components-svelte/src/DataTable/Toolbar.svelte";
  import DataTable from "carbon-components-svelte/src/DataTable/DataTable.svelte";
  import ToolbarContent from "carbon-components-svelte/src/DataTable/ToolbarContent.svelte";
  import ToolbarSearch from "carbon-components-svelte/src/DataTable/ToolbarSearch.svelte";
  import ToolbarMenu from "carbon-components-svelte/src/DataTable/ToolbarMenu.svelte";
  import ToolbarMenuItem from "carbon-components-svelte/src/DataTable/ToolbarMenuItem.svelte";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import { typings } from "src/db/storeTyping";
  import { TypingInterface } from "src/schema/typing/typing.interface";
  import ToolbarBatchActions from "carbon-components-svelte/src/DataTable/ToolbarBatchActions.svelte";
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import { Save16 } from "carbon-icons-svelte";

  const headerConfig = [
    { key: "date", value: "日期" },
    { key: "typingSpeed", value: "打字速度" },
    { key: "typingNum", value: "码字数量" },
    { key: "chapters", value: "写作章节" },
  ];
  let rows:TypingInterface [] = []
  $: {
    if($typings.length) {
    console.log($typings)
    rows  = $typings
  }
  }
  type CellType =  {
    key: string,
    value: string
  }

</script>

<DataTable
  zebra
  title="每日记录"
  description="保持努力，你每天的记录都会在这里。"
  headers={headerConfig}
  {rows}>
  <Toolbar>
    <ToolbarBatchActions>
      <Button icon={Save16}>导出</Button>
    </ToolbarBatchActions>
    <ToolbarContent>
      <ToolbarSearch />
      <ToolbarMenu>
        <ToolbarMenuItem primaryFocus>刷新</ToolbarMenuItem>
        <ToolbarMenuItem danger>清空数据</ToolbarMenuItem>
      </ToolbarMenu>
      <Button>导出数据</Button>
    </ToolbarContent>
  </Toolbar>
  <svelte:fragment slot="cell" let:cell>
    {#if cell.key === "chapters"}
      {#each cell.value as value}
      <Tag >{value}</Tag>
      {/each}
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
</DataTable>

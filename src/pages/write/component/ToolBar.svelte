<script lang="ts">
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import AlignBoxMiddleCenter16 from "carbon-icons-svelte/lib/AlignBoxMiddleCenter16";
  import Save16 from "carbon-icons-svelte/lib/Save16";
  import { saveChapterShortCutFn, searchShortCutFn } from "src/shortcut";
  import { onDestroy } from "svelte";
  import Select from "carbon-components-svelte/src/Select/Select.svelte";
  import SelectItem from "carbon-components-svelte/src/Select/SelectItem.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Tile from "carbon-components-svelte/src/Tile/Tile.svelte";
  import { settings } from "src/db/storeSettings";

  export let searchShow: boolean;
  export let saveEdiotrManualFn: (e: MouseEvent) => any;
  export let cleanTrimButttonFn: (e: MouseEvent) => any;
  let cmdS = saveChapterShortCutFn(saveEdiotrManualFn);
  let cmdF = searchShortCutFn(() => (searchShow = true));
  const LISTPX = Array.from({ length: 10 }).map((v, k) => k + 13 + "px");
  console.log(LISTPX);
  const changeFontSizeFn = e => {
    console.log($settings.fontSize);
    $settings.fontSize = e.detail;
    const element: HTMLElement = document.querySelector("#editorjs");
    element.style.fontSize = e.detail;
  };
  onDestroy(() => {
    cmdS.remove();
    cmdF.remove();
    // cmdN.remove();
  });

</script>

<Tile light class="writetoolBar">
  <Row>
    <Button
      icon={AlignBoxMiddleCenter16}
      size="small"
      kind="ghost"
      on:click={cleanTrimButttonFn}
      iconDescription="自动排版「⌘ N」" />
    <Button
      icon={Save16}
      size="small"
      kind="ghost"
      on:click={saveEdiotrManualFn}
      iconDescription="保存「⌘ S」" />
    <Button
      icon={Search16}
      size="small"
      kind="ghost"
      on:click={() => (searchShow = !searchShow)}
      iconDescription="搜索替换「⌘ F」" />

    <Select
      inline
      labelText=""
      selected={$settings.fontSize}
      on:change={changeFontSizeFn}>
      {#each LISTPX as font}
        <SelectItem value={font} text={font} />
      {/each}
    </Select>
  </Row>
</Tile>

<style>
</style>

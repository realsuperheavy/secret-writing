<script lang="ts">
  import { projects } from "./../db/storeProjects";
  import { fade } from "svelte/transition";
  import WordComponent from "./Export/ExportDialog.svelte";
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";
  import { state } from "src/db/storeState";
  import { get } from "svelte/store";
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { ProjectClass } from "src/schema/project/project.class";
  import Export from "./Export/RTF/collectData";
  import { saveFile } from "src/bridge";
  let showTextModal = false;
  let showWordModal = false;
  let showRTFModal = false;

  let currentProject: ProjectInterface = new ProjectClass();
  const downloadFn = async (fileName: string) => {
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchData();
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    const file = await saveFile(blob, fileName);
    return file.download();
  };
  $: {
    if ($projects.length && $state.currentProject) {
      currentProject = get(projects).find(
        (project: ProjectInterface) => project.id === $state.currentProject
      );
    }
  }

</script>

<WordComponent
  title="Text：最轻便的文件格式"
  bind:show={showTextModal}
  fileName={`${currentProject.title}.txt`}
  downloadFn={() => downloadFn(`${currentProject.title}.txt`)} />
<WordComponent
  title="Word：最常用的文件格式"
  fileName={`${currentProject.title}.doc`}
  downloadFn={() => downloadFn(`${currentProject.title}.doc`)}
  bind:show={showWordModal} />
<WordComponent
  fileName={`${currentProject.title}.rtf`}
  title="多文本格式。这是一种类似DOC格式（Word文档）的文件，有很好的兼容性，使用Windows“附件”中的“写字板”就能打开并进行编辑。RTF是一种非常流行的文件结构,很多文字编辑器都支持它。一般的格式设置,比如字体和段落设置,页面设置等等信息都可以存在RTF格式中,它能在一定程度上实现word与wps文件之间的互访"
  bind:show={showRTFModal}
  downloadFn={() => downloadFn(`${currentProject.title}.rtf`)} />
<div class="export" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <!-- <ClickableTile on:click={() => (showTextModal = !showTextModal)}>
      Text：最轻便的文件格式
    </ClickableTile>
    <br /> -->
    <ClickableTile on:click={() => (showWordModal = !showWordModal)}>
      Word：最常用的文件格式
    </ClickableTile>
    <br />
    <ClickableTile on:click={() => (showRTFModal = !showRTFModal)}>
      RTF：富文本格式
    </ClickableTile>
  {/if}
</div>

<style>
  .export {
    margin: auto;
    max-width: 800px;
  }

</style>

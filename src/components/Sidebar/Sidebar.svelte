<script lang="ts">
  import { ProjectInterface } from "src/schema/project/project.interface";
  import { projects } from "src/db/storeProjects";
  import { scenes } from "src/db/storeScenes";
  import { chapters } from "src/db/storeChapters";
  import { state } from "src/db/storeState";
  import { _ } from "svelte-i18n";
  import SideNav from "carbon-components-svelte/src/UIShell/SideNav/SideNav.svelte";
  import SideNavItems from "carbon-components-svelte/src/UIShell/SideNav/SideNavItems.svelte";
  import SideNavMenu from "carbon-components-svelte/src/UIShell/SideNav/SideNavMenu.svelte";
  import SideNavLink from "carbon-components-svelte/src/UIShell/SideNav/SideNavLink.svelte";
  import SideNavDivider from "carbon-components-svelte/src/UIShell/SideNavDivider.svelte";
  import Fade16 from "carbon-icons-svelte/lib/Fade16";
  import AddAlt20 from "carbon-icons-svelte/lib/AddAlt20";
  import CreateChapter from "./component/CreateChapter.svelte";
  import CreateScene from "./component/CreateScene.svelte";
  import EditChapter from "./component/EditChapter.svelte";
  import EditScene from "./component/EditScene.svelte";
  import EditProject from "./component/EditProject.svelte";
  import AlignBoxBottomCenter16 from "carbon-icons-svelte/lib/AlignBoxBottomCenter16";
  import AddAlt16 from "carbon-icons-svelte/lib/AddAlt16";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import nzhcn from "nzh/cn";
  import { ProjectClass } from "src/schema/project/project.class";
  import { get } from "svelte/store";
  import ArrowLeft16 from "carbon-icons-svelte/lib/ArrowLeft16";
  import { push } from "svelte-spa-router";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  import SceneContextMenu from "./component/SceneContextMenu.svelte";

  let targetElements: HTMLElement[];
  let currentScene: SceneInterface = undefined;
  $: {
    if ($chapters.length && $scenes.length) {
      targetElements = Array.from(
        document.querySelectorAll(".rightMenuElement")
      );
    }
  }

  let nextSceneTitle: string = "";
  let book: ProjectInterface = new ProjectClass();
  $: {
    if ($projects.length && $state.currentProject) {
      book = get(projects).filter(
        (cur: ProjectInterface) => cur.id === $state.currentProject
      )[0];
    }
  }

  const modals = {
    reArrange: false,
    createChapter: false,
    editProject: false,
    createScene: {
      show: false,
      chapter: "",
    },
    editChapter: {
      show: false,
      data: {},
    },
    editScene: {
      show: false,
      data: {},
    },
  };

  const routerLinkFn = sceneId => {
    state.setCurrentScene(sceneId);
    push("#/book/write/" + sceneId);
  };
  const createScene = chapterId => {
    const currentScenes = get(scenes).filter(
      (cur: SceneInterface) => cur.chapter === chapterId
    );
    nextSceneTitle = `第${nzhcn.encodeS(currentScenes.length + 1)}章：`;
    modals.createScene.chapter = chapterId;
    modals.createScene.show = true;
  };
  const editChapterFn = chapter => {
    modals.editChapter.data = chapter;
    modals.editChapter.show = true;
  };

  const editScene = event => {
    modals.editScene.data = event.detail;
    modals.editScene.show = true;
  };
  const deleteFn = e => {
    let confirmed = confirm("请确认删除?");
    if (confirmed == true) {
      scenes.removeScene(currentScene.id);
      if ($state.currentScene === currentScene.id) {
        push("/book");
      }
    }
  };

</script>

{#if $state.currentProject}
  <SceneContextMenu {targetElements} {deleteFn} editFn={editScene} />
  <EditProject {book} bind:show={modals.editProject} />
  <CreateChapter bind:show={modals.createChapter} />
  <CreateScene
    projectId={$state.currentProject}
    chapterId={modals.createScene.chapter}
    title={nextSceneTitle}
    bind:show={modals.createScene.show} />
  <EditChapter
    bind:show={modals.editChapter.show}
    bind:data={modals.editChapter.data} />
  <EditScene bind:show={modals.editScene.show} {currentScene} />
  <SideNav isOpen={true}>
    <SideNavItems>
      {#each $chapters
        .filter(chapter => chapter.project == $state.currentProject)
        .sort((a, b) => a.order - b.order) as chapter, chapterIndex}
        <SideNavMenu icon={Fade16} text={chapter.title}>
          <SideNavLink
            icon={AddAlt20}
            on:click={() => createScene(chapter.id)}
            text={$_('sidebar.createScene')} />
          <SideNavLink
            icon={Edit16}
            on:click={() => editChapterFn(chapter)}
            text={$_('sidebar.editChapter')} />

          {#each $scenes
            .filter(scene => scene.chapter == chapter.id)
            .sort((a, b) => a.order - b.order) as scene, sceneIndex}
            <div
              on:mouseleave={() => {
                scenes.setSceneshoeEdit(scene.id, false);
              }}
              on:mouseenter={() => {
                scenes.setSceneshoeEdit(scene.id, true);
              }}>
              <SideNavDivider />
              <div
                class="rightMenuElement"
                data-value={scene.id}
                data-chapterIndex={chapterIndex}
                data-sceneIndex={sceneIndex}
                on:click={() => routerLinkFn(scene.id)}
                on:contextmenu={() => {
                  currentScene = scene;
                }}>
                <SideNavLink
                  on:click={() => routerLinkFn(scene.id)}
                  icon={AlignBoxBottomCenter16}
                  text={scene.title}
                  class="sideNavMenuItem" />
              </div>
            </div>
          {/each}
        </SideNavMenu>
      {/each}

      {#if $state.currentProject}
        <SideNavDivider />
        <SideNavLink
          icon={AddAlt16}
          on:click={() => (modals.createChapter = true)}
          text={$_('sidebar.createChapter')} />
        <div>
          <SideNavLink
            icon={ArrowLeft16}
            on:click={() => push('/')}
            text="退出" />
        </div>
      {:else}
        <SideNavLink text="没有创建小说" />
      {/if}
    </SideNavItems>
  </SideNav>
{/if}

<script lang="ts">
  import Line from "../svg/line.svelte";
  import { isSideNavOpen } from "src/store";
  import { push } from "svelte-spa-router";
  import {
    closeWindow,
    resizeWindow,
    minimizeWindow,
    isRunningElectron,
  } from "src/bridge";
  import { _ } from "svelte-i18n";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Maximize16 from "carbon-icons-svelte/lib/Maximize16";
  import Minimize16 from "carbon-icons-svelte/lib/Minimize16";
  import Warning16 from "carbon-icons-svelte/lib/Warning16";
  import Header from "carbon-components-svelte/src/UIShell/GlobalHeader/Header.svelte";
  import HeaderNav from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderNav.svelte";
  import HeaderNavItem from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderNavItem.svelte";
  import HeaderUtilities from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderUtilities.svelte";
  import HeaderPanelDivider from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderPanelDivider.svelte";
  import HeaderGlobalAction from "carbon-components-svelte/src/UIShell/HeaderGlobalAction.svelte";
  import HeaderPanelLink from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderPanelLink.svelte";
  import HeaderPanelLinks from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderPanelLinks.svelte";
  import HeaderAction from "carbon-components-svelte/src/UIShell/GlobalHeader/HeaderAction.svelte";
  import SkipToContent from "carbon-components-svelte/src/UIShell/SkipToContent.svelte";
  import Menu16 from "carbon-icons-svelte/lib/Menu16";
  import Support from "../../shared/Support.svelte";
  import ArrowLeft16 from "carbon-icons-svelte/lib/ArrowLeft16";
  import { formatDistance } from "src/utils";
  let navigationState = false;
  let sceneData = [];
  let showSupport: boolean = false;

</script>

<Support show={showSupport} />
<Header
  company="小密圈"
  style="-webkit-app-region:  no-drag"
  bind:isSideNavOpen={$isSideNavOpen}>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderNav style="-webkit-app-region: no-drag">
    <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book')}
      text="概览" />
    <HeaderNavItem on:click={() => push('/book/cards/')} text="角色" />
    <!-- <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book/export/')}
      text="大纲" />
    <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book/export/')}
      text="地图" />
    <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book/export/')}
      text="时间线" /> -->
    <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book/settings/')}
      text={$_('header.settings.title')} />
    <HeaderNavItem
      style="-webkit-app-region: no-drag"
      on:click={() => push('/book/export/')}
      text={$_('header.export.title')} />
  </HeaderNav>
  <HeaderUtilities style="-webkit-app-region: no-drag">
    <HeaderAction
      style="-webkit-app-region: no-drag"
      bind:isOpen={navigationState}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>最近打开</HeaderPanelDivider>
        {#each sceneData as scene}
          <HeaderPanelLink on:click={() => push('/write/' + scene.id)}>
            {scene.title}-{formatDistance(scene.lastEdit)}
          </HeaderPanelLink>
          <br />
        {:else}
          <!-- <Placeholder>{$_('write.overview.placeholder')}</Placeholder> -->
        {/each}
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderGlobalAction
      aria-label="帮助"
      style="-webkit-app-region: no-drag"
      on:click={() => (showSupport = true)}
      icon={Warning16} />
    {#if isRunningElectron}
      <HeaderGlobalAction
        aria-label="最小化窗口"
        style="-webkit-app-region: no-drag"
        on:click={minimizeWindow}
        icon={Line} />
      <HeaderGlobalAction
        aria-label="最大化"
        style="-webkit-app-region: no-drag"
        on:click={resizeWindow}
        icon={Maximize16}
        closeIcon={Minimize16} />
      <HeaderGlobalAction
        aria-label="关闭"
        style="-webkit-app-region: no-drag"
        on:click={closeWindow}
        icon={Close16} />
    {/if}
  </HeaderUtilities>
</Header>

<!--<style global>
  header {
    -webkit-app-region: drag;
  }
  .bx--header__action.bx--header__menu-trigger.bx--header__menu-toggle {
    -webkit-app-region: no-drag;
  }

</style>-->

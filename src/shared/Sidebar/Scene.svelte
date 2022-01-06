<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { fly } from "svelte/transition";
  import { push } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import tippy from "sveltejs-tippy";
  import nzhcn from "nzh/cn";
  import Tag from "carbon-components-svelte/src/Tag/Tag.svelte";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import { countWordsFn } from "./../../tools/count-words";
  export let scene;
  export let index;

  const dispatch = createEventDispatcher();
  const edit = () => {
    dispatch("edit", scene);
  };

</script>

<li
  use:active={'/write/' + scene.id}
  in:fly={{ y: -50, duration: 1000 }}
  out:fly={{ y: -50, duration: 1000 }}
  on:click|self={() => push('/write/' + scene.id)}>
  <span>第{nzhcn.encodeS(index + 1)}章：</span>
  <a href="#/write/{scene.id}">{scene.title}</a>
  <span
    class="action"
    use:tippy={{ content: $_('sidebar.editScene'), placement: 'right' }}
    on:click={edit}>
    <Edit16 />
  </span>
  <span class="test">
    <Tag>{countWordsFn(scene)}</Tag>
  </span>
</li>

<style lang="scss">
  @import "../../css/mixins/devices";

  li {
    padding: 0.5rem 0 0.5rem 2rem;
    word-break: break-word;
    line-height: 1.5rem;

    a,
    span {
      text-decoration: none;
      opacity: 0.65;
    }

    .action {
      visibility: visible;
      float: right;
      margin-right: 1em;
      opacity: 0.65;
      line-height: 2.5rem;
      transition: transform 0.2s;

      @include desktop {
        visibility: hidden;
        &:hover {
          transform: scale(1.25);
          opacity: 1;
        }
      }
    }

    &:hover {
      background-color: var(--menu-hover);

      a {
        opacity: 1;
      }

      @include desktop {
        .action {
          visibility: visible;
        }
      }
    }
  }
  :global(li.active) {
    background-color: var(--menu-active);

    a {
      opacity: 1;
    }
  }

</style>

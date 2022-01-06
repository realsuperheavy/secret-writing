<script lang="ts">
  import AddAlt32 from "carbon-icons-svelte/lib/AddAlt32";
  import ClickableTile from "carbon-components-svelte/src/Tile/ClickableTile.svelte";

</script>

<ClickableTile class="card-book" on:click>
  <AddAlt32 size={450} />
  <span>新建小说</span>
</ClickableTile>

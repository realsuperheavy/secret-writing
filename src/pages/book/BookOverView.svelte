<script lang="ts">
  import { chapters } from "src/db/storeChapters";
  import { roles } from "src/db/storeRoles";
  import { scenes } from "src/db/storeScenes";
  import { state } from "src/db/storeState";
  import RoleInterface from "src/schema/role/role.interface";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  import Introduce from "./components/Introduce.svelte";
  import Typing from "./components/Typing.svelte";

  let wordsNum: number = 0;
  let scenesNum: number = 0;
  let rolesNum: number = 0;
  $: {
    if (
      $roles.length &&
      $state.currentProject &&
      $chapters.length &&
      $scenes.length
    ) {
      rolesNum = $roles.filter(
        (role: RoleInterface) => role.project === $state.currentProject
      ).length;
      scenesNum = $scenes.filter(
        (scene: SceneInterface) => scene.project === $state.currentProject
      ).length;
      wordsNum = (() => {
        let num = 0;
        $scenes
          .filter(
            (scene: SceneInterface) => scene.project === $state.currentProject
          )
          .map((scene: SceneInterface) => {
            scene.content.blocks.map(block => {
              if (block.type === "paragraph") {
                num += block.data.text.length;
              }
            });
          });
        return num;
      })();
    }
  }

</script>

<Introduce {wordsNum} {scenesNum} {rolesNum} />
<br />
<br />
<Typing />

<script lang="ts">
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import TextArea from "carbon-components-svelte/src/TextArea/TextArea.svelte";
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Toggle from "carbon-components-svelte/src/Toggle/Toggle.svelte";
  import RoleInterface from "../../../schema/role/role.interface";
  import InputTag from "./../../../components/Forms/InputTag.svelte";
  export let showCreateCard: boolean;
  export let role: RoleInterface;
  export let createCard;
  export let modalHeading: string;
  export let primaryButtonText: string;
  let aliasInputValue = "";
  let imageInputValue = "";
  let identityInputValue = "";
  let relationshipsInputValue = "";

</script>

<Modal
  size="xl"
  bind:open={showCreateCard}
  {modalHeading}
  {primaryButtonText}
  primaryButtonDisabled={role.name.length === 0}
  secondaryButtonText="取消"
  iconDescription="关闭对话框"
  on:click:button--primary={createCard}
  on:click:button--secondary={() => (showCreateCard = false)}
  on:open={() => console.log('apen')}
  on:close={() => (showCreateCard = false)}>
  <Form>
    <FormGroup>
      <TextInput
        size="xl"
        autofocus
        labelText="人物名称"
        placeholder="请输入人物名称"
        helperText="人物的姓名"
        bind:value={role.name} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={aliasInputValue}
        bind:alias={role.alias}
        props={{ size: 'xl', placeholder: '请添加人物别名', helperText: '人物在用到的所有称呼' }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={imageInputValue}
        bind:alias={role.image}
        props={{ size: 'xl', placeholder: '请添加人物形象', helperText: '人物在所有阶段的形象，比如前期纨绔；中期隐忍；后期心狠手辣' }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={identityInputValue}
        bind:alias={role.identity}
        props={{ size: 'xl', placeholder: '请添加人物身份', helperText: '人物在不同阶段所具有的社会地位' }} />
    </FormGroup>
    <FormGroup>
      <InputTag
        bind:value={relationshipsInputValue}
        bind:alias={role.relationships}
        props={{ size: 'xl', placeholder: '请输入人物关系', helperText: '与其他角色的关系' }} />
    </FormGroup>

    <FormGroup>
      <TextArea
        size="xl"
        labelText="人物的基本设定"
        placeholder="请输入人物的基本设定"
        bind:value={role.basicSettings} />
    </FormGroup>
    <FormGroup>
      <TextArea
        size="xl"
        labelText="人物的主要经历"
        placeholder="请输入人物的主要经历"
        bind:value={role.experience} />
    </FormGroup>
    <FormGroup>
      <Toggle
        labelText="人物卡片是否在章节中匹配展示"
        bind:toggled={role.showTip}
        labelA="关闭"
        labelB="打开" />
    </FormGroup>
  </Form>
</Modal>

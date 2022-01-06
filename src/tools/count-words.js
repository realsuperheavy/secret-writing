import { removeHTMLTag } from "./remove-htmltag";
export function countWordsFn(currentScene) {
  if (!currentScene || !currentScene.content) {
    return 0;
  }
  const blocks = currentScene.content.blocks;
  return blocks.reduce(
    (prev, curr) => prev + removeHTMLTag(curr.data.text).length,
    0
  );
}

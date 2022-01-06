import { get } from "svelte/store";
import { projects } from "src/db/storeProjects";
import { scenes } from "src/db/storeScenes";
import { chapters } from "src/db/storeChapters";
import { smartenText, toFileName } from "../../../utils";

const toRTF = text => {
  return text
    .replace(/([\\{}])/g, "\\$1") // escape RTF special characters
    .replace(/\u00A0/g, "\\~") // non-breaking space
    .replace(/\u00AD/g, "\\-") // optional hyphen
    .replace(/\u2011/g, "\\_") // non-breaking hyphen
    .replace(/[^ -~]/g, c => `\\u${c.charCodeAt()}?`) // escape unicode
    .replace(/<br\W*>/gi, "\\line ") // line breaks
    .replace(/<(i|em)>/gi, "\\i ") // italic
    .replace(/<\/(i|em)>/gi, "\\i0 ")
    .replace(/<(b|strong)>/gi, "\\b ") // bold
    .replace(/<\/(b|strong)>/gi, "\\b0 ")
    .replace(/<u>/gi, "\\ul ") // underline
    .replace(/<\/u>/gi, "\\ul0 ")
    .replace(/&gt;/g, ">") // unescape HTML special characters
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
};

export default class Export {
  constructor(id) {
    this.projectId = id;
  }
  async fetchData(type) {
    const blockMapper = currentBlock => {
      if (!currentBlock.data) return [];

      if (currentBlock.type === "paragraph") {
        return `{\\f0\\sb50\\sa50\\fi300\\sl276\\slmult1\\qj ${toRTF(
          smartenText(currentBlock.data.text)
        )}\\par}\n`;
      }
      if (currentBlock.type === "header") {
        return `{\\page\n\\f1\\sb300\\sa300\\qc\\fs40\\b ${toRTF(
          smartenText(currentBlock.data.text)
        )}\\par}`;
      }
    };

    const sceneMapper = (currentScene, index) => {
      return currentScene.content.blocks.flatMap(blockMapper).join("");
    };

    const chapterMapper = (currentChapter, index) => {
      return (
        `{\\f1\\fs70\\qc\\b\\scaps  \\line  \\line ${toRTF(
          smartenText(`${currentChapter.title}`)
        )}\\par}\n` +
        // `{\\f1\\fs60\\qc\\sa500\\b ${toRTF(currentChapter.title)}\\par}\n` +
        get(scenes)
          .filter(scene => scene.chapter == currentChapter.id && scene.content)
          .sort(this.compare)
          .map(sceneMapper)
          .join("{\\f1\\qc\\sb300\\sa300 * * *\\par}\n")
      );
    };

    const title = get(projects).find(e => e.id == this.projectId).title;
    const author = get(projects).find(e => e.id == this.projectId).author;
    const fonts =
      "{\\fonttbl{\\f0\\froman Times New Roman;}{\\f1\\fswiss Arial;}{\\f2\\fmodern Courier New;}}\n";
    const colors = "{\\colortbl;\\red160\\green160\\blue160;}\n";
    const frontpage = `{\\f1\\fs90\\qc\\b\\scaps  \\line  \\line ${toRTF(
      smartenText(`书名：${title}`)
    )}\\par} {\\f1\\fs50\\qc\\b\\scaps  \\line  \\line ${toRTF(
      smartenText(`作者：${author}`)
    )}\\par}\\page\n`;
    const contents = get(chapters)
      .filter(e => e.project == this.projectId)
      .sort(this.compare)
      .map(chapterMapper)
      .join("\\page\n");

    const document =
      "{\\rtf1\\ansi\\deff0\n" + fonts + colors + frontpage + contents + "}";

    return {
      document: document,
    };
  }

  compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}

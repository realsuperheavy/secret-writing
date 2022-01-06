import { TypingInterface } from "./typing.interface";
import { getRandomNumber } from "../../tools/getRandomNumber";
import moment from "moment";

export class TypingClass implements TypingInterface {
  id: string;
  date: string;
  typingSpeed: number;
  typingNum: number;
  chapters: string[];
  constructor(
    date: string = moment().format("YYYY-MM-DD"),
    typingSpeed: number = 0,
    typingNum: number = 0,
    chapters: string[] = ["第一章", "第二章", "第四章"]
  ) {
    this.id = getRandomNumber();
    this.date = date;
    this.typingSpeed = typingSpeed;
    this.typingNum = typingNum;
    this.chapters = chapters;
  }
}

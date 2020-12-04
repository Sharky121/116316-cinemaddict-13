import dayjs from "dayjs";
import {getRandomValueFromArray, getRandomText, getDate} from "../utils";
import {COMMENT_TEMPLATE, AUTHOR_COMMENT, EMOJI, Date} from "../const";

const getCommentDate = () => {
  const commentDate = getDate(Date.COMMENT_DATE_FROM, dayjs());
  const nowDate = dayjs();
  const diff = nowDate.diff(commentDate, `day`);

  if (diff > 0 && diff <= 7) {
    return `${diff} ago`;
  } else if (diff === 0) {
    return `Today`;
  }

  return commentDate;
};

export const generateNewComment = () => {
  return {
    text: getRandomText(COMMENT_TEMPLATE),
    emotion: getRandomValueFromArray(EMOJI),
    author: getRandomValueFromArray(AUTHOR_COMMENT),
    date: getCommentDate()
  };
};

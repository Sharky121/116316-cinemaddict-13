import {getRandomValueFromArray, getRandomText} from "../utils/common";
import {getCommentDate} from "../utils/date";

const COMMENT_TEMPLATE = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

const AUTHOR_COMMENT = [
  `Tim Macoveev`,
  `John Doe`,
  `Peter Rid`,
  `Michelle Whistle`,
  `Taylor Smith`,
  `Marco Felch`
];

const EMOJI = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

const COMMENT_DATE_FROM = `01.01.2020`;

export const generateNewComment = () => {
  return {
    text: getRandomText(COMMENT_TEMPLATE),
    emotion: getRandomValueFromArray(EMOJI),
    author: getRandomValueFromArray(AUTHOR_COMMENT),
    date: getCommentDate(COMMENT_DATE_FROM)
  };
};

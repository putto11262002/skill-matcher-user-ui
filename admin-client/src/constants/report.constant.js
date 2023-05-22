import { Chip } from "@mui/material";
import { upperCase } from "lodash";

export const REPORT_TABLE = [
  { index: 'category', transform: (c) => <Chip label={upperCase(c)}/> },
  { index: 'source', align: 'left' },
  { index: 'target' },
];
export const REPORT_PER_PAGE = 20;

export const REPORT_CATEGORY = {
    HARASSMENT: 'harassment',
    HATE_SPEECH: 'hate_speech',
    INAPPROPRIATE_CONTENT: 'inappropriate_content',
    SCAM: 'scam',
    BUG: 'bug',
    OTHER: 'other'
}


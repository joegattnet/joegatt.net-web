import { stripUnit } from "polished";
export const RATIO = 1.61803399;

export const BLACK = "#222";
export const GRAY = "#ccc";
export const BLUE = "#009";
export const CONTENT_COLUMNS_SPAN = 24;
export const DESKTOP_BREAKPOINT = "1300px";
export const FONT_SIZE = "18px";
export const PAGE_COLUMNS_SPAN = 36;
export const RED = "#900";
export const WHITE = "#FAFAFA";
export const YELLOW = "#FCA";
export const LINE_HEIGHT = "27px"; // approx: `${stripUnit(FONT_SIZE) * RATIO}px`

/* Derived */
export const ANNOTATIONS_FONT_SIZE = "14px";
export const ANNOTATIONS_LINE_HEIGHT = "22px";
export const CONTENT_COLUMNS_START =
  (PAGE_COLUMNS_SPAN - CONTENT_COLUMNS_SPAN) / 2 + 1;
export const FOOTER_LISTS_COLUMNS_SPAN = CONTENT_COLUMNS_SPAN / 3;
export const HALF_TAB_WIDTH = `${stripUnit(LINE_HEIGHT) / RATIO}px`;
export const LINE_HEIGHT_2 = `${stripUnit(LINE_HEIGHT) * 2}px`;
export const LINE_HEIGHT_3 = `${stripUnit(LINE_HEIGHT) * 3}px`;
export const LINE_HEIGHT_5 = `${stripUnit(LINE_HEIGHT) * 5}px`;
export const SANS_FONT_SIZE = `${stripUnit(FONT_SIZE) * 0.92}px`;
export const TAB_WIDTH = LINE_HEIGHT; // `${(stripUnit(LINE_HEIGHT) * 1) / RATIO}px`
export const TITLE_FONT_SIZE = `${stripUnit(FONT_SIZE) * RATIO}px`;
export const TITLE_LINE_HEIGHT = `${stripUnit(LINE_HEIGHT) * 2}px`;
export const QR_CODE_WIDTH = `${LINE_HEIGHT * 5}px`;

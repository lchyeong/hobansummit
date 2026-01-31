export type TimeWindow = {
  open?: string;
  hide?: string;
};

const normalizeTimeValue = (value?: string) => {
  if (!value) return null;
  const str = value.toString().padStart(10, '0');
  if (str.length !== 10) return null;
  return str;
};

export const parseTimeWindow = (value?: string) => {
  const str = normalizeTimeValue(value);
  if (!str) return null;
  const year = 2000 + Number(str.slice(0, 2));
  const month = Number(str.slice(2, 4)) - 1;
  const day = Number(str.slice(4, 6));
  const hour = Number(str.slice(6, 8));
  const minute = Number(str.slice(8, 10));
  return new Date(year, month, day, hour, minute);
};

export const isWithinTimeWindow = (window: TimeWindow, now = new Date()) => {
  const openTime = parseTimeWindow(window.open);
  if (!openTime) return true;
  const hideTime = parseTimeWindow(window.hide);
  return now >= openTime && (!hideTime || now < hideTime);
};

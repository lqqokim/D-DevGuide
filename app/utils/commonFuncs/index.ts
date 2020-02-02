export const isNew = (updateDate: number): boolean => {
  const standard = 1000 * 3600 * 24;
  // 7일 이내에 등록했을 경우 New 표시
  return (Date.now() - updateDate) / standard < 7;
};

export const dayDiff = (updateDate: number): number => {
  const standard = 1000 * 3600 * 24;
  return Math.floor((Date.now() - updateDate) / standard);
};

// dash
export const dateFormatDash = (date: number): string => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const dateFormat = (dt) => {
  const min = 60 * 1000;
  const c = new Date();
  const d = new Date(dt);
  // @ts-ignore
  const minsAgo = Math.floor((c - d) / min);

  const result = {
    raw:
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 > 9 ? '' : '0') +
      (d.getMonth() + 1) +
      '-' +
      (d.getDate() > 9 ? '' : '0') +
      d.getDate() +
      ' ' +
      (d.getHours() > 9 ? '' : '0') +
      d.getHours() +
      ':' +
      (d.getMinutes() > 9 ? '' : '0') +
      d.getMinutes() +
      ':' +
      (d.getSeconds() > 9 ? '' : '0') +
      d.getSeconds(),
    formatted: '',
  };

  if (minsAgo < 60) {
    // 1시간 내
    result.formatted = minsAgo + '분 전';

    if (minsAgo === 0) {
      result.formatted = '방금 전';
    }
  } else if (minsAgo < 60 * 24) {
    // 하루 내
    result.formatted = Math.floor(minsAgo / 60) + '시간 전';
  } else if (minsAgo < 60 * 60 * 24) {
    // 하루 이상
    result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';

    if (Math.floor(minsAgo / 60 / 24) > 7) {
      result.formatted = dateFormatDash(dt);
    }
  }

  return result.formatted;
};
export const convertCommentDateFormat = (date): string => {
  date = new Date(date);
  const year: string = date
    .getFullYear()
    .toString()
    .padStart(4, '0');

  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');

  const day: string = date
    .getDate()
    .toString()
    .padStart(2, '0');

  const hour: string = date
    .getHours()
    .toString()
    .padStart(2, '0');

  const minutes: string = date
    .getMinutes()
    .toString()
    .padStart(2, '0');

  const seconds: string = date
    .getSeconds()
    .toString()
    .padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minutes}`;
};

export const expandAll = (parent): void => {
  parent.option.expanded = true;
  if (parent.children) {
    parent.children.forEach((child) => {
      expandAll(child);
    });
  }
};

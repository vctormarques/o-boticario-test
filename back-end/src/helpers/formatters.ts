import { Transform } from 'class-transformer';

export const FormatDate = () => {
  return Transform(({ value }) => {
    if (!value) return value;
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  });
};

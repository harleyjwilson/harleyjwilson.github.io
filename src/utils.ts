export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {},
) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return date.toLocaleDateString("en-GB", mergedOptions);
};

export const formatDateShort = (date: Date) => {
  return formatDate(date, {
    month: "short",
    day: "2-digit",
  });
};

export const formatDateFull = (date: Date) => {
  return formatDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

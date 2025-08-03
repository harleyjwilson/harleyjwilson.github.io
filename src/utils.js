export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return date.toLocaleDateString("en-GB", mergedOptions);
};

export const formatDateShort = (date) => {
  return formatDate(date, {
    month: "short",
    day: "2-digit",
  });
};

export const formatDateFull = (date) => {
  return formatDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

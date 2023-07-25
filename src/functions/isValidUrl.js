// Check URL
const isValidUrl = (str) => {
  const regex =
    /^(?:(?:https?|ftp):\/\/)?(?:[a-zA-Z0-9@:%._\\+~#?&//=]*)(?:(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?)?$/;
  return regex.test(str);
};

module.exports = { isValidUrl };

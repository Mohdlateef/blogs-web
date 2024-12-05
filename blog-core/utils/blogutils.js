const blogDataValidation = (textbody,title) => {
  return new Promise((resolve, reject) => {
    if (!textbody) reject("textbody is missing");
    if (!title) reject("Missing title");

    resolve();
  });
};

module.exports = blogDataValidation;

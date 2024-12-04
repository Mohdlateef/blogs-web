const blogdatavalidation = (  textbody ) => {
  return new Promise((resolve, reject) => {
   

    if (!textbody) reject("textbody is missing");
  
  
    resolve();
  });
};

module.exports=blogdatavalidation;
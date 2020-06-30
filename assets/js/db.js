//offline data
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    console.log("persistence failed");
  } else if (err.code == "unimplemented") {
    console.log("persistence is not available");
  }
});

//real-time db listener
db.collection("recipes").onSnapshot((snapshot) => {
  console.log("kzit iere");
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    } else if (change.type === "removed") {
      //remove data from webpage
    }
  });
});

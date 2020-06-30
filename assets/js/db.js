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

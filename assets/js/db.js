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
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    } else if (change.type === "removed") {
      //remove data from webpage
    }
  });
});

//create new recipe
const form = document.querySelector('form.add-recipe');

form.addEventListener('submit', event =>{
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection('recipes').add(recipe)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
})
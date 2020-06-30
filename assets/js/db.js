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
      removeRecipe(change.doc.id);
    }
  });
});

//create new recipe
const form = document.querySelector("form.add-recipe");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  var file = form.fileToUpload.files[0];
  console.log(file);

  var storageRef = defaultStorage.ref();
  var imageRef = storageRef.child("images/" + file.name);

  var uploadTask = imageRef.put(file);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload " + progress + "% done");
    },
    function (error) {
      console.log(error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        const recipe = {
          title: form.title.value,
          ingredients: form.ingredients.value,
          picture: downloadURL,
        };

        db.collection("recipes")
          .add(recipe)
          .then(() => {
            form.title.value = "";
            form.ingredients.value = "";
            form.fileToUpload.value = "";
          })
          .catch((err) => console.log(err));
      });

      /**/
    }
  );
});

//delete a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});

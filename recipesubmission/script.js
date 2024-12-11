$(document).ready(function () {
  let step = 1;
  let currentIndex = 0;
  const totalImages = $(".slider-images img").length;
  const delay = 3000;
  let autoSlide;
  let recipies = [ //pre-defined recipe data.
    {
      name: "Chocolate Cake",
      category: "Dessert",
      ingredients: [
        { item: "flour", quantity: "200g" },
        { item: "sugar", quantity: "150g" },
        { item: "cocoa powder", quantity: "50g" },
        { item: "eggs", quantity: "2" },
        { item: "milk", quantity: "1 cup" },
        { item: "butter", quantity: "100g" },
      ],
      steps: [
        "Preheat the oven to 180°C (350°F).",
        "Mix flour, sugar, and cocoa powder in a bowl.",
        "Add eggs, milk, and melted butter. Stir until smooth.",
        "Pour the batter into a greased pan and bake for 25-30 minutes.",
        "Let it cool before serving.",
      ],
    },
    {
      name: "Spaghetti Aglio e Olio",
      category: "Main Course",
      ingredients: [
        { item: "spaghetti", quantity: "200g" },
        { item: "garlic", quantity: "4 cloves" },
        { item: "olive oil", quantity: "3 tbsp" },
        { item: "red pepper flakes", quantity: "1 tsp" },
        { item: "parsley", quantity: "1 tbsp" },
      ],
      steps: [
        "Boil spaghetti in salted water until al dente.",
        "While pasta is cooking, heat olive oil in a pan over medium heat.",
        "Add thinly sliced garlic and cook until golden brown.",
        "Add red pepper flakes and cook for 30 seconds.",
        "Drain the spaghetti and toss it in the garlic oil mixture.",
        "Top with fresh parsley and serve immediately.",
      ],
    },
    {
      name: "Caesar Salad",
      category: "Salad",
      ingredients: [
        { item: "romaine lettuce", quantity: "4 cups" },
        { item: "Caesar dressing", quantity: "3 tbsp" },
        { item: "croutons", quantity: "1 cup" },
        { item: "parmesan cheese", quantity: "2 tbsp" },
      ],
      steps: [
        "Wash and chop the romaine lettuce into bite-sized pieces.",
        "In a large bowl, toss lettuce with Caesar dressing.",
        "Add croutons and parmesan cheese, then toss again.",
        "Serve immediately as a side dish.",
      ],
    },
  ];
// placeholder for a new recipe data
  let recipe = {
    name: "",
    category: "",
    ingredients: "",
    steps: [],
  };
  loadCards();

  //   Accordion
  $("#accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content",
  });
  $("#accordion2").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content",
  });

  //   Add and remove input areas for each recipe step
  $("#add").click(function (e) {
    step++;
    e.preventDefault();
    $(".step-inputs").append(`
        <div class="step">
            <div>
                <label for="step${step}">Step </label>
                <div class="step-item">
                    <textarea name="step${step}" class="inputField stepField" id="step${step}"></textarea>
                    <button id="remove" class="remove">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`);
  });

  $(document).on("click", "#remove", function (e) {
    e.preventDefault();
    $(this).closest(".step").remove();
  });

  //   Slider functionality
  function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    $(".slider-images").css("transform", `translateX(-${currentIndex * 100}%)`);
  }

  //   To start the slider
  function startSlider() {
    autoSlide = setInterval(showNextImage, delay);
  }

  //   To pause the slider
  function stopSlider() {
    clearInterval(autoSlide);
  }

  //   this function will apply a pause to the slider when hovered
  startSlider();
  $("#imageSlider").hover(stopSlider, startSlider);

  //   Validation and submission
  $("#recipeForm").submit(function (e) {
    e.preventDefault();
    if (validateFields()) {
      recipe.steps = [];
      $(".stepField").each(function () {
        let stepValue = $(this).val().trim();
        if (stepValue) {
          recipe.steps.push(stepValue);
        }
      });
      recipe.name = $("#recipeName").val().trim();
      recipe.category = $("#recipeCategory").val().trim();
      recipe.ingredients = processIngredients($("#ingredients").val().trim());
      let newRecipe = {
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
      };
      recipies.push(newRecipe);
      showMsgs(".success");
      loadCards();
    } else {
      showMsgs(".errors");
      $(".inputField").on("input", validateFields);
    }
    resetForm();
  });

  // function to validate the input fields
  function validateFields() {
    let isValid = true;
    $(".inputField").each(function () {
      if ($(this).val().trim() === "") {
        $(this).css("outline", "2px solid red");
        isValid = false;
      } else {
        $(this).css("outline", "");
      }
    });

    return isValid;
  }

  //   Below function will separate the ingredients into key, value pairs
  function processIngredients(ingredients) {
    return ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
      .map((item) => {
        const [key, value] = item.split(":").map((str) => str.trim());
        return { item: key, quantity: value };
      });
  }

  //   This function will display the success and error messages.
  function showMsgs(msg) {
    $(msg).slideDown();
    setTimeout(() => {
      $(msg).fadeOut();
    }, 3000);
  }

  //   function for resetting the form
  function resetForm() {
    $("#recipeForm")[0].reset();
    $(".step-inputs").empty();
    step = 1;
    recipe = {
      name: "",
      category: "",
      ingredients: "",
      steps: [],
    };
  }

  //   Navigation
  $("#createRecipe").click(function (e) {
    e.preventDefault();
    showSlide(".slide1");
  });
  $("#viewRecipe").click(function (e) {
    e.preventDefault();
    showSlide(".slide2");
  });
  $("#features").click(function (e) {
    e.preventDefault();
    showSlide(".slide4");
  });
  $("#credits").click(function (e) {
    e.preventDefault();
    showSlide(".slide3");
  });
  function showSlide(slide) {
    $(".slide").hide();
    $(slide).fadeIn();
  }

  function loadCards() {
    let html = "";
    recipies.forEach(function (recipe, i) {
      html += `
        <div class="r-card">
          <div class="rc-left">
            <span class="category">${recipe.category}</span>
            <h3>${recipe.name}</h3>
          </div>
          <div class="rc-right">
            <div class="ingredients">
              <span>Ingredients: </span>`;

      recipe.ingredients.forEach(function (ingredient) {
        html += `<span class="i-item">${ingredient.item}</span>`;
      });

      if (recipe.ingredients.length > 4) {
        html += `<span>...</span>`;
      }

      html += `</div>
              <div class="step">
                <h3>${recipe.steps[0]}...</h3> <!-- You can adjust how you want to display steps -->
              </div>
              <div class="r-btn">
                <button class="view-btn" id="${i}">View full recipe</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    $(".recipe-cards").html(html);
  }
// shows full recipe in a popup when the button is clicked
  $(document).on("click", ".view-btn", function (e) {
    e.preventDefault();
    let index = $(this).attr("id");
    let arrayRecipe = recipies[index];
    let ingredientsHTML = arrayRecipe.ingredients
      .map((item) => {
        return `<span class="i-item p-item">${item.item} : ${item.quantity}</span>`;
      })
      .join("");
    let stepsHTML = arrayRecipe.steps
      .map((item, i) => {
        return `
            <p class="pc-item i-item">
                  <span class="pci-title">Step ${i + 1}</span><br />
                  ${item}
            </p>
        `;
      })
      .join("");
    let popupContent = `
        <div class="popup">
          <div class="p-header">
            <h1>${arrayRecipe.name}</h1>
            <p class="p-category i-item">${arrayRecipe.category}</p>
            <i class="fa-solid fa-xmark close-icon"></i>
          </div>
          <div class="p-body">
            <div class="p-ingredients">
              <h2>Ingredients</h2>
              <div class="pi-items">
                ${ingredientsHTML}
              </div>
            </div>
            <div class="p-instructions">
              <h2>Cooking Instructions</h2>
              <div class="pc-items">
                ${stepsHTML}
              </div>
            </div>
          </div>
        </div>
    `;
    $(".popup-wrapper").html(popupContent).fadeIn();
  });
// fadeout the page while clicking the close icon.
  $(document).on("click", ".close-icon", function (e) {
    e.preventDefault();
    $(".popup-wrapper").fadeOut();
  });
});

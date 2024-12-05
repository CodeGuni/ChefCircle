// calendar
$(document).ready(function () {
    const daysInMonth = 31; // set days that in December
    const monthName = "December"; // set December
    const meals = ["Breakfast", "Lunch", "Dinner"]; // the meals style
  
    // get table element
    const table = $("#recipe-calendar");
  
    // create thead
    let thead = "<thead><tr><th></th>"; // Empty cell occupancy
    for (let day = 1; day <= daysInMonth; day++) {
      thead += `<th>${monthName} ${day}</th>`;
    }
    thead += "</tr></thead>";
    table.append(thead);
  
    // tbody
    let tbody = "<tbody>";
    meals.forEach((meal) => {
      tbody += `<tr><td class="row-label">${meal}</td>`;
      for (let day = 1; day <= daysInMonth; day++) {
        tbody += `<td class="cell" data-meal="${meal}" data-date="${monthName} ${day}"></td>`;
      }
      tbody += "</tr>";
    });
    tbody += "</tbody>";
    table.append(tbody);
  
    // click event
    $(".cell").on("click", function () {
      const date = $(this).data("date");
      const meal = $(this).data("meal");
  
      // pop up a dialog box, enter the recipe name
      const recipeName = prompt(`Enter recipe for ${meal} on ${date}:`, $(this).text());
      if (recipeName) {
        $(this).text(recipeName); // display the input content
      }
    });
  });
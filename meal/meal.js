
// calendar
$(document).ready(function () {

    // const daysInMonth = 31; // set days that in December
    // const monthName = "December"; // set December
    // const meals = ["Breakfast", "Lunch", "Dinner"]; // the meals style
  
    // // get table element
    // const table = $("#recipe-calendar");
    // let decDay
    // // create thead
    // let thead = "<thead><tr><th></th>"; // Empty cell occupancy
    // for (let day = 1; day <= daysInMonth; day++) {
    //     decDay = String(day).padStart(2,'0')
    //     thead += `<th>${monthName} ${decDay}</th>`;
    // }
    // thead += "</tr></thead>";
    // table.append(thead);
  
    // // tbody
    // let tbody = "<tbody>";
    // meals.forEach((meal) => {
    //   tbody += `<tr><td class="row-label">${meal}</td>`;
    //   for (let day = 1; day <= daysInMonth; day++) {
    //     tbody += `<td class="cell" data-meal="${meal}" data-date="${monthName} ${day}"></td>`;
    //   }
    //   tbody += "</tr>";
    // });
    // tbody += "</tbody>";
    // table.append(tbody);

    const daysInMonth = 31; // Set days in December
    const monthName = "December"; // Set December
    const meals = ["Breakfast", "Lunch", "Dinner"]; // The meals style

    // Get the table element
    const table = $("#recipe-calendar");

    // Create thead
    let thead = "<thead><tr><th></th>"; // Empty cell occupancy
    for (let day = 1; day <= daysInMonth; day++) {
        const decDay = String(day).padStart(2, '0'); // Format day as 2 digits
        thead += `<th data-x="${day}">${monthName} ${decDay}</th>`; // Add data-x for each column
    }
    thead += "</tr></thead>";
    table.append(thead);

    // Create tbody
    let tbody = "<tbody>";
    meals.forEach((meal) => {
        tbody += `<tr><td class="row-label" data-y="${meal}">${meal}</td>`; // Add data-y for row labels
        for (let day = 1; day <= daysInMonth; day++) {
            tbody += `<td class="cell" data-x="${day}" data-y="${meal}"></td>`; // Add data-x and data-y
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
   
    //openform
    $("#addRecipeBtn").click(function() {
        $("#menuForm").dialog({
            autoOpen: true,
            width: 400,
            modal: true
        });
        //datepicker
        $(".datepicker").datepicker({ dateFormat: 'mm/dd/yy' });
    });
    $("#menuForm").dialog({
        autoOpen: false,  // Hide the dialog initially
        width: 400,
        modal: true,
        close: function() {
            // Initialize the table when the dialog is closed
            // generateTable();
        }
    });
    // Open the form on button click using jQuery UI Dialog
    $("#openFormBtn").click(function() {
        $("#menuForm").dialog("open"); // Open the dialog on button click
    });

    // Handle form submission
    $("#menuFormContent").submit(function(event) {
        event.preventDefault();

        let menuDate = $("#menuDate").val();
        console.log("menuDate",menuDate);
        console.log("menuDate",menuDate.substring(3, 5));
        
        let mealType = $("#mealType").val();
        let menuTitle = $("#menuTitle").val();

        // Create a unique key for each meal entry in localStorage
        let storageKey = `menu_${mealType}_${menuDate}`;
        let menuData = {
            date: menuDate,
            mealType: mealType,
            menuTitle: menuTitle
        };

        // Store data in localStorage
        localStorage.setItem(storageKey, JSON.stringify(menuData));


        // Find the corresponding cell based on date and meal type
        let cell = $(`.menu-cell[data-date='${menuDate}'][data-meal='${mealType}']`);

        // Add a card to the selected cell
        let card = `<div class="card">
                        <div class="menuTitle">${menuTitle}</div>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>`;

        // Add card to the table cell
        cell.html(card);

        // Close the dialog
        $("#menuForm").dialog("close");

        // Attach delete functionality
        $(".delete-btn").click(function() {
            $(this).closest(".card").remove();
            // Also remove the data from localStorage
            localStorage.removeItem(storageKey);
        });
    })

    function insertDivIntoTable(xAxis, yAxis, content) {
        // Use a selector to locate the target cell
        const selector = `.cell[data-x="${xAxis}"][data-y="${yAxis}"]`;
        console.log("Selector:", selector); // output selector
        const targetCell = $(selector);
    
        // Check if a matching cell has been found
        if (targetCell.length > 0) {
            // insert content
            targetCell.html(`<div>${content}</div>`);
            console.log("Content inserted into:", targetCell);
        } else {
            console.log("No matching cell found for:", { xAxis, yAxis });
        }
    }
    //---------text-------
    insertDivIntoTable(1, "Breakfast", "Test Content");
    insertDivIntoTable(2, "Lunch", "Test Content");
  });

  
$(document).ready(function () {
    const daysInMonth = 31;
    const monthName = "December";
    const meals = ["Breakfast", "Lunch", "Dinner"];
    //put id in each object, set as a global variable
    let currentId = localStorage.length + 1; 
    // calendar table
    const table = $("#recipeCalendar");
    let thead = "<thead><tr><th></th>";
    for (let day = 1; day <= daysInMonth; day++) {
        thead += `<th>${monthName} ${String(day).padStart(2, "0")}</th>`;
    }
    thead += "</tr></thead>";
    table.append(thead);
    let tbody = "<tbody>";
    meals.forEach((meal) => {
        tbody += `<tr><td class="row-label">${meal}</td>`;
        for (let day = 1; day <= daysInMonth; day++) {
            tbody += `<td class="cell" data-x="${String(day).padStart(2, "0")}" data-y="${meal}"></td>`;
        }
        tbody += "</tr>";
    });
    tbody += "</tbody>";
    table.append(tbody);
    $("#menuForm").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        open: function () {
            $("#menuDate").blur();
        }
    });
    
    // Open "Add Menu" 
    $("#addRecipeBtn").click(function () {
        openMenuForm("Add Menu", false);
    });
    // Submit form
    $("#menuFormContent").submit(function (event) {
        event.preventDefault();
        const menuDate = $("#menuDate").val();
        const day = String(Number(menuDate.split("/")[1])).padStart(2, "0");
        const mealType = $("#mealType").val();
        const recipeName = $("#recipeName").val();
        const foodMateria = $("#foodMateria").val();
        const preparationProcedure = $("#preparationProcedure").val();
        const isEdit = $("#editMode").val() === "true";
        //use same key
        const storageKey = isEdit ? $("#editMode").data("prevKey") : `menu_${currentId}`;
        const recipeData = {
            id: isEdit ? Number(storageKey.split('_')[1]) : currentId, // Maintain the original ID
            date: menuDate,
            mealType,
            recipeName,
            foodMateria,
            preparationProcedure
        };
        // update data 
        localStorage.setItem(storageKey, JSON.stringify(recipeData));
        if (isEdit) {
            updateCardInTable(day, capitalize(mealType), recipeName);
        } else {
            addCardToTable(day, capitalize(mealType), recipeName, storageKey);
            currentId++;
        }
        $("#menuForm").dialog("close");
    });
    // Add a card to the table
    function addCardToTable(day, mealType, recipeName, storageKey) {
        const targetCell = $(`.cell[data-x="${day}"][data-y="${mealType}"]`);
        if (targetCell.length > 0) {
            const cardHtml = `
                <div class="card" data-key="${storageKey}">
                    <div class="recipeName">${recipeName}</div>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">X</button>
                    <button class="madeBtn">I want to make it!</button>
                </div>
            `;
            targetCell.html(cardHtml);
            // click delete button
            targetCell.find(".deleteBtn").click(function () {
                const card = $(this).closest(".card"); 
                const storageKey = card.data("key"); 
                // after click delete button, show a dialog
                $("#confirmDialog").dialog({
                    title: "Delete Confirmation", 
                    modal: true, 
                    buttons: {
                        Confirm: function () {
                            // remove both page and localstorage
                            localStorage.removeItem(storageKey); 
                            card.remove(); 
                            $(this).dialog("close"); 
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        },
                    },
                });
            });
            // click edit button
            targetCell.find(".editBtn").click(function () {
                const card = $(this).closest(".card");
                const storageKey = card.data("key");
                const recipeData = JSON.parse(localStorage.getItem(storageKey));
                // Open form in edit
                openMenuForm("Edit Menu", true, recipeData, storageKey);
            });
            // click made it button 
            targetCell.find(".madeBtn").click(function () {
                const card = $(this).closest(".card");
                const storageKey = card.data("key");
                const recipeData = JSON.parse(localStorage.getItem(storageKey));
                $(".recipe").text(`${recipeData.recipeName}`)
                $(".material").text(`${recipeData.foodMateria}`)
                $(".preparation").text(`${recipeData.preparationProcedure}`)
            })
        }
    }
    // Update an existing card
    function updateCardInTable(day, mealType, recipeName) {
        const targetCell = $(`.cell[data-x="${day}"][data-y="${mealType}"]`);
        if (targetCell.length > 0) {
            targetCell.find(".recipeName").text(recipeName);
        }
    }
    // Open menu form for add/edit
    function openMenuForm(title, isEdit, data = null, prevKey = null) {
        $("#menuForm").dialog("option", "title", title);
        $("#editMode").val(isEdit.toString());
        if (isEdit && data) {
            $("#menuDate").val(data.date); 
            $("#mealType").val(data.mealType); 
            $("#recipeName").val(data.recipeName); 
            $("#foodMateria").val(data.foodMateria); 
            $("#preparationProcedure").val(data.preparationProcedure); 
            $("#editMode").data("prevKey", prevKey);
        } else {
            $("#menuDate").val(""); 
            $("#mealType").val("breakfast"); 
            $("#recipeName").val(""); 
            $("#foodMateria").val(""); 
            $("#preparationProcedure").val(""); 
            $("#editMode").data("prevKey", "");
        }
        $("#menuForm").dialog("open");
        $("#menuDate").datepicker({
            dateFormat: "mm/dd/yy",
            changeMonth: true,
            changeYear: true
        });
    }
    // Capitalize first letter of a string
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Load existing data from localStorage
    function loadDataFromStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("menu_")) {
                const recipeData = JSON.parse(localStorage.getItem(key));
                const day = String(Number(recipeData.date.split("/")[1])).padStart(2, "0");
                const mealType = capitalize(recipeData.mealType);
                addCardToTable(day, mealType, recipeData.recipeName, key);
            }
        }
    }
    loadDataFromStorage();
});

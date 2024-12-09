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
    // Dialog setup
    $("#menuForm").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
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
        const menuTitle = $("#menuTitle").val();
        const isEdit = $("#editMode").val() === "true";
        const storageKey = `menu_${currentId}`;
        const menuData = { id: currentId, date: menuDate, mealType, menuTitle };
        if (isEdit) {
            const prevKey = $("#editMode").data("prevKey");
            // Remove old data if key has changed
            if (prevKey && prevKey !== storageKey) {         
                localStorage.removeItem(prevKey); 
            }
            localStorage.setItem(storageKey, JSON.stringify(menuData));
            updateCardInTable(day, capitalize(mealType), menuTitle);
        } else {
            localStorage.setItem(storageKey, JSON.stringify(menuData));
            addCardToTable(day, capitalize(mealType), menuTitle, storageKey);
            currentId++; 
        }
        $("#menuForm").dialog("close");
    });
    // Add a card to the table
    function addCardToTable(day, mealType, menuTitle, storageKey) {
        const targetCell = $(`.cell[data-x="${day}"][data-y="${mealType}"]`);
        if (targetCell.length > 0) {
            const cardHtml = `
                <div class="card" data-key="${storageKey}">
                    <div class="menuTitle">${menuTitle}</div>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            `;
            targetCell.html(cardHtml);
            // Delete button functionality
            targetCell.find(".deleteBtn").click(function () {
                const card = $(this).closest(".card");
                console.log("card", card);
                const storageKey = card.data("key");
                // Remove this card from both page and localStorage
                localStorage.removeItem(storageKey); 
                card.remove(); 
            });
            // Edit button functionality
            targetCell.find(".editBtn").click(function () {
                const card = $(this).closest(".card");
                const storageKey = card.data("key");
                const menuData = JSON.parse(localStorage.getItem(storageKey));
                // Open form in edit
                openMenuForm("Edit Menu", true, menuData, storageKey);
            });
        }
    }
    // Update an existing card
    function updateCardInTable(day, mealType, menuTitle) {
        const targetCell = $(`.cell[data-x="${day}"][data-y="${mealType}"]`);
        if (targetCell.length > 0) {
            targetCell.find(".menuTitle").text(menuTitle);
        }
    }
    // Open menu form for add/edit
    function openMenuForm(title, isEdit, data = null, prevKey = null) {
        $("#menuForm").dialog("option", "title", title);
        $("#editMode").val(isEdit.toString());
        if (isEdit && data) {
            $("#menuDate").val(data.date);
            $("#mealType").val(data.mealType);
            $("#menuTitle").val(data.menuTitle);
            $("#editMode").data("prevKey", prevKey);
        } else {
            $("#menuDate").val("");
            $("#mealType").val("breakfast");
            $("#menuTitle").val("");
            $("#editMode").data("prevKey", "");
        }
        $("#menuForm").dialog("open");
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
                const menuData = JSON.parse(localStorage.getItem(key));
                const day = String(Number(menuData.date.split("/")[1])).padStart(2, "0");
                const mealType = capitalize(menuData.mealType);
                addCardToTable(day, mealType, menuData.menuTitle, key);
            }
        }
    }
    loadDataFromStorage();
});

$(document).ready(function() {
    // Initialize the table
    function generateTable() {
        const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
        let tableBody = $('#menuTable tbody');
        tableBody.empty(); // Clear any existing rows

        // Create rows for each meal type
        mealTypes.forEach(meal => {
            let row = $('<tr></tr>');
            row.append(`<td>${meal}</td>`);

            // Create 12 columns for 12 days of December
            for (let day = 1; day <= 12; day++) {
                let cell = $(`<td class="menu-cell" data-meal="${meal.toLowerCase()}" data-date="${day}"></td>`);
                row.append(cell);
            }
            tableBody.append(row);
        });
    }

    // Call function to generate the table when page loads
    generateTable();

    // Initialize the dialog with autoOpen: false so it's hidden on page load
    $("#menuForm").dialog({
        autoOpen: false,  // Hide the dialog initially
        width: 400,
        modal: true,
        close: function() {
            // Initialize the table when the dialog is closed
            generateTable();
        }
    });

    // Open the form on button click using jQuery UI Dialog
    $("#openFormBtn").click(function() {
        $("#menuForm").dialog("open"); // Open the dialog on button click
    });

    // Initialize datepicker on the form's input field when the dialog opens
    $('#menuForm').on('dialogopen', function() {
        $('#menuDate').datepicker({
            dateFormat: 'mm/dd/yy',  // Format: Month/Day/Year
            changeMonth: true,       // Allow user to change month
            changeYear: true,        // Allow user to change year
            yearRange: "2020:2025",  // Define the year range (optional)
            minDate: 0,              // Disable past dates (optional)
            maxDate: "+1Y"           // Limit selection to 1 year ahead (optional)
        });
    });

    // Handle form submission
    $("#menuFormContent").submit(function(event) {
        event.preventDefault();

        var menuDate = $("#menuDate").val(); // Get the date
        var mealType = $("#mealType").val(); // Get the meal type (Breakfast, Lunch, Dinner)
        var menuTitle = $("#menuTitle").val(); // Get the menu title

        // Find the corresponding cell based on date and meal type
        var cell = $(`.menu-cell[data-date='${menuDate}'][data-meal='${mealType}']`);

        // Create a card with the menu title
        var card = `<div class="card">
                        <div class="menuTitle">${menuTitle}</div>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>`;

        // Add the card to the selected cell
        cell.html(card);

        // Store the data in localStorage
        var menuData = {
            menuTitle: menuTitle,
            mealType: mealType,
            menuDate: menuDate
        };

        // Use a key for storing in localStorage
        var storageKey = `${mealType}-${menuDate}`;
        localStorage.setItem(storageKey, JSON.stringify(menuData));

        // Close the dialog
        $("#menuForm").dialog("close");

        // Attach delete functionality
        $(".delete-btn").click(function() {
            $(this).closest(".card").remove();
            localStorage.removeItem(storageKey);  // Remove data from localStorage
        });

        // Attach edit functionality
        $(".edit-btn").click(function() {
            var currentTitle = $(this).siblings(".menuTitle").text();
            var newTitle = prompt("Edit Menu Title:", currentTitle);
            if (newTitle) {
                $(this).siblings(".menuTitle").text(newTitle);

                // Update the localStorage with the new title
                menuData.menuTitle = newTitle;
                localStorage.setItem(storageKey, JSON.stringify(menuData));
            }
        });
    });

    // Load stored data from localStorage when the page is loaded
    function loadStoredData() {
        // Loop through the days and meals to check if there's any stored data
        for (let day = 1; day <= 12; day++) {
            ['breakfast', 'lunch', 'dinner'].forEach(meal => {
                var storageKey = `${meal}-${day}`;
                var storedData = localStorage.getItem(storageKey);

                if (storedData) {
                    var menuData = JSON.parse(storedData);
                    var cell = $(`.menu-cell[data-date='${day}'][data-meal='${meal}']`);
                    var card = `<div class="card">
                                    <div class="menuTitle">${menuData.menuTitle}</div>
                                    <button class="edit-btn">Edit</button>
                                    <button class="delete-btn">Delete</button>
                                </div>`;
                    cell.html(card);

                    // Attach delete and edit functionality
                    $(".delete-btn").click(function() {
                        $(this).closest(".card").remove();
                        localStorage.removeItem(storageKey);  // Remove from localStorage
                    });

                    $(".edit-btn").click(function() {
                        var currentTitle = $(this).siblings(".menuTitle").text();
                        var newTitle = prompt("Edit Menu Title:", currentTitle);
                        if (newTitle) {
                            $(this).siblings(".menuTitle").text(newTitle);

                            // Update the localStorage with the new title
                            menuData.menuTitle = newTitle;
                            localStorage.setItem(storageKey, JSON.stringify(menuData));
                        }
                    });
                }
            });
        }
    }

    // Call the loadStoredData function when the page loads
    loadStoredData();
});

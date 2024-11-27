document.addEventListener("DOMContentLoaded", () => {
    const feedbackList = document.getElementById("feedback-list");
    const feedbackForm = document.getElementById("commentform");
    const commentBox = document.getElementById("comment");
    const charCount = document.getElementById("char-count");
    const MAX_LENGTH = 250;
    const testimonialContainer = document.getElementById("testimonials");

    // Load feedback from local storage
    const loadFeedback = () => {
        const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
        feedbackList.innerHTML = '';  // Clear previous feedback before displaying new
        feedbackData.forEach(feedback => displayFeedback(feedback));

        if (feedbackData.length > 0) {
            testimonialContainer.classList.remove("hidden");
        } else {
            testimonialContainer.classList.add("hidden");
        }
    };

    commentBox.addEventListener("input", (e) => {
        // Use of regular expression to allow only alphabetic characters
        const charInput = e.target.value.replace(/[^a-zA-Z]/g, "");
        
        if (charInput.length > MAX_LENGTH) {
            commentBox.classList.add("exceeded");
            charCount.classList.add("exceeded");
            commentBox.value = charInput.slice(0, MAX_LENGTH);
        } else {
            commentBox.classList.remove("exceeded");
            charCount.classList.remove("exceeded");
            commentBox.value = charInput;
        }

        charCount.textContent = MAX_LENGTH - charInput.length;
    });

    const validateForm = (name, email, rating, comment) => {
        if (!name || !email || !rating || !comment) {
            alert("All fields are required.");
            return false;
        }
        if (comment.length > MAX_LENGTH) {
            alert(`Comment must not exceed ${MAX_LENGTH} characters.`);
            return false;
        }
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Enter a valid email address.");
            return false;
        }
        return true;
    };

    const saveFeedback = feedback => {
        try {
            const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
            feedbackData.push(feedback);

            // Check if we're exceeding the local storage quota
            if (JSON.stringify(feedbackData).length > 5000000) {  // Check for 5MB limit
                alert("Local storage limit reached. Please delete some feedback before adding new ones.");
                return;
            }

            localStorage.setItem("feedback", JSON.stringify(feedbackData));
        } catch (e) {
            if (e instanceof QuotaExceededError) {
                alert("Storage limit exceeded. Please delete some feedback or reduce the data size.");
            }
        }
    };

    // Handle form submission
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById("author").value;
        const email = document.getElementById("email").value;
        const rating = parseInt(document.getElementById("rating").value, 10);
        const comment = commentBox.value;
        const profileImage = document.getElementById("image-preview").querySelector("img");

        // Validate form inputs
        if (!validateForm(name, email, rating, comment)) return;

        // Prepare feedback object
        const feedback = {
            name,
            email,
            rating,
            comment,
            image: profileImage ? profileImage.src : null,
            date: new Date().toISOString() // Add the submission date
        };

        // Save to localStorage
        saveFeedback(feedback);

        // Reset the form and clear image preview after submission
        feedbackForm.reset();
        document.getElementById("image-preview").innerHTML = ''; // Clear image preview
        loadFeedback(); // Reload feedback list after submission
    });

    document.getElementById("profile_image").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                const preview = document.getElementById("image-preview");
                preview.innerHTML = `<img src="${reader.result}" alt="Image Preview" style="max-width: 200px;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // A resuable sorting function will display feedback based on different categories
    const sortFeedback = (std) => {
        let feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
        switch (std) {
            case 'newest':
                return feedbackData.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'oldest':
                return feedbackData.sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'highest':
                return feedbackData.sort((a, b) => b.rating - a.rating);
            case 'lowest':
                return feedbackData.sort((a, b) => a.rating - b.rating);
            default:
                return feedbackData;
        }
    }

    // Function to generate star icons based on rating
    const getStarRating = (rating) => {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '<span class="star-filled">★</span>';
        }
        return stars;
    };

    // Display feedback in a card layout with image and text
    const displayFeedback = ({ name, email, rating, comment, image, date  }) => {
        const feedbackItem = document.createElement("div");
    //    console.log(date, "datee")
    const extractedDate = new Date(date).toISOString().split('T')[0];

        const starRating = getStarRating(rating);

        feedbackItem.innerHTML = `
            <div class="feedback-card">
                <img src="${image || 'default-image.jpg'}" alt="${name}'s image" class="feedback-card-image">
                <div class="feedback-card-details">
                    <h5>${name}</h5>
                    <span class="publish_date">${extractedDate}</span>
                    <div class="star-rating">${starRating}</div>
                    <small>${email}</small>
                     <div class="feedback-card-body">
                <p>${comment}</p>
            </div>
                </div>
            </div>
           
        `;
        feedbackList.appendChild(feedbackItem);
    };

    // Add event listener for sorting feedback
    document.getElementById("sort-feedback").addEventListener("change", (e) => {
        const sortBy = e.target.value;
        const sortedFeedback = sortFeedback(sortBy);

        // Clear the state
        feedbackList.innerHTML = '';

        sortedFeedback.forEach(feedback => displayFeedback(feedback));
    });

    loadFeedback(); // main function call on load
});

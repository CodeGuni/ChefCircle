let totalRating = 0;

$('.rating').starRating({
    starIconEmpty: 'far fa-star',
    starIconFull: 'fas fa-star',
    starColorEmpty: 'lightgray',
    starColorFull: '#FFC107',
    starsSize: 4,
    stars: 5,
    initialRating: totalRating,
    useGradient: false,
});

$(document).on('change', '.rating', function (e, stars, index) {
    totalRating = stars;
    $('.otherRatingElement').text(totalRating);
});


//handling image adn converting to base 64 format so that it can display and use on browser direclty
let convertedImage = "";
$('#profile_image').on('change', function () {
    const imgs = this.files[0];
    //case : return the user if trying to add more images
    if (imgs.length > 1) {
        alert("Only one image can be added.");
        this.value = ""; 
        return;
    }
    if (imgs) {
        const reader = new FileReader();
        reader.onload = function () {
            convertedImage = reader.result;
            $('#image-preview').html(`<img src="${reader.result}" alt="Image Preview" style="max-width: 200px;">`);
        };
        reader.readAsDataURL(imgs);
    }
});

$('#reviewForm').on('submit', function (e) {
    e.preventDefault();

    // Retrieve the value, store it, trim unnecessary spaces, validate it, and return an error if no valid value is present. 
    const firstName = $('#first-name').val().trim()
    const lastName = $('#last-name').val().trim()
    const email = $('#email').val().trim()
    const comment = $('#comment').val().trim()

    if(!firstName || !lastName || email || comment || totalRating === 0) {
        alert("Please fill all required fields")
        return;
    }

    const customFormData = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        email: $('#email').val(),
        comment: $('#comment').val(),
        rating: totalRating,
        profileImage: convertedImage,
    };
    // storing image in Json array format so that easy to retrive data to display on testimonials
    let customReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    customReviews.push(customFormData);

    localStorage.setItem('reviews', JSON.stringify(customReviews));

    console.log("review submitted and stored successfully", customFormData);
    console.log("All reviews:", customReviews);

    $('#reviewForm')[0].reset();
    $('#image-preview').empty();
    totalRating = 0;
});

const displayTestimonialData = () => {
    const customReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const getFeedbackList = $('#review-list');
    getFeedbackList.empty();

    if (customReviews.length > 0) {
        customReviews.forEach((item) => {
            const card = `
                <div class="testimonial-card-wrapper">
                    <div class="testimonial-header">
                        <img src="${item.profileImage || 'default-avatar.png'}" alt="${item.firstName} ${item.lastName}" class="testimonial-image">
                        <div class="testimonial-info">
                            <h4>${item.firstName} ${item.lastName}</h4>
                            <div class="rating">
                                ${'⭐'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)} 
                            </div>
                        </div>
                    </div>
                    <p class="testimonial-comment">${item.comment}</p>
                </div>
            `;
            getFeedbackList.append(card);
        });
    } else {
        const noDataCard = `
            <div class="testimonial-card no-data">
                <img src="https://ik.imagekit.io/aq3ybtarw/team/nodatafound.png?updatedAt=1732845532986" 
                     alt="No data found" class="no-data-image">
                <p>No testimonials found. Be the first to share your feedback!</p>
            </div>
        `;
        getFeedbackList.append(noDataCard);
    }

    console.log("Page data", customReviews);
};

// Below function will execute when the page loads / refresh
$(document).ready(function() {
    displayTestimonialData(); 
});
let totalRating = 0;
let maxChar = 250;
const comentTextBox = $('#comment');

//jquery plugin with custom modifcation
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
    if (this.files.length > 1) {
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
    
    const firstName = $('#first-name').val().trim();
    const lastName = $('#last-name').val().trim();
    const email = $('#email').val().trim();
    const comment = $('#comment').val().trim();

    // Validation checks
    if (!firstName || !lastName || !email || !comment || totalRating === 0) {
        alert("Please fill all required fields.");
        return;
    }

    if (comment.length > maxChar) {
        alert(`Your comment exceeds the maximum limit of ${maxChar} characters.`);
        return;
    }

    // Prepare review data
    const customFormData = {
        firstName,
        lastName,
        email,
        comment,
        rating: totalRating,
        profileImage: convertedImage,
    };

    // Store in localStorage
    let customReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    customReviews.push(customFormData);
    localStorage.setItem('reviews', JSON.stringify(customReviews));

    // Reset form and show success modal
    $('#reviewForm')[0].reset();
    $('#image-preview').empty();
    totalRating = 0;

    $('#submit-success-modal').fadeIn();

    // Auto-close modal after 3 seconds
    setTimeout(function () {
        $('#submit-success-modal').fadeOut();
    }, 3000);
});

// Close Submit Success Modal
$('#close-submit-modal').on('click', function () {
    $('#submit-success-modal').fadeOut();
});


// below function helps in validation the length of textbox
function validateTextLength() {
   
    const CharDisplayNo = $('#char-count');

    comentTextBox.on('input', function () {
        const currCommentLength = comentTextBox.val().length;

        if (currCommentLength > maxChar) {
            comentTextBox.css('border', '2px solid #F8AFAF');
            CharDisplayNo.text(`Exceeded by ${currCommentLength - maxChar} characters!`)
                         .css('color', '#F8AFAF');
        } else {
            comentTextBox.css('border', '');
            CharDisplayNo.text(`${maxChar - currCommentLength} characters remaining`)
                         .css('color', '#000000');
        }
    });
}

// unique preview featrue fucnitonality to show how it will look befor submit 
// Preview feature for reviews
// Preview Modal
$('#preview-button').on('click', function () {
    const firstName = $('#first-name').val().trim();
    const lastName = $('#last-name').val().trim();
    const comment = $('#comment').val().trim();

    const previewData = `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <img src="${convertedImage || 'default-avatar.png'}" alt="Profile Image" class="testimonial-image">
                <div class="testimonial-info">
                    <h4>${firstName} ${lastName}</h4>
                    <div class="rating">${'⭐'.repeat(totalRating)}${'☆'.repeat(5 - totalRating)}</div>
                </div>
            </div>
            <p class="testimonial-comment">${comment}</p>
        </div>
    `;

    $('#preview-content').html(previewData);
    $('#preview-modal').fadeIn();
});

// Close Preview Modal
$('#close-preview-modal').on('click', function () {
    $('#preview-modal').fadeOut();
});

// Close modal functionality
$('#close-custom-modal').on('click', function () {
    $('#custom-modal').fadeOut();
});

// custom js function to truncate and limit the text 


function displayTestimonialData(reviews = JSON.parse(localStorage.getItem('reviews')) || []) {
    const feedbackList = $('#review-list');
    feedbackList.empty();

    if (reviews.length > 0) {
        reviews.forEach(item => {
            const card = `
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <img src="${item.profileImage || 'default-avatar.png'}" alt="${item.firstName} ${item.lastName}" class="testimonial-image">
                        <div class="testimonial-info">
                            <h4>${item.firstName} ${item.lastName}</h4>
                            <div class="rating">${'⭐'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</div>
                        </div>
                    </div>
                    <p class="testimonial-comment">${item.comment}</p>
                </div>
            `;
            feedbackList.append(card);
        });
    } else {
        feedbackList.append(`
            <div class="testimonial-card no-data">
                <img src="https://ik.imagekit.io/aq3ybtarw/team/nodatafound.png?updatedAt=1732845532986" 
                     alt="No data found" class="no-data-image">
                <p>No testimonials found. Be the first to share your feedback!</p>
            </div>
        `);
    }
    customSliderStart();
}



// a resuable custom sorting function based on rating order 

$('#sort-feedback').on('change', function () {
    const sortBy = $(this).val();
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    if (sortBy === 'newest') reviews.reverse();
    if (sortBy === 'highest') reviews.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'lowest') reviews.sort((a, b) => a.rating - b.rating);

    displayTestimonialData(reviews);
   
    customSliderStart() 
});

function customSliderStart() {
    const testimonials = $('.testimonial-card');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    if (totalTestimonials > 3) {
       
        $('#review-list').addClass('slider-wrapper');

        testimonials.wrapAll('<div class="slider-track"></div>');
        const sliderTrack = $('.slider-track');
        sliderTrack.css({
            display: 'flex',
            gap: "20px",
            width: `${totalTestimonials * 100}%`,
            transition: 'transform 0.5s ease-in-out',
        });

        testimonials.css({
            flex: `0 0 ${100 / 3}%`, 
            maxWidth: `${100 / 3}%`,
        });

      
        const autoSlide = () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;

          
            sliderTrack.css({
                transform: `translateX(-${(currentIndex * 100) / totalTestimonials}%)`,
            });
        };

        // Start auto-slide every 4 seconds
        const sliderInterval = setInterval(autoSlide, 2000);

     
        $('.slider-wrapper').hover(
            () => clearInterval(sliderInterval),
            () => setInterval(autoSlide, 4000)
        );
    } else {
        testimonials.show(); 
    }
}


// Below function will execute when the page loads / render
$(document).ready(function() {
    displayTestimonialData(); 
    validateTextLength();
});


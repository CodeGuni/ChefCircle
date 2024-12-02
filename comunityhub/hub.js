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

    if (!firstName || !lastName || !email || !comment || totalRating === 0) {
        alert("Please fill all required fields");
        return;
    }
// validation check if limit exceed thenf orm should not submit
if (comment.length > maxChar) {
    alert(`Your comment exceeds the maximum limit of ${maxChar} characters.`);
    return;
}


    const customFormData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        comment: comment,
        rating: totalRating,
        profileImage: convertedImage,
    };

    let customReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    customReviews.push(customFormData);
    localStorage.setItem('reviews', JSON.stringify(customReviews));

    $('#reviewForm')[0].reset();
    $('#image-preview').empty();
    totalRating = 0;

    $('#custom-modal').fadeIn();

    setTimeout(function () {
        $('#custom-modal').fadeOut();
    }, 3000);
});

$('#close-custom-modal').on('click', function () {
    $('#custom-modal').fadeOut();
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

const displayTestimonialData = () => {
    const customReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const getFeedbackList = $('#review-list');
    getFeedbackList.empty();

    if (customReviews.length > 0) {
        customReviews.forEach((item) => {
            const card = `
                <div class="testimonial-card">
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
};

$(document).ready(function() {
    displayTestimonialData(); 
});



// a resuable custom sorting function based on rating order 
$('#sort-feedback').on('change', function() {
    const sortBy = $(this).val();
    let sortedReviews = [...customReviews];
    
    if (sortBy === 'newest') {
        sortedReviews = sortedReviews.reverse();  
    } else if (sortBy === 'highest') {
        sortedReviews = sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
        sortedReviews = sortedReviews.sort((a, b) => a.rating - b.rating);
    }

    // Render sorted reviews on call
    displayTestimonialData(sortedReviews);
});


// Below function will execute when the page loads / refresh
$(document).ready(function() {
    displayTestimonialData(); 
    validateTextLength();
});


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
    console.log(imgs, "imagess");
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

    const customFormData = {
        name: $('#customer').val(),
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
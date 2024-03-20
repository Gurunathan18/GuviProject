$(document).ready(function() {
    var email = localStorage.getItem('user');
    
    if(email) {
        $.ajax({
            url: '../php/profile.php',
            method: 'GET',
            data: { email: email },
            dataType: 'json',
        success: function(response) {
            if (response.success) {
                console.log(response.data)
                $('#name').text(response.data.fullname)
                $('#email').text(response.data.email)
                $('#gender').text(response.data.gender)
                $('#dob').text(response.data.dob)
                $('#phone').text(response.data.phone)
            } else {
                console.error('Error retrieving data:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', error);
        }
        });
    } else {
        console.error('Email not found in local storage.');
    }
});
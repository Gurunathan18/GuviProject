$(document).ready(function() {
    $('#registerform').submit(function(e) {
        e.preventDefault(); 
        
        var formData = {
            email: $('#email').val(),
            password: $('#password').val(),
            confirmpassword: $('#confirmpassword').val(),
            fullname: $('#fullname').val(),
            dob: $('#dob').val(),
            gender: $('#gender').val(),
            phone: $('#phone').val(),

        };
        console.log(formData)

        $.ajax({
            url: "../php/register.php",
            method: 'POST',
            data: formData,
            success: function(response) {
                if (response.trim() !== '') {
                    var data = JSON.parse(response);
                    if (data.success) {
                        window.location.href = "../html/login.html";
                    } else {
                        console.log(data.message)
                        $('#message').text(data.message);
                    }
                } else {
                    console.error("Empty response received from server.");
                }
            },
            error: function(xhr) {
                console.error(xhr.responseText);
            }
        });
    });
});
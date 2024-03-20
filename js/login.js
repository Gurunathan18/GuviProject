$(document).ready(function() {
    $('#loginform').submit(function(e) {
        e.preventDefault(); 
        
        var formData = {
            email: $('#email').val(),
            password: $('#password').val(),

        };
        console.log(formData)

        $.ajax({
            url: "../php/login.php",
            method: 'POST',
            data: formData,
            success: function(response) {
                console.log(response)
                if (response.trim() !== '') {
                    var data = JSON.parse(response);
                    if (data.success) {
                        $('#message').text(data.message);
                        console.log(data.user,data.value)
                        localStorage.setItem("user",data.user.email);
                        user=localStorage.getItem("user");
                        console.log(data.user.email)
                        updateNavigation(data.user.email);
                        window.location.reload();
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
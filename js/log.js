function getUser() {
    var user = localStorage.getItem('user');
    console.log('Retrieved user data:', user);
    if (user) {
        try {
            return {
                loggedIn: user !== null
            };
        }
        catch (error) {
            console.error('Error parsing user data as JSON:', error);
        }
    }

    return { loggedIn: false };
}
function saveUser(user) {

    localStorage.setItem('user', JSON.stringify(user));
}
function logoutUser() {

    localStorage.removeItem('user');
}
function updateNavigation(user) {
    var navigation = document.querySelector('.navbar-nav');
    if (navigation) {
        if (user.loggedIn) {
            var dashboardItem = document.createElement('li');
            dashboardItem.classList.add("nav-item");
            dashboardItem.innerHTML ='<a id="dash" class="nav-link" href="./profile.html">Profile</a>';
            navigation.appendChild(dashboardItem);

            var logoutItem = document.createElement('li');
            logoutItem.classList.add("nav-item");
            logoutItem.innerHTML = '<a id="logout" class="nav-link" href="./profile.html">Logout</a>';
            navigation.appendChild(logoutItem);

            var logoutButton = document.getElementById('logout');
            if (logoutButton) {
                logoutButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    logoutUser();
                    window.alert("Logout Successful");
                    window.location.href = './login.html'; 
                });
            }
        }
    }}
    document.addEventListener('DOMContentLoaded', function () {
        var user = getUser();
        updateNavigation(user);
    });
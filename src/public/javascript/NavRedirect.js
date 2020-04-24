
async function handleNavProfile() {
    console.log('test');
    window.location.href = url + '/auth/profile.html?user=' + currentUser._id;
}

async function handleNavBookList() {
    window.location.href = url + '/auth/booklist.html?user=' + currentUser._id;
}


async function handleNavSignout() {
    sessionStorage.clear();
    window.location.href = url + '/login.html';
}

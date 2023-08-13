document.addEventListener('DOMContentLoaded', function() {
    const state = document.querySelector('.state');

    if(document.cookie.indexOf('user=') === -1) {
        const loginBtn = document.createElement('button');
        loginBtn.textContent = '로그인';
        loginBtn.id = 'login_btn';
        loginBtn.addEventListener('click', e => {
            location.href = '/login';
        });
        state.append(loginBtn);
    }
    else {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = '로그아웃';
        logoutBtn.id = 'login_btn';
        logoutBtn.addEventListener('click', e => {
            location.href = '/logout';
        });
        state.append(logoutBtn);
    }
});

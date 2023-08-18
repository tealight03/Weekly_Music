var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        const headerContainer = document.getElementById("header_container");
        headerContainer.innerHTML = this.responseText;

        // 로그인, 로그아웃 버튼 변경
        const scripts = headerContainer.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const newScript = document.createElement('script');
            newScript.textContent = scripts[i].textContent;
            headerContainer.appendChild(newScript);
        }

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

    }
};
xhttp.open("GET", "/menu", true);
xhttp.send();
if(document.cookie.indexOf('user=') === -1){
    alert("로그인 후 이용 가능합니다.");
    window.location.href = '/login';
}
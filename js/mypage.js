//비회원 접근 제한
if(document.cookie.indexOf('user=') === -1){
    alert("로그인 후 이용 가능합니다.");
    window.location.href = '/login';
}

//회원 정보 출력
const postUid = async () => {
    const response = await fetch('/api/getUinfo')
    .then(response => response.json())
    .then(data => {
        data.forEach((row) => {
            //if(document.cookie.indexOf('user=') === row["userid"]){
                const uid = document.querySelector('#uid');
                uid.textContent = row["userid"];
                const email = document.querySelector('#email');
                email.textContent = row["email"];
                const tel = document.querySelector('#tel');
                tel.textContent = row["tel"];
            //}
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    postUid();
});
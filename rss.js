// Загрузка RSS-ленты и вывод новостей
var RSS_URL = 'https://news.yandex.ru/RSS/top7.xml'; // пример RSS-ленты

function loadRSS() {
    fetch(RSS_URL)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
        .then(data => {
            var items = data.querySelectorAll('item');
            var list = document.getElementById('newsList');
            list.innerHTML = '';
            items.forEach(item => {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = item.querySelector('link').textContent;
                a.textContent = item.querySelector('title').textContent;
                a.target = '_blank';
                li.appendChild(a);
                list.appendChild(li);
            });
        })
        .catch(err => console.error('Не удалось загрузить RSS', err));
}

document.addEventListener('DOMContentLoaded', loadRSS);

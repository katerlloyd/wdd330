const array = [
    {
        label: 'Week 1 Notes', 
        link: 'week1/index.html'
    }];

let ol = document.querySelector('ol');

array.forEach(function(item) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    
    a.setAttribute('href', item.link);
    a.textContent = item.label;

    li.appendChild(a);
    ol.appendChild(li);
});
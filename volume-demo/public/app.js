document.addEventListener('DOMContentLoaded', function() {
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        const itemList = document.getElementById('item-list');
        data.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.name;
          itemList.appendChild(li);
        });
      });
  });
  
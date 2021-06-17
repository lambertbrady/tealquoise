from js import document

def f(event):
    event.currentTarget.innerHTML += "Clicked!"

el = document.getElementById('py-test')
el.addEventListener('click', lambda event : f(event))
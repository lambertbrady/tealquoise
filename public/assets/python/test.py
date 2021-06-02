from js import document
# from pyodide import create_proxy

def f(event):
    event.currentTarget.innerHTML += "Clicked!"

# proxy_f = create_proxy(f)
el = document.getElementById('py-test')
el.addEventListener('click', lambda event : f(event))
# Store proxy_f in Python then later:
# document.body.removeEventListener('click', proxy_f)
# proxy_f.destroy()
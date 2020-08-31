var VERSION = '1.1.0'

function menuIcon(x) {
        x.classList.toggle("change");
        document.getElementById("nav-links").classList.toggle("hide");
    }

var elements = document.getElementsByClassName('version');
for (i=0;i< elements.length ;i++) {
    elements[i].innerHTML = '<a target="_blank" href="https://github.com/toto-bird/Peri.dot/releases/tag/' + VERSION + '">' + VERSION + '</a>'
}

var element = document.getElementById('nav-links');
element.innerHTML = `<ul>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs">Introduction</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/beginners">Beginners</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/variables">Variables</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/flowcontrol">Flow Control</a></li>
</ul>`
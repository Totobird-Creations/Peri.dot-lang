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
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs"><i class='fas fa-info'></i>Introduction</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/beginners"><i class="fas fa-chalkboard-teacher"></i>Beginners</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/variables"><i class='fas fa-archive'></i>Variables</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/flowcontrol"><i class="fas fa-random"></i>Flow Control</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/functions"><i class='fas fa-wave-square'></i>Functions</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/builtinfunctions"><i class="fas fa-layer-group"></i>Built-In Functions</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/includes"><i class="fas fa-dolly-flatbed"></i>Includes</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/types"><i class='fas fa-cubes'></i>Types</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/exceptionhandling"><i class="fas fa-bomb"></i>Exception Handling</a></li>
</ul>`
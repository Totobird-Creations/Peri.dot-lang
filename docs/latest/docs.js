var VERSION = '1.1 (Latest)'

function menuIcon(x) {
        x.classList.toggle("change");
        document.getElementById("nav-links").classList.toggle("hide");
    }

var elements = document.getElementsByClassName('version');
for (i=0;i< elements.length ;i++) {
    elements[i].innerHTML = '<a href="https://toto-bird.github.io/Peri.dot-lang/docs/versions' + VERSION + '</a>'
}

var element = document.getElementById('nav-links');
element.innerHTML = `<ul>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/introduction"><i class='fas fa-info'></i>Introduction</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/beginners"><i class="fas fa-chalkboard-teacher"></i>Beginners</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/variables"><i class='fas fa-archive'></i>Variables</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/flowcontrol"><i class="fas fa-random"></i>Flow Control</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/functions"><i class='fas fa-wave-square'></i>Functions</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/builtinfunctions"><i class="fas fa-layer-group"></i>Built-In Functions</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/includes"><i class="fas fa-dolly-flatbed"></i>Includes</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/types"><i class='fas fa-cubes'></i>Types</a></li>
    <li><a class="nav-link" href="https://toto-bird.github.io/Peri.dot-lang/docs/latest/exceptionhandling"><i class="fas fa-bomb"></i>Exception Handling</a></li>
</ul>`
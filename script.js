function downloadApp() {
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
}

function showModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function toggleMenu() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = event.target;
    var data = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            showModal();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Form submission failed.');
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form submission failed.');
    });
});

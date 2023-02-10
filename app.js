let form = document.querySelector('form');
let mainSection = document.querySelector('main');

const html = `
    <section id="question-1">
        <div class="text-center">
            <h4 class="display-4">Question 1</h4>
            <h5 class="text-muted">Which is the recommended place to put JavaScript code in an HTML file?</h5>
        </div>
        <hr>
        <div class="row d-flex flex-column">
            <form class="px-4" action="" id="question">
                <div class="form-check mb-2 ms-2">
                    <input class="form-check-input" type="radio" name="question-1" id="option-1" />
                    <label class="form-check-label" for="option-1">
                        Between script tags inside the <code>&lt;body&gt;</code> section of the file
                    </label>
                </div>
                <div class="form-check mb-2 ms-2">
                    <input class="form-check-input" type="radio" name="question-1" id="option-2" />
                    <label class="form-check-label" for="option-2">
                        Inside its own separate file, reference within the <code>&lt;body&gt;</code> section of the HTML file within script tags
                    </label>
                </div>
                <div class="form-check mb-2 ms-2">
                    <input class="form-check-input" type="radio" name="question-1" id="option-3" />
                    <label class="form-check-label" for="option-3">
                        JavaScript cannot be placed or referenced within an HTML file
                    </label>
                </div>
            </form>
            <div class="text-end">
            <button type="button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </section>
`;

function updateSection(oldHTML, newHTML) {
    oldHTML.innerHTML = '';
    let loader = document.querySelector('#loader');
    loader.style.display = 'block';
    setTimeout(() => {
        loader.style.display = 'none';
        oldHTML.innerHTML = newHTML;
    }, 3000);
}

function setPlayerName(e) {
    e.preventDefault();
    let playerNameValue = document.querySelector('#player').value;
    localStorage.setItem('playerName', playerNameValue);
    document.querySelector('#player').value = '';
    document.querySelector('.navbar-text').textContent = `Player: ${localStorage.getItem('playerName')}`;

    updateSection(mainSection, html);
};

// function changeLabelStyle() {
//     let radioBtns = Array.from(document.querySelectorAll('input[id^="option"]'));
//     radioBtns.forEach(btn => {
//         let label = btn.nextElementSibling;
//         if (btn.checked == true) {
//             label.classList.remove('unchecked-label');
//             label.classList.add('checked-label');
//             btn.parentElement.style.backgroundColor = '#8B9A46';
//         } else {
//             label.classList.remove('checked-label');
//             label.classList.add('unchecked-label');
//             btn.parentElement.style.backgroundColor = '';
//         };
//     });
// };

form.addEventListener('submit', setPlayerName);
// form.addEventListener('change', changeLabelStyle);
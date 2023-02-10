const questionHTMLtemplate = 
    `
    <div class="text-center">
        <h4 class="display-4">Question 1</h4>
        <h5 class="text-muted">Which is the recommended place to put JavaScript code in an HTML file?</h5>
    </div>
    <hr>
    <div class="row d-flex flex-column">
        <form class="px-4" action="">
            <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="question-1" id="option-1" />
                <label class="form-check-label" for="option-1">
                    Between script tags inside the <code>&lt;body&gt;</code> section of the file
                </label>
            </div>
            <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="question-1" id="option-2" />
                <label class="form-check-label" for="option-2">
                    Inside its own separate file, reference within the <code>&lt;body&gt;</code> section of the HTML file within script tags
                </label>
            </div>
            <div class="form-check mb-2">
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
    `
;

const question1 = () => {
    let header = document.querySelector('h4').innerHTML = 'Question 1';
    let question = document.querySelector('h5').innerHTML = `
        Which is the recommended place to put JavaScript code in an HTML file?
    `;
    let option1 = document.querySelector('label[for=option-1]').innerHTML = `
        Between script tags inside the <code>&lt;body&gt;</code> section of the file
    `;
    let option2 = document.querySelector('label[for=option-2]').innerHTML = `
        Inside its own separate file, reference within the <code>&lt;body&gt;</code> section of the HTML file within script tags
    `;
    let option3 = document.querySelector('label[for=option-3]').innerHTML = `
        JavaScript cannot be placed or referenced within an HTML file
    `;
};
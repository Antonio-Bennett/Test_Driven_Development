//We import all as functions so we can dynamically use it with the DOM
import * as functions from './tests';

const app = document.querySelector('#app');

//This function maps each function to a div in app so each new test is easily added to DOM
const display = () => {
    Object.values(functions).map((func, idx) => {
        console.log(func);
        app.innerHTML += `
            <div class="function">
                <h3>${func.title}</h3>
                <p>${func.desc}</p>
                <label for="input${idx}">Enter Input</label>
                <input
                    id="input${idx}"
                    type="text"
                    placeholder="Enter input" />
                <button id="btn${idx}">Run</button>
                <label for="output${idx}">Output</label>
                <p id="output${idx}"></p>
            </div>

`;
    });
};

const registerListeners = () => {
    Object.values(functions).map((func, idx) => {
        const btn = document.getElementById(`btn${idx}`);
        btn.addEventListener('click', () => {
            const input = document.getElementById(`input${idx}`);
            const output = document.getElementById(`output${idx}`);
            const result = func.func(input.value);
            output.textContent = result;
            input.value = '';
        });
    });
};

display();
registerListeners();

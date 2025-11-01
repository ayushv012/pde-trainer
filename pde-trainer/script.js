document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const problemDisplay = document.getElementById('problem-display');
    const answerDisplay = document.getElementById('answer-display');
    const newProblemBtn = document.getElementById('new-problem-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');

    // --- Problem Bank ---
    // Problems are stored as objects with 'problem' and 'answer' keys.
    // LaTeX is written with double backslashes (\\) so it's a valid JS string.
    const pdeProblems = [
        {
            problem: "Classify the following second-order PDE: \\( 4u_{xx} - 12u_{xy} + 9u_{yy} + u_x = 0 \\)",
            answer: "We check the discriminant \\( B^2 - 4AC \\). <br>" +
                    "Here, A = 4, B = -12, and C = 9. <br>" +
                    "\\( B^2 - 4AC = (-12)^2 - 4(4)(9) = 144 - 144 = 0 \\). <br>" +
                    "Since the discriminant is zero, the equation is **Parabolic**."
        },
        {
            problem: "Classify the following second-order PDE: \\( u_{xx} + 6u_{xy} - u_{yy} = \cos(x) \\)",
            answer: "We check the discriminant \\( B^2 - 4AC \\). <br>" +
                    "Here, A = 1, B = 6, and C = -1. <br>" +
                    "\\( B^2 - 4AC = (6)^2 - 4(1)(-1) = 36 + 4 = 40 \\). <br>" +
                    "Since the discriminant is positive, the equation is **Hyperbolic**."
        },
        {
            problem: "Solve the transport equation \\( u_t + 3u_x = 0 \\) with the initial condition \\( u(x,0) = \sin(x) \\).",
            answer: "This is a first-order linear PDE. We use the method of characteristics. <br>" +
                    "The characteristic curves are given by \\( \frac{dx}{dt} = 3 \\), which integrates to \\( x(t) = 3t + x_0 \\). <br>" +
                    "Along these curves, \\( \frac{du}{dt} = 0 \\), so \\( u \\) is constant. <br>" +
                    "Thus, \\( u(x,t) = f(x_0) = f(x - 3t) \\). <br>" +
                    "Using the initial condition \\( u(x,0) = f(x) = \sin(x) \\). <br>" +
                    "The solution is **\\( u(x,t) = \sin(x - 3t) \\)**."
        },
        {
            problem: "Find the steady-state solution for the 1D heat equation \\( u_t = k u_{xx} \\) on \\( 0 \le x \le L \\) with boundary conditions \\( u(0,t) = 100 \\) and \\( u(L,t) = 0 \\).",
            answer: "Steady-state means \\( u_t = 0 \\). <br>" +
                    "The PDE simplifies to an ODE: \\( k u_{xx} = 0 \\), or simply \\( u''(x) = 0 \\). <br>" +
                    "Integrating twice gives the general solution: \\( u(x) = C_1 x + C_2 \\). <br>" +
                    "Apply boundary conditions: <br>" +
                    "1. \\( u(0) = C_1(0) + C_2 = 100 \implies C_2 = 100 \\). <br>" +
                    "2. \\( u(L) = C_1(L) + 100 = 0 \implies C_1 = -100/L \\). <br>" +
                    "The solution is **\\( u(x) = -\frac{100}{L}x + 100 \\)**."
        },
        {
            problem: "Solve the 1D wave equation \\( u_{tt} = c^2 u_{xx} \\) with initial conditions \\( u(x,0) = e^{-x^2} \\) and \\( u_t(x,0) = 0 \\) on an infinite domain.",
            answer: "We use D'Alembert's formula: <br>" +
                    "\\( u(x,t) = \frac{1}{2} [f(x+ct) + f(x-ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds \\) <br>" +
                    "Here, \\( f(x) = u(x,0) = e^{-x^2} \\) and \\( g(x) = u_t(x,0) = 0 \\). <br>" +
                    "The integral term is zero. <br>" +
                    "The solution is **\\( u(x,t) = \frac{1}{2} [e^{-(x+ct)^2} + e^{-(x-ct)^2}] \\)**."
        }
    ];

    let currentProblem = null;

    // --- Functions ---
    
    function generateNewProblem() {
        // Hide the old answer
        answerDisplay.style.display = 'none';
        answerDisplay.innerHTML = '';
        
        // Get a random problem
        const randomIndex = Math.floor(Math.random() * pdeProblems.length);
        currentProblem = pdeProblems[randomIndex];
        
        // Display the problem
        problemDisplay.innerHTML = currentProblem.problem;
        
        // Tell MathJax to re-render the math
        MathJax.typesetPromise([problemDisplay]);
    }
    
    function showAnswer() {
        if (currentProblem) {
            // Set the answer text
            answerDisplay.innerHTML = currentProblem.answer;
            // Make it visible
            answerDisplay.style.display = 'block';
            
            // Tell MathJax to re-render the math
            MathJax.typesetPromise([answerDisplay]);
        } else {
            answerDisplay.innerHTML = '<p>Please generate a problem first.</p>';
            answerDisplay.style.display = 'block';
        }
    }

    // --- Event Listeners ---
    newProblemBtn.addEventListener('click', generateNewProblem);
    showAnswerBtn.addEventListener('click', showAnswer);
});
// shopping cart

// Pet variables
const bear = document.getElementById("bear");
const dog = document.getElementById("dog");
const cat = document.getElementById("cat");
const giraffe = document.getElementById("giraffe");
const bunny = document.getElementById("bunny");
const panda = document.getElementById("panda");
const elephent = document.getElementById("elephant");
const dino = document.getElementById("dino");
const unicorn = document.getElementById("unicorn");
// Pet roster variable
const displayOption = document.querySelector("#movies");
const movies = document.querySelectorAll("#movies img");

// Adjusting cart variables
const cartForm = document.getElementById("cart_form");
const cartInput = document.getElementById("cart_input");
const selectedMovie = document.getElementById("selected_movie");
const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const added = document.getElementById("added");
const back = document.getElementById("back");

// Cart variables related to cost and quantity
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const subtotal = document.getElementById("subtotal");
const cartTotal1 = document.getElementById("cart_total1");
const cartTotal2 = document.getElementById("cart_total2");

// Checkout variables
const checkout1 = document.getElementById("checkout1");
const checkout2 = document.getElementById("checkout2");
const checkout2Div = document.getElementById("checkout2_div"); // The div isn't an input so I don't think I can use it to manipulate the "submit" type in the checkout event listener
const checkoutForm = document.getElementById("checkout_form"); // Update on above comment: never mind, submit doesn't work but I'm keeping checkout2Div bc it's too much work to get rid of it
const checkoutDirections = document.getElementById("checkout_directions");
const summaryCheckout = document.getElementById("summary_checkout");
const continueShopping = document.getElementById("continue_shopping");
const checkoutReset = document.getElementById("checkout_reset");
const placeOrder = document.getElementById("place_order");
const radioAmex = document.getElementById("radio_amex");
const radioVisa = document.getElementById("radio_visa");

// Cart array variable
const cart = [];

// keep track of adopted quantity
let petQuan = 0;

if (bear){ 

    function shoppingCart(event) {
        event.preventDefault();
        let currentMovie = event.currentTarget;
        cartInput.classList.remove("hidden");
        selectedMovie.innerHTML = "You picked: " + currentMovie.title;

        console.log("Shopping Cart function works!");
    }

    quantity.addEventListener("change", subtotalFunc);

    function subtotalFunc() {
        let userQuantity = parseInt(quantity.value);
        let userPrice = parseFloat(price.value);
        let calcSubtotal = userQuantity * userPrice;
    
        subtotal.value = calcSubtotal.toFixed(2);

        console.log("Subtotal value is:", subtotal.value);
        console.log("Subtotal function works!");
    }

    function addToCart() {
        let movieTitle = selectedMovie.innerText.replace("You picked: ", "").trim();
        let userQuantity = parseInt(quantity.value);
        let userPrice = parseFloat(price.value);
        let calcSubtotal = userQuantity * userPrice;
    
        let existingMovie = cart.find(item => item.title === movieTitle);

        console.log("user quantity is " + userQuantity);

        if (existingMovie) {
            existingMovie.quantity += userQuantity;
            existingMovie.subtotal += calcSubtotal;
        }
        else {
            cart.push({
                title: movieTitle,
                quantity: userQuantity,
                subtotal: calcSubtotal
            });
            
            // let petArray = [];

            // //let x =  however u get the animal type/name img file name, eg. cat.png

            // petArray.push(x) * userQuantity;  // adding img name # of times u adopted
        }
        updateCartTotal();
        console.log("Here's what's in the cart:", cart);
        console.log("Cart length:", cart.length);
        console.log("Add To Cart function works!");

        // certificate
        // let getStarted = document.getElementById(get_started);
        // if (getStarted) {
        //     getStarted.addEventListener("click", addCertificates)
        //     function addCertificates () {
        //         for (let i=0; i < petArray.length; i++){
        //             let newCertificate = document.createElement("div");

        //             let profilePic = document.createElement("img");

        //             let customInfo = document.createElement("p");

        //             profilePic.src = "images/${petArray[i]}";

        //             // append

        //         }
        //     }
        // }
    }

    function updateCartTotal() {
        let totalMovies = cart.length;
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
        // cartTotal1.classList.remove("hidden");
        cartTotal1.innerHTML = `
            <p>Total Pet Types: ${totalMovies}</p>
            <p>Total Pets: ${totalQuantity}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `;
        cartTotal2.innerHTML = `
            <p>Total Pet Types: ${totalMovies}</p>
            <p>Total Pets: ${totalQuantity}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `;

        if (parseInt(totalQuantity) == 5){
            
            cartTotal2.innerHTML =`
            <p>Total Pet Types: ${totalMovies}</p>
            <p style = "color: red;">Total Pets: ${totalQuantity} *You've reached the maximum!*</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `
        }
        console.log("Update Cart Total function works!");
    }

    radioAmex.addEventListener("change", checkoutFunc);
    radioVisa.addEventListener("change", checkoutFunc);

    function checkoutFunc() {
            checkoutDirections.classList.remove("hidden");
            checkoutForm.classList.remove("hidden");
            displayOption.style.display = "none";

            let totalMovies = cart.length;
            let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
            let checkoutSubtotal = totalCost

            summaryCheckout.innerHTML = `
            <p>Pet Types: ${totalMovies}</p>
            <p>Pets: ${totalQuantity}</p>
            <p>Total: $${checkoutSubtotal.toFixed(2)}</p>
            `;
            console.log("radioAmex.checked:", radioAmex?.checked);
            console.log("radioVisa.checked:", radioVisa?.checked);
            console.log("Checkout function works!");
    }

    function contShopFunc() {
        checkoutForm.reset();
        checkoutDirections.classList.add("hidden");
        checkoutForm.classList.add("hidden");
        
        movies.forEach((movie) => {
            movie.classList.remove("hidden");
            
        });
        displayOption.style.display = "flex";
    }

    function receipt(event) { // This is more like the order and receipt function but I didn't want the name to be too long
        if (event.submitter === placeOrder) { // Check if the target was the specific submit button aka the Place Order button
            console.log("Place Order button was clicked");
            
            let text = "<h2 id='thanks'>Thanks for visiting Adopt a Pal &lt;3</h2><p>Here is your receipt!</p><ul>";
            let isValid = true; // Flag to track validity
            let cardTypeSelected = radioAmex.checked || radioVisa.checked;
            
            let totalMovies = cart.length;
            let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
            let checkoutSubtotal = totalCost

            text += `<li>Total: $${checkoutSubtotal.toFixed(2)}</li>`

            // The for loop below iterates over various responses when the Place Order button is clicked
            // Examples include error messages, a receipt window that appears if there's no error, etc.
            for (let i = 0; i < checkoutForm.elements.length; i++) { 
                const element = checkoutForm.elements[i];
                if (element.type === "submit" || element.type === "reset") { // Makes sure that the Continue Shopping, Reset, and Place Order buttons are... 
                    continue;                                                // skipped in the loop, preventing their value from being included in the receipt
                }
                if (element.name === "phone") {
                    const phoneNumberPattern = /^\d{10}$/; // Regular expression for exactly 10 digits
                    // const phoneNumberPattern = /^(\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/; // Regular expression for 10 digits with flexible formatting
                    if (!phoneNumberPattern.test(element.value)) {
                        console.log("Invalid phone number at i =", i);
                        alert("Please enter a valid 10-digit phone number");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                if (element.name === "credit_card") {
                    const cardNumberPattern = /^\d{15,16}$/; // Regular expression for exactly 15 OR 16 digits
                    if (!cardNumberPattern.test(element.value)) {
                        console.log("Invalid card number at i =", i);
                        alert("Please enter a valid 15-digit or 16-digit card number");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                if (element.name === "creditCVV") {
                    const cardNumberPattern = /^\d{3,4}$/; // Regular expression for exactly 3 OR 4 digits
                    if (!cardNumberPattern.test(element.value)) {
                        console.log("Invalid card number at i =", i);
                        alert("Please enter a valid 3-digit or 4-digit CVV or CVC");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                // if (element.name === "creditExpDate") { // FIX THIS PART!
                //     const cardNumberPattern = /^\d{4}$/;
                //     if (!cardNumberPattern.test(element.value)) {
                //         console.log("Invalid card number at i =", i);
                //         alert("Please enter a valid credit card expiration date");
                //         element.value = "";
                //         element.focus();
                //         element.select();
                //         element.style.backgroundColor = "rgb(255, 222, 228)";
                //         isValid = false;
                //         return;
                //     }
                //     else {
                //         element.style.backgroundColor = "";
                //     }
                // }
                if (element.value === "" || element.value === null) {
                    
                    console.log("Alert triggered at i =", i);
                    
                    // Different alert messages pop up depending on which input the user has incorrectly filled out
                    if (element.name === "first_name") {
                        alert("Please enter a first name");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else if (element.name === "last_name") {
                        alert("Please enter a last name");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else if (element.name === "email") {
                        alert("Please enter an email address");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                }
                else {
                    element.style.backgroundColor = "";
                }
            } // The first nested for loop is closed; the stuff below is directly inside the if statement

            if (isValid && !cardTypeSelected) {
                console.log("Card type not selected");
                alert("Please select a credit card");
                return;
            }

            // Below is the receipt information 
            for (let i = 0; i < checkoutForm.elements.length; i++) { // Iterates over elements in the checkout form
                const element = checkoutForm.elements[i];

                if (element.type === "radio") {
                    if (radioAmex.checked && element.id === "radio_amex") {
                        text += "<li>Credit Card: Amex</li>";
                    }
                    else if (radioVisa.checked && element.id === "radio_visa") {
                        text += "<li>Credit Card: Visa</li>";
                    }
                }
                else {
                    if (element.name === "first_name") {
                        text += "<li>First Name: " + element.value + "</li>";
                    }
                    if (element.name === "last_name") {
                        text += "<li>Last Name: " + element.value + "</li>";
                    }
                    if (element.name === "email") {
                        text += "<li>Email: " + element.value + "</li>";
                    }
                    if (element.name === "phone") {
                        text += "<li>Phone Number: " + element.value + "</li>";
                    }
                    if (element.name === "credit_card") {
                        const cardNumber = element.value;
                        if (cardNumber.length === 15 || cardNumber.length === 16) {
                            // Mask the card number
                            const maskedNumber = cardNumber.slice(0, -4).replace(/\d/g, "*") + cardNumber.slice(-4);
    
                            text += "<li> Credit Card Number: " + maskedNumber + "</li>"; // Card number is masked
                        }
                    }
                }
                // Display credit card + all hidden checkout elements in the receipt here
            }

            console.log("Order placed successfully!"); // Nested in the "let text" assignment statement to avoid incorrect logs & duplicates
            console.log("Here's what's in the cart:", cart); // Info for for certificate!
            
            text += "</ul>";
            // Open receipt in a new document
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Your Receipt</title>
                    <style>
                        body { 
                            background: linear-gradient(rgb(209, 255, 255), rgb(240, 255, 255)) no-repeat fixed center center / cover;
                        }

                        #receipt {
                            font-family: helvetica;
                            font-weight: bold;
                            font-size: 18px;
                            border: rgb(28, 88, 147);
                            border-width: 5px;
                            border-style: solid;
                            border-radius: 25px;
                            background-color: white;
                            color: rgb(28, 88, 147);
                            max-width: 500px;
                            margin: 20px auto;
                            padding: 20px;
                            box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.248);
                        }
                        
                        #thanks {
                            text-align: center;
                        }
                        
                        button {
                            font-size: 16px;
                            font-weight: bold;
                            font-family: helvetica;
                            padding: 5px 10px;
                            background-color: white;
                            border-radius: 1px;
                            border-color: whitesmoke;
                            color: rgb(28, 88, 147);
                        }

                        #certify_div {
                            margin: auto;
                            text-align: center;
                        }

                        ul{
                            line-height: 25px;
                        }

                        #info {
                            list-style-type: none;
                            padding: 0;
                        }
                    </style>
                </head>
                <body>
                    <style>
                        nav{
                            margin: 0px;
                            padding-bottom: 25px;
                        }
                        nav ul {
                            list-style: none;
                            background-color: #a7e5fa;
                            text-align: center;
                            padding: 0;
                            margin: 0;
                            display: flex;
                        }

                        nav ul li {
                            flex-grow: 1;
                            padding: 20px;
                            position: relative;
                            text-align: center;
                        }

                        nav ul li a {
                            text-decoration: none;
                            color: rgb(28, 88, 147);
                            padding: 15px 20px;
                            display: block;
                            font-size: 1.8vw;
                            font-family: helvetica;
                        }

                        nav ul li:hover,
                        nav ul li a:hover {
                            background-color: #d7f5ff;
                        }
                        body {
                            margin-left: 0px;
                            margin-right: 0px;
                        }
                        #adoption_tab {
                            width: 50%;
                        }
                        #hangout_tab {
                            width: 50%;
                        }
                    </style>
                    <nav>
                        <ul>
                            <li id="adoption_tab">
                                <a href = "adoption.html">
                                    <b>Adoption Center</b>
                                </a>
                            </li>
                    
                            <li id="hangout_tab">
                                <a href = "hangout.html">
                                    <b>Hangout</b>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div id="receipt">`+ text +`
                       <!-- <div id="certify_div"> -->
                            <!-- <button id="goCertify">Certify Your Adoption!</button> -->
                        <!-- </div> -->
                    </div>
                    <script>
                        let goCertify = document.querySelector("#goCertify");

                        goCertify.addEventListener('click', function() {
                            window.location.href = 'certificate.html';
                        });
                    </script>
                </body>
                </html>`
            );
            console.log(text);
        }
    } // End of receipt function

    // Add event listeners for each pet image when clicked
    for (let poster = 0; poster < movies.length; poster++){
        movies[poster].addEventListener("click", (event) => {
            event.preventDefault();
            shoppingCart(event);
            subtotalFunc();
            added.classList.add("hidden");
            
            cartTotal1.classList.add("hidden");
            cartTotal2.classList.remove("hidden");
            checkout2Div.classList.add("hidden"); // Second Checkout button disappears when selecting a pet
            
            cartForm.reset();
        })
    }

    cancel.addEventListener("click", (event) => {
        event.preventDefault();
        cartInput.classList.add('hidden');
        
        cartTotal1.classList.remove("hidden");
        cartTotal2.classList.add("hidden");
        
        if (cart.length >= 1) { // Second Checkout button appears on Cancel button click if cart length >= 1
            checkout2Div.classList.remove("hidden");
        }
        
        console.log("Cart length:", cart.length);
        
        cartForm.reset();
    })

    back.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");
        
        cartTotal1.classList.remove("hidden");
        cartTotal2.classList.add("hidden");
        checkout2Div.classList.remove("hidden"); // Second Checkout button appears on Back button click
        
        console.log("Cart length:", cart.length);
        
        cartForm.reset();
    })

    submit.addEventListener("click", (event) => {
        event.preventDefault();

        console.log(parseInt(quantity.value));

        if (parseInt(quantity.value) > 5){
            console.log("max exceeded");
            alert("You've exceeded our Pal Adoption limit! To ensure the best care for our adopted Pals, we have a 5-pal limit. Please re-enter your desired quanity.");
            cartForm.reset();
            return;
        }

        else if ((petQuan + parseInt(quantity.value)) > 5){
            console.log("max exceeded");
            console.log("current total = " + (petQuan + parseInt(quantity.value)));
            alert("You've exceeded our Pal Adoption limit! To ensure the best care for our adopted Pals, we have a 5-pal limit. Please re-enter your desired quanity.");
            cartForm.reset();
            return;
        }

        // If the user inputs an integer number greater than zero
        else if (quantity.value > 0 && Number.isInteger(+quantity.value) == true) { 
            addToCart();
            cartInput.classList.add("hidden");
            added.classList.remove("hidden");
            
            console.log("User quantity input value:", quantity.value);
            // console.log(Number.isInteger(+quantity.value));

            petQuan += parseInt(quantity.value);

            cartForm.reset();
            return;
        }

        // If the user leaves the space blank
        else if (quantity.value === "") { 
            alert("Please enter a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        // If the user imputs a number less than or equal to 0
        else if (quantity.value <= 0) { 
            alert("Please enter a quantity greater than zero");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        // If the user inputs a decimal number/float less than 1 but greater than zero
        else if (quantity.value <1 && quantity.value >0) { 
            alert("Please use whole numbers when entering a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        else { // If the user inputs a decimal number/float greater than 1
            alert("Please use whole numbers when entering a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }
    })

    checkout1.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");

        movies.forEach((movie) => {
            movie.classList.add("hidden");
        });

        cartTotal1.classList.add("hidden");
        cartTotal2.classList.add("hidden");
        
        checkoutFunc();
    })

    checkout2.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");
        checkout2Div.classList.add("hidden"); // Makes the second Checkout button and the div that it's in disappear
        
        movies.forEach((movie) => {
            movie.classList.add("hidden");
        });
        
        cartTotal1.classList.add("hidden");
        cartTotal2.classList.add("hidden");
        
        checkoutFunc();
    })

    continueShopping.addEventListener("click", (event) => {
        event.preventDefault();
        cartTotal1.classList.remove("hidden");
        checkout2Div.classList.remove("hidden"); // Second Checkout button appears on Continue Shopping button click
        summaryCheckout.innerHTML = "";
        
        contShopFunc();
    })

    checkoutReset.addEventListener("click", (event) => {
        event.preventDefault();
        checkoutForm.reset();
    })

    checkoutForm.addEventListener("submit", (event) => { // Everything that happens when the user tries to place an order during checkout
        event.preventDefault();
        receipt(event);
    })
}

// certificate


// hangout
const hangout = document.querySelector("#hangout");
const welcome = document.querySelector("#welcome");
const area = document.querySelector("#area");
const setting = document.querySelector("#setting");
const test = document.querySelector("#test");
let numInfoOpened = 0;
let palId = 0;

if (area){

    // make dynamic based on background
    setting.addEventListener("change", changeSet);

    function changeSet(){
        const hangoutTheme = setting.value;
        let selectedOption = setting.options[setting.selectedIndex];
        console.log(selectedOption)
        welcome.innerText = "Welcome to your " + selectedOption.dataset.name + "!";
        
        hangout.style.background = "url('images/" + selectedOption.dataset.code + "') no-repeat scroll left bottom /cover";
    }

    // once certificate submitted, take you to this page, add animal

    test.addEventListener("click", addAnimal);

    function addAnimal(){
        let newPal = document.createElement('div');
        newPal.classList.add("newPal");
        newPal.draggable = true;

        let animalPic = document.createElement('img');
        animalPic.src = "images/bunny.png"
        animalPic.classList.add("animalPic");
        animalPic.draggable = true;

        newPal.id = 'newPal' + palId++;
        animalPic.id = 'animalPic' + palId;
        

        newPal.appendChild(animalPic);
        area.appendChild(newPal);

        animalPic.addEventListener('dragstart', function(e) {
            // Store the image's ID for tracking
            console.log('Dragstart fired');
            e.dataTransfer.setData('text/plain', newPal.id);
            
            // Optional: Add visual feedback during drag
            setTimeout(() => {
                newPal.classList.add('dragging');
            }, 0);
        });

        animalPic.addEventListener('dragend', function() {
            newPal.classList.remove('dragging');
        });

        // Existing info box opening logic
        animalPic.addEventListener('click', openInfo);

        function openInfo(event){
            event.stopPropagation();

        if (numInfoOpened < 1){
                let infoBox = document.createElement('div');
                infoBox.classList.add('info');
                let infoName = document.createElement('h2');
                infoName.innerText = "the" ;//name of pal + the + animal type
                infoName.classList.add('palName');
                let infoPronoun = document.createElement('p');
                infoPronoun.innerText = "( )" ; //pronouns
                infoPronoun.classList.add('palPronoun');
                let infoPersonality = document.createElement('p');
                infoPersonality.innerText = "Personality: ";
                let infoHobbies = document.createElement('p');
                infoHobbies.innerText = "Hobbies: ";
                let infoColor = document.createElement('p');
                infoColor.innerText = "Favorite Color: ";
                let infoFood = document.createElement('p');
                infoFood.innerText = "Favorite Food: ";
                let infoDislike = document.createElement('p');
                infoDislike.innerText = "Dislikes: ";
                infoDislike.innerHTML += "<hr>"

                let infoDateAdopted = document.createElement('p');
                infoDateAdopted.innerText = "Date of Adoption: ";

                let exitBt = document.createElement('div');
                exitBt.classList.add('exit');
                exitBt.innerText = '×';  
                
                // add info to certificate box
                infoBox.append(infoName, infoPronoun, infoPersonality, infoHobbies, infoColor, infoFood, infoDislike, exitBt);

                newPal.appendChild(infoBox); // change to add to created animal pic div

                numInfoOpened += 1;

                exitBt.onclick = function(){
                    numInfoOpened -= 1;
                    infoBox.remove();

                }
            }
            
        }
    }


    area.addEventListener('dragover', function(e) {
        console.log('Dragover fired');
        e.preventDefault(); // Allow dropping
    });

    area.addEventListener('drop', function(e) {
        console.log('Drop fired');
        console.log('Dragged ID:', e.dataTransfer.getData('text/plain'));
        e.preventDefault();
        
        // Get the ID of the dragged image
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedPal = document.getElementById(draggedId);
        
        if (draggedPal) {
            // Calculate drop position relative to the area
            const areaRect = area.getBoundingClientRect();
            const dropX = e.clientX - areaRect.left - (draggedPal.offsetWidth / 2);
            const dropY = e.clientY - areaRect.top - (draggedPal.offsetHeight / 2);
            
            // Update image position
            draggedPal.style.left = `${dropX}px`;
            draggedPal.style.top = `${dropY}px`;
        }

        console.log("hi")
    });

}
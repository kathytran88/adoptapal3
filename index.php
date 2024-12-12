<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="UTF-8">
        <title>Adopt A Pal</title>
        <link rel="stylesheet" href="adoptAPal.css">
    </head>
    <header>
        
    </header>
    <body>
        <h1>Adopt A Pal</h1>
        
        <?php
    // This is to make the username appear
    session_start();
    if (isset($_SESSION['username'])) {
        $username = htmlspecialchars($_SESSION['username']); 
        echo "<p class='welcome-message'>Welcome, $username!</p>";
    }
    ?>
    
        <div class="top-links">
            <a href="signup.php" class="nav-link">Sign Up</a>
            <a href="login.php" class="nav-link">Login</a>
            <a href="search.php" class="nav-link">Search</a>
        </div>

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

                <!-- <li>
                    <a href = "about.html">
                        <b> History </b>
                    </a>
                </li> -->
            </ul>
        </nav>

        <div id="cart_total1">
            <p>Total Pet Types: 0</p>
            <p>Total Pets: 0</p>
            <p>Total Cost: $0.00</p>
        </div>
        <div id="cart_total2" class="hidden">
            <p>Total Pet Types: 0</p>
            <p>Total Pets: 0</p>
            <p>Total Cost: $0.00</p>
        </div>
        <div id="checkout2_div" class="hidden">
            <label for="checkout2"></label>
            <input type="submit" value="Checkout" name="checkout2" id="checkout2" class="buttons">
        </div>
        
        <!--Form #1: Add to cart form-->
        <form name="cart_form" id="cart_form"> 
            <div id="cart_input" class="form_group hidden">
                <div id="selected_movie">
                </div>
                <div class="input_labels">
                    <label for="quantity">Quantity:</label>
                    <input type="number" name="quantity" id="quantity" class="inputs" placeholder="Enter a quantity" min="1">
                </div>
    
                <div class="input_labels">
                    <label for="price">Price:</label>
                    <input type="number" name="price" id="price" class="inputs" value="10.00" readonly>
                </div>
    
                <div class="input_labels">
                    <label for="subtotal">Subtotal:</label>
                    <input type="number" name="subtotal" id="subtotal" class="inputs" placeholder="Calculated subtotal" readonly>
                </div>
                
                <div id="button_div">
                    <label for="submit"></label>
                    <input type="submit" value="Submit" name="submit" id="submit" class="buttons">
                    
                    <label for="cancel"></label>
                    <input type="submit" value="Cancel" name="cancel" id="cancel" class="buttons">
                </div>
            </div>
            <div id="added" class="hidden">
                <p>Your selection has been added to your cart &lt;3</p>
                
                <label for="checkout1"></label>
                <input type="submit" value="Checkout" name="checkout1" id="checkout1" class="buttons">
                
                <label for="back"></label>
                <input type="submit" value="Back" name="back" id="back" class="buttons">
            </div>
        </form>
        
        <!--Form #2: Checkout form-->
        <form action="#" name="checkout_form" id="checkout_form" class="hidden">
            <p id="checkout_directions" class="hidden">Fill out the form below to place your order</p>
            
            <div id="summary_checkout"></div>
            
            
            <div id="creditInfo">
                <h3> Credit Card Information</h3>
                <hr>
                <label for="first_name" class="checking_out"></label>
                <input type="text" id="first_name" name="first_name" placeholder= "First Name">
                
                <label for="last_name" class="checking_out"></label>
                <input type="text" id="last_name" name="last_name"  placeholder= "Last Name"><br>
                
                <label for="email" class="checking_out"> Email: </label><br>
                <input type="email" id="email" name="email">

                <label for="phone" class="checking_out"> Phone Number: </label><br>
                <input type="number" id="phone" name="phone"><br>

                <label for="credit_card" class="checking_out"></label>
                <input type="number" id="credit_card" name="credit_card" placeholder= "Card Number"><br>

                <label for="creditCVV" class="checking_out"></label>
                <input type="text" id="creditCVV" name="creditCVV" placeholder= "CVV/CVC">

                <label for="creditExpDate" class="checking_out"></label>
                <input type="text" id="creditExpDate" name="creditExpDate" placeholder= "Expiration Date (MM/YY)"><br><br>
                
                <div class="radio-group">
                    <span>Credit Card:</span>
                    <div id="amex_group">
                        <input id="radio_amex" name="card_type" type="radio" value="Amex">
                        <label for="radio_amex">Amex</label>
                    </div>
                    <div id="visa_group">
                        <input id="radio_visa" name="card_type" type="radio" value="Visa">
                        <label for="radio_visa">Visa</label>
                    </div>
                </div>
                <br>     
            </div>
            <!-- <br> -->
            <div class="form2buttons">
                <label for="continue_shopping"></label>
                <input name="continue_shopping" id="continue_shopping" class="buttons" type="submit" value="Continue Shopping"> <!--Takes user back to shopping page aka re-appears posters, cart, etc. that was hidden-->
                
                <label for="checkout_reset"></label>
                <input name="checkout_reset" id="checkout_reset" class="buttons" type="reset" value="Reset">
                
                <label for="place_order"></label>
                <input name="place_order" id="place_order" class="buttons" type="submit" value="Place Order">
            </div>
        </form>
        
        <!--Pets! :)-->
        
        <div id="movies" class="row">
    <div class="product" data-animal="Beloved Bear">
        <img src="images/bear.png" id="bear" class="column" alt="Beloved Bear" title="Beloved Bear" style="width:100%">
        <p>Beloved Bear</p>
    </div>
    <div class="product" data-animal="Dashing Dog">
        <img src="images/dog.png" id="dog" class="column" alt="Dashing Dog" title="Dashing Dog" style="width:100%">
        <p>Dashing Dog</p>
    </div>
    <div class="product" data-animal="Charismatic Cat">
        <img src="images/cat.png" id="cat" class="column" alt="Charismatic Cat" title="Charismatic Cat" style="width:100%">
        <p>Charismatic Cat</p>
    </div>
    <div class="product" data-animal="Gentle Giraffe">
        <img src="images/giraffe.png" id="giraffe" class="column" alt="Gentle Giraffe" title="Gentle Giraffe" style="width:100%">
        <p>Gentle Giraffe</p>
    </div>
    <div class="product" data-animal="Bashful Bunny">
        <img src="images/bunny.png" id="bunny" class="column" alt="Bashful Bunny" title="Bashful Bunny" style="width:100%">
        <p>Bashful Bunny</p>
    </div>
    <div class="product" data-animal="Playful Panda">
        <img src="images/panda.webp" id="panda" class="column" alt="Playful Panda" title="Playful Panda" style="width:100%">
        <p>Playful Panda</p>
    </div>
    <div class="product" data-animal="Elegant Elephant">
        <img src="images/elephant.png" id="elephant" class="column" alt="Elegant Elephant" title="Elegant Elephant" style="width:100%">
        <p>Elegant Elephant</p>
    </div>
    <div class="product" data-animal="Dauntless Dino">
        <img src="images/dino.png" id="dino" class="column" alt="Dauntless Dino" title="Dauntless Dino" style="width:100%">
        <p>Dauntless Dino</p>
    </div>
    <div class="product" data-animal="Unique Unicorn">
        <img src="images/unicorn.webp" id="unicorn" class="column" alt="Unique Unicorn" title="Unique Unicorn" style="width:100%">
        <p>Unique Unicorn</p>
    </div>
</div>

<script src='adoptAPal.js'></script>
    </body>
</html>
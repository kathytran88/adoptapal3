<?php
$username = '';
$password = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['reset'])) {
        // Reset button
        $username = '';
        $password = '';
    } else {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $users = file("users.txt", FILE_IGNORE_NEW_LINES);

        $user_exists = false;
        foreach ($users as $user) {
            list($stored_username, ) = explode(",", $user);
            if ($stored_username === $username) {
                $user_exists = true;
                break;
            }
        }

        if ($user_exists) {
            echo "<div class='error-message'>User already exists. Please log in instead.</div>";
        } elseif (!preg_match('/^(?=.*\d)[A-Za-z\d]{5,}$/', $password)) {
            echo "<div class='error-message'>Password must be at least 5 characters long and contain at least 1 number.</div>";
        } else {
            $file = fopen("users.txt", "a");
            fwrite($file, "$username,$password\n");
            fclose($file);
            echo "<div class='success-message'>Account created successfully! You can now log in.</div>";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - Adopt a Pal</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="signup-container">
    <header class="signup-header">
        <h1>Adopt a Pal</h1>
        <p>Create your account to start your journey!</p>
    </header>

    <main>
        <form method="post" class="signup-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($username); ?>" placeholder="Enter your username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" value="<?php echo htmlspecialchars($password); ?>" placeholder="Enter your password" required>
            </div>
            <div class="form-actions">
                <button type="submit">Sign Up</button>
                <button type="submit" name="reset" class="reset-btn">Reset</button>
            </div>
        </form>
    </main>

    <footer class="signup-footer">
        <p>Already have an account? <a href="login.php">Log In</a></p>
    </footer>
</div>
</body>
</html>





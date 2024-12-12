<?php
session_start();

$username = '';
$password = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['reset'])) {
        // reset button
        $username = '';
        $password = '';
    } else {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $users = file("users.txt", FILE_IGNORE_NEW_LINES);

        $is_valid = false;
        foreach ($users as $user) {
            list($stored_username, $stored_password) = explode(",", $user);
            if ($stored_username === $username && $stored_password === $password) {
                $is_valid = true;
                break;
            }
        }

        if ($is_valid) {
            $_SESSION["username"] = $username;
            header("Location: index.php");
            exit();
        } else {
            echo "<div class='error-message'>Invalid username or password</div>";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In - Adopt a Pal</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="signup-container">
    <header class="signup-header">
        <h1>Adopt a Pal</h1>
        <p>Please fill out your information to log in</p>
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
                <button type="submit">Log In</button>
                <button type="submit" name="reset" class="reset-btn">Reset</button>
            </div>
        </form>
    </main>

    <footer class="signup-footer">
        <p>Don't have an account? <a href="signup.php">Sign up</a> now!</p>
    </footer>
</div>
</body>
</html>






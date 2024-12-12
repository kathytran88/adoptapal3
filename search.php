<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $searchQuery = strtolower(trim($_POST['search']));
    $animals = file("db.txt", FILE_IGNORE_NEW_LINES); 

    $result = "Sorry, we couldn't find any plushie matching your search.";

    foreach ($animals as $animal) {
        list($name, $price, $color, $description) = explode(",", $animal);
        if (strpos($searchQuery, $name) !== false) {
            $result = "<div class='result'>
                <h2>" . ucfirst($name) . " Plushie</h2>
                <p><strong>$price</strong></p>
                <p><strong>$color</strong></p>
                <p>$description</p>
            </div>";
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Plushies</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #f7e8ff, #f0f8ff);
        }
        .container {
            text-align: center;
            padding: 50px 20px;
        }
        .search-bar {
            margin: 20px auto;
            max-width: 400px;
        }
        .search-bar input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ccc;
            border-radius: 5px;
        }
        .search-bar button {
            margin-top: 10px;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #ff69b4;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .search-bar button:hover {
            background-color: #ff1493;
        }
        .result {
            margin-top: 20px;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .result h2 {
            margin: 0;
            color: #333;
        }
        .result p {
            margin: 5px 0;
        }
        .home-button {
            display: inline-block;
            margin-top: 30px;
            padding: 10px 20px;
            font-size: 16px;
            text-decoration: none;
            background-color: #4682b4;
            color: white;
            border-radius: 5px;
        }
        .home-button:hover {
            background-color: #5b9bd5;
        }
        @media (max-width: 600px) {
            .search-bar input, .search-bar button {
                font-size: 14px;
            }
            .result {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Find Your Perfect Plushie!</h1>
        <form method="post" class="search-bar">
            <input type="text" name="search" placeholder="Search for a plushie..." required>
            <button type="submit">Search</button>
        </form>
        <?php if (!empty($result)): ?>
            <?php echo $result; ?>
        <?php endif; ?>
        <a href="index.php" class="home-button">Back to Home</a>
    </div>
</body>
</html>

let isButtonClicked = false;
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", function () {
    const selectedCategory = document.getElementById("category").value;
    fetchRandomeQuote(selectedCategory);
    isButtonClicked = true;
});


function fetchRandomeQuote(category) {
    const apiKey = "IdRvavWGykOXoCDvwIhMcw==N7beOQzYqzVprS0H";
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${encodeURIComponent(
        category
    )}`;

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex].quote;
            const author = data[randomIndex].author;
            displayGeneratedQuote(randomQuote);
            displayQuoteAuthor(author);
        } else {
            displayGeneratedQuote(
                "No quotes found for this categroy right at moment"
            );
        }

    })
    .catch((error) => {
        console.error("Error", error);
        displayGeneratedQuote("Error fetching quotes");
    });
    function displayGeneratedQuote(quote) {
        const outputItem = document.getElementById("output-item");
        outputItem.classList.remove("hidden");
        outputItem.classList.add("flex");
        const outputElement = document.querySelector(".quote");

        outputElement.textContent = quote;
    }

    function displayQuoteAuthor(author) {
        const quoteAuthor = document.getElementById("author");
        quoteAuthor.textContent = author;
    }
}

// Add an event listener to the 'Copy Quote' button
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", function () {
    const quoteText = document.querySelector(".quote").textContent; // Use textContent to get the quote text
    copyToClipboard(quoteText);
});

// Function to copy the quote to the clipboard
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            // Update the button text to 'Copied!' temporarily
            copyBtn.textContent = "Copied!";

            // Revert back to the original text after 2 seconds
            setTimeout(() => {
                copyBtn.textContent = "Copy";
            }, 2000);
        })
        .catch((err) => {
            console.error("Error copying to clipboard: ", err);
            alert("Failed to copy quote to clipboard.");
        });
}

window.addEventListener("load", function () {
    if (!isButtonClicked) {
        const outputItem = document.getElementById("output-item");
        outputItem.classList.remove("flex");
        outputItem.classList.add("hidden");
    }
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const categoryGrid = document.querySelector(".category-grid");
    const toyGrid = document.getElementById("toy-grid");

    // Fetch categories and toys from the JSON file
    fetch("toys.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            const categories = data.categories;

            // Clear the category grid to avoid duplicates
            categoryGrid.innerHTML = "";

            // Dynamically display categories and set the default category
            categories.forEach((category, index) => {
                const categoryDiv = document.createElement("div");
                categoryDiv.className = "category";
                categoryDiv.textContent = category.name;

                // Add click event to display toys for the selected category
                categoryDiv.addEventListener("click", () => {
                    displayToysByCategory(category.toys);
                });

                categoryGrid.appendChild(categoryDiv);

                // Display the first category's toys by default
                if (index === 0) {
                    displayToysByCategory(category.toys);
                }
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

// Function to display toys in the grid for a selected category
function displayToysByCategory(toys) {
    const toyGrid = document.getElementById("toy-grid");
    toyGrid.innerHTML = ""; // Clear the grid before displaying new toys

    toys.forEach(toy => {
        const toyDiv = document.createElement("div");
        toyDiv.className = "toy-item";
        toyDiv.innerHTML = `
            <img src="${toy.image}" alt="${toy.name}">
            <h4>${toy.name}</h4>
            <p>&#8377;${toy.price.toFixed(2)}</p>
            <button onclick="addToCart('${toy.name}')">Buy Now</button>
        `;
        toyGrid.appendChild(toyDiv);
    });
}

// Function to handle adding a toy to the cart
function addToCart(toyName) {
    alert(`${toyName} has been added to your cart!`);
}

// document.addEventListener("DOMContentLoaded", () => {
//     const birdTypeSelect = document.getElementById("bird-type")
//     const birdStatusDiv = document.getElementById("bird-status")
  
//     birdTypeSelect.addEventListener("change", function () {
//       if (this.value !== "") {
//         birdStatusDiv.classList.remove("hidden")
//       } else {
//         birdStatusDiv.classList.add("hidden")
//       }
//     })
//   })
function goBack() {
    window.location.href = "index.html"; // Redirects to the home page
}

function filterTable() {
    let input = document.getElementById("search").value.toUpperCase();
    let table = document.getElementById("reportTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toUpperCase().includes(input) ? "" : "none";
        }
    }
}



// Function to delete a row
function deleteRow(button) {
    if (confirm("Are you sure you want to delete this row?")) {
        let row = button.parentElement.parentElement;
        row.remove();
    }
}

// Function to add a new customer
function addCustomer() {
    let table = document.getElementById("reportTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let srNo = table.rows.length; // Auto-increment SR.n
    let customerName = document.getElementById("customerName").value;
    let date = document.getElementById("date").value;
    let udhari = document.getElementById("udhari").value;
    let nag = document.getElementById("nag").value;
    let weight = document.getElementById("weight").value;
    let rate = document.getElementById("rate").value;
    let saleAmount = document.getElementById("saleAmount").value;
    let closingBalance = document.getElementById("closingBalance").value;

    if (!customerName || !date) {
        alert("Customer Name and Date are required!");
        return;
    }

    let data = [srNo, customerName, date, udhari, nag, weight, rate, saleAmount, closingBalance];

    // Insert data into the table
    data.forEach((text, index) => {
        let cell = newRow.insertCell(index);
        cell.textContent = text;
        if (index !== 0) cell.contentEditable = "true"; // Make all columns (except SR.n) editable
    });

    // Add Delete button
    let actionCell = newRow.insertCell(data.length);
    actionCell.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;

    let actionCell2 = newRow.insertCell(data.length);
    actionCell2.innerHTML = `<button onclick="editRow(this)">Edit</button>`;

    let actionCell3 = newRow.insertCell(data.length);
    actionCell3.innerHTML = `<button onclick="saveRow(this)">Save</button>`;



    // Clear input fields
    document.querySelectorAll(".add-form input").forEach(input => input.value = "");
}

// Function to save changes
function saveChanges() {
    alert("Changes saved successfully! (Implement backend save functionality here)");
}

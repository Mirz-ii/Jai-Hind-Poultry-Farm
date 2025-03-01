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



// Open and close modal
const modal = document.getElementById("customerModal");
const addCustomerBtn = document.getElementById("addCustomerBtn");
const closeBtn = document.getElementsByClassName("close")[0];

addCustomerBtn.onclick = function () {
    modal.style.display = "block";
};

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Save customer details
function saveCustomer() {
    let table = document.getElementById("customerTable").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${table.rows.length}</td>
        <td>${document.getElementById("customerName").value}</td>
        <td>${new Date().toISOString().split('T')[0]}</td>
        <td>${document.getElementById("udhar").value}</td>
        <td>${document.getElementById("nag").value}</td>
        <td>${document.getElementById("weight").value}</td>
        <td>${document.getElementById("rate").value}</td>
        <td>${document.getElementById("saleAmount").value}</td>
        <td>${document.getElementById("closingBalance").value}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    modal.style.display = "none";
    document.getElementById("customerName").value = "";
    document.getElementById("udhar").value = "";
    document.getElementById("nag").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("saleAmount").value = "";
    document.getElementById("closingBalance").value = "";
}

// Delete customer row
function deleteRow(btn) {
    let row = btn.parentElement.parentElement;
    row.parentElement.removeChild(row);
}

document.addEventListener("DOMContentLoaded", function () {
    populateDropdown();
});

// Function to populate the dropdown with customer names
function populateDropdown() {
    let customers = Array.from(document.querySelectorAll("table tbody tr td:nth-child(2)")) // Select Customer Name Column
                         .map(td => td.textContent.trim());
    
    let uniqueCustomers = [...new Set(customers)]; // Remove duplicates
    let dataList = document.getElementById("customerList");
    
    dataList.innerHTML = ""; // Clear previous options
    uniqueCustomers.forEach(name => {
        let option = document.createElement("option");
        option.value = name;
        dataList.appendChild(option);
    });
}

// Function to filter the table based on search input
function filterTable() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        let customerName = row.cells[1].textContent.toLowerCase(); // Customer Name Column
        row.style.display = customerName.includes(searchText) ? "" : "none";
    });
}


// Function to load the saved rate and report from local storage
function loadRate() {
    let savedRate = localStorage.getItem("chickenRate");
    let savedReport = JSON.parse(localStorage.getItem("rateReport")) || [];

    if (savedRate) {
        document.getElementById("currentRate").textContent = savedRate;
    } else {
        document.getElementById("currentRate").textContent = "Not Set";
    }

    // Load report history
    let reportTable = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
    reportTable.innerHTML = ""; // Clear table before adding data
    savedReport.forEach(entry => {
        let row = reportTable.insertRow();
        row.insertCell(0).textContent = entry.dateTime;
        row.insertCell(1).textContent = `₹${entry.rate}/kg`;
    });
}

// Function to update the rate
function updateRate() {
    let newRate = document.getElementById("newRate").value;
    if (newRate) {
        // Save the new rate
        localStorage.setItem("chickenRate", newRate);
        document.getElementById("currentRate").textContent = newRate;

        // Add to report history
        let reportTable = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
        let row = reportTable.insertRow();
        let now = new Date().toLocaleString();
        row.insertCell(0).textContent = now;
        row.insertCell(1).textContent = `₹${newRate}/kg`;

        // Save report to local storage
        let savedReport = JSON.parse(localStorage.getItem("rateReport")) || [];
        savedReport.unshift({ dateTime: now, rate: newRate }); // Add new entry at the top
        localStorage.setItem("rateReport", JSON.stringify(savedReport));

        alert("Rate updated successfully!");
        document.getElementById("newRate").value = ""; // Clear input field
    } else {
        alert("Please enter a valid rate.");
    }
}

// Load data when page loads
window.onload = loadRate;

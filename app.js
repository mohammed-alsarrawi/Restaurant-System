// Add Event Form
document.getElementById('order-form').addEventListener('submit', handleForm);

// Load Orders | DOMContentLoaded = When the Document is Fully Loaded
document.addEventListener('DOMContentLoaded', loadOrdersFromLocalStorage);

//Orders to View it on Cards
let orders = [];

// Handle Form
function handleForm(e) {
  e.preventDefault();

  // Collect Form Fields Values
  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value;

  // Collect Checkbox Values
  const orderType = [];
  if (document.getElementById('shawarma').checked) orderType.push('Shawarma');
  if (document.getElementById('zinger').checked)   orderType.push('Zinger');
  if (document.getElementById('burger').checked)   orderType.push('Burger');

  // Collect Radio Value
  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  const imageUrl = "customer.png.png";

  const customer = new Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl);
  orders.push(customer);

  // Save the Updated OrderArray to LocalStorage
  localStorage.setItem('orders', JSON.stringify(orders));

  // Display the New Order Card
  renderOrders();
}

// Customer Constructor
function Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
}

//Displaying Cards
function renderOrders() {
  const ordersList = document.getElementById('orders-list');

  // Clear innerHTML from previous cards
  ordersList.innerHTML = ''; 

  //Create Cards for each Order
  for (let i = 0; i < orders.length; i++) {
    const customer = orders[i];
    
    //Create div Cards
    const orderCard = document.createElement('div');
    orderCard.classList.add('col-md-4', 'mb-4');
    
    //Insert customer details into the card
    orderCard.innerHTML = `
        <div class="card">
            <img src="imagesfff.png" class="card-img-top" alt="Customer Image">
            <div class="card-body">
                <h5 class="card-title">${customer.fullName}</h5>
                <p><strong>Order Type:</strong> ${customer.orderType.join(', ')}</p>
                <p><strong>Order Option:</strong> ${customer.orderOption}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Gender:</strong> ${customer.gender}</p>
                <p><strong>Date of Birth:</strong> ${customer.dob}</p>
            </div>
        </div>
    `;
    
    ordersList.appendChild(orderCard);
  }
}

// Fetches Cards From LocalStorge
function loadOrdersFromLocalStorage() {
  const storedOrders = JSON.parse(localStorage.getItem('orders'));
  if (storedOrders) {
    orders = storedOrders; // Store the Loaded Orders in the Orders Array
    renderOrders();        // Display the Loaded Orders
  }
}

document.getElementById("clear-storage").addEventListener("click", function () {
    localStorage.removeItem("orders");
    orders = [];
    renderOrders();
    alert("All orders have been cleared!");
  });
document.addEventListener('DOMContentLoaded', function() {
  const orderList = document.getElementById('orderList');
  const totalPriceElem = document.getElementById('totalPrice');
  const submitOrderButton = document.getElementById('orderForm');
  const customerName = document.getElementById('customerName');
  const customerEmail = document.getElementById('customerEmail');
  const customerMobileno = document.getElementById('customerMobileno');
  
  let orders = [];
  let totalPrice = 0;

  // Function to display the current order
  function displayOrder() {
    orderList.innerHTML = ''; // Clear the order list
    orders.forEach(order => {
      const listItem = document.createElement('li');
      listItem.textContent = `${order.item} - ${order.price}`;
      orderList.appendChild(listItem);
    });
    totalPriceElem.textContent = totalPrice.toFixed(2); // Update total price
  }

  // Handle order button click
  const orderButtons = document.querySelectorAll('.order-btn');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const item = button.getAttribute('data-item');
      const price = parseFloat(button.getAttribute('data-price'));

      // Add item to the order
      orders.push({ item, price });
      totalPrice += price; // Update total price
      displayOrder(); // Refresh the order display
    });
  });

  // Handle order form submission
  submitOrderButton.addEventListener('submit', function(event) {
    event.preventDefault();

    if (orders.length > 0 && customerName.value && customerEmail.value) {
      // Save the order to localStorage
      const orderDetails = {
        customerName: customerName.value,
        customerEmail: customerEmail.value,
        customermobileno: customerMobileno.value,
        orders: orders,
        totalPrice: totalPrice
      };

      let allOrders = JSON.parse(localStorage.getItem('orders')) || [];
      allOrders.push(orderDetails);
      localStorage.setItem('orders', JSON.stringify(allOrders));

      alert('Order placed successfully!');
      
      // Reset order
      orders = [];
      totalPrice = 0;
      customerName.value = '';
      customerEmail.value = '';
      customerMobileno.value ='';
      displayOrder(); // Refresh the order display
    } else {
      alert('Please fill in your details and add items to your order.');
    }
  });

  // Initial display
  displayOrder();
});

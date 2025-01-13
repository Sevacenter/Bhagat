document.addEventListener('DOMContentLoaded', function() {
  const adminOrderList = document.getElementById('adminOrderList');
  
  // Retrieve orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  // Display orders to admin
  if (orders.length === 0) {
    adminOrderList.innerHTML = '<li>No orders yet!</li>';
  } else {
    orders.forEach(order => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Customer:</strong> ${order.customerName} <br>
        <strong>Email:</strong> ${order.customerEmail} <br>
        <strong>mobile no:</strong> ${order.customerMobileno} <br>
        <strong>Items:</strong>
        <ul>
          ${order.orders.map(item => `<li>${item.item} - $${item.price}</li>`).join('')}
        </ul>
        <strong>Total: $${order.totalPrice}</strong>
      `;
      adminOrderList.appendChild(listItem);
    });
  }
});

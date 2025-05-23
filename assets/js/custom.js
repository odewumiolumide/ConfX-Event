const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";

$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown.hover(
      function() {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function() {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});

$(window).on("load resize", function() {
  if (this.matchMedia("(max-width: 991px)").matches) {
    $dropdown.click(
      function() {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function() {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
  }
  
});

// Search Icon
document.getElementById('search-icon').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default anchor behavior
  const searchInputContainer = document.getElementById('search-input-container');
  searchInputContainer.style.display = searchInputContainer.style.display === 'none' ? 'block' : 'none';
  document.getElementById('search-input').focus(); // Focus on the input field
});

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById('search-input').value.toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results
  resultsContainer.style.display = 'block'; // Show results container

  // Example event data (replace with actual data)
  const events = [
      { name: 'Academic Seminars', link: '/Events/Academic Seminars.html' },
      { name: 'AI Innovations Conference', link: '/Events/AI Innovations Conference.html' },
      { name: 'Alumni Events', link: '/Events/Alumni Events.html' },
      { name: 'Business Conference', link: '/Events/Business Conference.html' },
      { name: 'Conventions', link: '/Events/Conventions.html' },
      { name: 'Creative Arts Festival', link: '/Events/Creative Arts Festival.html' },
      { name: 'Cultural Heritage Festival', link: '/Events/Cultural Heritage Festival.html' },
      { name: 'Educational Webinars.', link: '/Events/Educational Webinars..html' },
      { name: 'Future Tech Summit', link: '/Events/Future Tech Summit.html' },
      { name: 'Marketing Strategies', link: '/Events/Marketing Strategies.html' },
      { name: 'Parenting Seminars', link: '/Events/Parenting Seminars.html' },
      { name: 'Real Estate Seminars', link: '/Events/Real Estate Seminars.html' },
      { name: 'Tech & Music Festival', link: '/Events/Tech & Music Festival.html' },
      { name: 'Training and Workshops', link: '/Events/Training and Workshops.html' },
      { name: 'Virtual Networking', link: '/Events/Virtual Networking.html' }
  ];

  const filteredEvents = events.filter(event => event.name.toLowerCase().includes(query));

  if (filteredEvents.length > 0) {
      filteredEvents.forEach(event => {
          const linkElement = document.createElement('a');
          linkElement.href = event.link;
          linkElement.textContent = event.name;
          linkElement.target = "_blank"; // Open link in a new tab
          resultsContainer.appendChild(linkElement);
      });
  } else {
      const noResults = document.createElement('div');
      noResults.textContent = 'No events found.';
      noResults.className = 'no-results';
      resultsContainer.appendChild(noResults);
  }
});



//Cart PAGE//

      
      function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cartItems.length; // Count the number of unique items
    document.getElementById('cart-count').innerText = cartCount; // Update the cart count display
}

// Call updateCartCount on page load
document.addEventListener('DOMContentLoaded', updateCartCount);


// For Checkout Page 
function populateCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  // Clear previous product list
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  // Store event details
  let eventName = '';
  let eventDate = '';
  let eventLocation = '';
  let eventQuantity = '';

  // Populate the product list and calculate subtotal
  cartItems.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-outer';
      productDiv.innerHTML = `<span>${item.title} × ${item.quantity} = $${item.total}</span>`;
      productList.appendChild(productDiv);
      subtotal += parseFloat(item.total);

      // Fetch event details from the cart
      if (!eventName) {
          eventName = item.title; 
          eventDate = item.eventDate; // Correctly access the event date
          eventLocation = item.eventLocation; // Correctly access the event location
          eventQuantity = item.quantity;
      }
  });

  // Update the subtotal display
  document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)} $`;

  // Calculate total price based on subtotal
  let totalPrice;
  const shippingCost = 1.00; // Flat rate shipping
  if (subtotal > 1.00) {
      totalPrice = subtotal + shippingCost; // Adding flat rate shipping for paid events
  } else {
      totalPrice = 0.00; // No charge for events that are $1.00 or less
  }

  // Update the total cost display
  document.getElementById('total-cost').innerText = `Total Cost: $${totalPrice.toFixed(2)}`;

  // Enable/disable payment methods based on total price
  updatePaymentMethods(totalPrice);

  // Store event details for printing
  window.eventDetails = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      quantity: eventQuantity
  };

  // Check if the cart is empty and disable/enable billing form
  checkCartAndToggleBillingForm(cartItems.length > 0);
}

function checkCartAndToggleBillingForm(hasItems) {
  const billingFormFields = document.querySelectorAll('.form-control');
  const checkoutButton = document.getElementById('checkout');

  if (hasItems) {
      // Enable billing form fields and checkout button
      billingFormFields.forEach(field => {
          field.disabled = false;
      });
      checkoutButton.disabled = false;
  } else {
      // Disable billing form fields and checkout button
      billingFormFields.forEach(field => {
          field.disabled = true;
      });
      checkoutButton.disabled = true;
  }
}

function updatePaymentMethods(totalCost) {
  const freeOption = document.getElementById('paymentMethod1');
  const directTransferOption = document.getElementById('paymentMethod2');

  // Show or hide payment options based on the total cost
  if (totalCost > 0) {
      // Show only Stripe payment option for paid events
      freeOption.parentElement.style.display = 'none'; // Hide free option
      directTransferOption.parentElement.style.display = 'block'; // Show Stripe payment option
  } else {
      // Show only free option for free events
      freeOption.parentElement.style.display = 'block'; // Show free option
      directTransferOption.parentElement.style.display = 'none'; // Hide Stripe payment option
  }
}

const requiredInputs = document.querySelectorAll('.form-control[required]');
const checkoutButton = document.getElementById('checkout');

// Enable the button if all required fields are filled
function checkFormCompletion() {
  const allFilled = Array.from(requiredInputs).every(input => input.value.trim() !== '');
  const eventTypeSelected = document.getElementById('paymentMethod1').checked || document.getElementById('paymentMethod2').checked;
  checkoutButton.disabled = !(allFilled && eventTypeSelected);
}

// Add event listeners to form inputs to check completion
requiredInputs.forEach(input => {
  input.addEventListener('input', checkFormCompletion);
});

// Event listeners for payment method selection
document.getElementById('paymentMethod1').addEventListener('change', checkFormCompletion);
document.getElementById('paymentMethod2').addEventListener('change', checkFormCompletion);

checkoutButton.addEventListener('click', function() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if more than one event is selected
  if (cartItems.length > 1) {
      // Show the registration error modal
      document.getElementById('registrationModal').style.display = 'block';
      return; // Stop execution
  }

  // Capture user details
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;

  // Display data in the modal
  document.getElementById('userId').innerText = 'USR-' + Math.floor(Math.random() * 1000000);
  document.getElementById('userFirstName').innerText = firstName;
  document.getElementById('userLastName').innerText = lastName;
  document.getElementById('userPhone').innerText = phone;

  // Display event details in the modal
  document.getElementById('eventName').innerText = window.eventDetails.name;
  document.getElementById('eventDate').innerText = window.eventDetails.date;
  document.getElementById('eventLocation').innerText = window.eventDetails.location;
  document.getElementById('eventQuantity').innerText = window.eventDetails.quantity;

  // Show the success message modal
  showSuccessModal();

  // Clear form fields (optional)
  document.getElementById('checkout-form').reset();

  // Optionally clear the cart
  localStorage.removeItem('cart');
  localStorage.setItem('showModal', 'true'); // Set flag to show modal on refresh
});

// Function to show the success modal
function showSuccessModal() {
  document.getElementById('successModal').style.display = 'block';
}

// Close success modal
document.getElementById('closeSuccessModal').onclick = function() {
  document.getElementById('successModal').style.display = 'none';
};

// Close success modal on OK button click and show confirmation modal
document.getElementById('okButton').onclick = function() {
  document.getElementById('successModal').style.display = 'none';
  showModal(); // Show the confirmation modal after closing the success modal
};

function showModal() {
  document.getElementById('confirmationModal').style.display = 'block';
}

// Print and hide buttons
function printAndHide() {
  const modal = document.getElementById('confirmationModal');
  const buttons = modal.querySelectorAll('button');

  // Hide buttons when print is initiated
  buttons.forEach(button => button.style.display = 'none'); // Hide buttons
  window.print(); // Open print dialog
  // Show buttons again after a brief delay
  setTimeout(() => {
      buttons.forEach(button => button.style.display = 'inline-block'); // Show buttons again
  }, 100); // Adjust the delay as needed
}

// Send to Email functionality
function sendEmail() {
  const emailDetails = {
      eventName: document.getElementById('eventName').innerText,
      eventDate: document.getElementById('eventDate').innerText,
      eventLocation: document.getElementById('eventLocation').innerText,
      userId: document.getElementById('userId').innerText,
      quantity: document.getElementById('eventQuantity').innerText,
      price: "$0.00", // Adjust as necessary
  };

  // Here you would typically send the email using an API or a backend service
  alert(`Email sent with the following details:\n${JSON.stringify(emailDetails, null, 2)}`);
}

// Close modal
document.getElementById('closeModal').onclick = function() {
  document.getElementById('confirmationModal').style.display = 'none';
};

// Redirect on OK button in registration error modal
document.getElementById('cartbutton').onclick = function() {
  // Redirect to the cart page
  window.location.href = '/cart.html'; // Adjust the path as needed for your project
};
// Initialize the page
document.addEventListener('DOMContentLoaded', populateCheckout);

function generateInvoice() {
  const firstName = document.getElementById('userFirstName').innerText;
  const lastName = document.getElementById('userLastName').innerText;
  const phone = document.getElementById('userPhone').innerText;
  const eventDetails = window.eventDetails; // Assuming this object exists
  const ticketNumber = document.getElementById('userId').innerText; // Get the ticket number generated in the modal
  const paymentStatus = "Success"; // Set payment status
  const eventType = "Free Pass"; // Adjust according to your logic
  const totalCost = "0.00"; // Replace with actual total cost logic

  const invoiceHTML = `
      <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2c3e50; padding-bottom: 20px;">
                  <img src="/assets/images/favicon/favicon-96x96.png" alt="Logo">
                  <div style="text-align: right;">
                      <h1>Conf-X-Event</h1>
                      <p>121 King Street Melbourne, 3000, Australia</p>
                      <p>www.conf-x-event.vercal.app</p>
                  </div>
              </div>
              <div style="margin: 20px 0;">
                  
                  <p><strong>Ticket Date:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
              </div>
              <div style="margin-top: 20px;">
                  <h3>Event Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                      <tr>
                          <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Detail</th>
                          <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Information</th>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Attendee</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${firstName} ${lastName}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Phone</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${phone}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Event</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${eventDetails.name}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Date</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${eventDetails.date}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Location</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${eventDetails.location}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Quantity</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${eventDetails.quantity}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Payment Status</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${paymentStatus}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px;">Type</td>
                          <td style="border: 1px solid #ccc; padding: 10px;">${eventType}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Total Cost</td>
                          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">$${totalCost}</td>
                      </tr>
                  </table>
                  <div id="qrcode" style="margin-top: 20px;"></div>
              </div>
              <div style="margin-top: 20px; text-align: center; font-size: 12px;">
                  <p>Thank you for registering! Terms: Please keep this ticket for your records.</p>
              </div>
          </div>
      </div>
  `;

  // Open a new window to print the invoice
  const win = window.open('', '', 'height=800,width=800');
  win.document.write(invoiceHTML);
  win.document.close();

  // Generate QR code
  $(win.document).ready(function() {
      $(win.document.getElementById('qrcode')).qrcode({
          text: `Ticket Number: ${ticketNumber}\nAttendee: ${firstName} ${lastName}\nEvent: ${eventDetails.name}\nDate: ${eventDetails.date}\nLocation: ${eventDetails.location}\nPhone: ${phone}`,
          width: 100,
          height: 100
      });
  });

  win.print();
}

// Event listener for the print button
document.getElementById('print-button').onclick = function() {
  generateInvoice();
};
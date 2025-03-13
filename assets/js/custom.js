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


// Event Copy URL Code


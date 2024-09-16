document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const timerElement = document.getElementById('timer');
    const currencyDropdown = document.getElementById('currencyDropdown');
    const cryptoDropdown = document.getElementById('cryptoDropdown');
    const buyButton = document.getElementById('buy-button');
    const telegramButton = document.querySelector('#connect-telegram');

     // Debug logging
     console.log('Theme Toggle Button:', themeToggleButton);
     console.log('Timer Element:', timerElement);
     console.log('Currency Dropdown:', currencyDropdown);
     console.log('Crypto Dropdown:', cryptoDropdown);
     console.log('Buy Button:', buyButton);
     console.log('Connect Telegram Button:', telegramButton);  


     if (telegramButton) {
        telegramButton.addEventListener('click', () => {
            // Handle button click
            console.log('Telegram button clicked');
            window.location.href = '/connect/telegram';
        });
    } else {
        console.error('Telegram button not found');
    }
     
    // Open the signup link in a new tab
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            window.open('https://wazirx.com/signup', '_blank');
        });
    } else {
        console.error('Buy button not found');
    }


    // Load initial theme from local storage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggleButton.classList.remove('active');
    } else {
        document.body.classList.add('dark-theme');
        themeToggleButton.classList.add('active');
    }

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggleButton.classList.add('active');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleButton.classList.remove('active');
        }
    });

    

    // Function to handle dropdown item clicks
    function handleDropdownItemClick(event) {
        const target = event.target;

        if (target.matches('.dropdown-item')) {
            if (target.dataset.currency) {
                currencyDropdown.textContent = target.textContent;
                hideDropdown('currencyDropdown');
            } else if (target.dataset.crypto) {
                cryptoDropdown.textContent = target.textContent;
                updateBuyButton(target.dataset.crypto);
                hideDropdown('cryptoDropdown');
            }
        }
    }

    // Attach click event listener to dropdown items
    document.addEventListener('click', handleDropdownItemClick);

    // Function to update the buy button based on selected cryptocurrency
    function updateBuyButton(crypto) {
        const cryptoLinks = {
            'BTC': 'https://wazirx.com/signup',
            'ETH': 'https://wazirx.com/signup',
            'USDT': 'https://wazirx.com/signup',
            'XRP': 'https://wazirx.com/signup',
            'TRX': 'https://wazirx.com/signup',
            'DASH': 'https://wazirx.com/signup',
            'ZEC': 'https://wazirx.com/signup',
            'XEM': 'https://wazirx.com/signup',
            'IOST': 'https://wazirx.com/signup',
            'MIN': 'https://wazirx.com/signup',
            'BTT': 'https://wazirx.com/signup',
            'WRX': 'https://wazirx.com/signup'
        };
        if (cryptoLinks[crypto]) {
            buyButton.textContent = `Buy ${crypto}`;
            buyButton.href = cryptoLinks[crypto];
            buyButton.setAttribute('target', '_blank'); // Ensure it opens in a new tab
        }
    }

    // Function to hide a specific dropdown menu
    function hideDropdown(dropdownId) {
        const dropdownMenu = document.querySelector(`#${dropdownId} + .dropdown-menu`);
        dropdownMenu.style.display = 'none';
    }

    // Function to toggle dropdown visibility
    function toggleDropdown(dropdownId) {
        const dropdownMenu = document.querySelector(`#${dropdownId} + .dropdown-menu`);
        const isVisible = dropdownMenu.style.display === 'block';
        
        // Hide all dropdown menus
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });

        // Show or hide the clicked dropdown menu
        dropdownMenu.style.display = isVisible ? 'none' : 'block';
    }

    // Event listener to toggle dropdowns on button click
    document.getElementById('currencyDropdown').addEventListener('click', () => {
        toggleDropdown('currencyDropdown');
    });

    document.getElementById('cryptoDropdown').addEventListener('click', () => {
        toggleDropdown('cryptoDropdown');
    });

    // Close dropdowns if click is outside of the dropdown
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Timer functionality
    let time = 60;

    function updateTimer() {
        time--;
        if (time < 0) {
            time = 60; // Reset the timer
        }
        timerElement.textContent = time < 10 ? `0${time}` : time; // Format timer
    }

    setInterval(updateTimer, 1000); // Update every second

    // Log to confirm that timerElement is selected
    console.log('Timer element:', timerElement);

    // Fetch top 10 cryptocurrencies
    async function fetchCryptoData() {
        try {
            const response = await fetch('https://hodlinfo-nkqv.onrender.com/');
            const data = await response.json();

            // Example base price for calculating difference and savings
            const basePrice = 2656110; // This should be dynamically obtained or set as required

            // Get the table body element
            const tableBody = document.querySelector('.price-table tbody');

            // Clear the table body
            tableBody.innerHTML = '';

            // Insert data into the table
            data.forEach((crypto, index) => {
                const lastTradedPrice = parseFloat(crypto.last);
                const buyPrice = parseFloat(crypto.buy);
                const sellPrice = parseFloat(crypto.sell);
                
                // Calculate difference and savings
                const difference = ((lastTradedPrice - basePrice) / basePrice * 100).toFixed(2);
                const savings = (basePrice - lastTradedPrice).toFixed(2);
                
                // Set the colors based on the values
                const differenceClass = difference > 0 ? 'positive' : 'negative';
                const savingsClass = difference > 0 ? 'positive' : 'negative';

                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${crypto.name}</td>
                    <td>₹ ${lastTradedPrice.toLocaleString('en-IN')}</td>
                    <td>₹ ${buyPrice.toLocaleString('en-IN')} / ₹ ${sellPrice.toLocaleString('en-IN')}</td>
                    <td class="${differenceClass}">${difference}%</td>
                    <td class="${savingsClass}">₹ ${Math.abs(savings).toLocaleString('en-IN')}</td>
                `;

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data when the page loads
    fetchCryptoData();

    // Register the service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log('Service Worker Registered');
            }).catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        });
    }

    // Handle Add to Home Screen (A2HS) prompt
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        // Save the event for later use
        deferredPrompt = event;
        // Show the "Add to Home Screen" button
        const addBtn = document.getElementById('add-to-home-screen');
        addBtn.style.display = 'block';
    
        addBtn.addEventListener('click', () => {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    });
});

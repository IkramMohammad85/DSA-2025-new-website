    // table tab
    document.querySelectorAll('.table-secondary').forEach(function(item) {
        item.addEventListener('click', function() {
        var detailRow = this.nextElementSibling;
        var allDetailRows = document.querySelectorAll('.tier-details');
        if (detailRow.classList.contains('tier-details')) {
        allDetailRows.forEach(function(row) {
        if (row !== detailRow && !row.classList.contains('hidden')) {
        //row.classList.add('hidden');
        //row.previousElementSibling.querySelector('.arrow-move').innerHTML = '<img src="https://dsa-2021.netlify.app/assets/img/right-arrow-t.svg" alt="image">';
        }
        });
        detailRow.classList.toggle('hidden');
        var arrow = this.querySelector('.arrow-move');
        arrow.innerHTML = detailRow.classList.contains('hidden') ? '<img src="/img/right-arrow-t.svg" alt="image">' : '<img src="/img/down-arrow-t.svg" alt="image">';
        }
        });
        });
        // Function to toggle arrow icon
        function toggleArrow(icon) {
        var currentSrc = icon.getAttribute('src');
        if (currentSrc.includes('down-arrow-t.svg')) {
        icon.setAttribute('src', '/img/right-arrow-t.svg');
        } else {
        icon.setAttribute('src', '/img/down-arrow-t.svg');
        }
        }
        document.querySelectorAll('.across-eight-key a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
        event.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
        var allDetailRows = document.querySelectorAll('.tier-details');
        allDetailRows.forEach(function(row) {
        if (row !== targetElement) {
        row.classList.add('hidden');
        }
        });
        targetElement.classList.toggle('hidden');
        setTimeout(function() {
        window.scroll({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 250,
        behavior: 'smooth'
        });
        }, 100); // Delay added for smooth scrolling
        // Toggle arrow icon
        var icon = document.getElementById(targetId).previousElementSibling.querySelector('.arrow-move img');
        toggleArrow(icon);
        // Reset other arrow icons
        var allArrowIcons = document.querySelectorAll('.arrow-move img');
        allArrowIcons.forEach(function(arrowIcon) {
        if (arrowIcon !== icon) {
        var otherSrc = arrowIcon.getAttribute('src');
        if (otherSrc.includes('down-arrow-t.svg')) {
        arrowIcon.setAttribute('src', '/img/right-arrow-t.svg');
        }
        }
        });
        }
        });
        });
        // Show default-open row
        document.querySelectorAll('.default-open').forEach(function(row) {
        row.classList.remove('hidden');
        row.previousElementSibling.querySelector('.arrow-move').innerHTML = '<img src="/img/down-arrow-t.svg" alt="image">';
        });
        // document.addEventListener('DOMContentLoaded', function() {
        // const sourceContent = document.querySelector('.source-content');
        // const destinationClone = document.querySelector('.destination-clone');
        // function cloneContent() {
        // destinationClone.innerHTML = sourceContent.innerHTML;
        // }
        // cloneContent();
        // });

        
        //Highlights from Each Country’s Ranking
    document.addEventListener('DOMContentLoaded', function () {
    const commonTabButtons = document.querySelectorAll('.common-tab-button');
    const commonTabContents = document.querySelectorAll('.common-tab-content');
    const commonTabContainer = document.querySelector('.common-tab-container');
    if (!commonTabContainer) {
        console.warn("Warning: '.common-tab-container' not found. Skipping tab script.");
        return; // Stop execution if the container doesn't exist
    }
    const commonTabDropdown = document.createElement('select');
    commonTabDropdown.id = 'tabDropdown';
    commonTabButtons.forEach(button => {
    const option = document.createElement('option');
    option.value = button.getAttribute('data-tab');
    option.textContent = button.textContent;
    commonTabDropdown.appendChild(option);
    });
    commonTabContainer.insertBefore(commonTabDropdown, commonTabContents[0]);
    function showTabContent(commonTabId) {
    commonTabContents.forEach(content => content.style.display = 'none');
    document.getElementById(commonTabId).style.display = 'block';
    commonTabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.common-tab-button[data-tab="${commonTabId}"]`).classList.add('active');
    }
    commonTabButtons.forEach(button => {
    button.addEventListener('click', function () {
    const commonTabId = this.getAttribute('data-tab');
    showTabContent(commonTabId);
    commonTabDropdown.value = commonTabId;
    });
    });
    commonTabDropdown.addEventListener('change', function () {
    const commonTabId = this.value;
    showTabContent(commonTabId);
    });
    showTabContent('dectabB');
    });
document.addEventListener('DOMContentLoaded', function () {
    const tabLink = document.querySelectorAll('.c-tab__menu__item');
    const tabContent = document.querySelectorAll('.c-tab__content__item');
    const tabContentInner = document.querySelectorAll('.c-tab__content__inner');
    let currentTabIndex = 0;
    let autoChangeInterval;

    console.log(tabLink, tabContent, tabContentInner); // Debugging: Check if elements exist

    function changeTab(index) {
        if (!tabLink[index] || !tabContent[index] || !tabContentInner[index]) return; // Prevent errors
        clearActive(tabLink);
        clearActive(tabContent);
        tabLink[index].classList.add('c-tab--active');
        tabContent[index].classList.add('c-tab--active');
        fadeIn(tabContentInner[index]);
    }

    function startAutoChange() {
        if (window.innerWidth < 768) return;
        autoChangeInterval = setInterval(() => {
            currentTabIndex = (currentTabIndex + 1) % tabLink.length;
            fadeOutAndIn();
        }, 4000);
    }

    function fadeOutAndIn() {
        if (!tabContentInner[currentTabIndex]) return;
        fadeOut(tabContentInner[currentTabIndex]);
        setTimeout(() => {
            changeTab(currentTabIndex);
        }, 500);
    }

    function fadeIn(element) {
        if (!element) return;
        element.style.opacity = 0;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = 1;
        }, 50);
    }

    function fadeOut(element) {
        if (!element) return;
        element.style.opacity = 1;
        setTimeout(() => {
            element.style.opacity = 0;
            element.style.display = 'none';
        }, 500);
    }

    function getContentIndex(content) {
        for (let i = 0; i < content.length; i++) {
            if (content[i].classList.contains("c-tab--active")) {
                return content[i].dataset.index;
            }
        }
        return -1; // Prevent undefined errors
    }

    function addClassToContent(index, content, myclass) {
        for (let i = 0; i < content.length; i++) {
            if (content[i].dataset.index == index) {
                content[i].classList.add(myclass);
            }
        }
    }

    function clearActive(tags) {
        tags.forEach(tag => tag.classList.remove("c-tab--active"));
    }

    // Initialize the first tab on page load
    if (tabLink.length > 0) changeTab(currentTabIndex);

    tabLink.forEach(link => {
        link.addEventListener('mouseenter', function () {
            clearInterval(autoChangeInterval);
            let tabLinkIndex = this.dataset.index;
            let tabContentIndex = getContentIndex(tabContent);
            if (tabLinkIndex !== tabContentIndex) {
                clearActive(tabLink);
                clearActive(tabContent);
                this.classList.add('c-tab--active');
                addClassToContent(tabLinkIndex, tabContent, 'c-tab--active');
                if (tabContentInner[tabLinkIndex]) fadeIn(tabContentInner[tabLinkIndex]);
            }
        });

        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    tabContentInner.forEach(contentInner => {
        contentInner.addEventListener('mouseenter', function () {
            clearInterval(autoChangeInterval);
        });

        contentInner.addEventListener('mouseleave', function () {
            autoChangeInterval = setInterval(() => {
                currentTabIndex = (currentTabIndex + 1) % tabLink.length;
                fadeOutAndIn();
            }, 4000);
        });
    });

    // Start auto-change function
    startAutoChange();

    // Vertical Tabs Handling
    if (document.querySelector('.c-tab--vertical') !== null) {
        const tabLink = document.querySelectorAll('.c-tab__menu__item');
        const tabItem = document.querySelectorAll('.c-tab__content__item');

        function changeTab(e) {
            e.preventDefault();
            let tabParent = this.parentElement;
            if (!tabParent.classList.contains('c-tab--active')) {
                tabItem.forEach(item => {
                    item.classList.remove("c-tab--active");
                    let contentInner = item.querySelector('.c-tab__content__inner');
                    if (contentInner) {
                        contentInner.style.opacity = 0;
                        contentInner.style.display = 'none';
                    }
                });

                tabParent.classList.add('c-tab--active');
                let activeContent = tabParent.querySelector('.c-tab__content__inner');
                if (activeContent) {
                    activeContent.style.opacity = 1;
                    activeContent.style.display = 'block';
                }
            }
        }

        for (let i = 0; i < tabLink.length; i++) {
            let tabClone = tabLink[i].cloneNode(true);
            tabClone.classList.remove('c-tab--active', 'c-tab__menu__item');
            tabClone.classList.add('c-tab__content__btn');
            tabClone.addEventListener('click', changeTab);
            let tabContent = document.querySelector(`.c-tab__content__item[data-index='${i}']`);
            if (tabContent) tabContent.insertAdjacentElement('afterbegin', tabClone);
        }
    }
});

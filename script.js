/* ═══════════════════════════════════════════
   My CV Portfolio — Main Application Script
   ═══════════════════════════════════════════ */

/* ─── XSS Protection ─── */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ─── Credential Security (SHA-256 hashing) ─── */
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const ADMIN_CREDENTIALS_HASH = '9ba356d5670f691f86e91828f94185ec34991f1db24728a6855c6885df65b9fa';

async function verifyCredentials(username, password) {
    const combined = username + ':' + password;
    const hash = await sha256(combined);
    return hash === ADMIN_CREDENTIALS_HASH;
}

/* ─── State Variables ─── */
let isLoggedIn = false;
let isPortfolioLoggedIn = false;
let portfolioItems = [];
let currentPage = 1;
let itemsPerPage = 6;
let deleteId = null;
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'newest';
let currentCert = null;
let currentCertCategory = 'cisco';
let certLinks = {
    cisco: {
        intro: { name: 'Introduction to Cybersecurity', link: '', badge: '', hours: 15, year: '2026' },
        network: { name: 'Network Defense', link: '', badge: '', hours: 20, year: '2026' },
        endpoint: { name: 'Endpoint Security', link: '', badge: '', hours: 15, year: '2026' },
        threat: { name: 'Cyber Threat Management', link: '', badge: '', hours: 15, year: '2026' },
        ethical: { name: 'Ethical Hacker', link: '', badge: '', hours: 25, year: '2026' }
    },
    komdigi: {
        digital: { name: 'Digital Talent Scholarship', link: '', badge: '', hours: 40, year: '2026' },
        ai: { name: 'Artificial Intelligence Fundamentals', link: '', badge: '', hours: 30, year: '2026' },
        cybersecurity: { name: 'Cybersecurity Awareness', link: '', badge: '', hours: 20, year: '2026' },
        networking: { name: 'Network Administrator', link: '', badge: '', hours: 35, year: '2026' },
        cloud: { name: 'Cloud Computing Basics', link: '', badge: '', hours: 25, year: '2026' }
    },
    bisaai: {
        intro: { name: 'AI Introduction', link: '', badge: '', hours: 10, year: '2026' },
        machine: { name: 'Machine Learning Dasar', link: '', badge: '', hours: 25, year: '2026' },
        python: { name: 'Python untuk AI', link: '', badge: '', hours: 20, year: '2026' },
        nlp: { name: 'Natural Language Processing', link: '', badge: '', hours: 30, year: '2026' },
        vision: { name: 'Computer Vision', link: '', badge: '', hours: 30, year: '2026' }
    }
};

/* ─── Game State ─── */
let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval = null;
let gameData = [];
let currentAnswer = 0;
let playerName = '';

/* ─── Initialization ─── */
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initNavigation();
    initBackToTop();
    initMobileMenu();
    initGame();
    loadCertLinks();
    checkLoginStatus();
    loadPortfolioItems();
    checkPortfolioLoginStatus();
    initSearchAndSort();
    initPortfolioFilters();
    initCertificateCategories();
    initCertCategorySelect();
    initModalClickOutside();
    initEscapeKey();
    initPopState();
    initCharCounters();
    initLoginEnterKeys();

    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});

/* ─── Navigation ─── */
window.navigateToSection = function (sectionId) {
    showSection(sectionId);
    history.pushState(null, null, '#' + sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(function (section) {
        section.classList.remove('active-section');
    });
    navLinks.forEach(function (link) {
        link.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

function initNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            history.pushState(null, null, '#' + sectionId);

            var navMenu = document.getElementById('navMenu');
            if (navMenu) navMenu.classList.remove('active');

            var toggleIcon = document.querySelector('.nav-toggle i');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }

            var navToggle = document.getElementById('navToggle');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ─── Theme Toggle ─── */
function initThemeToggle() {
    var themeToggle = document.getElementById('themeToggle');
    var body = document.body;

    var savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme);
    themeToggle.setAttribute('aria-pressed', savedTheme === 'dark-mode' ? 'true' : 'false');

    themeToggle.addEventListener('click', function () {
        var isDark = body.classList.contains('dark-mode');
        body.classList.remove('light-mode', 'dark-mode');

        if (isDark) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.setAttribute('aria-pressed', 'false');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.setAttribute('aria-pressed', 'true');
        }
    });
}

/* ─── Back to Top ─── */
function initBackToTop() {
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ─── Mobile Menu ─── */
function initMobileMenu() {
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            var isActive = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            var icon = this.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navToggle.setAttribute('aria-label', 'Tutup menu navigasi');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-label', 'Buka menu navigasi');
            }
        });
    }

    document.addEventListener('click', function (e) {
        if (navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            var icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/* ─── Toast Notifications ─── */
function showToast(message, type) {
    type = type || 'success';
    var container = document.getElementById('toastContainer');
    if (!container) return;

    var iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.setAttribute('role', 'alert');
    toast.innerHTML =
        '<i class="fas fa-' + (iconMap[type] || 'info-circle') + '" aria-hidden="true"></i>' +
        '<span>' + escapeHTML(message) + '</span>';

    container.appendChild(toast);

    setTimeout(function () {
        if (toast.parentNode) toast.remove();
    }, 3000);
}

/* ─── Certificate Admin Auth ─── */
function checkLoginStatus() {
    var savedStatus = localStorage.getItem('adminLoggedIn');
    if (savedStatus === 'true') {
        isLoggedIn = true;
        showAdminPanel();
        updateAdminButton();
    }
}

window.openLoginModal = function () {
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        var modal = document.getElementById('loginModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('loginError').style.display = 'none';
        trapFocus(modal);
    }
};

window.closeLoginModal = function () {
    var modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.handleLogin = async function () {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    var errorElement = document.getElementById('loginError');

    var isValid = await verifyCredentials(username, password);

    if (isValid) {
        isLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        closeLoginModal();
        showAdminPanel();
        updateAdminButton();
        showToast('Login berhasil! Selamat datang Admin.', 'success');
    } else {
        errorElement.style.display = 'block';
        document.getElementById('username').classList.add('input-error');
        document.getElementById('password').classList.add('input-error');
    }
};

function showAdminPanel() {
    var adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'block';
    adminPanel.classList.add('visible');
}

window.closeAdminPanel = function () {
    var adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'none';
    adminPanel.classList.remove('visible');
};

window.logoutAdmin = function () {
    isLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    closeAdminPanel();
    updateAdminButton();
    showToast('Logout berhasil!', 'info');
};

function updateAdminButton() {
    var adminBtn = document.getElementById('adminLoginBtn');
    var adminStatus = document.getElementById('adminStatus');

    if (isLoggedIn) {
        adminBtn.innerHTML = '<i class="fas fa-user-shield" aria-hidden="true"></i> Admin Panel (Active)';
        adminStatus.textContent = 'Anda sudah login sebagai admin';
        adminStatus.style.color = '#10B981';
    } else {
        adminBtn.innerHTML = '<i class="fas fa-lock" aria-hidden="true"></i> Admin Login';
        adminStatus.textContent = 'Klik untuk login sebagai admin Sertifikat';
        adminStatus.style.color = '';
    }
}

/* ─── Certificates ─── */
function loadCertLinks() {
    var saved = localStorage.getItem('certLinks');
    if (saved) {
        try {
            var parsed = JSON.parse(saved);
            for (var cat in parsed) {
                if (certLinks[cat]) {
                    for (var key in parsed[cat]) {
                        if (certLinks[cat][key]) {
                            certLinks[cat][key].link = parsed[cat][key].link || '';
                            certLinks[cat][key].badge = parsed[cat][key].badge || '';
                            if (parsed[cat][key].year) certLinks[cat][key].year = parsed[cat][key].year;
                        }
                    }
                }
            }
        } catch (e) {
            // ignore corrupted localStorage
        }
    }
    updateCertCategorySelect();
    filterCertificates('cisco');
}

function saveCertLinks() {
    localStorage.setItem('certLinks', JSON.stringify(certLinks));
}

function initCertCategorySelect() {
    var categorySelect = document.getElementById('certCategory');
    if (categorySelect) {
        categorySelect.addEventListener('change', function () {
            updateCertCategorySelect();
        });
    }
}

function updateCertCategorySelect() {
    var categorySelect = document.getElementById('certCategory');
    if (!categorySelect) return;

    var category = categorySelect.value;
    var certSelect = document.getElementById('certSelect');
    if (!certSelect) return;

    var options = '';
    var certs = certLinks[category];
    for (var key in certs) {
        options += '<option value="' + escapeHTML(key) + '">' + escapeHTML(certs[key].name) + '</option>';
    }
    certSelect.innerHTML = options;
}

function initCertificateCategories() {
    var categoryBtns = document.querySelectorAll('.category-btn');

    categoryBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var category = this.getAttribute('data-category');
            filterCertificates(category);
        });
    });
}

function filterCertificates(category) {
    currentCertCategory = category;

    document.querySelectorAll('.category-btn').forEach(function (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    var activeBtn = document.querySelector('.category-btn[data-category="' + category + '"]');
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
    }

    renderCertificates();
}

function renderCertificates() {
    var grid = document.getElementById('certificatesGrid');
    var totalSpan = document.getElementById('totalCertificates');
    var hoursSpan = document.getElementById('totalHours');
    if (!grid) return;

    var certs = certLinks[currentCertCategory];
    var totalHours = 0;
    var html = '';
    var currentYear = new Date().getFullYear();

    for (var key in certs) {
        var cert = certs[key];
        totalHours += cert.hours || 0;

        var certYear = cert.year || currentYear.toString();

        var linkHtml = cert.link
            ? '<a href="' + escapeHTML(cert.link) + '" target="_blank" rel="noopener noreferrer" class="cert-link"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Buka Sertifikat</a>'
            : '';

        var badgeHtml = cert.badge
            ? '<img src="' + escapeHTML(cert.badge) + '" alt="Badge ' + escapeHTML(cert.name) + '" class="cert-badge-img" loading="lazy" onerror="this.style.display=\'none\'">'
            : '';

        var adminActions = isLoggedIn
            ? '<div class="cert-item-actions">' +
              '<button onclick="editCertificate(\'' + escapeHTML(currentCertCategory) + '\', \'' + escapeHTML(key) + '\')" class="btn-edit-portfolio" title="Edit" aria-label="Edit sertifikat ' + escapeHTML(cert.name) + '">' +
              '<i class="fas fa-edit" aria-hidden="true"></i></button></div>'
            : '';

        var iconClass = 'fa-shield-halved';
        if (currentCertCategory === 'komdigi') iconClass = 'fa-building';
        if (currentCertCategory === 'bisaai') iconClass = 'fa-robot';

        var issuerName = '';
        if (currentCertCategory === 'cisco') issuerName = 'Cisco Networking Academy';
        else if (currentCertCategory === 'komdigi') issuerName = 'Kementerian Komdigi';
        else issuerName = 'Bisa AI Academy';

        html +=
            '<div class="certificate-card" id="cert-' + escapeHTML(currentCertCategory) + '-' + escapeHTML(key) + '" role="listitem">' +
            adminActions +
            '<div class="certificate-icon"><i class="fas ' + iconClass + '" aria-hidden="true"></i></div>' +
            '<div class="certificate-content">' +
            '<h3>' + escapeHTML(cert.name) + '</h3>' +
            '<p class="cert-issuer">' + escapeHTML(issuerName) + '</p>' +
            '<span class="cert-year">' + escapeHTML(certYear) + '</span>' +
            '<div class="cert-actions">' +
            '<button class="btn-view-cert" onclick="viewCertificate(\'' + escapeHTML(currentCertCategory) + '\', \'' + escapeHTML(key) + '\')">' +
            '<i class="fas fa-eye" aria-hidden="true"></i> Lihat Sertifikat</button>' +
            linkHtml +
            '</div>' +
            '<div class="cert-badge-container">' + badgeHtml + '</div>' +
            '</div></div>';
    }

    grid.innerHTML = html;
    if (totalSpan) totalSpan.textContent = Object.keys(certs).length.toString();
    if (hoursSpan) hoursSpan.textContent = totalHours + '+';
}

window.viewCertificate = function (category, key) {
    var modal = document.getElementById('certModal');
    var modalTitle = document.getElementById('modalTitle');
    var modalBody = document.getElementById('modalBody');

    var cert = certLinks[category][key];
    if (!cert) return;

    var issuer = '';
    if (category === 'cisco') issuer = 'Cisco Networking Academy';
    else if (category === 'komdigi') issuer = 'Kementerian Komdigi';
    else issuer = 'Bisa AI Academy';

    modalTitle.textContent = cert.name;
    currentCert = { category: category, key: key };

    var content = '';
    if (cert.link) {
        if (cert.link.toLowerCase().includes('.pdf') || cert.link.includes('drive.google') || cert.link.includes('docs.google')) {
            var src = cert.link;
            if (cert.link.includes('drive.google.com')) {
                var fileId = cert.link.match(/[-\w]{25,}/);
                if (fileId) {
                    src = 'https://drive.google.com/file/d/' + fileId[0] + '/preview';
                }
            }
            content =
                '<div class="certificate-viewer">' +
                '<iframe src="' + escapeHTML(src) + '" width="100%" height="500px" title="Preview sertifikat ' + escapeHTML(cert.name) + '"></iframe>' +
                '<p style="margin-top: 20px;">' +
                '<a href="' + escapeHTML(cert.link) + '" target="_blank" rel="noopener noreferrer" class="btn-view-cert" style="display: inline-block; text-decoration: none;">' +
                '<i class="fas fa-external-link-alt" aria-hidden="true"></i> Buka di Tab Baru</a></p></div>';
        } else {
            content =
                '<div class="certificate-viewer">' +
                '<img src="' + escapeHTML(cert.link) + '" alt="Sertifikat ' + escapeHTML(cert.name) + '" style="max-width: 100%; border-radius: 10px; box-shadow: var(--shadow);" loading="lazy">' +
                '<p style="margin-top: 20px;">' +
                '<a href="' + escapeHTML(cert.link) + '" target="_blank" rel="noopener noreferrer" class="btn-view-cert" style="display: inline-block; text-decoration: none;">' +
                '<i class="fas fa-external-link-alt" aria-hidden="true"></i> Buka Gambar Fullscreen</a></p></div>';
        }
    } else {
        content =
            '<div class="certificate-placeholder">' +
            '<i class="fas fa-clock" aria-hidden="true"></i>' +
            '<h4>COMING SOON</h4>' +
            '<div style="margin: 30px 0;"><span style="font-size: 4rem;" aria-hidden="true">&#9203;</span></div>' +
            '<p style="font-size: 1.3rem; margin: 20px 0;">' + escapeHTML(cert.name) + '</p>' +
            '<p style="font-size: 1rem; color: var(--text-secondary);">' + escapeHTML(issuer) + '</p>' +
            '<p style="margin-top: 20px; font-style: italic;">Sertifikat akan segera tersedia</p></div>';
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
};

window.closeModal = function () {
    var modal = document.getElementById('certModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.editCertificate = function (category, key) {
    if (!isLoggedIn) {
        showToast('Anda harus login terlebih dahulu!', 'error');
        openLoginModal();
        return;
    }

    document.getElementById('certCategory').value = category;
    updateCertCategorySelect();

    setTimeout(function () {
        document.getElementById('certSelect').value = key;
    }, 100);

    var cert = certLinks[category][key];
    if (cert.link) document.getElementById('certLink').value = cert.link;
    if (cert.badge) {
        document.getElementById('certImage').value = cert.badge;
        document.getElementById('certBadgePreview').innerHTML =
            '<img src="' + escapeHTML(cert.badge) + '" alt="Preview" class="image-preview" onerror="this.style.display=\'none\'">';
    }

    showAdminPanel();
};

window.saveCertificateLink = function () {
    if (!isLoggedIn) {
        showToast('Anda harus login terlebih dahulu!', 'error');
        openLoginModal();
        return;
    }

    var category = document.getElementById('certCategory').value;
    var certSelect = document.getElementById('certSelect');
    var certLink = document.getElementById('certLink');
    var certImage = document.getElementById('certImage');

    var selectedCert = certSelect.value;
    var linkValue = certLink.value.trim();
    var imageValue = certImage.value.trim();

    if (selectedCert && certLinks[category] && certLinks[category][selectedCert]) {
        certLinks[category][selectedCert].link = linkValue;
        certLinks[category][selectedCert].badge = imageValue;
        certLinks[category][selectedCert].year = new Date().getFullYear().toString();
        saveCertLinks();

        if (currentCertCategory === category) {
            renderCertificates();
        }

        certLink.value = '';
        certImage.value = '';
        document.getElementById('certBadgePreview').innerHTML = '';
        showToast('Link sertifikat berhasil disimpan!', 'success');
    }
};

window.downloadCertificate = function () {
    if (currentCert && currentCert.category && currentCert.key) {
        var cert = certLinks[currentCert.category][currentCert.key];
        if (cert && cert.link) {
            var a = document.createElement('a');
            a.href = cert.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.download = cert.name + '_Certificate';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            showToast('File sertifikat belum tersedia!', 'warning');
        }
    } else {
        showToast('File sertifikat belum tersedia!', 'warning');
    }
};

window.previewBadgeImage = function (url) {
    var preview = document.getElementById('certBadgePreview');
    if (!preview) return;
    if (url) {
        preview.innerHTML = '<img src="' + escapeHTML(url) + '" alt="Preview" class="image-preview" onerror="this.style.display=\'none\'">';
    } else {
        preview.innerHTML = '';
    }
};

/* ─── Portfolio ─── */
function loadPortfolioItems() {
    var saved = localStorage.getItem('portfolioItems');
    if (saved) {
        try {
            portfolioItems = JSON.parse(saved);
        } catch (e) {
            portfolioItems = [];
        }
    } else {
        portfolioItems = [
            {
                id: '1', category: 'individu', title: 'Project Web CV',
                description: 'Membangun website CV interaktif',
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format',
                link: 'https://github.com/waldevelop-afk/web-cv',
                createdAt: Date.now() - 3000000
            },
            {
                id: '2', category: 'individu', title: 'Game QuickMath',
                description: 'Game hitung cepat JavaScript',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format',
                link: 'https://github.com/waldevelop-afk/quickmath-game',
                createdAt: Date.now() - 2000000
            },
            {
                id: '3', category: 'individu', title: 'UI Design Challenge',
                description: 'Mendesain tampilan aplikasi mobile',
                image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format',
                link: 'https://github.com/waldevelop-afk/ui-design-challenge',
                createdAt: Date.now() - 1000000
            },
            {
                id: '4', category: 'organisasi', title: 'Panitia Seminar Teknologi',
                description: 'Menjadi koordinator acara seminar AI 2025',
                image: 'https://images.unsplash.com/photo-1540575467069-4f5f2d6f4b9a?w=500&auto=format',
                link: '',
                createdAt: Date.now() - 4000000
            },
            {
                id: '5', category: 'organisasi', title: 'Himpunan Mahasiswa',
                description: 'Anggota divisi pengembangan teknologi',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format',
                link: '',
                createdAt: Date.now() - 3500000
            }
        ];
        savePortfolioItems();
    }
    renderPortfolioItems();
}

function savePortfolioItems() {
    localStorage.setItem('portfolioItems', JSON.stringify(portfolioItems));
}

function filterAndSortItems() {
    var filtered = portfolioItems.slice();

    if (currentFilter !== 'all') {
        filtered = filtered.filter(function (item) { return item.category === currentFilter; });
    }

    if (currentSearch) {
        var searchLower = currentSearch.toLowerCase();
        filtered = filtered.filter(function (item) {
            return item.title.toLowerCase().includes(searchLower) ||
                   item.description.toLowerCase().includes(searchLower);
        });
    }

    switch (currentSort) {
        case 'newest':
            filtered.sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
            break;
        case 'oldest':
            filtered.sort(function (a, b) { return (a.createdAt || 0) - (b.createdAt || 0); });
            break;
        case 'az':
            filtered.sort(function (a, b) { return a.title.localeCompare(b.title); });
            break;
        case 'za':
            filtered.sort(function (a, b) { return b.title.localeCompare(a.title); });
            break;
    }

    return filtered;
}

function renderPortfolioItems() {
    var grid = document.getElementById('portfolioGrid');
    var stats = document.getElementById('portfolioStats');
    var pagination = document.getElementById('portfolioPagination');
    if (!grid) return;

    var filtered = filterAndSortItems();
    var totalItems = filtered.length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    var start = (currentPage - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    var paginatedItems = filtered.slice(start, end);

    if (stats) {
        var filterText = currentFilter === 'all' ? 'semua' : currentFilter;
        stats.innerHTML =
            'Menampilkan <span>' + paginatedItems.length + '</span> dari <span>' +
            totalItems + '</span> portfolio (' + escapeHTML(filterText) + ')';
    }

    if (totalItems === 0) {
        grid.innerHTML =
            '<div class="empty-portfolio" role="listitem">' +
            '<i class="fas fa-images" aria-hidden="true"></i>' +
            '<h3>Tidak ada portfolio</h3>' +
            '<p>' + (isPortfolioLoggedIn ? 'Klik "Tambah Portfolio" untuk menambahkan kegiatan' : 'Tidak ada portfolio yang ditemukan') + '</p>' +
            '</div>';
        if (pagination) pagination.innerHTML = '';
        return;
    }

    var html = '';
    paginatedItems.forEach(function (item) {
        var linkHtml = item.link
            ? '<a href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener noreferrer" class="github-link"><i class="fab fa-github" aria-hidden="true"></i> Lihat Repository</a>'
            : '';

        var adminActions = isPortfolioLoggedIn
            ? '<div class="portfolio-item-actions">' +
              '<button onclick="editPortfolioItem(\'' + escapeHTML(item.id) + '\')" class="btn-edit-portfolio" title="Edit" aria-label="Edit ' + escapeHTML(item.title) + '">' +
              '<i class="fas fa-edit" aria-hidden="true"></i></button>' +
              '<button onclick="showDeleteConfirm(\'' + escapeHTML(item.id) + '\')" class="btn-delete-portfolio" title="Hapus" aria-label="Hapus ' + escapeHTML(item.title) + '">' +
              '<i class="fas fa-trash" aria-hidden="true"></i></button></div>'
            : '';

        html +=
            '<div class="portfolio-item" data-category="' + escapeHTML(item.category) + '" data-id="' + escapeHTML(item.id) + '" role="listitem">' +
            adminActions +
            '<div class="portfolio-image">' +
            '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title) + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format\'">' +
            '<div class="portfolio-overlay">' +
            '<h3>' + escapeHTML(item.title) + '</h3>' +
            '<p>' + escapeHTML(item.description) + '</p>' +
            linkHtml +
            '</div></div></div>';
    });

    grid.innerHTML = html;

    if (pagination) {
        renderPagination(totalPages);
    }
}

function renderPagination(totalPages) {
    var pagination = document.getElementById('portfolioPagination');
    if (!pagination) return;

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    var html = '';

    html += '<button class="pagination-btn" onclick="changePage(' + (currentPage - 1) + ')"' +
            (currentPage === 1 ? ' disabled' : '') + ' aria-label="Halaman sebelumnya">&laquo;</button>';

    for (var i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += '<button class="pagination-btn' + (i === currentPage ? ' active' : '') +
                    '" onclick="changePage(' + i + ')"' +
                    (i === currentPage ? ' aria-current="page"' : '') + '>' + i + '</button>';
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<button class="pagination-btn" disabled aria-hidden="true">...</button>';
        }
    }

    html += '<button class="pagination-btn" onclick="changePage(' + (currentPage + 1) + ')"' +
            (currentPage === totalPages ? ' disabled' : '') + ' aria-label="Halaman berikutnya">&raquo;</button>';

    pagination.innerHTML = html;
}

window.changePage = function (page) {
    var filtered = filterAndSortItems();
    var totalPages = Math.ceil(filtered.length / itemsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderPortfolioItems();
    var gridEl = document.getElementById('portfolioGrid');
    if (gridEl) {
        window.scrollTo({ top: gridEl.offsetTop - 100, behavior: 'smooth' });
    }
};

function initSearchAndSort() {
    var searchInput = document.getElementById('searchPortfolio');
    var sortSelect = document.getElementById('sortPortfolio');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            currentSearch = e.target.value;
            currentPage = 1;
            renderPortfolioItems();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
            currentSort = e.target.value;
            currentPage = 1;
            renderPortfolioItems();
        });
    }
}

function initPortfolioFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            renderPortfolioItems();
        });
    });
}

/* ─── Portfolio Admin Auth ─── */
window.openPortfolioLoginModal = function () {
    if (isPortfolioLoggedIn) {
        showPortfolioAdminPanel();
    } else {
        var modal = document.getElementById('portfolioLoginModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        document.getElementById('portfolioUsername').value = '';
        document.getElementById('portfolioPassword').value = '';
        document.getElementById('portfolioLoginError').style.display = 'none';
        trapFocus(modal);
    }
};

window.closePortfolioLoginModal = function () {
    var modal = document.getElementById('portfolioLoginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.handlePortfolioLogin = async function () {
    var username = document.getElementById('portfolioUsername').value.trim();
    var password = document.getElementById('portfolioPassword').value;
    var errorElement = document.getElementById('portfolioLoginError');

    var isValid = await verifyCredentials(username, password);

    if (isValid) {
        isPortfolioLoggedIn = true;
        localStorage.setItem('portfolioAdminLoggedIn', 'true');
        closePortfolioLoginModal();
        showPortfolioAdminPanel();
        updatePortfolioAdminButton();
        renderPortfolioItems();
        showToast('Login portfolio berhasil! Selamat datang Admin.', 'success');
    } else {
        errorElement.style.display = 'block';
        document.getElementById('portfolioUsername').classList.add('input-error');
        document.getElementById('portfolioPassword').classList.add('input-error');
    }
};

function showPortfolioAdminPanel() {
    var panel = document.getElementById('portfolioAdminPanel');
    panel.style.display = 'block';
    panel.classList.add('visible');

    document.getElementById('portfolioTitle').value = '';
    document.getElementById('portfolioDescription').value = '';
    document.getElementById('portfolioImage').value = '';
    document.getElementById('portfolioLink').value = '';
    document.getElementById('portfolioImagePreview').innerHTML = '';

    var saveBtn = document.getElementById('portfolioSaveBtn');
    saveBtn.innerHTML = '<i class="fas fa-plus-circle" aria-hidden="true"></i> Tambah Portfolio';
    saveBtn.onclick = addPortfolioItem;

    updateCharCounter('portfolioDescription', 'portfolioDescCount', 500);
}

window.closePortfolioAdminPanel = function () {
    var panel = document.getElementById('portfolioAdminPanel');
    panel.style.display = 'none';
    panel.classList.remove('visible');
};

window.logoutPortfolioAdmin = function () {
    isPortfolioLoggedIn = false;
    localStorage.removeItem('portfolioAdminLoggedIn');
    closePortfolioAdminPanel();
    updatePortfolioAdminButton();
    renderPortfolioItems();
    showToast('Logout portfolio berhasil!', 'info');
};

function updatePortfolioAdminButton() {
    var adminBtn = document.getElementById('portfolioAdminLoginBtn');
    var adminStatus = document.getElementById('portfolioAdminStatus');

    if (isPortfolioLoggedIn) {
        adminBtn.innerHTML = '<i class="fas fa-user-shield" aria-hidden="true"></i> Portfolio Admin (Active)';
        adminStatus.textContent = 'Anda sudah login sebagai admin portfolio';
        adminStatus.style.color = '#10B981';
    } else {
        adminBtn.innerHTML = '<i class="fas fa-lock" aria-hidden="true"></i> Portfolio Admin Login';
        adminStatus.textContent = 'Klik untuk login sebagai admin portfolio';
        adminStatus.style.color = '';
    }
}

function checkPortfolioLoginStatus() {
    var savedStatus = localStorage.getItem('portfolioAdminLoggedIn');
    if (savedStatus === 'true') {
        isPortfolioLoggedIn = true;
        showPortfolioAdminPanel();
        updatePortfolioAdminButton();
    }
}

window.previewPortfolioImage = function (url) {
    var preview = document.getElementById('portfolioImagePreview');
    if (url) {
        preview.innerHTML = '<img src="' + escapeHTML(url) + '" alt="Preview" class="image-preview" onerror="this.style.display=\'none\'">';
    } else {
        preview.innerHTML = '';
    }
};

function isValidImageUrl(url) {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) ||
           url.includes('images.unsplash.com') ||
           url.includes('ibb.co') ||
           url.includes('cloudinary.com') ||
           url.includes('googleusercontent.com') ||
           url.includes('picsum.photos') ||
           url.includes('placehold.co');
}

window.addPortfolioItem = function () {
    if (!isPortfolioLoggedIn) {
        showToast('Anda harus login terlebih dahulu!', 'error');
        openPortfolioLoginModal();
        return;
    }

    var category = document.getElementById('portfolioCategory').value;
    var title = document.getElementById('portfolioTitle').value.trim();
    var description = document.getElementById('portfolioDescription').value.trim();
    var image = document.getElementById('portfolioImage').value.trim();
    var link = document.getElementById('portfolioLink').value.trim();

    clearFieldErrors();

    var hasError = false;
    if (!title) { markFieldError('portfolioTitle'); hasError = true; }
    if (!description) { markFieldError('portfolioDescription'); hasError = true; }
    if (!image) { markFieldError('portfolioImage'); hasError = true; }

    if (hasError) {
        showToast('Judul, deskripsi, dan gambar harus diisi!', 'error');
        return;
    }

    if (!isValidImageUrl(image)) {
        markFieldError('portfolioImage');
        showToast('Link gambar tidak valid! Gunakan link gambar yang benar.', 'error');
        return;
    }

    if (link && !link.match(/^https?:\/\/.+/i)) {
        markFieldError('portfolioLink');
        showToast('Link repository harus berupa URL yang valid!', 'error');
        return;
    }

    var newItem = {
        id: Date.now().toString(),
        category: category,
        title: title,
        description: description,
        image: image,
        link: link || '',
        createdAt: Date.now()
    };

    portfolioItems.push(newItem);
    savePortfolioItems();
    currentPage = 1;
    renderPortfolioItems();

    document.getElementById('portfolioTitle').value = '';
    document.getElementById('portfolioDescription').value = '';
    document.getElementById('portfolioImage').value = '';
    document.getElementById('portfolioLink').value = '';
    document.getElementById('portfolioImagePreview').innerHTML = '';
    updateCharCounter('portfolioDescription', 'portfolioDescCount', 500);

    showToast('Portfolio berhasil ditambahkan!', 'success');
};

function markFieldError(fieldId) {
    var field = document.getElementById(fieldId);
    if (field) field.classList.add('input-error');
}

function clearFieldErrors() {
    document.querySelectorAll('.input-error').forEach(function (el) {
        el.classList.remove('input-error');
    });
}

window.showDeleteConfirm = function (id) {
    deleteId = id;
    var modal = document.getElementById('confirmModal');
    document.getElementById('confirmMessage').textContent = 'Apakah Anda yakin ingin menghapus item ini?';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
};

window.closeConfirmModal = function () {
    var modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    deleteId = null;
};

window.confirmAction = function () {
    if (deleteId) {
        if (!isPortfolioLoggedIn) {
            showToast('Anda harus login terlebih dahulu!', 'error');
            openPortfolioLoginModal();
            closeConfirmModal();
            return;
        }

        portfolioItems = portfolioItems.filter(function (item) { return item.id !== deleteId; });
        savePortfolioItems();
        renderPortfolioItems();
        showToast('Portfolio berhasil dihapus!', 'success');
        closeConfirmModal();
    }
};

window.editPortfolioItem = function (id) {
    if (!isPortfolioLoggedIn) {
        showToast('Anda harus login terlebih dahulu!', 'error');
        openPortfolioLoginModal();
        return;
    }

    var item = portfolioItems.find(function (i) { return i.id === id; });
    if (!item) return;

    document.getElementById('portfolioCategory').value = item.category;
    document.getElementById('portfolioTitle').value = item.title;
    document.getElementById('portfolioDescription').value = item.description;
    document.getElementById('portfolioImage').value = item.image;
    document.getElementById('portfolioLink').value = item.link || '';

    if (item.image) {
        document.getElementById('portfolioImagePreview').innerHTML =
            '<img src="' + escapeHTML(item.image) + '" alt="Preview" class="image-preview" onerror="this.style.display=\'none\'">';
    }

    updateCharCounter('portfolioDescription', 'portfolioDescCount', 500);

    var saveBtn = document.getElementById('portfolioSaveBtn');
    saveBtn.innerHTML = '<i class="fas fa-sync-alt" aria-hidden="true"></i> Update Portfolio';
    saveBtn.onclick = function () { updatePortfolioItem(id); };

    showPortfolioAdminPanel();
};

window.updatePortfolioItem = function (id) {
    if (!isPortfolioLoggedIn) return;

    var category = document.getElementById('portfolioCategory').value;
    var title = document.getElementById('portfolioTitle').value.trim();
    var description = document.getElementById('portfolioDescription').value.trim();
    var image = document.getElementById('portfolioImage').value.trim();
    var link = document.getElementById('portfolioLink').value.trim();

    clearFieldErrors();

    var hasError = false;
    if (!title) { markFieldError('portfolioTitle'); hasError = true; }
    if (!description) { markFieldError('portfolioDescription'); hasError = true; }
    if (!image) { markFieldError('portfolioImage'); hasError = true; }

    if (hasError) {
        showToast('Judul, deskripsi, dan gambar harus diisi!', 'error');
        return;
    }

    if (!isValidImageUrl(image)) {
        markFieldError('portfolioImage');
        showToast('Link gambar tidak valid!', 'error');
        return;
    }

    var index = portfolioItems.findIndex(function (i) { return i.id === id; });
    if (index !== -1) {
        portfolioItems[index] = {
            id: portfolioItems[index].id,
            createdAt: portfolioItems[index].createdAt,
            category: category,
            title: title,
            description: description,
            image: image,
            link: link || ''
        };

        savePortfolioItems();
        renderPortfolioItems();

        document.getElementById('portfolioTitle').value = '';
        document.getElementById('portfolioDescription').value = '';
        document.getElementById('portfolioImage').value = '';
        document.getElementById('portfolioLink').value = '';
        document.getElementById('portfolioImagePreview').innerHTML = '';
        updateCharCounter('portfolioDescription', 'portfolioDescCount', 500);

        var saveBtn = document.getElementById('portfolioSaveBtn');
        saveBtn.innerHTML = '<i class="fas fa-plus-circle" aria-hidden="true"></i> Tambah Portfolio';
        saveBtn.onclick = addPortfolioItem;

        showToast('Portfolio berhasil diupdate!', 'success');
    }
};

/* ─── Character Counters ─── */
function initCharCounters() {
    var descField = document.getElementById('portfolioDescription');
    if (descField) {
        descField.addEventListener('input', function () {
            updateCharCounter('portfolioDescription', 'portfolioDescCount', 500);
        });
    }
}

function updateCharCounter(fieldId, counterId, max) {
    var field = document.getElementById(fieldId);
    var counter = document.getElementById(counterId);
    if (field && counter) {
        var len = field.value.length;
        counter.textContent = len + '/' + max;
        counter.style.color = len > max * 0.9 ? 'var(--danger)' : '';
    }
}

/* ─── Login Enter Key Support ─── */
function initLoginEnterKeys() {
    var passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); handleLogin(); }
        });
    }

    var portfolioPasswordField = document.getElementById('portfolioPassword');
    if (portfolioPasswordField) {
        portfolioPasswordField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); handlePortfolioLogin(); }
        });
    }

    var usernameField = document.getElementById('username');
    if (usernameField) {
        usernameField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); document.getElementById('password').focus(); }
        });
    }

    var portfolioUsernameField = document.getElementById('portfolioUsername');
    if (portfolioUsernameField) {
        portfolioUsernameField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); document.getElementById('portfolioPassword').focus(); }
        });
    }
}

/* ─── Modal Focus Trap ─── */
function trapFocus(modal) {
    var focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var focusableElements = modal.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;

    var firstFocusable = focusableElements[0];
    var lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable.focus();

    modal._trapHandler = function (e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    modal.addEventListener('keydown', modal._trapHandler);
}

/* ─── Modal Click Outside ─── */
function initModalClickOutside() {
    document.addEventListener('click', function (event) {
        var certModal = document.getElementById('certModal');
        if (certModal && event.target === certModal) {
            closeModal();
        }

        var confirmModal = document.getElementById('confirmModal');
        if (confirmModal && event.target === confirmModal) {
            closeConfirmModal();
        }

        var loginModal = document.getElementById('loginModal');
        if (loginModal && event.target === loginModal) {
            closeLoginModal();
        }

        var portfolioLoginModal = document.getElementById('portfolioLoginModal');
        if (portfolioLoginModal && event.target === portfolioLoginModal) {
            closePortfolioLoginModal();
        }
    });
}

/* ─── Escape Key Handler ─── */
function initEscapeKey() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
            closeConfirmModal();
            closeLoginModal();
            closePortfolioLoginModal();
        }
    });
}

/* ─── Popstate (Browser Back/Forward) ─── */
function initPopState() {
    window.addEventListener('popstate', function () {
        var hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });
}

/* ─── QuickMath Game ─── */
function initGame() {
    var startScreen = document.getElementById('start-screen');
    var loadingScreen = document.getElementById('loading-screen');
    var playScreen = document.getElementById('play-screen');
    var resultScreen = document.getElementById('result-screen');
    var inputField = document.getElementById('answer-input');
    var progress = document.getElementById('progress');
    var questNumber = document.getElementById('quest-number');
    var displayQuestion = document.getElementById('display-question');
    var loadingPercentage = document.getElementById('loadingPercentage');
    var playerNameInput = document.getElementById('player-name-input');
    var nameError = document.getElementById('name-error');
    var loadingPlayerName = document.getElementById('loading-player-name');
    var playPlayerName = document.getElementById('play-player-name');
    var resultPlayerName = document.getElementById('result-player-name');
    var finalScore = document.getElementById('final-score');
    var resultMessage = document.getElementById('result-message');
    var resultTitle = document.getElementById('result-title');

    if (!startScreen || !loadingScreen || !playScreen || !resultScreen) return;

    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                processAnswer();
            }
        });
    }

    window.validateAndShowLoading = function () {
        var name = playerNameInput.value.trim();
        if (name === '') {
            nameError.style.display = 'block';
            playerNameInput.classList.add('input-error');
            playerNameInput.focus();
            return;
        }
        nameError.style.display = 'none';
        playerNameInput.classList.remove('input-error');
        playerName = name;
        showLoading();
    };

    window.showStartScreen = function () {
        startScreen.classList.remove('hidden');
        loadingScreen.classList.add('hidden');
        playScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        if (playerNameInput) playerNameInput.value = '';
        playerName = '';
    };

    function showLoading() {
        startScreen.classList.add('hidden');
        playScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        loadingScreen.classList.remove('hidden');

        if (loadingPlayerName) {
            loadingPlayerName.textContent = playerName;
        }

        var startButton = document.getElementById('startButton');
        if (startButton) startButton.disabled = true;

        var percentage = 0;
        var interval = setInterval(function () {
            percentage += Math.random() * 15;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);

                setTimeout(function () {
                    loadingScreen.classList.add('hidden');
                    startGame();
                    if (startButton) startButton.disabled = false;
                }, 500);
            }

            if (loadingPercentage) {
                loadingPercentage.textContent = Math.floor(percentage) + '%';
            }
        }, 200);
    }

    function startGame() {
        currentQuestion = 0;
        score = 0;
        gameData = [];
        playScreen.classList.remove('hidden');
        if (playPlayerName) {
            playPlayerName.textContent = playerName;
        }
        nextQuestion();
    }

    function generateQuestion() {
        var ops = ['+', '-', '*', '/'];
        var a = Math.floor(Math.random() * 10) + 1;
        var b = Math.floor(Math.random() * 10) + 1;
        var op = ops[Math.floor(Math.random() * 4)];

        if (op === '/') {
            a = a * b;
        }

        var opDisplay = op;
        if (op === '*') opDisplay = '\u00d7';
        if (op === '/') opDisplay = '\u00f7';

        var qText = a + ' ' + opDisplay + ' ' + b;
        var ans = 0;
        if (op === '+') ans = a + b;
        else if (op === '-') ans = a - b;
        else if (op === '*') ans = a * b;
        else if (op === '/') ans = a / b;

        return { qText: qText, ans: ans };
    }

    function nextQuestion() {
        if (currentQuestion >= 10) {
            endGame();
            return;
        }

        currentQuestion++;
        if (questNumber) {
            questNumber.textContent = 'Soal ' + currentQuestion + ' / 10';
        }
        var q = generateQuestion();
        if (displayQuestion) {
            displayQuestion.textContent = q.qText;
        }
        currentAnswer = q.ans;

        if (inputField) {
            inputField.value = '';
            inputField.focus();
        }

        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 10;

        if (progress) {
            progress.style.transition = 'none';
            progress.style.width = '100%';
            progress.offsetHeight;
            progress.style.transition = 'width 10s linear';
            progress.style.width = '0%';
        }

        var startTime = Date.now();
        timerInterval = setInterval(function () {
            var elapsed = (Date.now() - startTime) / 1000;
            timeLeft = Math.max(0, 10 - elapsed);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                processAnswer(null);
            }
        }, 100);
    }

    function processAnswer(userValue) {
        clearInterval(timerInterval);

        var jawaban;
        if (userValue === null) {
            jawaban = null;
        } else {
            jawaban = parseFloat(inputField ? inputField.value : '0');
            if (isNaN(jawaban)) jawaban = null;
        }

        var benar = (jawaban === currentAnswer);
        if (benar) score++;

        gameData.push({
            soal: displayQuestion ? displayQuestion.textContent : '',
            jawabanUser: jawaban !== null ? jawaban : '-',
            jawabanBenar: currentAnswer,
            status: benar ? 'benar' : 'salah'
        });

        if (currentQuestion < 10) {
            nextQuestion();
        } else {
            endGame();
        }
    }

    function createConfetti() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 50; i++) {
            var confetti = document.createElement('div');
            confetti.style.cssText =
                'position:fixed;width:10px;height:10px;border-radius:50%;z-index:9999;pointer-events:none;' +
                'left:' + (Math.random() * 100) + '%;' +
                'background:hsl(' + (Math.random() * 360) + ',100%,50%);' +
                'animation:confettiFall ' + (Math.random() * 2 + 2) + 's ease-in-out ' + (Math.random() * 3) + 's forwards;';
            fragment.appendChild(confetti);
        }
        document.body.appendChild(fragment);

        setTimeout(function () {
            var confettiElements = document.querySelectorAll('[style*="confettiFall"]');
            confettiElements.forEach(function (el) { el.remove(); });
        }, 6000);
    }

    function endGame() {
        playScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        if (resultPlayerName) {
            resultPlayerName.textContent = playerName;
        }

        var totalScore = score;
        if (finalScore) {
            finalScore.textContent = 'Skor: ' + totalScore + ' / 10';
        }

        if (resultTitle) {
            if (totalScore >= 8) {
                resultTitle.textContent = 'SELAMAT!';
            } else {
                resultTitle.textContent = 'YAH...';
            }
        }

        if (resultMessage) {
            if (totalScore >= 8) {
                resultMessage.textContent = playerName + ', kamu MENANG! Luar biasa!';
                resultMessage.style.color = '#10B981';
                if (finalScore) {
                    finalScore.classList.add('win-badge');
                    finalScore.classList.remove('lose-badge');
                }
                createConfetti();
            } else {
                resultMessage.textContent = playerName + ', kamu KALAH. Coba lagi ya!';
                resultMessage.style.color = '#EF4444';
                if (finalScore) {
                    finalScore.classList.add('lose-badge');
                    finalScore.classList.remove('win-badge');
                }
            }
        }

        var tbody = document.getElementById('result-body');
        if (tbody) {
            tbody.innerHTML = '';
            gameData.forEach(function (data, index) {
                var row = document.createElement('tr');
                var statusClass = data.status === 'benar' ? 'row-correct' : 'row-wrong';

                var td1 = document.createElement('td');
                td1.textContent = index + 1;

                var td2 = document.createElement('td');
                td2.textContent = data.jawabanUser;

                var td3 = document.createElement('td');
                td3.className = statusClass;
                td3.textContent = data.jawabanBenar;

                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                tbody.appendChild(row);
            });
        }
    }
}

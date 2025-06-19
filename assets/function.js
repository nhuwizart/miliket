document.addEventListener('DOMContentLoaded', () => {

     // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeOverlayBtn = document.querySelector('.close-overlay-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a'); // Các link trong overlay
    const loginOverlayBtn = document.getElementById('login-overlay-btn'); // Nút đăng nhập trong overlay

    // Smooth scrolling for navigation links (main desktop nav and mobile overlay nav)
    document.querySelectorAll('nav a, .mobile-nav-links a').forEach(anchor => {
        // Chỉ xử lý smooth scroll cho các link không phải là nút đăng nhập
        // if (anchor.id !== 'login-nav-btn' && anchor.id !== 'login-overlay-btn') {
        //     anchor.addEventListener('click', function (e) {
        //         e.preventDefault();
        //         document.querySelector(this.getAttribute('href')).scrollIntoView({
        //             behavior: 'smooth'
        //         });
        //         // Close mobile menu overlay if open
        //         if (mobileNavOverlay.classList.contains('open')) {
        //             mobileNavOverlay.classList.remove('open');
        //             document.body.style.overflow = ''; // Cho phép cuộn lại
        //         }
        //     });
        // }
        const href = anchor.getAttribute('href');

        // Chỉ xử lý smooth scroll và preventDefault cho các link nội bộ (bắt đầu bằng '#')
        // và không phải là nút đăng nhập
        if (href && href.startsWith('#') && anchor.id !== 'login-nav-btn' && anchor.id !== 'login-overlay-btn') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Ngăn chặn hành vi mặc định CHỈ KHI là link nội bộ
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu overlay if open
                if (mobileNavOverlay.classList.contains('open')) {
                    mobileNavOverlay.classList.remove('open');
                    document.body.style.overflow = ''; // Cho phép cuộn lại
                }
            });
        }
    });

    // OPEN mobile menu overlay
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
        });
    }

    // CLOSE mobile menu overlay via 'x' button
    if (closeOverlayBtn) {
        closeOverlayBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Cho phép cuộn lại
        });
    }

    // CLOSE mobile menu overlay when clicking outside (on the overlay itself)
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (event) => {
            if (event.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }



    // // Smooth scrolling for navigation links (excluding login button)
    // document.querySelectorAll('nav a').forEach(anchor => {
    //     // Chỉ xử lý smooth scroll cho các link không phải là nút đăng nhập
    //     if (anchor.id !== 'login-nav-btn') {
    //         anchor.addEventListener('click', function (e) {
    //             e.preventDefault();
    //             document.querySelector(this.getAttribute('href')).scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //             // Close mobile menu after clicking a link
    //             if (mobileMenu.classList.contains('is-active')) {
    //                 mobileMenu.classList.remove('is-active');
    //                 navLinks.classList.remove('active');
    //             }
    //         });
    //     }
    // });

    // // Mobile menu toggle
    // const mobileMenu = document.getElementById('mobile-menu');
    // const navLinks = document.querySelector('.nav');

    // mobileMenu.addEventListener('click', () => {
    //     mobileMenu.classList.toggle('is-active');
    //     navLinks.classList.toggle('active');
    // });

    // Scroll to registration form on button click
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            document.getElementById('register').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Handle form submission (Registration)
    const registrationForm = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const videoLink = document.getElementById('videoLink').value;

            if (!fullName || !email || !phone || !videoLink) {
                displayMessage(formMessage, 'Vui lòng điền đầy đủ tất cả các trường.', 'error');
                return;
            }

            console.log('Đăng ký dự thi:', { fullName, email, phone, videoLink });
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            displayMessage(formMessage, 'Đăng ký của bạn đã được gửi thành công!', 'success');
            registrationForm.reset();
        });
    }

    // Generic function to display messages for forms
    function displayMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';

        setTimeout(() => {
            element.style.display = 'none';
            element.textContent = '';
        }, 5000);
    }


    // // --- QR Scanner Functionality ---
    // const qrVideo = document.getElementById('qr-video');
    // const qrScanMessage = document.getElementById('qr-scan-message');
    // const currentPointsSpan = document.getElementById('current-points');

    // let currentPoints = parseInt(localStorage.getItem('miliketPoints')) || 0;
    // currentPointsSpan.textContent = currentPoints;

    // let scanner = null; // Declare scanner here

    // // Function to initialize and start scanner
    // function startQrScanner() {
    //     if (!scanner) { // Only create scanner if it doesn't exist
    //         scanner = new Instascan.Scanner({ video: qrVideo, mirror: false, scanPeriod: 5 });
    //     }

    //     scanner.addListener('scan', function (content) {
    //         console.log('QR Scanned:', content);
    //         const scannedCodes = JSON.parse(localStorage.getItem('scannedMiliketCodes')) || [];
    //         if (!scannedCodes.includes(content)) {
    //             currentPoints += 10;
    //             localStorage.setItem('miliketPoints', currentPoints);
    //             currentPointsSpan.textContent = currentPoints;
    //             scannedCodes.push(content);
    //             localStorage.setItem('scannedMiliketCodes', JSON.stringify(scannedCodes));

    //             displayMessage(qrScanMessage, `Mã QR hợp lệ! Bạn vừa nhận 10 điểm. Tổng điểm: ${currentPoints}`, 'success');
    //         } else {
    //             displayMessage(qrScanMessage, 'Mã QR này đã được quét rồi. Vui lòng quét mã khác.', 'error');
    //         }
    //         // Stop scanning after a successful scan to prevent rapid multiple scans
    //         scanner.stop();
    //         // Re-enable scanner after a short delay (e.g., 3 seconds)
    //         setTimeout(() => {
    //             startCamera(); // Restart camera to allow next scan
    //         }, 3000);
    //     });

    //     // Start camera initially
    //     startCamera();
    // }

    // function startCamera() {
    //     Instascan.Camera.getCameras().then(function (cameras) {
    //         if (cameras.length > 0) {
    //             const selectedCamera = cameras.find(camera => camera.name.toLowerCase().includes('back')) || cameras[0];
    //             scanner.start(selectedCamera);
    //             displayMessage(qrScanMessage, 'Đang quét mã QR...', 'info');
    //         } else {
    //             displayMessage(qrScanMessage, 'Không tìm thấy camera nào trên thiết bị của bạn.', 'error');
    //             console.error('No cameras found.');
    //         }
    //     }).catch(function (e) {
    //         displayMessage(qrScanMessage, 'Lỗi truy cập camera. Vui lòng kiểm tra quyền truy cập.', 'error');
    //         console.error(e);
    //     });
    // }

    // // Only start QR scanner when the QR scan section is scrolled into view
    // const qrScanSection = document.getElementById('qr-scan');
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             startQrScanner();
    //             observer.unobserve(entry.target); // Stop observing once started
    //         }
    //     });
    // }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    // if (qrScanSection) {
    //     observer.observe(qrScanSection);
    // }


    // --- Login Modal Functionality ---
    const loginModal = document.getElementById('login-modal');
    const loginNavBtn = document.getElementById('login-nav-btn'); // Nút Đăng nhập trên menu
    const loginNavBtnMobile = document.getElementById('login-overlay-btn'); // Nút Đăng nhập trên menu
    const closeButton = document.querySelector('.modal .close-button'); // Dấu 'x' trong pop-up
    const loginForm = loginModal.querySelector('.login-form');
    const loginMessage = document.getElementById('login-message');

    // Mở pop-up khi click vào nút "Đăng nhập" trên menu
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            loginModal.style.display = 'flex'; // Hiển thị pop-up (sử dụng flex để căn giữa)
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
            // Đảm bảo pop-up đăng nhập luôn xuất hiện từ đầu form
            if (loginForm) {
                loginForm.reset();
            }
            if (loginMessage) {
                displayMessage(loginMessage, '', ''); // Xóa thông báo cũ
            }
            document.getElementById('loginEmail').focus(); // Tự động focus vào trường email
        });
    }
    if (loginNavBtnMobile) {
        loginNavBtnMobile.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            loginModal.style.display = 'flex'; // Hiển thị pop-up (sử dụng flex để căn giữa)
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
            // Đảm bảo pop-up đăng nhập luôn xuất hiện từ đầu form
            if (loginForm) {
                loginForm.reset();
            }
            if (loginMessage) {
                displayMessage(loginMessage, '', ''); // Xóa thông báo cũ
            }
            document.getElementById('loginEmail').focus(); // Tự động focus vào trường email
        });
    }

    // Đóng pop-up khi click vào dấu 'x'
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            loginModal.style.display = 'none'; // Ẩn pop-up
            document.body.style.overflow = ''; // Cho phép cuộn trang lại
        });
    }

    // Đóng pop-up khi click ra ngoài vùng nội dung pop-up (nền mờ)
    if (loginModal) {
        loginModal.addEventListener('click', (event) => {
            if (event.target === loginModal) { // Chỉ đóng khi click trực tiếp vào nền modal
                loginModal.style.display = 'none'; // Ẩn pop-up
                document.body.style.overflow = ''; // Cho phép cuộn trang lại
            }
        });
    }

    // Handle Login Form Submission (Simulated)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            if (!loginEmail || !loginPassword) {
                displayMessage(loginMessage, 'Vui lòng nhập email và mật khẩu.', 'error');
                return;
            }

            console.log('Đăng nhập:', { loginEmail, loginPassword });

            // Simulate API call for login
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // In a real application, you'd send this to a backend for authentication
            // and based on the response, either show success/error or redirect.

            // Simulate successful login
            if (loginEmail === 'test@example.com' && loginPassword === 'password123') {
                displayMessage(loginMessage, 'Đăng nhập thành công!', 'success');
                // You might want to redirect the user or update UI here
                setTimeout(() => {
                    loginModal.style.display = 'none'; // Close modal after successful login
                    document.body.style.overflow = ''; // Cho phép cuộn trang lại
                    loginForm.reset(); // Xóa dữ liệu form
                    displayMessage(loginMessage, '', ''); // Xóa thông báo
                }, 2000);
            } else {
                displayMessage(loginMessage, 'Email hoặc mật khẩu không đúng.', 'error');
            }
        });
    }


    // --- Account Page Specific Functions ---
    const account = document.getElementById('account');
    const score = document.getElementById('score'); // Nút Đăng nhập trên menu
    const scoremb = document.getElementById('scoremb'); // Nút Đăng nhập trên menu
    const closeButtonScore = document.querySelector('#account .close-button'); // Dấu 'x' trong pop-up
    // const loginForm = loginModal.querySelector('.login-form');
    // const loginMessage = document.getElementById('login-message');

    // Mở pop-up khi click vào nút "Đăng nhập" trên menu
    if (score) {
        score.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            account.style.display = 'flex'; // Hiển thị pop-up (sử dụng flex để căn giữa)
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
            // // Đảm bảo pop-up đăng nhập luôn xuất hiện từ đầu form
            // if (loginForm) {
            //     loginForm.reset();
            // }
            // if (loginMessage) {
            //     displayMessage(loginMessage, '', ''); // Xóa thông báo cũ
            // }
            // document.getElementById('loginEmail').focus(); // Tự động focus vào trường email
        });
    }
    if (scoremb) {
        scoremb.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            account.style.display = 'flex'; // Hiển thị pop-up (sử dụng flex để căn giữa)
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
            // Đảm bảo pop-up đăng nhập luôn xuất hiện từ đầu form
            // if (loginForm) {
            //     loginForm.reset();
            // }
            // if (loginMessage) {
            //     displayMessage(loginMessage, '', ''); // Xóa thông báo cũ
            // }
            // document.getElementById('loginEmail').focus(); // Tự động focus vào trường email
        });
    }

    // Đóng pop-up khi click vào dấu 'x'
    if (closeButtonScore) {
        closeButtonScore.addEventListener('click', () => {
            account.style.display = 'none'; // Ẩn pop-up
            document.body.style.overflow = ''; // Cho phép cuộn trang lại
        });
    }

    // Đóng pop-up khi click ra ngoài vùng nội dung pop-up (nền mờ)
    if (account) {
        account.addEventListener('click', (event) => {
            if (event.target === account) { // Chỉ đóng khi click trực tiếp vào nền modal
                account.style.display = 'none'; // Ẩn pop-up
                document.body.style.overflow = ''; // Cho phép cuộn trang lại
            }
        });
    }
});

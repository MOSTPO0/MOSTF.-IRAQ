document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splashScreen");
    const loginScreen = document.getElementById("loginScreen");
    const systemScreen = document.getElementById("systemScreen");

    const tabs = document.querySelectorAll(".navbar button");
    const tabContents = document.querySelectorAll(".tab-content");

    // عرض شاشة البداية لمدة 5 ثوانٍ
    setTimeout(() => {
        splashScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    }, 5000);

    // الدخول إلى النظام بالضغط على زر 6
    document.addEventListener("keydown", (e) => {
        if (e.key === "6") { // التحقق من المفتاح
            loginScreen.classList.add("hidden");
            systemScreen.classList.remove("hidden");
        }
    });

    // التحكم بالتبويبات
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            tab.classList.add("active");
            const tabId = tab.getAttribute("data-tab");
            document.getElementById(`${tabId}Tab`).classList.add("active");
        });
    });
});

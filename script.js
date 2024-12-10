document.getElementById('infoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // إعداد النصوص من النموذج
  const fullName = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const secretCode = document.getElementById('secretCode').value;
  const telegram = document.getElementById('telegram').value;

  // إعداد النصوص في PDF
  pdf.setFont('ArialUnicode', 'normal');
  pdf.text(`الاسم الكامل: ${fullName}`, 10, 10);
  pdf.text(`رقم الهاتف: ${phone}`, 10, 20);
  pdf.text(`اسم المستخدم: ${username}`, 10, 30);
  pdf.text(`كلمة المرور: ${password}`, 10, 40);
  pdf.text(`الرمز السري: ${secretCode}`, 10, 50);
  pdf.text(`يوزر التليجرام: ${telegram}`, 10, 60);

  // تحميل PDF
  pdf.save('form-data.pdf');
});
// استماع للزر "ابدأ"
document.getElementById('startButton').addEventListener('click', function () {
  // إظهار استمارة النموذج عند الضغط على الزر
  document.getElementById('formContainer').style.display = 'block';

  // يمكن إضافة أكشن إضافي مثل إخفاء الزر
  this.style.display = 'none';
});

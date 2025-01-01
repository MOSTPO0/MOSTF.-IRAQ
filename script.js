function login() {
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (password === 'nova') {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
  } else {
    errorMessage.textContent = 'Incorrect code. Try again!';
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.remove('active'));

  document.getElementById(sectionId).classList.add('active');
}

function showAddAdminForm() {
  document.getElementById('add-admin-form').classList.remove('hidden');
}

function verifyAdminCode() {
  const adminCode = document.getElementById('admin-code').value;
  const errorMessage = document.getElementById('admin-error-message');

  if (adminCode === 'admin90') {
    document.getElementById('add-admin-form').classList.add('hidden');
    document.getElementById('new-admin-fields').classList.remove('hidden');
  } else {
    errorMessage.textContent = 'Incorrect Admin Code!';
  }
}

function addAdmin() {
  const name = document.getElementById('admin-name').value;
  const username = document.getElementById('admin-username').value;
  const phone = document.getElementById('admin-phone').value;
  const address = document.getElementById('admin-address').value;

  if (name && username && phone && address) {
    const tableBody = document.querySelector('#admin-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${name}</td>
      <td>${username}</td>
      <td>${phone}</td>
      <td>${address}</td>
    `;

    tableBody.appendChild(row);

    // Clear inputs
    document.getElementById('admin-name').value = '';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-phone').value = '';
    document.getElementById('admin-address').value = '';
    document.getElementById('new-admin-fields').classList.add('hidden');
  } else {
    alert('Please fill out all fields!');
  }
}
// عرض واجهة البوت
function openTelegramBot() {
  const botIframe = document.getElementById('telegram-bot');
  botIframe.src = "https://t.me/YourTelegramBot"; // استبدل "YourTelegramBot" بمعرف البوت الخاص بك.
  botIframe.classList.remove('hidden');
}

// حالة تفعيل طباعة الوصل
let isPrintEnabled = false;

// تفعيل أو إلغاء طباعة الوصل
function togglePrintReceipt() {
  isPrintEnabled = !isPrintEnabled;
  const statusText = document.getElementById('print-status');
  const toggleButton = document.getElementById('print-receipt-toggle');

  if (isPrintEnabled) {
    statusText.textContent = "Receipt printing is ON.";
    toggleButton.textContent = "Disable Receipt Printing";
  } else {
    statusText.textContent = "Receipt printing is OFF.";
    toggleButton.textContent = "Enable Receipt Printing";
  }
}

// طباعة الوصل
function printReceipt(account) {
  if (!isPrintEnabled) return;

  const receiptContent = `
    <style>
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      h1 { text-align: center; }
      .barcode { text-align: center; margin-top: 20px; }
    </style>
    <h1>NOVA Store</h1>
    <p>Date: ${new Date().toLocaleString()}</p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Account ID</th>
          <th>Username</th>
          <th>Price (USD)</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${account.index}</td>
          <td>${account.id}</td>
          <td>${account.username || 'Unknown'}</td>
          <td>$${account.price}</td>
          <td>${account.followers}</td>
        </tr>
      </tbody>
    </table>
    <p>Total: $${account.price}</p>
    <div class="barcode">
      <img src="barcode.png" alt="Barcode">
    </div>
  `;

  const receiptWindow = window.open("", "_blank");
  receiptWindow.document.write(receiptContent);
  receiptWindow.document.close();
  receiptWindow.print();
}

// إضافة حساب جديد
function addAccount() {
  const accountId = document.getElementById('account-id').value;
  const followers = document.getElementById('account-followers').value;
  const price = document.getElementById('account-price').value;

  if (!accountId || !followers || !price) {
    alert("Please fill in all fields.");
    return;
  }

  const tableBody = document.getElementById('accounts-table').querySelector('tbody');
  const newRow = tableBody.insertRow();

  const rowIndex = tableBody.rows.length;
  newRow.insertCell(0).textContent = rowIndex;
  newRow.insertCell(1).textContent = accountId;
  newRow.insertCell(2).textContent = followers;
  newRow.insertCell(3).textContent = `$${price}`;

  // إضافة الدائرة مع حدث البيع
  const statusCell = newRow.insertCell(4);
  const statusCircle = document.createElement('div');
  statusCircle.className = 'status-circle';
  statusCircle.style.cssText = `
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
  `;
  statusCircle.onclick = function () {
    statusCircle.style.backgroundColor = statusCircle.style.backgroundColor === "green" ? "red" : "green";
    if (statusCircle.style.backgroundColor === "red") {
      printReceipt({
        index: rowIndex,
        id: accountId,
        username: "Unknown", // تخصيص لاحق إذا كان الاسم متاحًا
        price: price,
        followers: followers,
      });
    }
  };
  statusCell.appendChild(statusCircle);

  // إعادة تعيين الحقول
  document.getElementById('account-id').value = '';
  document.getElementById('account-followers').value = '';
  document.getElementById('account-price').value = '';
  document.getElementById('add-account-form').classList.add('hidden');
}

// عرض نموذج إضافة الحساب
function showAddAccountForm() {
  document.getElementById('add-account-form').classList.remove('hidden');
}
function printReceipt(account) {
  if (!isPrintEnabled) return;

  const receiptContent = `
    <style>
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      h1 { text-align: center; }
      .barcode { text-align: center; margin-top: 20px; }
      .seal { 
        position: absolute; 
        bottom: 0; 
        right: 0; 
        text-align: center; 
        margin-bottom: 10px;
      }
      .seal img { width: 5cm; height: 2.5cm; }  /* الختم بالأبعاد المطلوبة */
      .seal p { font-weight: bold; }
    </style>
    <h1>NOVA Store</h1>
    <p>Date: ${new Date().toLocaleString()}</p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Account ID</th>
          <th>Username</th>
          <th>Price (USD)</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${account.index}</td>
          <td>${account.id}</td>
          <td>${account.username || 'Unknown'}</td>
          <td>$${account.price}</td>
          <td>${account.followers}</td>
        </tr>
      </tbody>
    </table>
    <p>Total: $${account.price}</p>
    </div>
    <div class="seal">
      <p>ختم المسؤول</p>
      <img src="seal.png" alt="Seal">
    </div>
  `;

  const receiptWindow = window.open("", "_blank");
  receiptWindow.document.write(receiptContent);
  receiptWindow.document.close();
  receiptWindow.print();
}

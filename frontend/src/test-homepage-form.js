// Test script for the homepage quote form
// This file is for manual testing and can be deleted after verification

console.log("🧪 Testing Homepage Quote Form");

// Test 1: API endpoint direct test
async function testAPIDirectly() {
  console.log("📡 Testing API endpoint directly...");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "testuser",
        email: "test@example.com",
        message: "Test message from direct API call",
        projectType: "Website Development",
        source: "test-script",
      }),
    });

    const data = await response.json();
    console.log("✅ API Response:", data);

    if (data.success) {
      console.log("✅ Contact form API is working!");
      return true;
    } else {
      console.error("❌ API returned error:", data.message);
      return false;
    }
  } catch (error) {
    console.error("❌ API test failed:", error);
    return false;
  }
}

// Test 2: Form interaction test
function testFormInteraction() {
  console.log("🎯 Testing form interaction...");

  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');
  const submitButton = document.querySelector('button[type="submit"]');

  if (!emailInput || !messageInput || !submitButton) {
    console.error("❌ Form elements not found");
    return false;
  }

  console.log("✅ All form elements found");
  console.log("📝 Email input:", emailInput);
  console.log("📝 Message input:", messageInput);
  console.log("🔘 Submit button:", submitButton);

  return true;
}

// Run tests
(async () => {
  console.log("🚀 Starting homepage form tests...");

  // Wait for page to load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      const formTest = testFormInteraction();
      if (formTest) {
        console.log("🎉 Form interaction test passed!");
      }
    });
  } else {
    const formTest = testFormInteraction();
    if (formTest) {
      console.log("🎉 Form interaction test passed!");
    }
  }

  // Test API (can be run in browser console)
  // await testAPIDirectly();
})();

// Manual test instructions
console.log(`
📋 Manual Test Instructions:
1. Fill in email: test@example.com
2. Fill in message: Test message from homepage form
3. Click "Get Free Quote"
4. Should see success toast notification
5. Check backend logs for email sending confirmation
6. Check admin email for notification
7. Check test@example.com for thank you email (if using real email)
`);

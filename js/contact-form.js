// Google Apps Script Web App URL - Replace with your actual URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXsiM3tNF_LOxBpIJn2Q5jGSvABXEsNYAgVqapzEzXb9ZcYPrCxRmwOR7ijk_6cRQFzw/exec';

// Get form element
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('button[type="submit"]');

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        subject: contactForm.querySelector('input[name="subject"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value
    };
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Send data to Google Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Function to show messages
function showMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message before form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add CSS for form messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .form-message {
        padding: 15px 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        font-size: 16px;
        animation: slideDown 0.3s ease;
    }
    
    .form-message.success {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .form-message.error {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(messageStyles);
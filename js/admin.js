document.addEventListener('DOMContentLoaded', function() {
    const adminPanel = document.getElementById('admin-panel');
    const loginPrompt = document.getElementById('login-prompt');
    const uploadForm = document.getElementById('upload-form');
    const statusMessage = document.getElementById('status-message');
    const allowedUser = 'sheikh2121'; // Your Netlify Identity username

    // Check if user is logged in
    if (netlifyIdentity) {
        netlifyIdentity.on('init', user => {
            if (user) {
                handleAuthenticated(user);
            }
        });

        netlifyIdentity.on('login', user => {
            handleAuthenticated(user);
        });

        netlifyIdentity.on('logout', () => {
            adminPanel.classList.remove('visible');
            loginPrompt.style.display = 'block';
        });
    }

    function handleAuthenticated(user) {
        if (user.email === allowedUser) {
            adminPanel.classList.add('visible');
            loginPrompt.style.display = 'none';
        } else {
            netlifyIdentity.logout();
            statusMessage.textContent = 'Unauthorized user';
            statusMessage.className = 'error';
        }
    }

    // Handle photo upload
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const chapter = document.getElementById('chapter-select').value;
        const photoFile = document.getElementById('photo-input').files[0];
        const caption = document.getElementById('caption-input').value;

        if (!photoFile || !chapter || !caption) {
            statusMessage.textContent = 'Please fill in all fields';
            statusMessage.className = 'error';
            return;
        }

        try {
            statusMessage.textContent = 'Uploading...';
            statusMessage.className = '';

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('file', photoFile);
            formData.append('chapter', chapter);
            formData.append('caption', caption);

            // Upload to Netlify Function
            const response = await fetch('/.netlify/functions/upload-photo', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            
            statusMessage.textContent = 'Photo uploaded successfully!';
            statusMessage.className = 'success';
            uploadForm.reset();

        } catch (error) {
            console.error('Upload error:', error);
            statusMessage.textContent = 'Error uploading photo. Please try again.';
            statusMessage.className = 'error';
        }
    });
});
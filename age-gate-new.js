/**
 * Shopify Age Gate - 21+ Verification (2s delay, transparent, 90-day cookie)
 * 
 * Features:
 * - 2 second delay after page load
 * - Only appears to new users or after 90 days
 * - Transparent dark background (less obstructive)
 * - Mobile-friendly design
 */

window.addEventListener('load', function() {
  // Run the age gate script after 2 seconds of full page load
  setTimeout(function() {

    (function() {
      'use strict';

      const AGE_GATE_CONFIG = {
        minimumAge: 21,
        cookieName: 'age_verified',
        cookieDays: 90, // Changed from 30 to 90 days
        redirectUrl: 'https://www.google.com'
      };

      // Check if user has already been verified
      function getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }

      // Set verification cookie
      function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
      }

      // Check if already verified (shows gate only to new users or after 90 days)
      if (getCookie(AGE_GATE_CONFIG.cookieName) === 'true') {
        return; // User already verified, exit
      }

      // Create age gate HTML - transparent background
      const ageGateHTML = '<div id="age-gate-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 999999; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; backdrop-filter: blur(4px);"><div style="background: white; padding: 50px 40px; border-radius: 12px; max-width: 450px; width: 90%; text-align: center; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);"><h2 style="margin: 0 0 15px 0; font-size: 32px; color: #333; font-weight: 600;">Age Verification</h2><p style="margin: 0 0 40px 0; font-size: 18px; color: #666; line-height: 1.5;">Are you 21 years of age or older?</p><button id="age-gate-yes" style="background: #333; color: white; border: none; padding: 18px 60px; font-size: 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; transition: background 0.3s; margin-bottom: 15px;">YES</button><button id="age-gate-no" style="background: transparent; color: #999; border: none; padding: 8px; font-size: 14px; cursor: pointer; font-weight: 400; text-decoration: underline; transition: color 0.3s;">No</button></div></div>';

      // Insert age gate into page
      document.body.insertAdjacentHTML('beforeend', ageGateHTML);

      // Handle YES button
      document.getElementById('age-gate-yes').addEventListener('click', function() {
        setCookie(AGE_GATE_CONFIG.cookieName, 'true', AGE_GATE_CONFIG.cookieDays);
        document.getElementById('age-gate-overlay').style.display = 'none';
        document.body.style.overflow = '';
      });

      // Handle NO button
      document.getElementById('age-gate-no').addEventListener('click', function() {
        window.location.href = AGE_GATE_CONFIG.redirectUrl;
      });

      // Prevent scrolling when age gate is active
      document.body.style.overflow = 'hidden';

    })();

  }, 2000); // 2 seconds delay

});
/**
 * Sipsy Discount Code Assignment System
 * Manages dynamic code assignment for abandoned cart recovery
 * 
 * Features:
 * - Assigns unique codes from batch to customers
 * - Tracks code usage (one-time use)
 * - Manages 48-hour expiration
 * - Prevents code reuse
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Code batches
const EMAIL2_CODES = require('./discount_codes_email2.json');
const EMAIL3_CODES = require('./discount_codes_email3.json');

// Track assignments and usage
const ASSIGNMENT_FILE = './code_assignments.json';

class CodeAssignmentSystem {
  constructor() {
    this.email2Codes = EMAIL2_CODES;
    this.email3Codes = EMAIL3_CODES;
    this.assignments = this.loadAssignments();
  }

  /**
   * Load existing assignments from file
   */
  loadAssignments() {
    try {
      if (fs.existsSync(ASSIGNMENT_FILE)) {
        return JSON.parse(fs.readFileSync(ASSIGNMENT_FILE, 'utf8'));
      }
    } catch (e) {
      console.log('Creating new assignments file...');
    }
    return {};
  }

  /**
   * Save assignments to file
   */
  saveAssignments() {
    fs.writeFileSync(ASSIGNMENT_FILE, JSON.stringify(this.assignments, null, 2));
  }

  /**
   * Assign a code to a customer (for Email 2 or Email 3)
   * @param {string} cartId - Shopify cart ID
   * @param {string} customerEmail - Customer email
   * @param {string} emailType - 'email2' or 'email3'
   * @returns {object} { code, expiresAt, emailType }
   */
  assignCode(cartId, customerEmail, emailType = 'email2') {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours from now

    // Check if already assigned for this email type
    const key = `${cartId}_${emailType}`;
    if (this.assignments[key]) {
      const assignment = this.assignments[key];
      
      // Check if expired
      if (new Date(assignment.expiresAt) > now) {
        return {
          code: assignment.code,
          expiresAt: assignment.expiresAt,
          emailType: emailType,
          message: 'Previously assigned code (still valid)'
        };
      } else {
        // Expired - need new code
        delete this.assignments[key];
      }
    }

    // Get next available code from batch
    const batch = emailType === 'email2' ? this.email2Codes : this.email3Codes;
    const usedCodes = Object.values(this.assignments).map(a => a.code);
    
    const availableCode = batch.find(code => !usedCodes.includes(code));
    
    if (!availableCode) {
      throw new Error(`No available codes in ${emailType} batch`);
    }

    // Record assignment
    this.assignments[key] = {
      code: availableCode,
      cartId: cartId,
      customerEmail: customerEmail,
      emailType: emailType,
      assignedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      used: false,
      usedAt: null
    };

    this.saveAssignments();

    return {
      code: availableCode,
      expiresAt: expiresAt.toISOString(),
      emailType: emailType,
      message: 'Code assigned successfully'
    };
  }

  /**
   * Mark code as used (when customer applies it at checkout)
   * @param {string} code - The discount code
   * @returns {boolean} Success
   */
  markCodeAsUsed(code) {
    const assignment = Object.values(this.assignments).find(a => a.code === code);
    
    if (!assignment) {
      return false;
    }

    if (assignment.used) {
      return false; // Already used
    }

    assignment.used = true;
    assignment.usedAt = new Date().toISOString();
    this.saveAssignments();
    
    return true;
  }

  /**
   * Get assignment details
   * @param {string} code - The discount code
   * @returns {object|null} Assignment details or null
   */
  getAssignment(code) {
    return Object.values(this.assignments).find(a => a.code === code) || null;
  }

  /**
   * Verify code is valid and not expired/used
   * @param {string} code - The discount code
   * @returns {object} { valid: boolean, reason: string }
   */
  verifyCode(code) {
    const assignment = this.getAssignment(code);
    
    if (!assignment) {
      return { valid: false, reason: 'Code not found' };
    }

    const now = new Date();
    const expiresAt = new Date(assignment.expiresAt);
    
    if (now > expiresAt) {
      return { valid: false, reason: 'Code has expired' };
    }

    if (assignment.used) {
      return { valid: false, reason: 'Code has already been used' };
    }

    return { valid: true, reason: 'Code is valid' };
  }

  /**
   * Get statistics
   * @returns {object} Stats about code usage
   */
  getStats() {
    const assignments = Object.values(this.assignments);
    const now = new Date();
    
    return {
      totalAssigned: assignments.length,
      totalUsed: assignments.filter(a => a.used).length,
      totalExpired: assignments.filter(a => new Date(a.expiresAt) <= now && !a.used).length,
      totalActive: assignments.filter(a => 
        new Date(a.expiresAt) > now && !a.used
      ).length,
      email2CodesBatch: this.email2Codes.length,
      email3CodesBatch: this.email3Codes.length,
      email2CodesUsed: assignments.filter(a => a.emailType === 'email2' && a.used).length,
      email3CodesUsed: assignments.filter(a => a.emailType === 'email3' && a.used).length
    };
  }

  /**
   * Cleanup expired assignments (optional - runs periodically)
   */
  cleanupExpired() {
    const now = new Date();
    let cleaned = 0;
    
    for (const key in this.assignments) {
      const assignment = this.assignments[key];
      const expiresAt = new Date(assignment.expiresAt);
      
      // Remove if expired and already used (no point keeping)
      if (expiresAt <= now && assignment.used) {
        delete this.assignments[key];
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      this.saveAssignments();
      console.log(`Cleaned up ${cleaned} expired assignments`);
    }
    
    return cleaned;
  }
}

// Export for use
module.exports = CodeAssignmentSystem;

// If run directly, show stats
if (require.main === module) {
  const system = new CodeAssignmentSystem();
  console.log('📊 Code Assignment System Stats:');
  console.log(JSON.stringify(system.getStats(), null, 2));
}

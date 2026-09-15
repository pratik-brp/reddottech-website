# 📄 Fonepay API & Dynamic QR Integration Proposal & Bank Request Pack
**Document ID**: `RDT-DOC-2026-FONEPAY-01`  
**Organization**: Red Dot Technologies Pvt. Ltd., Baluwatar-04, Kathmandu, Nepal  
**Target Audience**: HR, Management, Finance Team & Corporate Bank Digital Banking Department  
**Objective**: Automating Course Fee Payments & Instant Real-Time Enrollment Activation  

---

## 1. Executive Summary                          

Red Dot Technologies (`https://reddottech.com.np`) offers professional executive and applied artificial intelligence training programmes across healthcare, banking, education, management, and engineering domains.

Currently, students enrolling in paid programmes scan a static Fonepay QR code and manually upload bank transaction screenshots. These must be manually cross-checked by administrators against bank statements before dispatching access codes.

### Why We Are Upgrading to Fonepay Dynamic QR / Payment Gateway (PG) API
1. **Instant 24/7 Access**: Course access is unlocked automatically within 3 seconds of payment approval.
2. **Zero Manual Reconciliation**: Eliminates staff time spent verifying vouchers and manual data entry errors.
3. **Higher Conversion Rates**: Frictionless, one-tap mobile checkout reduces candidate drop-off.
4. **Automated Cryptographic Security**: Direct server-to-server Double Verification (DV) prevents voucher tampering or fraudulent claims.

---

## 2. Regulatory Context: Why the Request Must Go Through Our Bank

As stated by **Fonepay Business Support**:
> *"For API or Dynamic QR integration, you are required to register for the Fonepay Business QR service with any bank or wallet. If you are already registered... you may coordinate with your respective bank's head office at the Digital Banking Department or Wallet Services to obtain the necessary documentation for API integration."*

### Explanation:
Under **Nepal Rastra Bank (NRB)** payment system directives:
- **Fonepay (F1Soft International)** is a **Payment System Operator (PSO)**.
- Fonepay does not directly sign merchant acquiring agreements with private companies.
- Commercial merchant agreements, merchant IDs (`PID`), settlement accounts, and Merchant Discount Rates (MDR) **must be routed through our commercial acquiring bank** (e.g., Nabil Bank, Global IME Bank, NIC Asia Bank, Siddhartha Bank, etc.) where Red Dot Technologies maintains its corporate current account.

---

## 3. Workflow for HR, Finance & Administration

```
[Red Dot HR / Finance]
        │
        ▼ (1. Submit formal letter & company KYC documents)
[Corporate Bank Branch / Relationship Manager]
        │
        ▼ (2. Internal routing to Head Office)
[Bank's Digital Banking / Merchant Acquiring Dept]
        │
        ▼ (3. Onboarding with Fonepay switch)
[Fonepay Technical Gateway]
        │
        ▼ (4. Issue Merchant PID, Secret Key & API Specs)
[Red Dot Engineering Team]
        │
        ▼ (5. Production Launch on reddottech.com.np)
[Automated 24/7 Real-Time Student Checkout]
```

### Action Items:
1. **Identify Bank Account Details**: Confirm the corporate bank name and account number where course revenues are deposited.
2. **Print and Sign the Bank Application Letter**: Use the official template in **Section 4**.
3. **Compile KYC Attachments**: Gather documents listed in **Section 5**.
4. **Submit to Bank**: Submit in person or via official email to our Bank Relationship Manager (RM).
5. **Hand off Credentials to Dev Team**: Once the bank issues the `PID` (Merchant Code) and `Secret Key`, the engineering team will activate the API.

---

## 4. Formal Application Letter to the Bank

*(Print on Red Dot Technologies Pvt. Ltd. Official Letterhead)*

```text
Date: ________________________

To,
The Branch Manager / Head of Digital Banking Department,
[Name of Commercial Bank, e.g., Nabil Bank Limited / Global IME Bank Limited],
[Branch Name / Head Office],
Kathmandu, Nepal.

Subject: Request for Fonepay Web Payment Gateway (PG) and Dynamic QR API Integration for Red Dot Technologies E-Learning Platform

Dear Sir/Madam,

Greetings from Red Dot Technologies Pvt. Ltd.

We maintain a corporate current account with your esteemed institution under the following details:
• Account Name     : Red Dot Technologies Pvt. Ltd.
• Account Number   : [Insert Your Corporate Account Number]
• Registered Office: Baluwatar-04, Kathmandu, Nepal
• PAN Number       : [Insert Company PAN Number]

Red Dot Technologies operates an applied artificial intelligence, executive education, and technology training platform (https://reddottech.com.np). We are currently upgrading our digital payment infrastructure to provide real-time, automated course enrollment for domestic students and corporate cohorts.

In accordance with Fonepay PSO merchant guidelines, we hereby formally request your bank to onboard Red Dot Technologies for the **Fonepay Web Payment Gateway (PG) & Dynamic QR API Service**. 

This integration will allow candidates on our platform to pay course fees via their mobile banking apps (Fonepay network) or digital wallets, with real-time server-to-server confirmation.

We kindly request you to provide our technical team with the following:
1. Merchant Registration & Allocation of Merchant ID (PID).
2. Production and Sandbox/UAT API Secret Keys (HMAC SHA-512).
3. Latest Technical Integration Specification Document (Fonepay Web PG / Dynamic QR v2/v3).
4. Merchant Discount Rate (MDR) structure and any applicable settlement schedules.

Attached herewith are our certified company registration documents, tax clearance certificate, board resolution, and authorized signatory identification for your verification.

Thank you for your cooperation and continued banking partnership.

Yours sincerely,



__________________________________
[Authorized Signatory Full Name]
[Designation: Managing Director / Director]
Red Dot Technologies Pvt. Ltd.
Contact: [Phone Number]
Email: info@reddottech.com.np
```

---

## 5. Required Documents Checklist (Bank KYC Pack)

Ensure the following certified documents are attached with the application:

- [x] **Certificate of Incorporation** (Office of the Company Registrar - OCR)
- [x] **PAN / VAT Registration Certificate** (Inland Revenue Department - IRD)
- [x] **Memorandum of Association (MOA)** & **Articles of Association (AOA)**
- [x] **Latest Tax Clearance Certificate** (or provisional tax clearance)
- [x] **Board Resolution** signed by the Board of Directors stating:
  - Approval to acquire Fonepay Online Payment Gateway / Dynamic QR services.
  - Designation of the corporate bank account for merchant settlement.
  - Authorization of the Managing Director / Director to sign merchant contracts.
- [x] **Citizenship / National ID copies** of all Directors and Authorized Signatories
- [x] **Company Profile & Website Information** (`https://reddottech.com.np` - course catalog, privacy policy, terms of service, and refund/cancellation policies)

---

## 6. Technical Architecture Blueprint (Developer Implementation)

Once the bank provides the Merchant ID (`PID`) and Secret Key, the development team will execute the following automated flow:

### Transaction Sequence
```
Candidate               Red Dot Frontend            Red Dot Node.js Backend           Fonepay API Gateway
    │                          │                                │                              │
    │── 1. Selects Course ────>│                                │                              │
    │   (e.g., NPR 4,500)      │── 2. POST /api/pay/init ──────>│                              │
    │                          │      { track: "healthcare" }   │── 3. Hash with SecretKey ───>│
    │                          │                                │      (PRN, AMT, PID, DV)     │
    │                          │<─ 4. Returns Fonepay URL/QR ───│                              │
    │<─ 5. Redirect / Scan ────│                                                               │
    │                                                                                          │
    │── 6. Approves in Mobile Banking App (Nabil/NIC Asia/Global/eSewa) ──────────────────────>│
    │                                                                                          │
    │                                                           │<─ 7. Server Callback (UID) ──│
    │                                                           │── 8. Call DV Verification ──>│
    │                                                           │<─ 9. Confirm Status: SUCCESS─│
    │                                                           │                              │
    │                          │<─ 10. SSE / WebSocket: Unlocked│ (Auto-creates access code &  │
    │<─ 11. Instant Course ────│                                │  enrollment in database)     │
    │   Access Unlocked!       │                                │                              │
```

### Technical Parameters Required from Bank:
| Parameter | Description | Handled By |
| :--- | :--- | :--- |
| `PID` | Merchant Code allocated by acquiring bank | Red Dot Server (`.env`) |
| `Secret Key` | Cryptographic secret for HMAC-SHA512 checksum | Red Dot Server (`.env`) |
| `PRN` | Product Reference Number (Unique per transaction) | Auto-generated by Red Dot Server |
| `AMT` | Course fee in NPR (e.g. `4500.00`) | Dynamic from Course Config |
| `CRN` | Currency code (`NPR`) | System Constant |
| `DT` | Date timestamp (`MM/DD/YYYY`) | System Timestamp |
| `RU` | Webhook / Return URL | `https://reddottech.com.np/api/payment/callback` |
| `DV` | Data Verification Checksum | `HMAC-SHA512(PID, PRN, AMT, ... SecretKey)` |

---

## 7. Commercial Questions for Finance to Ask the Bank

When negotiating with the bank's Digital Banking team, Finance should clarify:
1. **Merchant Discount Rate (MDR)**: What percentage does the bank/Fonepay deduct per transaction? (Typically 1.0% – 1.75% for educational/e-learning merchants).
2. **Settlement Timeline**: Is settlement `T+1` (next business day automatic credit to Red Dot's current account) or instant settlement?
3. **Setup / Annual Maintenance Fees**: Are one-time integration setup fees or annual recurring gateway maintenance fees waived for corporate account holders?
4. **Merchant Portal Access**: Login credentials to Fonepay's merchant reconciliation portal for real-time accounting and transaction statements.

---

## 8. Summary Checklist for Immediate Action

1. **Step 1 (Today)**: Fill in bank and account details in **Section 4** and print the letter on Red Dot letterhead.
2. **Step 2 (Today)**: Attach the company KYC pack (**Section 5**).
3. **Step 3 (Tomorrow)**: Submit the physical copy to your branch Relationship Manager and request them to forward it to the **Digital Banking / Merchant Acquiring Department**.
4. **Step 4**: As soon as the bank issues the sandbox credentials (`PID` + `Secret Key`), provide them to the engineering team for API connection.

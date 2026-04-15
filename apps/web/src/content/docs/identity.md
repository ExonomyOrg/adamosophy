---
title: Identity & Authentication System
description: did:peer-based decentralized identity with trusted delegate recovery
order: 10
---

# Identity & Authentication System

## Overview
Adamosophy uses `did:peer` (Decentralized Identifiers) for primary authentication and authorization. This system eliminates central identity providers, giving users full ownership of their digital identity while enabling secure recovery through trusted delegates.

## Naming Conventions
All identity-related files and variables use short, clear prefixes:
- **Key File**: `.adam-key`
- **Config File**: `.adamrc`
- **Variable Prefix**: `adam_`
- **Identity Name**: `AdamID`

## Core Principles
1. **User Sovereignty**: Private keys never leave the user's device unencrypted
2. **Trust-Based Recovery**: Delegates store encrypted copies of full credentials (not shards)
3. **Device Agnostic**: Identity portable across browsers and devices
4. **No Central Authority**: Server stores only public DID documents, never private keys

## Account Creation Flow

### Step 1: Key Generation (Client-Side)
- User clicks "Create AdamID"
- Browser generates Ed25519 keypair (Public/Private)
- Private key remains in memory, never transmitted

### Step 2: DID Document Construction
- System builds JSON-LD DID Document containing:
  - Public verification key
  - Service endpoints for communication
  - Metadata (creation date, version)
- Document ID = hash of document content (self-certifying)

### Step 3: Local Encryption & Storage
- User sets master password (or uses biometrics)
- Private key encrypted using AES-256-GCM with key derived from password (PBKDF2/Argon2)
- Encrypted blob saved to:
  - **Primary**: Browser IndexedDB (persistent, quota-friendly)
  - **Backup**: Downloadable `.adam-key` file (user saves externally)

### Step 4: Server Registration
- Public DID Document sent to Adamosophy server
- Server validates structure, creates user profile linked to DID
- Server stores: `{ did: "did:peer:...", profile_data }`
- Server stores **NOT**: passwords, private keys, or encryption secrets

### Step 5: First Sign-In Challenge
- Server sends cryptographic nonce (random challenge)
- Browser decrypts private key using user password
- Browser signs nonce with private key
- Server verifies signature against stored public key
- On success: Issue session token, grant access

## Trusted Delegate Recovery System

### Philosophy
Adamosophy promotes trust over suspicion. Instead of complex sharding, we use full redundancy:
- Each delegate stores a complete encrypted copy of the user's credentials
- User chooses how many delegates to appoint (1 to N)
- Even one honest delegate enables full recovery
- Delegates cannot access the credentials without the user's master password

### Delegate Setup Flow
1. User selects trusted contacts (friends, family, institutions)
2. System encrypts full credential bundle with **delegate-specific passphrase**
   - Option A: User sets unique passphrase per delegate
   - Option B: Delegate sets their own passphrase during acceptance
3. Encrypted bundle sent to delegate's AdamID storage
4. Delegate receives notification: "You are a recovery delegate for [User]"
5. Delegate accepts, storing encrypted bundle in their account

### Recovery Flow
1. User loses access to all devices
2. User contacts ≥1 delegate (via email, phone, in-person)
3. Delegate downloads encrypted bundle from their account
4. Delegate provides bundle + passphrase to user (secure channel)
5. User imports `.adam-key` file, enters master password
6. Identity restored, new delegates can be appointed

### Security Model
- **Delegate sees**: Encrypted blob only (cannot decrypt without user's master password)
- **Delegate cannot**: Access user account, impersonate user, or read user data
- **Attacker needs**: Both the encrypted bundle AND the user's master password
- **Trust assumption**: At least one delegate will remain honest and available

## Cross-Device & Cross-Browser Portability

### Challenge
Browser IndexedDB is not shared across devices or browsers. Users need seamless identity migration.

### Solution: Multi-Layer Portability

#### Layer 1: Export/Import Files
- **Export**: User downloads `.adam-key` file (encrypted private key + DID document)
- **Import**: User uploads `.adam-key` on new device, enters master password
- **Format**: Standard JSON, encrypted with AES-256-GCM

#### Layer 2: QR Code Transfer (Same-Room Devices)
- Export generates QR code containing encrypted key material
- New device scans QR, imports identity
- Limited to small key sizes or uses compressed encoding

#### Layer 3: Cloud Sync (Optional, User-Controlled)
- User can opt-in to sync encrypted `.adam-key` to personal cloud storage
- Supported providers: iCloud Drive, Google Drive, Dropbox, WebDAV
- Adamosophy never hosts or accesses these files
- Sync handled by OS/browser, not the app

#### Layer 4: Delegate Recovery (Last Resort)
- As described above, contact trusted delegates
- Works even if all personal devices and cloud backups are lost

### Browser Compatibility Matrix
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Web Crypto API | ✅ | ✅ | ✅ | ✅ |
| Biometric Auth | ✅ | ✅ | ✅ | ✅ |
| QR Scanner | ✅* | ✅* | ✅* | ✅* |
| File Download | ✅ | ✅ | ✅ | ✅ |

*Requires camera permission or external scanner app

## Technical Stack Requirements

### Client-Side Libraries
- **Crypto**: `tweetnacl` or `@noble/ed25519` for key generation/signing
- **Encryption**: Web Crypto API (native) for AES-256-GCM
- **Key Derivation**: `pbkdf2` or `argon2-browser` for password-based encryption
- **Storage**: `idb` library for IndexedDB abstraction
- **DID Handling**: `did-resolver` + `did-peer-resolver`

### Server-Side Requirements
- **DID Storage**: Simple key-value store (PostgreSQL/MongoDB)
- **Challenge/Response**: Stateless verification endpoint
- **No Password Hashing**: Server never sees passwords
- **Rate Limiting**: Prevent brute-force on challenge endpoint

### Data Formats
```json
// .adam-key file structure
{
  "version": "1.0",
  "did": "did:peer:z6MkhaXgBZDvotDkWL5Tcu243mjxNGC2aYfSpPZoerRyrGFL",
  "encryptedPrivateKey": "base64-encoded-ciphertext",
  "encryptionParams": {
    "algorithm": "AES-256-GCM",
    "kdf": "PBKDF2-SHA256",
    "iterations": 100000,
    "salt": "base64-salt"
  },
  "delegates": [
    {
      "did": "did:peer:z6Mk...",
      "encryptedBundle": "base64-ciphertext",
      "passphrase_hint": "optional hint"
    }
  ],
  "created_at": "2025-01-15T10:30:00Z"
}
```

## Implementation Phases

### Phase 1: Core Identity (Current Sprint)
- [ ] Key generation (Ed25519)
- [ ] DID document construction
- [ ] Local encryption/storage (IndexedDB)
- [ ] Server registration endpoint
- [ ] Challenge/response authentication
- [ ] Basic sign-in UI

### Phase 2: Portability
- [ ] Export/import `.adam-key` files
- [ ] QR code generation/scanning
- [ ] Cloud sync integration (optional)

### Phase 3: Delegate System
- [ ] Delegate appointment UI
- [ ] Encrypted bundle creation
- [ ] Delegate acceptance flow
- [ ] Recovery workflow
- [ ] Delegate management (add/remove)

### Phase 4: Advanced Features
- [ ] Biometric authentication integration
- [ ] Multi-device session management
- [ ] Hardware security module (HSM) support
- [ ] Social recovery improvements

## Security Considerations

### Threat Model
- **Device Theft**: Attacker has physical device but no master password → No access
- **Server Breach**: Attacker gets database with DIDs only → No private keys
- **Delegate Compromise**: Attacker controls one delegate → Gets encrypted bundle only
- **Phishing**: User tricked into entering password on fake site → Mitigated by domain validation

### Best Practices
1. **Never log** private keys or master passwords
2. **Always use** HTTPS for all communications
3. **Enforce strong** master password requirements (min 12 chars, complexity)
4. **Rate limit** authentication challenges
5. **Educate users** on secure delegate selection
6. **Regular audits** of crypto implementations

## Migration from Traditional Auth
For users transitioning from username/password systems:
1. Create new AdamID alongside existing account
2. Link AdamID to existing profile (admin verification required)
3. Gradually deprecate password auth for AdamID users
4. Provide clear migration guides and support

## References
- DID Peer Specification: https://w3c-ccg.github.io/did-peer/
- Ed25519 Cryptography: https://ed25519.cr.yp.to/
- Web Crypto API: https://www.w3.org/TR/WebCryptoAPI/
- Shamir's Secret Sharing (for comparison): https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing

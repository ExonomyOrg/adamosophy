## **Earthtalk Proposal**

This document serves as the formal architectural blueprint and vision for a local-first, P2P social publishing platform. It synthesizes our technical decisions into a cohesive strategy for a node that is "free" (autonomous) and "connectable" (resilient), structured here for architectural evaluation and adoption.

### **Executive Summary of Architectural Decisions**

The foundation of this architecture relies on several strict technical choices designed to maximize both user sovereignty and network resilience:

* **Core Protocol:** We are utilizing the **Willow (2025 Spec)**. This provides the mathematical foundation for range-based sync, privacy, and fine-grained permissions via Meadowcap.
* **Transport Layer:** The networking is handled by **Iroh (Rust)**. This ensures "Maximal Connectability" through QUIC, UDP hole-punching, and DERP relay fallbacks for robust NAT traversal.
* **Node Topography:** We are adopting a **Native Daemon/Client** architecture. This explicitly separates the high-performance Rust networking daemon (Iroh) acting as the master store from the reactive UI logic (Earthstar/JS) acting as a materialized view, entirely avoiding state and event loop clashes.
* **Identity and Authentication:** We rely on **Meadowcap**. This enables self-sovereign capability delegation where permissions are "carried" by users as cryptographic proofs, rather than being stored or validated on a central server.
* **Availability:** To solve the offline-peer problem, we introduce **High-Availability (HA) "Community Vaults"**. These are always-on Willow nodes that act as high-speed mirrors and persistence buffers for the swarm, providing reliability without gaining any authoritative control over the data.
* **Metric Logic:** For public metrics like view counts, we implement **Publisher-Led Aggregation**. The post author's node acts as the "Source of Truth" for view counts, squashing raw cryptographic receipts submitted by the swarm into verifiable totals.

---

### **Vision Statement: The Architecture of Autonomy**

The digital landscape of the early 2020s was defined by a Faustian bargain: in exchange for "exposure" and "connectivity," users surrendered their data, their identities, and their digital sovereignty to monolithic brokers. These brokers became the gatekeepers of truth, the arbiters of visibility, and the single points of failure for the global conversation. The Earthtalk architecture is a rejection of this bargain. It is built on the premise that a digital node should be as free as the person who owns it and as connectable as the physics of the internet allows.

To be truly "free" in a digital sense means that no third party—no broker, no landlord, and no central authority—can prevent a node from existing or communicating. In our model, freedom is enforced by the **Willow protocol**. By utilizing range-based set reconciliation, we eliminate the need for a central database to "tell" us what we are missing. Instead, nodes engage in a mathematical dialogue, efficiently identifying gaps in their shared knowledge. This autonomy is further solidified by the **Meadowcap** capability system. In a traditional social network, a server checks its database to see if you have permission to view a post. In our vision, you carry your permissions with you as cryptographic proofs. Access is a conversation between peers, not a request to a master.

However, autonomy is a hollow victory if the node is isolated behind a firewall. Traditional P2P systems often fail in the "real world" of 5G networks, corporate Wi-Fi, and complex home routers. This is where our commitment to "maximal connectability" via **Iroh** becomes the cornerstone of the experience. By utilizing **QUIC** and **DERP relays**, we transform the node from a fragile local experiment into a global participant. We treat the relay not as a "server" that holds our data, but as a "dumb pipe"—a stateless utility that facilitates the handshake. If a direct path exists, we take it; if it doesn't, we route through the relay, maintaining end-to-end encryption at every step. This ensures that a user in a coffee shop in Berlin can sync a video to a user on a train in Tokyo without a single centralized server ever seeing the content.

The most radical aspect of this vision is the **decentralization of the "Scoreboard."** In the legacy web, "View Counts" and "Likes" were the leverage used by platforms to manipulate attention. By moving to a **Publisher-Led Aggregation** model, we return the power of the metric to the creator. When a user views a post, they generate a signed cryptographic receipt. These receipts flow through the network like water, eventually finding their way back to the publisher's node. The publisher's node—and only the publisher's node—has the authority to "squash" these thousands of receipts into a verified total count. This total count is then broadcast back to the swarm. This creates a "strictly public" metric: anyone who doubts the number can request the raw receipts and verify the signatures themselves.

Finally, we address the reality of human behavior. Users are not always online, and mobile devices have limited batteries. Our vision incorporates **High-Availability (HA) Community Vaults**. These are not "brokers"; they are specialized, always-on Willow nodes that act as buffers for the swarm. They provide the "persistence" that users have come to expect from the cloud, but they do so as passive participants. They are the high-speed mirrors of the network, ensuring that content is available 24/7 even when the original publisher is asleep. This is federation without the "silos" of ActivityPub; it is a unified network where your identity belongs to you, and the infrastructure exists solely to serve your reach.

---

### **Technical Specification**

#### **1. Networking & Transport (The Iroh Stack)**
* **Protocol:** QUIC (RFC 9000).
* **NAT Traversal:** Integration of `iroh-net` for STUN/DERP. Nodes MUST maintain a persistent `NodeID` derived from a public key.
* **Relay Logic:** Use of stateless DERP servers. Relay servers MUST NOT store Willow data or payloads.
* **Discovery:** Multi-modal discovery via mDNS (local), DHT (global), and Iroh Relay handshakes.

#### **2. Data Layer (The Willow Specification)**
* **Version:** Willow'25.
* **Namespacing:** Each user operates within a unique `NamespaceID`.
* **Sync Logic:** WGPS (Willow General Purpose Sync).
* **Aggregation Path:**
    * **Raw Subspace:** `[Namespace]/posts/[PostID]/metrics/raw/[ViewerID]`
    * **Total Subspace:** `[Namespace]/posts/[PostID]/metrics/total` (Restricted to Publisher Signature).

#### **3. Permission System (Meadowcap)**
* **Delegation:** Capability-based tokens allowing HA nodes to "Store" and "Re-transmit" specific ranges.
* **Verification:** All nodes MUST verify the `Signature` and `Prefix` of an entry before committing to local storage (`iroh-blobs`).

#### **4. Aggregation & Metrics (Option B: Pure P2P)**
* **View Receipt:** A signed, timestamped Willow entry with a null payload, located in the post's metrics path.
* **Squashing Algorithm:**
    1.  The Publisher Node collects all entries in `.../metrics/raw/*`.
    2.  The node validates unique `ViewerIDs` to prevent double-counting.
    3.  A new entry is written to `.../metrics/total` containing the integer count and a Merkle Root of the `ViewerIDs` processed.
    4.  The `Total` entry is given a higher `SequenceNumber` to supersede previous counts during reconciliation.

#### **5. Client Implementation (Tauri + Rust/JS)**
* **Backend (Rust):**
    * Initialize `iroh-willow` daemon instance.
    * Manage master encrypted blob storage optimized for WGPS.
    * Expose IPC commands for `IngestEntry`, `QueryRange`, and `GetNodeStatus`.
* **Frontend (TypeScript):**
    * Utilize `@earthstar/willow-js` for document modeling.
    * Manage materialized view and local UI state in IndexedDB (caching only necessary UI data/indexes, not raw blobs).
    * Sync UI state with the Rust backend via the Tauri event bus.

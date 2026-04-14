# Adamosophy Design Guide

## Overview

This document outlines the design philosophy, current implementation status, and future plans for the Adamosophy website and its four core applications: **Exonomy**, **Earthtalk**, **Republet**, and **InterNovel**. Our design approach emphasizes unity without uniformity—each application maintains its distinct character while contributing to a cohesive ecosystem experience.

## Design Philosophy

### Unity in Diversity

The four applications of Adamosophy serve different human needs but share a common foundation. Our design must reflect this duality:

- **Shared Visual Language**: Common typography, color palette, spacing systems, and interaction patterns create familiarity across applications.
- **Distinct Personalities**: Each application expresses its unique purpose through tailored layouts, imagery, and micro-interactions.
- **Seamless Transitions**: Users moving between applications should feel they are exploring different rooms in the same house, not entering different buildings.

### Local-First Aesthetic

Our applications are built on local-first, P2P architecture. The design should evoke this philosophy:

- **Offline Indicators**: Clear visual feedback when operating offline or with limited connectivity.
- **Sync States**: Elegant representations of data synchronization progress.
- **Peer Presence**: Subtle indicators of connected peers and community vault availability.

### Sovereignty by Design

User sovereignty is not just a technical feature—it is a design principle:

- **Transparent Permissions**: Users always know what they are sharing and with whom.
- **Visible Control**: Settings and controls are accessible, not hidden behind layers of menus.
- **Data Ownership**: Visual metaphors that reinforce user ownership of content and identity.

## Application Profiles

### Exonomy - The Economic Layer

**Purpose**: Autonomous wallet and voucher system for value exchange without intermediaries.

**Design Characteristics**:
- **Tone**: Trustworthy, precise, secure
- **Color Emphasis**: Greens and golds suggesting value and stability
- **Key Interfaces**:
  - Voucher creation and management
  - Transaction history with cryptographic verification
  - Balance and portfolio views
  - Payment flows integrated across all applications

**Current Status**: Foundation layer ready for integration.

**Future Plans**:
- Biometric authentication flows
- Multi-signature wallet interfaces
- Voucher marketplace discovery
- Cross-application payment modals

### Earthtalk - The Social Layer

**Purpose**: Local-first, P2P social publishing platform where conversations flow freely between peers.

**Design Characteristics**:
- **Tone**: Conversational, immediate, human
- **Color Emphasis**: Blues and purples suggesting connection and communication
- **Key Interfaces**:
  - Post creation with rich media support
  - Threaded conversations with real-time updates
  - Publisher-led metrics display (view counts, receipts)
  - Permission delegation interfaces

**Current Status**: Architectural blueprint complete (`earthtalk.md`). Core sync mechanisms in development.

**Future Plans**:
- Real-time collaboration indicators
- Metric verification interfaces (showing receipt proofs)
- Community vault status dashboards
- Cross-posting to other applications

### Republet - The Epistemic Layer

**Purpose**: Decentralized laboratory publishing all experiments regardless of outcome.

**Design Characteristics**:
- **Tone**: Rigorous, transparent, inclusive
- **Color Emphasis**: Neutral grays with accent colors for experiment status (success, null, negative)
- **Key Interfaces**:
  - Experiment report submission with LOI assignment
  - Outcome-neutral categorization system
  - Paywall configuration with Exonomy voucher acceptance
  - Publisher catalog management

**Current Status**: Philosophy documented in `incoming` folder. Technical specifications being finalized.

**Future Plans**:
- LOI resolution and display components
- Experiment outcome visualization (success/failure/null parity)
- Paywall configuration wizard
- Integration with ORCID and arXiv
- Publisher catalog exposure to other applications

### InterNovel - The Narrative Layer

**Purpose**: Distributed catalog of stories, novels, and long-form creative works.

**Design Characteristics**:
- **Tone**: Immersive, literary, discoverable
- **Color Emphasis**: Warm earth tones suggesting storytelling and tradition
- **Key Interfaces**:
  - Novel catalog browsing and search
  - Chapter-by-chapter reading interface
  - Author profile and catalog management
  - Early access and voucher-based预售 systems

**Current Status**: Database structure defined. HJ novel serving as initial content test.

**Future Plans**:
- Immersive reading modes (distraction-free, serialized delivery)
- Author dashboard for catalog management
- Reader annotation and discussion layers
- Cross-referencing with Republet (e.g., historical accuracy notes)

## Shared Components

### Navigation System

A unified navigation framework allows users to move seamlessly between applications while maintaining context:

- **Global Nav Bar**: Persistent header showing all four applications with active state indication
- **App Switcher**: Quick-access menu for jumping between applications
- **Breadcrumbs**: Context-aware navigation showing position within application hierarchy
- **Search Across Apps**: Unified search querying all applications respecting permissions

### Identity & Authentication

Single sign-on across all applications using decentralized identity:

- **did:peer Integration**: User identity portable across applications
- **Capability Display**: Visual representation of held permissions and vouchers
- **Session Management**: Clear indicators of active sessions and connected devices

### Notification System

Unified notification layer aggregating events from all applications:

- **Cross-App Notifications**: Republet citation alerts appearing alongside Earthtalk mentions
- **Priority Filtering**: User-configurable notification priorities per application
- **Delivery Channels**: In-app, push, and email options with granular control

### Catalog Exposure

Each application exposes its catalogs to others through standardized interfaces:

- **Publisher Catalog Widget**: Embeddable component showing user's publications from any app
- **Discovery Feeds**: Algorithmic and chronological feeds drawing from multiple applications
- **Related Content Suggestions**: AI-assisted recommendations across application boundaries

## Technical Implementation

### Monorepo Structure

```
/apps
  /web              # Main website and shared components
    /public
      /docs         # Core documentation (vision.md, earthtalk.md, philosophy.md, design.md)
    /src
      /components   # Shared UI components
      /apps         # Application-specific modules
        /exonomy
        /earthtalk
        /republet
        /internovel
      /shared       # Cross-cutting concerns (auth, nav, notifications)
```

### Styling Architecture

- **Design Tokens**: Centralized token system for colors, typography, spacing
- **Component Library**: Shared React/Vue components with application-specific theming
- **CSS-in-JS**: Dynamic styling allowing per-application customization
- **Responsive Framework**: Mobile-first approach with progressive enhancement

### Willow/Earthstar Integration

All applications share the same underlying communication layer:

- **Namespace Management**: Each application operates in dedicated namespaces
- **Sync Coordination**: Coordinated sync schedules preventing resource contention
- **Permission Inheritance**: Capabilities granted in one application respected by others
- **Event Bus**: Cross-application event system for real-time updates

## Future Roadmap

### Phase 1: Foundation (Q1-Q2 2025)
- [ ] Complete Exonomy wallet core functionality
- [ ] Launch Earthtalk alpha with basic posting and sync
- [ ] Establish shared component library
- [ ] Implement unified navigation and identity

### Phase 2: Integration (Q3-Q4 2025)
- [ ] Republet MVP with LOI system
- [ ] InterNovel reading interface launch
- [ ] Cross-application payment flows
- [ ] Unified notification system

### Phase 3: Synergy (Q1-Q2 2026)
- [ ] Publisher catalog exposure across all apps
- [ ] Advanced discovery and recommendation engines
- [ ] Community vault network deployment
- [ ] Third-party application integration APIs

### Phase 4: Exosystem (Q3+ 2026)
- [ ] Open protocol specification publication
- [ ] Developer documentation and SDKs
- [ ] Community governance mechanisms
- [ ] International expansion and localization

## Design Principles Checklist

Every design decision should be evaluated against these principles:

- [ ] **Does this enhance user sovereignty?** Users must maintain control over their data, identity, and permissions.
- [ ] **Does this work offline-first?** Features must degrade gracefully when connectivity is limited.
- [ ] **Does this enable cross-application synergy?** Can this feature benefit users of other applications?
- [ ] **Does this respect the shared undercarriage?** Is this leveraging Willow/Earthstar appropriately?
- [ ] **Does this reject the Faustian bargain?** Are we avoiding extractive patterns even when convenient?
- [ ] **Does this serve all four pillars?** Does this design consider Exonomy, Earthtalk, Republet, and InterNovel equally?

## Conclusion

The design of Adamosophy is an ongoing conversation between technical possibility and human need. As we build each application, we must remain mindful of the whole. The documents in this folder—`vision.md`, `earthtalk.md`, `philosophy.md`, and this `design.md`—form our shared understanding of what we are creating together.

We are not building four separate products. We are cultivating an exosystem where human creativity, communication, knowledge, and commerce can flourish without surrendering sovereignty to intermediaries. The design must make this vision tangible, intuitive, and irresistible.

This is the work ahead. This is Adamosophy.

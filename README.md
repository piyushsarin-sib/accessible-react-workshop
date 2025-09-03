# Interaction Engineering in React: Accessibility First

A comprehensive workshop and learning platform focused on building accessible React applications. This project demonstrates common accessibility issues and provides step-by-step solutions for developers to learn and practice.

## 🎯 Workshop Overview

### **Workshop Scenario Brief – Step-by-Step Accessibility Fixes**

We've designed a demo e-commerce page where everything **works fine with a mouse**, but has clear **accessibility issues when using only a keyboard or screen reader**.

During the workshop, participants will progressively **fix these issues step by step**, learning how small changes can transform the experience for differently-abled users.

The storyline follows a **differently-abled shopper** trying to buy items essential for them — like **prescription glasses, mobility stickers, or braille labels**.

👉 The contrast between mouse navigation (which seems "okay") and keyboard/screen reader navigation (which exposes real challenges) will make the gaps obvious.

👉 As each fix is introduced (skip links, aria-live regions, focus management, descriptive labels), participants will see how accessibility upgrades directly impact the shopper's ability to complete their purchase smoothly.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd accessible-react-workshop

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The application will be available at `http://localhost:5173`

## 📚 Workshop Pages

### 1. **Workshop Page** (`/workshop`)
- **Full e-commerce experience** with intentional accessibility issues
- **Real-world scenario** for participants to fix step-by-step
- **Complete shopping flow** from search to checkout
- **Multiple accessibility challenges** to solve progressively

### 2. **Demo Page** (`/demo`)
- **Before/After comparison** showing broken vs. fixed versions
- **Visual examples** of accessibility issues and solutions
- **Interactive toggle** between broken and fixed states
- **Clear explanations** of what needs to be fixed

### 3. **Examples Page** (`/examples`)
- **Individual component examples** with accessibility issues
- **Bad Switch Component** - demonstrates poor toggle accessibility
- **Bad Modal Component** - shows modal accessibility problems
- **Focused learning** on specific accessibility concepts

## 🔧 Workshop Structure

### **Phase 1: Identify Issues**
- Navigate the e-commerce page with mouse (seems fine)
- Try keyboard-only navigation (exposes problems)
- Use screen reader to understand the experience
- Document accessibility barriers

### **Phase 2: Progressive Fixes**
1. **Skip Links** - Quick navigation to main content
2. **Button Semantics** - Proper interactive element markup
3. **Form Labels** - Clear input descriptions
4. **Keyboard Navigation** - Full keyboard support
5. **ARIA Live Regions** - Dynamic content announcements
6. **Focus Management** - Proper focus trapping and restoration
7. **Modal Accessibility** - Screen reader and keyboard support

### **Phase 3: Testing & Validation**
- **Keyboard testing** - Tab navigation, Enter/Space activation
- **Screen reader testing** - NVDA, VoiceOver, JAWS
- **Focus testing** - Visible indicators and logical order
- **WCAG compliance** - Meeting accessibility standards

## 🎨 Features

### **E-commerce Products**
- **Prescription Glasses** 👓 - Vision aids
- **Mobility Stickers** 🦽 - Mobility assistance
- **Braille Labels** 🔤 - Tactile organization
- **Hearing Aid Batteries** 🔋 - Hearing support
- **Accessible Door Handle** 🚪 - Mobility aid

### **Interactive Elements**
- **Search functionality** with filtering
- **Category selection** dropdown
- **Product cards** with add-to-cart
- **Shopping cart** management
- **Modal product details**
- **Checkout process**

### **Accessibility Challenges**
- **Missing skip links**
- **Improper button semantics**
- **Unlabeled form inputs**
- **Keyboard navigation gaps**
- **Missing ARIA attributes**
- **Poor focus management**
- **No live region feedback**

## 📖 Workshop Guide

Check the `WORKSHOP_GUIDE.md` file for:
- **Detailed step-by-step fixes**
- **Code examples** for each accessibility issue
- **Testing procedures** and success criteria
- **Best practices** and resources
- **Bonus challenges** for advanced learners

## 🧪 Testing Your Work

### **Keyboard Testing**
- Tab through all interactive elements
- Use Enter/Space to activate controls
- Navigate with arrow keys
- Test Escape key functionality

### **Screen Reader Testing**
- **NVDA** (Windows) or **VoiceOver** (Mac)
- Navigate by headings (H key)
- Navigate by landmarks (R key)
- Listen for announcements and labels

### **Focus Testing**
- Visible focus indicators
- Logical tab order
- Focus trapping in modals
- Focus restoration after interactions

## 🎯 Learning Objectives

By the end of this workshop, participants will:
- ✅ **Understand accessibility barriers** in web applications
- ✅ **Implement proper semantic HTML** for interactive elements
- ✅ **Add keyboard navigation support** to custom components
- ✅ **Use ARIA attributes** appropriately
- ✅ **Manage focus** in complex interactions
- ✅ **Test accessibility** with multiple tools
- ✅ **Apply WCAG guidelines** to React applications

## 🚀 Advanced Challenges

1. **Error handling** with proper ARIA error messages
2. **Loading states** with `aria-busy` and `aria-live`
3. **Keyboard shortcuts** for common actions
4. **Focus order diagrams** for complex layouts
5. **Cross-screen reader testing** and compatibility

## 📚 Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [Focus Management Best Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## 🤝 Contributing

This workshop is designed to be collaborative and educational. Feel free to:
- **Suggest improvements** to the accessibility challenges
- **Add new examples** of common accessibility issues
- **Share your solutions** and approaches
- **Report bugs** or unclear instructions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy accessibility learning! 🎯♿**

*Remember: Accessibility isn't just about compliance - it's about creating inclusive experiences for all users.*


Vercel app: https://accessible-react-workshop-99af.vercel.app/
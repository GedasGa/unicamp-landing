# Translation Debugging Guide

## Issue: Content Not Translating to Lithuanian

If your Confluence content on lesson pages is not translating to Lithuanian even after changing the language preference, follow these debugging steps:

## 🔍 Quick Debug Steps

### 1. **Check if Debug Panel Appears** (Bottom-left corner)
- Open any lesson page in `/app`
- Look for a floating debug panel in the bottom-left corner
- This only appears in development mode (will be hidden in production)

### 2. **Read the Debug Status**
The debug panel shows:
- **Google**: ✅ if Google Translate is loaded, ❌ if not
- **Combo**: ✅ if the translator selector is found, ❌ if not  
- **Lang**: Current i18n language code

### 3. **Enable Browser Console Logging**
Open DevTools (F12) and look for these messages:
- `✅ Google Translate Embed initialized successfully` - Embed loaded
- `📝 Language changed to: lt` - i18n detected language change
- `✅ Successfully triggered Google Translate to: lt` - Translation triggered

### 4. **Manual Translation Test**
In the debug panel, click the manual language buttons:
- Click "Lithuanian 🇱🇹" button
- Check if content translates
- If it works here but not with the header selector, there's an integration issue

### 5. **Check the Browser Console**
Press F12 and go to Console tab. Look for:
- ✅ Normal messages (starting with the symbols above)
- ❌ Error messages that need fixing
- ⚠️ Warning messages for potential issues

## Common Issues & Solutions

### Issue: "❌ Google Translate not loaded yet"
**Problem**: Google Translate script hasn't loaded
  
**Solution**:
1. Wait a few seconds - it might still be loading
2. Refresh the page (F5)
3. Check your internet connection
4. Check if translate.google.com is accessible

### Issue: "⚠️ Google loaded but combo not found"  
**Problem**: Google Translate loaded, but selector element can't be found

**Solution**:
1. Could be timing issue - wait 3-5 seconds
2. Check DevTools -> Elements tab for element with class `goog-te-combo`
3. The embed might be hidden off-screen

### Issue: "❌ Could not find .goog-te-combo element"
**Problem**: Google Translate embed never initialized

**Solution**:
1. Verify `GoogleTranslateInitializer` is imported in `/src/app/app/layout.tsx`
2. Check that it's placed in the JSX tree BEFORE other components
3. Clear browser cache and refresh
4. Try in a different browser

### Issue: Manual Buttons Work But Header Selector Doesn't
**Problem**: Integration issue between language selector and Google Translate

**Solution**:
1. Check that `LanguagePopover` is properly calling `i18n.changeLanguage()`
2. Verify listeners are set up in `translation-provider.tsx`
3. Check for JavaScript errors in console

## 🛠️ Technical Check

### Verify Files Are Correct

1. **Check app/layout.tsx imports**:
   ```tsx
   import { GoogleTranslateInitializer } from 'src/components/google-translate-embed';
   import { TranslationDebugger } from 'src/components/translation-debugger';
   ```

2. **Check components are used**:
   ```tsx
   <GoogleTranslateInitializer />
   <TranslationDebugger />
   ```

3. **Verify GoogleTranslateEmbed component**:
   - File: `src/components/google-translate-embed.tsx`
   - Has `googleTranslateElementInit` callback
   - Creates element with ID `google_translate_element`

4. **Check translation-provider.tsx**:
   - Has `i18n.on('languageChanged', ...)` listener
   - Calls `triggerGoogleTranslate()`

## 📋 Debug Checklist

- [ ] Debug panel appears in bottom-left
- [ ] Google status shows ✅
- [ ] Combo status shows ✅  
- [ ] Manual Lithuanian button works
- [ ] Console shows "✅ Google Translate Embed initialized successfully"
- [ ] Console shows "📝 Language changed to: lt"
- [ ] Console shows "✅ Successfully triggered Google Translate to: lt"
- [ ] No ❌ errors in console
- [ ] Header language selector changes i18n language (UI updates)
- [ ] Content in lesson page updates with translation

## 🔧 If Still Not Working

### Step 1: Hard Reset
```bash
# Clear all caches
rm -rf .next node_modules
bun install
bun dev
```

### Step 2: Test in Different Page
Try different pages to isolate the issue:
- Dashboard (`/app`)
- Course page
- Lesson page

### Step 3: Check Network Tab
In DevTools -> Network:
- Look for `element.js` request to translate.google.com
- Should be a successful 200 response
- If red/failed, Google's CDN might be blocked

### Step 4: Test Without Google Translate
Temporarily comment out `GoogleTranslateInitializer` to see if it's breaking other functionality

## 📞 Getting Help

When reporting the issue, provide:
1. Screenshot of the debug panel
2. Full console output (copy all messages)
3. Which page/lesson has the issue
4. What language you're switching to
5. What you see vs. what you expected
6. Browser & OS information

## 🎯 Expected Behavior

1. User goes to `/app` (dashboard)
2. User clicks language selector (flag icon in header)
3. Selects Lithuanian
4. UI buttons/labels change to Lithuanian immediately
5. Page content starts translating (might take 1-2 seconds)
6. Confluence content appears in Lithuanian
7. All subsequent pages use Lithuanian

## Hidden in Production

Remember: The debug panel (`TranslationDebugger`) only shows in development mode (`NODE_ENV='development'`). It's automatically hidden in production builds, so users won't see it.

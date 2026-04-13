# 🗑️ Sanity Studio Delete Issues - Complete Fix Guide

If you can't delete cars in Sanity Studio, follow these solutions in order:

## 🚀 Quick Fixes (Try These First)

### 1. **Refresh Studio Page**
- Press `Ctrl + F5` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- This forces a complete page reload and clears cached scripts

### 2. **Clear Browser Cache**
- **Chrome**: Settings → Privacy → Clear browsing data → Select "All time"
- **Firefox**: Settings → Privacy → Clear Data
- **Safari**: Develop → Empty Caches

### 3. **Try Different Browser**
- If using Chrome, try Firefox or Safari
- Sometimes browser-specific issues prevent delete functionality

### 4. **Re-login to Studio**
- Log out of Sanity Studio completely
- Close all Studio tabs
- Go to your Studio URL and log back in

## 🔧 Advanced Solutions

### 5. **Check Studio URL**
Make sure you're using the correct Studio URL:
```
https://hivemotorsltd.sanity.studio
```

### 6. **Verify Account Permissions**
- Make sure you're logged into the correct Sanity account
- Check that your account has "Editor" or "Administrator" role
- Ask the project owner to verify your permissions

### 7. **Studio Delete Methods**

**Method A - Document View:**
1. Click on a car to open it
2. Look for three dots (⋯) in the top right corner
3. Click "Delete" from the dropdown menu
4. Confirm the deletion

**Method B - List View:**
1. In the cars list, right-click on a car
2. Select "Delete" from context menu
3. Confirm the deletion

**Method C - Keyboard Shortcut:**
1. Select a car in the list
2. Press `Delete` key on keyboard
3. Confirm the deletion

## 🛠️ Technical Solutions

### 8. **Check Browser Console**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try to delete a car
4. Look for error messages
5. Common errors and solutions:

**Error: "Insufficient permissions"**
- Your API token needs "Editor" permissions
- Contact project administrator

**Error: "Network error"**
- Check internet connection
- Try different network/WiFi

**Error: "Document is referenced"**
- The car might be referenced by other documents
- Check if it's used in testimonials or other content

### 9. **Manual Delete via API**
If Studio still doesn't work, you can delete cars manually:

1. Visit: `http://localhost:3000/manage-cars`
2. This page shows all cars with direct Studio links
3. Use the "Edit" button to open each car in Studio

### 10. **Reset Studio Configuration**
If nothing else works:

1. Clear all browser data for sanity.studio domain
2. Disable browser extensions temporarily
3. Try incognito/private browsing mode
4. Contact Sanity support if issue persists

## 📞 Still Need Help?

### Test Your Permissions:
Run this command to test if your API can delete:
```bash
npm run test-delete
```

### Check All Cars:
Visit the management page:
```
http://localhost:3000/manage-cars
```

### Contact Support:
- **Sanity Support**: https://www.sanity.io/help
- **Project Issues**: Check your project settings at https://sanity.io/manage

## ✅ Prevention Tips

1. **Regular Maintenance**: Clear browser cache weekly
2. **Use Latest Browser**: Keep your browser updated
3. **Stable Connection**: Use reliable internet when managing content
4. **Proper Logout**: Always log out properly when done

---

**Most Common Solution**: 90% of delete issues are fixed by refreshing the Studio page with `Ctrl+F5` or clearing browser cache.
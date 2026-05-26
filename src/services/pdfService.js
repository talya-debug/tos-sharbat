// ייצוא PDF באמצעות window.print עם CSS מותאם להדפסה
// גישה פשוטה שתומכת ב-RTL ועברית בלי בעיות פונטים

export function exportTradePDF(tradeName) {
  // הוספת class לגוף לפני הדפסה
  document.body.classList.add('printing-trade')

  // שינוי כותרת הדף זמנית
  const originalTitle = document.title
  document.title = `${tradeName} - מדריך ביצוע ובקרת איכות`

  window.print()

  // שחזור
  document.title = originalTitle
  document.body.classList.remove('printing-trade')
}

const reference = new URLSearchParams(location.search).get('ref');
const title = document.querySelector('#status-title');
const message = document.querySelector('#status-message');
const referenceLabel = document.querySelector('#status-reference');
const ar = localStorage.getItem('ibadullah-language') === 'ar';
if (ar) document.documentElement.lang = 'ar';
referenceLabel.textContent = reference && /^ibd_[a-f0-9]{32}$/.test(reference) ? `Reference: ${reference}` : '';
async function refresh() {
  if (!/^ibd_[a-f0-9]{32}$/.test(reference || '')) {
    title.textContent = ar ? 'رابط غير صالح' : 'Invalid reference';
    message.textContent = ar ? 'يرجى مراجعة رابط التبرع.' : 'Please check your donation link.';
    return;
  }
  try {
    const response = await fetch(`/api/donations/${reference}`, { cache:'no-store' });
    if (!response.ok) throw new Error();
    const result = await response.json();
    if (result.status === 'paid') {
      title.textContent = ar ? 'تم تأكيد التبرع' : 'Donation confirmed';
      message.textContent = ar ? 'شكراً لك. تم التحقق من الدفع لهذا المشروع.' : 'Thank you. Payment for this project has been verified.';
    } else if (result.status === 'checkout_error') {
      title.textContent = ar ? 'لم يبدأ الدفع' : 'Checkout did not start';
      message.textContent = ar ? 'لم يتم تسجيل أي دفع. يرجى المحاولة مجدداً.' : 'No payment was recorded. Please try again.';
    } else {
      title.textContent = ar ? 'بانتظار تأكيد الدفع' : 'Awaiting payment confirmation';
      message.textContent = ar ? 'لم نتلق تأكيداً من PayMongo بعد. تحقق مجدداً خلال قليل. لا تُعد العودة إلى هذه الصفحة إثباتاً للدفع.' : 'We have not received confirmation from PayMongo yet. Check again shortly. Returning to this page does not confirm a payment.';
    }
  } catch {
    title.textContent = ar ? 'تعذر التحقق من الحالة' : 'Could not check status';
    message.textContent = ar ? 'يرجى المحاولة لاحقاً.' : 'Please try again later.';
  }
}
document.querySelector('#refresh-status').addEventListener('click', refresh);
refresh();

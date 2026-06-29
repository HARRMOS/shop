import nodemailer from "nodemailer";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Noor Collection";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const shopEmail = process.env.SHOP_EMAIL || "contact@noor-collection.fr";

function isEmailConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendMail(to: string, subject: string, html: string) {
  if (!isEmailConfigured()) {
    console.log(`[Email non configuré] To: ${to} | Subject: ${subject}`);
    return { ok: true, skipped: true };
  }

  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"${siteName}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  return { ok: true, skipped: false };
}

interface OrderEmailData {
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: Array<{ name: string; size: string; color: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string | null;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}

function orderItemsHtml(items: OrderEmailData["items"]) {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${i.name}<br><small>${i.size} · ${i.color} × ${i.quantity}</small></td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${formatPrice(i.price * i.quantity)}</td>
        </tr>`
    )
    .join("");
}

export async function sendOrderConfirmationToCustomer(order: OrderEmailData) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2c2c2c">
      <h1 style="color:#7d8b6f">${siteName}</h1>
      <p>Bonjour ${order.firstName},</p>
      <p>Merci pour votre commande <strong>${order.orderNumber}</strong>.</p>
      <table style="width:100%;margin:20px 0">${orderItemsHtml(order.items)}</table>
      <p>Sous-total : ${formatPrice(order.subtotal)}<br>
      Livraison : ${order.shipping === 0 ? "Gratuite" : formatPrice(order.shipping)}<br>
      <strong>Total : ${formatPrice(order.total)}</strong></p>
      <p><strong>Livraison :</strong><br>${order.address}, ${order.postalCode} ${order.city}, ${order.country}</p>
      <p>Paiement à la livraison ou par virement. Nous vous contacterons sous 24h.</p>
      <p><a href="${siteUrl}/commande/suivi?numero=${order.orderNumber}&email=${encodeURIComponent(order.email)}">Suivre ma commande</a></p>
    </div>`;
  return sendMail(order.email, `Confirmation commande ${order.orderNumber} — ${siteName}`, html);
}

export async function sendOrderNotificationToShop(order: OrderEmailData) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Nouvelle commande ${order.orderNumber}</h2>
      <p><strong>${order.firstName} ${order.lastName}</strong><br>
      ${order.email} · ${order.phone}</p>
      <p>${order.address}, ${order.postalCode} ${order.city}</p>
      <table style="width:100%">${orderItemsHtml(order.items)}</table>
      <p><strong>Total : ${formatPrice(order.total)}</strong></p>
      ${order.notes ? `<p>Notes : ${order.notes}</p>` : ""}
      <p><a href="${siteUrl}/admin">Voir dans l'admin</a></p>
    </div>`;
  return sendMail(shopEmail, `[Nouvelle commande] ${order.orderNumber}`, html);
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const html = `
    <div style="font-family:sans-serif">
      <h2>Message contact — ${data.name}</h2>
      <p>De : ${data.email}</p>
      ${data.subject ? `<p>Sujet : ${data.subject}</p>` : ""}
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    </div>`;
  await sendMail(shopEmail, `[Contact] ${data.subject || data.name}`, html);

  const autoReply = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#7d8b6f">${siteName}</h2>
      <p>Bonjour ${data.name},</p>
      <p>Nous avons bien reçu votre message et vous répondrons sous 24–48h.</p>
    </div>`;
  return sendMail(data.email, `Nous avons bien reçu votre message — ${siteName}`, autoReply);
}

export async function sendOrderStatusUpdate(order: OrderEmailData & { status: string }) {
  const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    SHIPPED: "Expédiée",
    DELIVERED: "Livrée",
    CANCELLED: "Annulée",
  };
  const html = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#7d8b6f">${siteName}</h2>
      <p>Bonjour ${order.firstName},</p>
      <p>Le statut de votre commande <strong>${order.orderNumber}</strong> est maintenant : <strong>${statusLabels[order.status] || order.status}</strong>.</p>
      <p><a href="${siteUrl}/commande/suivi?numero=${order.orderNumber}&email=${encodeURIComponent(order.email)}">Voir ma commande</a></p>
    </div>`;
  return sendMail(order.email, `Mise à jour commande ${order.orderNumber}`, html);
}

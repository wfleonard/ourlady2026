# Shipping Confirmation — Buyers

One email to each buyer the day their canvas goes out, with the FedEx tracking number. Comes before the review request in the `Buyer` sequence.

**Segment target:** contacts in the `Buyer` segment whose order has shipped. One send per order.

**Personalization:** `@firstname`, `@tracking` (FedEx tracking number, typed in on the contact page before sending; the send is refused while it's blank).

---

## Shipping confirmation

**Subject:** Your tilma canvas has shipped

**Preview text:** FedEx tracking number @tracking

**Body:**

Dear @firstname,

Your Our Lady of Guadalupe canvas is on its way. It shipped by FedEx, and the tracking number is [@tracking](https://www.fedex.com/fedextrack/?trknbr=@tracking).

If the tracking page doesn't show anything yet, give it a day. FedEx updates it once the package is scanned. Both Mexican certificates are packed in the box with the canvas.

When it arrives, please open it and look the canvas over. If anything was damaged in shipping or isn't right, reply to this email and I'll make it right.

Thanks,
Peace Bill

William F. Leonard
Saxon Enterprises, Inc. — dba Primos Maternos
wfleonard@primosmaternos.com · 732-673-4260

---

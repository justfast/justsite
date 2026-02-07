// /api/sumup-checkout.ts
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { amount, currency } = req.body;

  try {
    const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        // MAI mettere la chiave direttamente qui. Usa le variabili d'ambiente di Vercel.
        'Authorization': `Bearer ${process.env.SUMUP_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkout_reference: `INV-${Date.now()}`,
        amount: amount,
        currency: currency,
        pay_to_email: 'alepetrini69@gmail.com',
        description: 'Acquisto prodotti'
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione del checkout' });
  }
}


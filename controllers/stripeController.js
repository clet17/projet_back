import StripePkg from 'stripe'
const Stripe = StripePkg.default || StripePkg

if (!process.env.STRIPE_SECRET_KEY) {
  console.log('⚠️ STRIPE_SECRET_KEY manquante dans process.env')
  throw new Error('Clé Stripe non définie dans les variables d’environnement')
} else {
  console.log('✅ Clé Stripe chargée avec succès')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body

  if (!amount || amount < 0.5) {
    return res.status(400).json('Montant invalide pour le paiement')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur'
    })

    return res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.log(err)
    return res.status(500).json('Erreur lors de la création du paiement')
  }
}
